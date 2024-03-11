const yup = require("yup");

const episodeSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان قسمت اجباری می باشد")
    .min(2, "عنوان قسمت باید حداقل 2 کاراکتر داشته باشد")
    .max(300, "عنوان قسمت نباید بیشتر از 300 کاراکتر داشته باشد"),
  description: yup
    .string()
    .required("توضیحات قسمت اجباری می باشد")
    .min(10, "توضیحات قسمت باید حداقل 10 کاراکتر داشته باشد")
    .max(600, "توضیحات قسمت نمی تواند بیشتر از 600 کاراکتر داشته باشد"),
  videoURL: yup.string().optional(),

  course: yup.array().of(yup.string()),
});

module.exports = {
  episodeSchema,
};
