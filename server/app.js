let express = require("express");
let Kahoot = require("kahoot.js-updated");
let cors = require("cors");
let app = express();

const clientMap = new Map();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({ methods: ["GET", "POST", "OPTIONS"], origin: "*", credentials: true })
);

app.listen(3000, () => {
  console.log(`Listening on https://localhost:3000`);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/send_bots", (req, res) => {
  console.log(req.body);
  try {
    let { code } = req.body;
    let { amount } = req.body;
    let { name } = req.body;

    if (!code || !amount || !name)
      return res
        .json({
          message: `Request received but didn't find the code, amount, or name`,
        })
        .status(401);

    for (let i = 0; i < amount; i++) {
      let client = new Kahoot();
      clientMap.set(clientMap.size, client);
      client.join(code, `${name}-${clientMap.size}`).catch(console.error);
      client.on("QuestionStart", (question) => {
        question.answer(Math.floor(Math.random() * 5)).catch(console.error);
      });
      client.on("QuizEnd", () => {
        res.status(200).json({ message: "Quiz ended" });
        clientMap.clear();
      });
    }

    res.status(200).json({ message: "Completed", amount });
  } catch (err) {
    console.error(err);
  }
});
