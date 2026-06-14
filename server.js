import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Gemini API key (Render Environment Variable 사용)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.json({ reply: "메시지가 비어있어요." });
    }

    // 모델 선택
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    // AI 호출
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // 응답 반환
    res.json({
      reply: text
    });

  } catch (error) {
    console.error(error);
    res.json({
      reply: "AI 서버 오류 발생"
    });
  }
});

// Render port 필수 설정
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Gemini server running on port", PORT);
});