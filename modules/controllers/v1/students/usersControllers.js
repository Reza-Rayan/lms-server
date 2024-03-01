const User = require(`${config.path.models}/User`);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userSchema } = require("../../../validations/userValidator");

class UsersControllers {

  // Signing up user Controller
  async signup(req, res) {
    try {
      const { username, email, password, phone, avatar, courses, role } =
        req.body;

      // Check User Exist
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(401).json({
          success: false,
          message: "این ایمیل حساب  دارد",
        });
      }

      try {
        await userSchema.validate(
          {
            username,
            email,
            password,
            phone,
            avatar,
            courses,
            role,
          },
          { abortEarly: false }
        );
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.errors,
        });
      }

      const newUser = new User({
        username,
        email,
        password,
        phone,
        courses,
        role,
        avatar,
      });

      const user = await newUser.save();
      return res.status(200).json({
        success: true,
        message: "ثبت نام موفقیت آمیز بود",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Error in Server.",
        errors: error.errors,
      });
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

      // Create Token for Login
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        config.secretKey,
        { expiresIn: 2 * 24 * 60 * 60 }
      );

      return res
        .status(200)
        .json({ success: true, message: " ورود موفقیت آمیز بود", user, token });
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
          user,
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
  // Update User Details
  async update(req, res) {
    try {
      const { username, email, avatar, phone } = req.body;
      const userId = req.params.id;

      const selectedUser = await User.findById(userId);
      if (!selectedUser) {
        return res.status(404).json({
          success: false,
          message: "کاربر مورد نظر یافت نشد",
        });
      }
      console.log(req.file);
      await User.findByIdAndUpdate(userId, {
        username,
        email,
        avatar,
        phone,
      });
      return res.status(200).json({
        success: true,
        message: "آپدیت مشخصات کاربر موفقیت آمیز بود",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Error in Server" });
    }
  }

  async uploadAvatar(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      // Check User Exist
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "کاربر مورد نظر یافت نشد",
        });
      }

      // Check Avatar Upload
      if (!req.file) {
        return res.status(404).json({
          success: false,
          message: "  آواتار آپلود نشده است",
        });
      }

      // Upload File
      const avatarURL = `http://localhost:5000/${req.file.path}`;
      await User.findByIdAndUpdate(userId, {
        avatar: avatarURL,
      });

      return res.status(200).json({
        success: true,
        message: "آواتار با موفقیت آپلود شد",
        avatar: avatarURL,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Error in Server.",
      });
    }
  }
}

module.exports = new UsersControllers();
