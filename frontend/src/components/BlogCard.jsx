import { Link } from "react-router-dom";
const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog?._id}`}
      className="h-[300px] w-[300px] bg-white rounded-md px-4 py-3 cursor-pointer">
      <div>
        <p className="text-white font-semibold px-4 py-1 bg-[#D6482C] w-fit rounded-md text-[0.8rem] ">
          {blog?.category}
        </p>
        <div className="text-slate-700 font-semibold text-[1.5rem] h-[90px] py-2 line-clamp-2">
          {blog.title}
        </div>
      </div>
      <div className="flex gap-4">
        {blog?.tags &&
          blog.tags.map((tag, index) => {
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
      <div>
        <p className="text-slate-600 line-clamp-3 py-4 h-[100px]">
          {blog?.content}
        </p>
      </div>
      <div className="flex justify-between text-slate-500 font-semibold text-[0.9rem]">
        <p>{blog?.createdAt && blog.createdAt.slice(0, 10)} </p>
        <p>Author : {blog?.authorName && blog.authorName.slice(0, 15)}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
