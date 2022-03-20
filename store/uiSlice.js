import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionModal: false,
  feedbackModal: false,
  syncModal: false,
  notificationModal: false,
  notificationTitle: "新消息",
  notificationBear: false,
  notificationText: "",
  notificationImage: "",
  notificationQRCode: true,
  notificationHandler: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showQuestion: (state) => {
      state.questionModal = true;
    },
    hideQuestion: (state) => {
      state.questionModal = false;
    },
    showFeedback: (state) => {
      state.feedbackModal = true;
    },
    hideFeedback: (state) => {
      state.feedbackModal = false;
    },
    showSync: (state) => {
      state.syncModal = true;
    },
    hideSync: (state) => {
      state.syncModal = false;
    },
    showNotification: (state, action) => {
      const { text, qrcode, handler, title, bear, image } = action.payload;
      state.notificationTitle = title || "新消息";
      state.notificationBear = !!bear;
      state.notificationText = text;
      state.notificationQRCode = !!qrcode;
      state.notificationImage = image || "";
      state.notificationHandler = handler || null;
      state.notificationModal = true;
    },
    hideNotification: (state) => {
      state.notificationModal = false;
      state.notificationTitle = "新消息";
      state.notificationText = "";
      state.notificationBear = false;
      state.notificationQRCode = true;
      state.notificationImage = "";
      state.notificationHandler = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(startANewGame.rejected, (state, action) => {
  //     console.log(action);
  //     state.notificationText =
  //       "您暂时没有足够的动力值开启探索之旅。\r\n请您对品牌充分了解后再次进行探索。 您可以在我们的公众号中了解我们的品牌。\r\n半小时后您会获得1点动力值。";
  //     state.notificationQRCode = true;
  //     state.notificationHandler = "close";
  //     state.notificationModal = true;
  //   });
  // },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
