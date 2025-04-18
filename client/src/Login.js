import  React, { useState } from "react";
import axios from "axios";


export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const submit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:8000/api/login", {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token); // Save JWT
        onLogin(); // tell parent we’re logged in
      } catch {
        alert("Invalid login.");
      }
    };

    return (
        <form onSubmit={submit} className="space-y-4 p-6 bg-white rounded shadow">
          <h1 className="text-2xl font-bold">Login</h1>
          <input className="border p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="border p-2 w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
        </form>
      );
    }





