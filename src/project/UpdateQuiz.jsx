import "../project css/UpdateQuiz.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export const UpdateQuiz = () => {
  let navigate = useNavigate();

  const {
    quiz_id,
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
  } = useContext(AppContext);
  const [response, setResponse] = useState("");

  const EditQuiz = async (updatePost) => {
    try {
      await axios.put(
        `https://apex.oracle.com/pls/apex/josh_mp_workspace/quiz/quiz/${quiz_id}`,
        updatePost
      );
      return true;
    } catch (err) {
      setResponse(err.response.data.message);
      console.log(err);
      return;
    }
  };
  const handleUpdate = async () => {
    const data = {
      question: question,
      optionA: option_a,
      optionB: option_b,
      optionC: option_c,
      optionD: option_d,
      answer: correct_answer,
    };
    const status = await EditQuiz(data);
    status && navigate("/admin");
  };

  return (
    <body>
      <div className="updateq-container">
        <div className="updateq-wrapper">
          <div className="updateq-head">
            <h2>Edit Quiz</h2>
            <p>_______</p>
          </div>

          <div className="updateq-body">
            <label>Quiz ID:</label>
            <span>{quiz_id}</span>
          </div>

          <span style={{ fontSize: "13px", color: "red" }}>{response}</span>

          <div className="updateq-input">
            <div className="question">
              <label>Question:</label>
              <input
                type="text"
                defaultValue={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="option-a">
              <label>Option A:</label>
              <input
                type="text"
                defaultValue={option_a}
                onChange={(e) => setOptionA(e.target.value)}
              />
            </div>
            <div className="option-b">
              <label>Option B:</label>
              <input
                type="text"
                defaultValue={option_b}
                onChange={(e) => setOptionB(e.target.value)}
              />
            </div>
            <div className="option-c">
              <label>Option C:</label>
              <input
                type="text"
                defaultValue={option_c}
                onChange={(e) => setOptionC(e.target.value)}
              />
            </div>
            <div className="option-d">
              <label>Option D:</label>
              <input
                type="text"
                defaultValue={option_d}
                onChange={(e) => setOptionD(e.target.value)}
              />
            </div>
            <div className="correct-answer">
              <label>Correct Answer (Letter):</label>
              <input
                type="text"
                defaultValue={correct_answer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
            </div>
          </div>

          <div className="updateq-button">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => navigate("/admin")}>Cancel</button>
          </div>
        </div>
      </div>
    </body>
  );
};
