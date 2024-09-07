import { Link, useNavigate } from "react-router-dom";
import "../css/Signup.css";
import axios from "axios";
import { AppContext } from "../App";
import { useContext, useState } from "react";

export const Signup = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [response, setResponse] = useState(""); //All the exception from the api go here

  const signupAPI = async (newPost) => {
    try {
      await axios.post(
        "https://apex.oracle.com/pls/apex/josh_mp_workspace/account/account",
        newPost
      );
      return true;
    } catch (err) {
      // API exception.
      setResponse(err.response.data.message);
      return;
    }
  };

  const signupFn = async () => {
    const data = {
      //mao ni unsaon pag post
      email: email,
      password: password,
    };

    const status = await signupAPI(data);
    status && navigate("/"); // after creating redirect to login page.
  };

  return (
    <div className="container">
      <div className="create-title"><p>Create your account</p></div>
      <div className="email-sec">
        <input
          type="text"
          placeholder="Email:"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="pass-sec">
        <input
          type="password"
          placeholder="Password:"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="btn-signuo">
        <button onClick={signupFn} className="btn-signup">
          Sign up
        </button>
        <div className="back-to-login">
          <Link style={{ color: "black" }} to={"/"}>
            Back to login
          </Link>
        </div>
      </div>
      <span style={{ fontSize: "13px", color: "red" }}>
        {response}
      </span>
    </div>

  );
};
