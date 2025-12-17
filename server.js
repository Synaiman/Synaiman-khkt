import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

const API_KEY = "AIzaSyDG2sPGZknIJByzvouelyBwj7qogiX7QMc";
const genAI = new GoogleGenerativeAI(API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    Bạn là một nhà trị liệu tâm lý giàu kinh nghiệm, tên là Lumora. 
    Hãy lắng nghe, thấu hiểu và trả lời như một chuyên gia tâm lý trị liệu. 
    Trả lời một cách ấm áp, đưa ra các câu nói đồng cảm và an ủi. 
    đưa ra gợi ý giúp giảm căng thẳng (như thở sâu, viết nhật ký, thiền), và khuyến nghị tìm bác sĩ/nhà trị liệu nếu cần.
    Trả lời về các câu hỏi liên quan đến căng thẳng.
    Nếu người dùng có ý định tự tử hay gây hại, hãy khuyên họ gọi số khẩn cấp. 
    Nhấn mạnh rằng họ không đơn độc và cần tìm sự giúp đỡ từ người thân, bạn bè hoặc chuyên gia.
    Ngoài ra tôi muốn bạn có thể đánh giá người dùng có bị căng thẳng không dựa trên các số liệu: Nhịp tim, Nồng độ oxy trong máu, RMSSD, SDNN, GSR trung bình, Điện trở điện da, Độ dẫn điện da, các kết qủa đo của thiết bị Neurosky mobile mindway 2 ATTENTION, MEDITATION, sõng não Delta, sóng não Theta, sóng não Low Alpha
, sóng não High Alpha, sóng não Low Beta, High Beta, sóng não Low Gamma, Mid Gamma.
    Người dùng: ${userMessage}
    `;

    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi xử lý yêu cầu" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "homepage.html"));
});

app.listen(3000, () => {
  console.log("🚀 Server chạy tại http://localhost:3000");
});
