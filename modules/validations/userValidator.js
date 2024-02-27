const Validator = require("fastest-validator");

const v = new Validator();

const userSchema = {
  username: { type: "string", min: 1, max: 50, messages: {
    stringMin: "نام کاربری باید حداقل 1 کاراکتر باشد",
    stringMax: "نام کاربری نمی تواند بیشتر از 50 کاراکتر باشد",
  } },
  email: { type: "email", max: 255, messages: {
    email: "لطفا یک ایمیل معتبر وارد کنید",
    stringMax: "ایمیل نمی تواند بیشتر از 255 کاراکتر باشد",
  } },
  role: { type: "string", enum: ["student", "teacher", "admin"], messages: {
    enum: "نقش کاربر باید از بین 'student', 'teacher', 'admin' باشد",
  } },
  avatar: { type: "string", optional: true },
  password: { type: "string", min: 4, max: 255, messages: {
    stringMin: "رمز عبور باید حداقل 4 کاراکتر باشد",
    stringMax: "رمز عبور نمی تواند بیشتر از 255 کاراکتر باشد",
  } },
  course: { type: "string", optional: true }, // Assuming course is a string ID
  phone: { type: "string", optional: true },
  wallet: { type: "number", min: 0, optional: true },
};

const validateUser = v.compile({ ...userSchema });

module.exports = {
  validateUser,
};
