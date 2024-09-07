import { Link, useNavigate } from "react-router-dom";
import "../project css/Login.css";
import { useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

export const Login = () => {
  let navigate = useNavigate();

  const [usersData, setUsersData] = useState(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const loginAPI = async (getPost) => {
    try {
      const data = await axios.post(
        // link of API.
        "https://apex.oracle.com/pls/apex/josh_mp_workspace/student/student/login",
        getPost
      );
      // Passing data to API
      setUsersData(data.data);
      return true;
    } catch (err) {
      // Messeges from API.
      setResponse(err.response.data.message);
      return;
    }
  };

  const StudentLogin = async () => {
    // API format of the data.
    const data = {
      email: email,
      password: password,
    };
    const status = await loginAPI(data);
    console.log(usersData);
    // if account was found on the table, then the next line will redirect to home page
    status && navigate("/home");
  };

  const register = async () => {
    navigate("/register");
  };

  return (
    <body>
      <div className="student-container">
        <div className="student-wrapper">
          <div className="student-head">
            <h2>Student Login</h2>
            <p>_______</p>
          </div>

          <span style={{ fontSize: "13px", color: "red" }}>{response}</span>

          <div className="student-input">
            <div className="emailsec">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="passec">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="student-button">
            <button onClick={StudentLogin}>Login</button>
            <button onClick={register}>Sign up</button>
          </div>

          <div className="back-to-selection">
            <Link style={{ color: "lightgreen" }} to={"/"}>
              Back
            </Link>
          </div>
        </div>
      </div>
    </body>
  );
};
