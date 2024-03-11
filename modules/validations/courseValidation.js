const yup = require("yup");

const courseSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان دوره اجباری می باشد")
    .min(2, "عنوان دوره باید حداقل 2 کاراکتر داشته باشد")
    .max(300, "عنوان دوره نباید بیشتر از 300 کاراکتر داشته باشد"),
  description: yup
    .string()
    .required("توضیحات دوره اجباری می باشد")
    .min(10, "توضیحات دوره باید حداقل 10 کاراکتر داشته باشد")
    .max(600, "توضیحات دوره نمی تواند بیشتر از 600 کاراکتر داشته باشد"),
  banner: yup.string().optional(),
  price: yup
    .number()
    .required("قیمت دوره الزامی می باشد")
    .positive("قیمت دوره باید عدد مثبت باشد"),
  teacher: yup.string().required("استاد دوره الزامی می باشد"),
  students: yup.array().of(yup.string()),
  episodes: yup.array().of(yup.string()),
});

module.exports = {
  courseSchema,
};
