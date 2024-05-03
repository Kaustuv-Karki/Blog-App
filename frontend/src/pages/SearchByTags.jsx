import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const Search = () => {
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
  const navigate = useNavigate();

  const lastPageIndex = currentPage * postPerPage;
  const firstPostIndex = lastPageIndex - postPerPage;
  const currentPosts = blogs.slice(firstPostIndex, lastPageIndex);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch(`/api/blog/tags`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      setTagList(data);
    };
    fetchTags();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const tags = selectedTags.join("&");
    try {
      const response = await fetch(`/api/blog/tags/${tags}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blogs);
  return (
    <div className="max-w-[1280px] mx-auto flex justify-center flex-col">
      <h1 className="text-white text-[2rem] font-semibold text-center py-5">
        Search Using Tags
      </h1>
      <div className="flex gap-6 items-center max-w-[600px] mx-auto flex-wrap justify-center">
        {tagList?.map((tag, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-5 w-5"
                name="tags"
                value={tag}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTags([...selectedTags, e.target.value]);
                  } else {
                    setSelectedTags(
                      selectedTags.filter((tag) => tag !== e.target.value)
                    );
                  }
                }}
              />
              <label className="text-white">{tag}</label>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="px-5 py-2 bg-green-700 text-white rounded-md my-8"
          onClick={handleSearch}>
          Search
        </button>
      </div>
      {console.log(blogs.length)}
      {blogs.length > 0 ? (
        <div className="flex gap-4 flex-wrap items-center justify-center">
          {currentPosts?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center text-white py-20 text-[3rem] font-semibold">
          No Blogs Found
        </div>
      )}
      {blogs.length > 0 && (
        <div className="max-w-[500px] mx-auto my-10">
          <Pagination
            totalLength={blogs.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            postPerPage={postPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
