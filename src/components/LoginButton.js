import React from "react";

const LoginButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
    >
      {children}
    </button>
  );
};

export default LoginButton;
