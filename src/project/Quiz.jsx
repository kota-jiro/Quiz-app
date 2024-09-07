import { useNavigate } from "react-router-dom";
import "../project css/Quiz.css";

export const Quiz = () => {
  let navigate = useNavigate();

  const login = async () => {
    navigate("/login");
  };
  const teacherlogin = async () => {
    navigate("/teacherlogin");
  };

  return (
    <body>
      <div className="container">
        <h1>Quiz App</h1>
        <h5>_______________</h5>
        <div className="class">
          <div className="select">
            <h3>Select user type</h3>
          </div>
          <div className="users">
            <button onClick={login}>Student</button>
            <button onClick={teacherlogin}>Teacher</button>
          </div>
        </div>
      </div>
    </body>
  );
};
