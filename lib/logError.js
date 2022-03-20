import axios from "axios";

export default function logError({
  error,
  location,
  message = "",
  hashid = null,
}) {
  if (typeof window !== "undefined") {
    location = window.location.pathname;
    hashid = localStorage.getItem("NUTRILON_PLAYER") || null;

    // console.log(`location = ${location}`);
    // console.log(`hashid = ${hashid}`);
  }

  axios
    .post("/api/logError", {
      hashid,
      error,
      location,
      message,
    })
    .then((response) => {
      const player = response.data.id || "unknown";
      console.log(`Player (${player}) succeed in logging error.`);
    })
    .catch((error) => {
      if (error.response?.status < 500) {
        console.log(
          "Insufficient error information provided! Please try again"
        );
        return;
      }
      console.log("Failed at logging the error to the server.");
      console.error(error);
    });
}
