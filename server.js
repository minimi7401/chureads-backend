import express from "express";
import dotenv from "dotenv";
import postRouter, { init } from "./routes/posts.js";
import { connectDB } from "./database/db.js";
import cors from "cors";
import { handleSSEConnection } from "./sse/sseManager.js";


// 환경변수 로드
// 전역으로 로드해서 모든 node.js모듈 내에서 접근가능
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// CORS 설정 - 순서 중요⭐️
app.use(cors()); // 모든 도메인 허용

// Json 파싱 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SSE 연결 라우트
app.get("/events", handleSSEConnection);

// 라우터 미들웨어 등록
app.use("/posts", postRouter);

app.listen(PORT, async () => {
  console.log("Server at..", PORT);
  const db = await connectDB();
  init(db);
});