import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  const navigate = useNavigate();

  const lastPageIndex = currentPage * postPerPage;
  const firstPostIndex = lastPageIndex - postPerPage;
  const currentPosts = blogs.slice(firstPostIndex, lastPageIndex);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blog/get`, {
          method: "GET",
          "content-type": "application/json",
        });
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <div className="max-w-[1280px] mx-auto flex items-center flex-col justify-center">
      <div className="flex justify-between items-center">
        <h1 className="text-center py-8 text-[2rem] text-white font-semibold">
          Blogs
        </h1>
        <div
          onClick={() => navigate("/search/tags")}
          className="px-5 py-2 bg-gray-500 text-white ml-10 rounded-md cursor-pointer">
          Search Using Tags
        </div>
        <div
          onClick={() => navigate("/search/category")}
          className="px-5 py-2 bg-gray-500 text-white ml-10 rounded-md cursor-pointer">
          Search Using Category
        </div>
        <div
          onClick={() => navigate("/blog/create")}
          className="px-5 py-2 bg-green-700 text-white rounded-md ml-10 cursor-pointer">
          Create Blogs
        </div>
      </div>
      {currentPosts.length === 0 && (
        <h1 className="text-white text-[2rem] py-5 font-semibold">
          No Blogs Found
        </h1>
      )}
      <div className="flex gap-4 flex-wrap justify-center flex-row">
        {currentPosts.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
      <div className="py-5">
        <Pagination
          totalLength={blogs.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          postPerPage={postPerPage}
        />
      </div>
    </div>
  );
};

export default Home;
