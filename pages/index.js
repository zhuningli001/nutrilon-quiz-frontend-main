import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useDispatch } from "react-redux";
import { playerActions } from "../store/playerSlice";

import logError from "../lib/logError";
import Loader from "../component/ui/Loader/Loader";

import classes from "../styles/Home.module.scss";

export default function Home({ APPID, LANDINGURL }) {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user exists on his phone
    const hashid = localStorage.getItem("NUTRILON_PLAYER");

    // Test player is prohibited
    if (hashid && hashid !== "12345-1814718944") {
      axios
        .get("/api/getPlayer", { params: { hashid } })
        .then((response) => {
          console.log(response.data);
          dispatch(playerActions.replacePlayerInfo(response.data));
          console.log("Received player info.");
          router.push("/landing");
        })
        .catch((error) => {
          console.error(error);
          // If the hashid is invalid
          if (error.response.status === 404) {
            dispatch(playerActions.logout());
            router.reload();
          } else {
            console.log(error);
            logError({
              error,
              message: "Failed at getting player info by hashid",
            });
          }
        });
    }

    // Getting userinfo from WeChat (scope: userinfo)
    else {
      localStorage.removeItem("NUTRILON_PLAYER");
      console.log("getting open information from WeChat...");
      window.location.assign(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${LANDINGURL}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      );
    }
  }, []);

  return (
    <div className={classes.bg}>
      <Loader />
    </div>
  );
}

export async function getStaticProps() {
  const APPID = process.env.APPID;
  const LANDINGURL = process.env.LANDINGURL;
  return {
    props: {
      APPID,
      LANDINGURL,
    },
  };
}
