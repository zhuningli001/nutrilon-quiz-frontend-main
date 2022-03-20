import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { uiActions } from "./uiSlice";

export const LIFE_INTERVAL = 30 * 60 * 1000;

export const initialState = {
  id: null,
  openid: "",
  hashid: "",
  nickname: "",
  avatar: null,
  headimgurl:
    "https://res.cloudinary.com/npc2021/image/upload/v1633443295/default_profile_image_3109ee6c17.jpg",
  shopurl: "",
  score1: 0,
  score2: 0,
  score3: 0,
  score4: 0,
  score5: 0,
  scoreTotal: 0,
  currentLevel: 0,
  life: 3,
  lastGameAt: "",
  lastCertificateDate: null,
  certificates: [],
};

export const syncPlayerData = createAsyncThunk(
  "player/syncPlayerData",
  async (dataToBeUpdated, thunkAPI) => {
    const hashid = localStorage.getItem("NUTRILON_PLAYER");
    const { id } = thunkAPI.getState().player;
    const res = await axios.put("/api/updatePlayerInfo", {
      hashid,
      id,
      update: dataToBeUpdated,
    });

    return res.data;
  }
);

export const startANewGame = createAsyncThunk(
  "player/startANewGame",
  async (_, thunkAPI) => {
    const { life, id, lastGameAt } = thunkAPI.getState().player;

    if (life === 0) throw "life = 0";

    let newLife = 3,
      newLastGameAt = "",
      lastTime = 0;
    if (lastGameAt) lastTime = Number(lastGameAt);
    const currentTime = Date.now();

    if (currentTime - lastTime >= LIFE_INTERVAL) {
      newLife = life;
      newLastGameAt = currentTime.toString();
    } else {
      newLife = life - 1;
      newLastGameAt = lastTime.toString();
    }

    const hashid = localStorage.getItem("NUTRILON_PLAYER");
    const res = await axios.put("/api/updatePlayerInfo", {
      hashid,
      id,
      update: { life: newLife, lastGameAt: newLastGameAt },
    });

    return res.data;
  }
);

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("NUTRILON_PLAYER", action.payload);
    },
    logout: (state) => {
      localStorage.removeItem("NUTRILON_PLAYER");
      state = initialState;
    },
    replacePlayerInfo: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    setTester: (state, action) => {
      state = Object.assign(state, action.payload);

      const resetState = {
        id: 29,
        openid: "testplayer12345",
        avatar: null,
        score1: 0,
        score2: 0,
        score3: 0,
        score4: 0,
        score5: 0,
        scoreTotal: 0,
        currentLevel: 0,
        life: 3,
        lastGameAt: "",
        lastCertificateDate: null,
        certificates: [],
      };

      state = Object.assign(state, resetState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(syncPlayerData.pending, (state, action) => {
      console.log(`trying to update player ${state.nickname}...`);
    });
    builder.addCase(syncPlayerData.fulfilled, (state, action) => {
      state = action.payload;
      console.log(`player ${state.nickname} updated!`);
    });
    builder.addCase(syncPlayerData.rejected, (state, action) => {
      console.log(action.error);
      console.log(`player ${state.nickname} cannot be updated!`);
    });
    builder.addCase(startANewGame.pending, (state, action) => {
      state.life--;
      console.log(`player ${state.nickname} starting a new game...`);
    });
    builder.addCase(startANewGame.fulfilled, (state, action) => {
      state = action.payload;
      console.log(`player ${state.nickname} started a new game!`);
    });
    builder.addCase(startANewGame.rejected, (state, action) => {
      console.log(action.error);
      console.log(`player ${state.nickname} cannot start a new game!`);
    });
  },
});

export default playerSlice;
export const playerActions = playerSlice.actions;

const verifyPayload = (payload) => {
  if (typeof payload !== "object") return false;
  const payloadKeys = Object.keys(payload);
  const validKeys = payloadKeys.filter((key) => key in initialState);
  return validKeys.length !== payloadKeys.length ? false : true;
};
