import "../project css/Home.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { Prev } from "react-bootstrap/esm/PageItem";

export const Home = () => {
  let navigate = useNavigate();

  const { correct_answer, setCorrectAnswer } = useContext(AppContext);
  const [lock, setLock] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [section, setSection] = useState("");
  const [response, setResponse] = useState("");

  const openAll = () => {
    setLock(true);
  };
  const openSubmit = (answer) => {
    if (answer === correct_answer) {
      setScore((prev) => prev + 1);
      alert("Submitted");
    } else {
      alert("Submitted");
    }
  };

  const close = () => {
    setSubmit(false);
    setLock(false);
    setAnswer(false);
  };

  const getAPI = async () => {
    try {
      const data = await axios.get(
        `https://apex.oracle.com/pls/apex/josh_mp_workspace/quiz/getquiz`
      );
      return data.data.items;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const data = useQuery({
    queryKey: ["query"],
    queryFn: getAPI,
    refetchInterval: 500,
  });

  const addResultAPI = async (newResult) => {
    try {
      await axios.post(
        "https://apex.oracle.com/pls/apex/josh_mp_workspace/result/result",
        newResult
      );
      return true;
    } catch (err) {
      setResponse(err.response.data.message);
      return;
    }
  };
  const addResult = async () => {
    const data = {
      firstname: firstname,
      lastname: lastname,
      section: section,
    };
    const status = await addResultAPI(data);
    status && setAnswer(true);
  };

  const logout = async () => {
    navigate("/");
  };

  return (
    <body>
      <div className="student-quiz-container">
        <div className="student-quiz-wrapper">
          <div className="student-quiz-head">
            <h2>Quiz</h2>
            <p>_______</p>
            <span>Instruction: Write the Letter Only.</span>
          </div>

          <span></span>

          {data?.data?.map((j) => {
            console.log(j);
            if (j.quiz_id !== 0) {
              return (
                <div className="questionaire">
                  <br />
                  <hr />
                  <br />
                  <h4>
                    {j.quiz_id}. {j.question}
                  </h4>
                  <ul>
                    <li className="student-label">A. {j.option_a} </li>
                    <li className="student-label">B. {j.option_b}</li>
                    <li className="student-label">C. {j.option_c}</li>
                    <li className="student-label">D. {j.option_d}</li>
                  </ul>

                  <label>Answer:</label>
                  <input
                    type="text"
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                  />

                  <div className="student-quiz-button">
                    <button onClick={() => openSubmit(j.correct_answer)}>
                      Submit
                    </button>
                  </div>
                  <div>
                    {j.quiz_id} of {data.data.length} questions
                  </div>
                </div>
              );
            }
          })}
          <br />
          <hr />
          <button onClick={openAll}>Submit All</button>

          <div className="logout">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      {lock && (
        <div className="submit-container">
          <div className="submit-wrapper">
            <div>
              <h2>
                Your Scored {score} out of {data.data.length}
              </h2>
              <hr />
              <span style={{ fontSize: "13px", color: "red" }}>{response}</span>

              <br />
              <label>First Name:</label>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
              <br />
              <label>Last Name:</label>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              <br />
              <label>Section:</label>
              <input type="text" onChange={(e) => setSection(e.target.value)} />
              <br />
              <br />
              <button onClick={addResult}>Save</button>
              <button onClick={close}>Close</button>
            </div>
          </div>
        </div>
      )}
      {answer && (
        <div className="studentr-container">
          <div className="studentr-wrapper">
            <h2>Correct Answers</h2>
            {data.data?.map((d) => {
              console.log(d);
              if (d.quiz_id !== 0)
                return (
                  <div>
                    <h3>
                      {d.quiz_id}. {d.correct_answer}
                    </h3>
                  </div>
                );
            })}
            <div>
              <button onClick={close}>Close</button>
            </div>
          </div>
        </div>
      )}
    </body>
  );
};
