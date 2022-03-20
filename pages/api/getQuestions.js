import axios from "axios";
import hashCode from "../../lib/hashCode";

export default function handler(req, res) {
  if (req.method !== "GET")
    return res.status(400).json({ message: "invalid method" });

  const { level } = req.query;
  const index = parseInt(level);
  console.log(index);

  // add a new level 5： change upbound 3->4
  if (!level || isNaN(index) || index < 0 || index > 4)
    return res.status(400).json({ message: "invalid level" });

  (async () => {
    try {
      const { data } = await axios.get(
        `${process.env.BACKEND}/level-${index + 1}`
      );

      // encrypt the answers
      const newQuestions = data.questions.map((question) => {
        const temp = JSON.parse(JSON.stringify(question));
        temp.correctAnswer = hashCode(temp.answers[temp.correctAnswer]);
        delete temp.answers.isCorrect;
        delete temp.answers.answer;
        return temp;
      });

      res.status(200).json({ ...data, questions: newQuestions });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
      return;
    }
  })();
}
