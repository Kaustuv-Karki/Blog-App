import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogValidation } from "../Validations/blogValidations";

const EditBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [tag, setTag] = useState("");
  console.log(formData.tags);
  const userId = JSON.parse(localStorage.getItem("user"))._id || null;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/get/${id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await blogValidation.validate(formData);
    if (!isValid) return;
    try {
      const response = await fetch(`/api/blog/update/${userId}/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          access_token: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Blog updated successfully");
        setFormData({ title: "", content: "", category: "", tags: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mx-auto w-[1200px] h-[600px]  flex-col items-center justify-center my-[5%] rounded-sm">
      <h1 className="text-white text-[2rem] font-semibold">Edit Blog</h1>
      <form
        className="mt-8 px-4 py-4 flex flex-col gap-6 w-full"
        onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-white">
            Title
          </label>
          <input
            className="w-full py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-white">
            Content
          </label>
          <textarea
            className="w-full py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
            name="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }></textarea>
        </div>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-white">
            Category
          </label>
          <input
            type="text"
            className="w-full py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-white">
            Tags
          </label>
          <div className="flex flex-col">
            <input
              type="text"
              className="w-full py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <div
              className="bg-gray-400 text-black font-semibold px-4 py-2 rounded-md mt-4 text-center cursor-pointer"
              onClick={() => {
                setFormData({ ...formData, tags: [...formData.tags, tag] });
                setTag("");
              }}>
              Add Tag
            </div>

            {formData.tags && formData.tags.length > 0 ? (
              <div className="flex gap-4 flex-wrap">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-white flex items-center gap-4 w-fit py-2 px-3 mt-4 rounded-md">
                    <p>{tag}</p>{" "}
                    <button
                      className="text-red-500 underline font-semibold cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const updatedTags = formData.tags.filter(
                          (tag_) => tag_ !== tag
                        );
                        setFormData({ ...formData, tags: updatedTags });
                      }}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-center py-6">No tags Added</p>
            )}
          </div>
        </div>
        <button className="bg-green-600 text-white py-3 " type="submit">
          Edit Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
