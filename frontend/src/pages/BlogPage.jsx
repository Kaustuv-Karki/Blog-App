import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";

const BlogPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState();
  const { id } = params;

  const getBlogById = async () => {
    const response = await fetch(`/api/blog/get/${id}`, {
      method: "GET",
      "content-type": "application.json",
    });
    const data = await response.json();
    setBlogData(data);
  };
  useEffect(() => {
    getBlogById();
    setLoading(false);
  }, []);

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/blog/comment/${id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          access_token: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          comment,
          userId: JSON.parse(localStorage.getItem("user"))._id,
        }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setComment("");
    getBlogById();
  };

  return (
    <div className="max-w-[1280px] mx-auto">
      {!loading && (
        <div>
          <div className="flex justify-between items-center py-2 mt-4">
            <p className="text-white border border-white px-5 py-1 w-fit rounded-md">
              {blogData?.category}
            </p>
            {localStorage.getItem("user") &&
              blogData?.author ===
                JSON.parse(localStorage.getItem("user"))._id && (
                <button
                  className="text-white py-2 px-5 bg-green-600 rounded-md"
                  onClick={() => navigate(`/blog/edit/${id}`)}>
                  Edit Blog
                </button>
              )}
          </div>
          <div className="py-4">
            <h1 className="text-[2.5rem] text-white">{blogData?.title}</h1>
            <div className="flex gap-6 ml-auto w-fit text-white font-semibold">
              <p>{blogData?.createdAt.slice(0, 10)}</p>
              <p>{blogData?.authorName}</p>
            </div>
          </div>
          <div className="flex gap-4">
            {blogData?.tags.map((tag, index) => {
              if (index < 3)
                return (
                  <span
                    key={index}
                    className="text-[0.8rem] bg-gray-600 text-white px-2 py-1 rounded-md font-semibold">
                    {tag}
                  </span>
                );
            })}
          </div>
          <p className="py-6 text-white">{blogData?.content}</p>
          <div className="border-t border-white py-8 mt-8">
            <h2 className="text-white text-[1.2rem] fonr-semibold">Comments</h2>
            {localStorage.getItem("user") && (
              <form className="py-6" onSubmit={submitComment}>
                <textarea
                  type="text"
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment"
                  className="bg-gray-300 text-black placeholder-black px-4 py-2 rounded-md w-full outline-none"
                />
                <button className="bg-[#D6482C] text-white px-4 py-2 rounded-md mt-4">
                  Submit
                </button>
              </form>
            )}
            {blogData?.comments.toReversed().map((comment, index) => (
              <Comment
                key={index}
                username={comment.username}
                comment={comment.comment}
                date={comment.time.slice(0, 10)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
