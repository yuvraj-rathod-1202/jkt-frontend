import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        // Check the credentials
        if (username === "jktrading" && password === "jkt@2024") {
            navigate("/admin"); // Navigate to /admin
        } else {
            alert("Invalid username or password"); // Show an alert if credentials are incorrect
        }
    };

    return (
        <div className="h-[calc(100vh-200px)] justify-center items-center flex">
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-6 pb-8 pt-6 mb-4">
                <h2 className="font-serif text-xl font-semibold">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Update state
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update state
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
