import { Link, useNavigate } from "react-router-dom";
import "../project css/TeacherLogin.css";
import { AppContext } from "../App";
import { useState } from "react";
import axios from "axios";

export const TeacherLogin = () => {
  let navigate = useNavigate();

  const [usersData, setUsersData] = useState(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const TeacherloginAPI = async (getPost) => {
    try {
      const data = await axios.post(
        // link of API.
        "https://apex.oracle.com/pls/apex/josh_mp_workspace/teacher/teacher/login",
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

  const TeacherLogin = async () => {
    // API format of the data.
    const data = {
      email: email,
      password: password,
    };
    const status = await TeacherloginAPI(data);
    console.log(usersData);
    // if account was found on the table, then the next line will redirect to home page
    status && navigate("/admin");
  };

  const register = async () =>{
        navigate("/teacherregister");
    }

  return (
    <body>
      <div className="teacher-container">
        <div className="teacher-wrapper">
          <div className="teacher-head">
            <h2>Teacher Login</h2>
            <p>_______</p>
          </div>

          <span style={{ fontSize: "13px", color: "red" }}>{response}</span>

          <div className="teacher-input">
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

          <div className="teacher-button">
            <button onClick={TeacherLogin}>Login</button>
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
