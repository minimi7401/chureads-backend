import { MongoClient } from "mongodb";

let db = null;

export const connectDB = async () => {
  try {
    // 이미 DB가 연결되어 있는경우
    if (db) return db;

    // DB연결후 해당 DB반환
    const MONGODB_URI = process.env.MONGODB_URI_LOCAL;
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("🔌 MongoDB 연결 성공!");

    return db;
  } catch (error) {
    console.log("❌ MongoDB 연결실패", error);
    process.exit(1); // 프로그램 강제 종료
  }
};
