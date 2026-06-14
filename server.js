import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const msg = req.body.message;

  res.json({
    reply: "당신이 보낸 메세지: " + msg
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("running"));