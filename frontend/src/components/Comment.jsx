import React from "react";

const Comment = ({ username, comment, date }) => {
  return (
    <div className="bg-gray-300 flex flex-col px-8 py-4 rounded-md my-4">
      <div className="flex justify-between text-slate-700 font-semibold text-[1.1rem]">
        <p>{username}</p>
        <p>{date}</p>
      </div>
      <div>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
