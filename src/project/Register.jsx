import { Link, useNavigate } from "react-router-dom";
import "../project css/Register.css";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  let navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [section, setSection] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [response, setResponse] = useState("");

  const signupAPI = async (newPost) => {
    try {
      await axios.post(
        "https://apex.oracle.com/pls/apex/josh_mp_workspace/student/student",
        newPost
      );
      return true;
    } catch (err) {
      // API exception.
      setResponse(err.response.data.message);
      return;
    }
  };

  const studentSignup = async () => {
    const data = {
      //mao ni unsaon pag post
      firstname: firstname,
      lastname: lastname,
      section: section,
      email: email,
      password: password,
    };

    const status = await signupAPI(data);
    status && navigate("/login"); // after creating redirect to login page.
  };

  return (
    <body>
      <div className="student-r-container">
        <div className="student-r-wrapper">
          <div className="student-r-head">
            <h2>Student Register</h2>
            <p>_______</p>
          </div>

          <span style={{ fontSize: "13px", color: "red" }}>{response}</span>

          <div className="student-r-input">
            <div className="firstsec">
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="lastsec">
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="sectionsec">
              <input
                type="text"
                placeholder="Section"
                onChange={(e) => setSection(e.target.value)}
              />
            </div>
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

          <div className="student-r-button">
            <button onClick={studentSignup}>Confirm Register</button>
          </div>

          <div className="back-to-login">
            <Link style={{ color: "lightgreen" }} to={"/login"}>
              Back
            </Link>
          </div>
        </div>
      </div>
    </body>
  );
};
