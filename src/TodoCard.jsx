import React from "react";
import { CiTrash } from "react-icons/ci";

function TodoCard({ id, title, completed, onDelete }) {
  return (
    <div className="border border-gray-400 rounded-lg box-border p-3 flex items-center justify-between mt-2">
      <h1>{title}</h1>
      <CiTrash
        onClick={() => onDelete(id)}
        className="text-lg hover:text-red-700 transition-transform duration-400 ease-in-out 
               active:scale-95"
      />
    </div>
  );
}

export default TodoCard;
