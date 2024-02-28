const yup = require("yup");

const userSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "نام کاربری باید حداقل 1 کاراکتر باشد")
    .max(50, "نام کاربری نمی تواند بیشتر از 50 کاراکتر باشد"),
  email: yup
    .string()
    .email("لطفا یک ایمیل معتبر وارد کنید")
    .max(255, "ایمیل نمی تواند بیشتر از 255 کاراکتر باشد"),
  role: yup
    .string()
    .oneOf(
      ["student", "teacher", "admin"],
      "نقش کاربر باید از بین 'student', 'teacher', 'admin' باشد"
    ),
  avatar: yup.string().optional(),
  password: yup
    .string()
    .min(4, "رمز عبور باید حداقل 4 کاراکتر باشد")
    .max(255, "رمز عبور نمی تواند بیشتر از 255 کاراکتر باشد"),
  courses: yup.array(),
  phone: yup.string().optional(),
  wallet: yup.number().min(0).optional(),
});

module.exports = {
  userSchema,
};
