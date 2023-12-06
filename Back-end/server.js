const express = require("express");
const cors = require("cors");
const dotennv = require("dotenv");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const authRoute = require("./routes/auth");

dotennv.config();

const port = 8000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth",authRoute);

// Tạo kết nối tới cơ sở dữ liệu MySQL sử dụng các biến từ tệp .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

// Kết nối tới cơ sở dữ liệu
db.connect(err => {
    if (err) {
      console.error("Lỗi kết nối tới cơ sở dữ liệu MySQL:", err);
    } else {
      console.log("Kết nối thành công tới cơ sở dữ liệu:", process.env.DB_DATABASE);
    }
    
});

app.listen(port, () =>{
    console.log("Server đang chạy trên PORT:",port);
});