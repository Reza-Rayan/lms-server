const yup = require("yup");

const courseSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(300, "Title cannot exceed 300 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(600, "Description cannot exceed 600 characters"),
  imageBanner: yup.string().required("Image banner is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  teacher: yup.string().required("Teacher is required"),
  students: yup.array().of(yup.string()),
  episodes: yup.array().of(yup.string()),
});

module.exports = {
  courseSchema,
};
