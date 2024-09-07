import { useContext, useState } from "react";
import "../css/Login-todo.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export const Login = () => {
  let navigate = useNavigate();
  const { userData, setUserData } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Exception handler.
  const [response, setResponse] = useState(""); 

  const loginAPI = async (getPost) => {
    try {
      const data = await axios.post(
        // link of API. 
        "https://apex.oracle.com/pls/apex/josh_mp_workspace/account/account/log-in",
        getPost
      );
      // Passing data to API
      setUserData(data.data);
      return true;
    } catch (err) {
      // Messeges from API.
      setResponse(err.response.data.message);
      return;
    }
  };

  const handleLogin = async () => {
    // API format of the data.
    const data = {
      email: email,
      password: password,
    };
    const status = await loginAPI(data);
    console.log(userData);
    // if account was found on the table, then the next line will redirect to home page
    status && navigate("/home");
  };

  const signup = async () =>{
    navigate("/signup");
  }

  // this is the user interface
  return (
      <div className="container">
        <div className="login-title"><p>Log in</p></div>
        <span style={{ fontSize: "13px", color: "red" }}>{response}</span>
        <div className="email-sec">
          <input
          type="text"
          placeholder="Enter email address:"
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="pass-sec">
          <input
            type="password"
            placeholder="Enter password:"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn-login">
          <button onClick={handleLogin} className="login-btn w-100">
            Log in
          </button>
        </div>
        <div className="signup-sec">
          <button onClick={signup}>Create Account?</button>
        </div>
      </div>
  );
};
