import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

export const createBlog = async (req, res, next) => {
  const id = req.user.id;
  const { title, content, tags, category } = req.body;
  const userExists = await User.findById(id);
  if (!userExists) return res.status(404).json({ message: "User not found" });
  const newBlog = new Blog({
    title,
    content,
    tags,
    category,
    author: id,
    authorName: userExists.username,
  });

  try {
    const response = await newBlog.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  const blogId = req.params.blogId;
  const BlogExists = await Blog.findById(blogId);
  if (!BlogExists) return res.status(404).json({ message: "Blog not found" });
  try {
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res, next) => {
  const id = req.params.id;
  const blogId = req.params.blogId;
  const { title, content, tags, category } = req.body;
  const BlogExists = await Blog.findById(blogId);
  if (!BlogExists) return res.status(404).json({ message: "Blog not found" });
  try {
    await Blog.findByIdAndUpdate(
      blogId,
      {
        $set: {
          title,
          content,
          tags,
          category,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBlogs = async (req, res, next) => {
  // const { start, end } = req.query;
  // console.log(start, end);
  try {
    const response = await Blog.find().sort({ createdAt: -1 });
    //   .skip(+start)
    //   .limit(+end);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogsById = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    const response = await Blog.findById(blogId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (req, res, next) => {
  const blogId = req.params.id;
  console.log(blogId);
  const { comment, userId } = req.body;
  const BlogExists = await Blog.findById(blogId);
  const UserExists = await User.findById(userId);
  if (!UserExists) return res.status(404).json({ message: "User not found" });
  if (!BlogExists) return res.status(404).json({ message: "Blog not found" });
  try {
    await Blog.findByIdAndUpdate(blogId, {
      $push: {
        comments: {
          comment,
          username: UserExists.username,
          time: new Date().toISOString(),
        },
      },
    });
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBlogCategoryList = async (req, res, next) => {
  try {
    const response = await Blog.find().distinct("category");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogsByCategory = async (req, res, next) => {
  const category = req.params.category.split("&");
  try {
    const response = await Blog.find({
      category: { $in: category.map((cat) => new RegExp(cat, "i")) },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getTags = async (req, res, next) => {
  try {
    const response = await Blog.find().distinct("tags");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogsByTags = async (req, res, next) => {
  const tags = req.params.tags.split("&");

  try {
    const response = await Blog.find({
      tags: { $in: tags.map((tag) => new RegExp(tag, "i")) },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
