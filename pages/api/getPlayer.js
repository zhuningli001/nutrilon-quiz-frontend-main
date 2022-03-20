//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code

import axios from "axios";
import getJWTToken from "../../lib/api/get-jwt-token";
import hashCode from "../../lib/hashCode";

// get existing player info by hashid from db
const getPlayerByHashid = async (hashid) => {
  console.log("getPlayerByHashid");
  try {
    const response = await axios.get(
      `${process.env.BACKEND}/players/hashid/${hashid}`
    );

    // error handling: player not found
    if (!response) throw new Error(`Hashid (${hashid}) not valid`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// get existing player info by openid from db
const getPlayerByOpenid = async (openid) => {
  console.log("getPlayerByOpenid");
  try {
    const response = await axios.get(
      `${process.env.BACKEND}/players?openid=${openid}`
    );

    // error handling: player not found
    if (
      !response ||
      (Array.isArray(response.data) && response.data.length !== 1)
    )
      throw new Error("Player not found");

    return response.data[0];
  } catch (error) {
    throw error;
  }
};

// create a new player in the db
const newPlayer = async ({ openid, hashid, nickname, headimgurl }) => {
  console.log("newPlayer");
  try {
    const jwt = await getJWTToken();

    const response = await axios.post(
      `${process.env.BACKEND}/players`,
      {
        openid,
        hashid,
        nickname,
        headimgurl,
      },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const player = response.data;

    if (!response || !player.openid)
      throw new Error("Failed at creating a new player");

    return player;
  } catch (error) {
    throw error;
  }
};

// get user's WeChat openid & access_token from WeChat OAuth
const getOpenidAndToken = async (code) => {
  console.log("getOpenid&Token");
  if (!code) throw new Error("WeChat OAuth code not found");
  try {
    const response = await axios.get(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.APPSECRET}&code=${code}&grant_type=authorization_code`
    );
    const { openid, access_token, errcode, errmsg } = response.data;

    // Examine the data returned by WeChat
    if (!openid) throw new Error("No openid found");
    if (!access_token) throw new Error("No access token found");
    if (errcode || errmsg) throw new Error(`${errcode}: ${errmsg}`);

    return { openid, access_token };
  } catch (error) {
    throw error;
  }
};

// get user's WeChat info from WeChat API
const getWeChatInfo = async ({ access_token, openid }) => {
  console.log("getWeChatInfo");
  try {
    const response = await axios.get(
      `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
    );
    const { nickname, headimgurl, errcode, errmsg } = response.data;

    // Examine the data returned by WeChat
    if (errcode || errmsg) throw new Error(`${errcode}: ${errmsg}`);

    return { nickname, headimgurl };
  } catch (error) {
    throw error;
  }
};

export default function handler(req, res) {
  // Get the player info from the database
  if (req.method === "GET") {
    const { code, hashid } = req.query;

    // query backend by hashid
    if (hashid) {
      (async () => {
        try {
          const player = await getPlayerByHashid(hashid);
          res.status(200).json(player);
        } catch (error) {
          res.status(404).send(error);
        }
      })();
    }
    // query by code via WeChat API (scope=base)
    else if (code) {
      (async () => {
        try {
          const { openid } = await getOpenidAndToken(code);
          const player = await getPlayerByOpenid(openid);
          res.status(200).json(player);
        } catch (error) {
          res.status(500).send(error);
        }
      })();
    }
  }

  // Get the player info via WeChat API(scope = userinfo)
  // Double check if the player doesn't exist before creating a new player
  else {
    const code = req.body.code;

    (async () => {
      try {
        const { access_token, openid } = await getOpenidAndToken(code);
        const { nickname, headimgurl } = await getWeChatInfo({
          access_token,
          openid,
        });

        // Generate hashid
        const hashid = openid.substr(-5).concat(hashCode(openid).toString());

        // Create a new Promise to
        // check if the player exists in the db
        // if yes, return existing data
        // if no, create a new player
        const newPlayerPromise = ({ openid, hashid, headimgurl, nickname }) =>
          new Promise((resolve, reject) => {
            getPlayerByOpenid(openid)
              .then((player) => resolve(player))
              .catch((error) => {
                if (error.message === "Player not found") {
                  return { openid, hashid, headimgurl, nickname };
                }
                throw error;
              })
              .then((data) => newPlayer(data))
              .then((newPlayer) => resolve(newPlayer))
              .catch((error) => reject(error));
          });

        const player = await newPlayerPromise({
          openid,
          hashid,
          headimgurl,
          nickname,
        });

        res.status(200).json(player);
      } catch (error) {
        res.status(500).send(error);
      }
    })();
  }
}
