import { useNavigate } from "react-router-dom";
import "../project css/AddQuestion.css";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";

export const AddQuestion = () => {
  let navigate = useNavigate();

  const {
    quiz_id,
    setQuizID,
    question,
    setQuestion,
    option_a,
    setOptionA,
    option_b,
    setOptionB,
    option_c,
    setOptionC,
    option_d,
    setOptionD,
    correct_answer,
    setCorrectAnswer,
    created_by,
    setCreatedBy,
  } = useContext(AppContext);

  const [response, setResponse] = useState("");

  const addQuizAPI = async (newQuiz) => {
    try {
      await axios.post(
        "https://apex.oracle.com/pls/apex/josh_mp_workspace/quiz/addquiz",
        newQuiz
      );
      return true;
    } catch (err) {
      setResponse(err.response.data.message);
      return;
    }
  };
  const addQuiz = async () => {
    const data = {
      quizId: quiz_id,
      question: question,
      optionA: option_a,
      optionB: option_b,
      optionC: option_c,
      optionD: option_d,
      answer: correct_answer,
      createdBy: created_by,
    };
    const status = await addQuizAPI(data);
    status && navigate("/admin");
  };

  const admin = () => {
    navigate("/admin");
  };
  return (
    <body>
      <div className="addq-container">
        <div className="addq-wrapper">
          <div className="addq-head">
            <h2>Add Questions</h2>
            <p>_______</p>
          </div>
          <hr />

          <span style={{ fontSize: "13px", color: "red" }}>{response}</span>

          <div className="addq-input">
            <div className="addq-question">
              <label>Quiz ID:</label>
              <br />
              <input
                type="number"
                onChange={(e) => setQuizID(e.target.value)}
              />
            </div>
            <div className="addq-question">
              <label>Question:</label>
              <br />
              <input
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <hr />
            <div className="addq-choices">
              <label>Option A:</label>
              <br />
              <input type="text" onChange={(e) => setOptionA(e.target.value)} />
            </div>
            <div className="addq-choices">
              <label>Option B:</label>
              <br />
              <input type="text" onChange={(e) => setOptionB(e.target.value)} />
            </div>
            <div className="addq-choices">
              <label>Option C:</label>
              <br />
              <input type="text" onChange={(e) => setOptionC(e.target.value)} />
            </div>
            <div className="addq-choices">
              <label>Option D:</label>
              <br />
              <input type="text" onChange={(e) => setOptionD(e.target.value)} />
            </div>
            <hr />
            <div className="addq-answer">
              <label>Correct Answer (Letter):</label>
              <br />
              <input
                type="text"
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
            </div>
            <div className="addq-createdby">
              <label>Created By (Teacher Last Name):</label>
              <br />
              <input
                type="text"
                onChange={(e) => setCreatedBy(e.target.value)}
              />
            </div>
          </div>

          <div className="addq-button">
            <button onClick={admin}>Close</button>
            <button onClick={addQuiz}>Save Changes</button>
          </div>
        </div>
      </div>
    </body>
  );
};
