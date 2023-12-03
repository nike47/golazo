import React, { useState } from "react";
import InputField from "./InputField";
import { login } from "../utils/auth";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router-dom";
import myImage from "../assets/image2.png";
import backgroundImage from "../assets/background.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      if (token) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex max-w-4xl max-h-[800px] w-full h-auto bg-grey-200 shadow-lg rounded-lg overflow-hidden">
        <div className="w-3/5 p-5">
          <img
            className="object-cover h-full w-full"
            src={myImage}
            alt="Login Visual"
          />
        </div>
        <div className="w-2/5 p-8">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white flex items-center justify-center p-6 md:p-8 lg:p-12 shadow-lg rounded-lg w-full max-w-sm h-auto min-h-[400px]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  type="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <LoginButton type="submit">Log In</LoginButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
