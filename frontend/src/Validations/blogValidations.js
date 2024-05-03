import * as Yup from "yup";

export const blogValidation = Yup.object().shape({
  title: Yup.string().min(10).required("Title is required"),
  content: Yup.string().min(20).required("Content is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.array().required("Tags are required"),
});
