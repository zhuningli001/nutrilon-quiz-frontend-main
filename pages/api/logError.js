import axios from "axios";

const postError = async ({ id = null, error, message, location }) => {
  try {
    const response = await axios.post(`${process.env.BACKEND}/errors`, {
      player: id,
      error,
      message,
      location,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "invalid method" });
  }

  let { hashid, error, message, location } = req.body;
  if (!error) {
    res.status(400).send({ message: "insufficient information" });
  }
  error = JSON.stringify(error);

  (async () => {
    try {
      // Get the player id if possible
      const idRes = await axios.get(
        `${process.env.BACKEND}/players/getid/${hashid}`
      );
      const id = idRes.data || null;

      const postedError = await postError({ id, error, message, location });

      res.status(200).JSON(postedError);
    } catch (error) {
      res.status(500).send(error);
    }
  })();
}
