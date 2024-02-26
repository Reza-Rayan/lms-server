const User = require("../../models/user");
const bcrypt = require("bcrypt");

class UsersControllers {
  // Signing up user Controller
  async signup(req, res) {
    try {
      const { username, email, password } = req.body;

      const newUser = new User({ username, email, password });

      // Check User Exist
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(401).json({
          success: false,
          message: "این ایمیل حساب  دارد",
        });
      }
      const user = await newUser.save();
      return res.status(200).json({
        success: true,
        message: "ثبت نام موفقیت آمیز بود",
        user,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "There is an Error in Server" });
    }
  }

  // Login User Controller
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      // Check email Exist
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "ایمیل مورد نظر وجود ندارد",
        });
      }
      const encryptedPassword = await bcrypt.compare(password, user.password);

      // Check Password
      if (!encryptedPassword) {
        return res.status(403).json({
          success: false,
          message: "رمز عبور وارد شده صحیح نمی باشد",
        });
      }

      return res
        .status(200)
        .json({ success: true, message: " ورود موفقیت آمیز بود", user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Error in Server" });
    }
  }

  //  Get One User
  async single(req, res) {
    try {
      const userId = req.params.id;
      console.log(userId);
      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "کاربر مورد نظر یافت نشد",
        });
      }
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Error in Server",
      });
    }
  }
}

module.exports = new UsersControllers();
