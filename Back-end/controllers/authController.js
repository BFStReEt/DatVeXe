const User = require("../models/User");
const bcrypt = require("bcrypt");

const authController = {
    //Register
    registerUser: async (req, res) => {
    try {
        // Kiểm tra xem các trường bắt buộc có tồn tại không
        if (!req.body.username || !req.body.email || !req.body.password || !req.phone) {
            return res.status(400).json({ error: "Vui lòng cung cấp đầy đủ thông tin người dùng." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            numberPhone: req.body.phone,
            type: req.body.type,
            createdAt: new Date(),
            updatedAt: new Date(),
            admin: req.body.admin,
        });

        //Save to DB
        try {
            const user = await newUser.save();
            res.status(200).json({ message: "Người dùng đã được tạo thành công", user });
        } catch (saveError) {
            console.error("Lỗi khi lưu người dùng vào cơ sở dữ liệu:", saveError);
            res.status(500).json({ error: "Lỗi khi lưu người dùng vào cơ sở dữ liệu" });
        }
    } catch (err) {
      console.error("Lỗi xử lý:", err);
      res.status(500).json({ error: "Lỗi xử lý" });
    }
  },
};

module.exports = authController;
