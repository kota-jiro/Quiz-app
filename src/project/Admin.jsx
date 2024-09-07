import { useNavigate } from "react-router-dom";
import "../project css/Admin.css";
import { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../App";

export const Admin = () => {
  let navigate = useNavigate();

  const {
    quiz_id,
    setQuizID,
    setQuestion,
    setOptionA,
    setOptionB,
    setOptionC,
    setOptionD,
    setCorrectAnswer,
    setCreatedBy,
  } = useContext(AppContext);

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
  const deleteQuiz = (id) => {
    try {
      axios.delete(
        `https://apex.oracle.com/pls/apex/josh_mp_workspace/quiz/quiz/${id}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  const data = useQuery({
    queryKey: ["query"],
    queryFn: getAPI,
    refetchInterval: 500,
  });
  const toUpdate = (
    quiz_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    created_by
  ) => {
    setQuizID(quiz_id);
    setQuestion(question);
    setOptionA(option_a);
    setOptionB(option_b);
    setOptionC(option_c);
    setOptionD(option_d);
    setCorrectAnswer(correct_answer);
    setCreatedBy(created_by);
    navigate("/updatequiz");
  };

  const addquestion = async () => {
    navigate("/add");
  };
  const result = async () => {
    navigate("/adminresult");
  };
  const logout = async () => {
    navigate("/");
  };

  return (
    <body>
      <div className="admin-container">
        <div className="admin-wrapper">
          {data.isLoading && <h1>Loading...</h1>}
          <div className="admin-button">
            <div className="admin-button-1">
              <button>Question</button>
            </div>
            <div className="admin-button-2">
              <button onClick={result}>Result</button>
            </div>
          </div>

          <div className="add-button">
            <button onClick={addquestion}>Add Question</button>
          </div>

          <table>
            <thead>
              <tr className="tr-head">
                <th className="th-quiz-id">Quiz ID</th>
                <th className="th-question">Question</th>
                <th className="th-option">Option A</th>
                <th className="th-option">Option B</th>
                <th className="th-option">Option C</th>
                <th className="th-option">Option D</th>
                <th className="th-answer">Correct Answer (Letter)</th>
                <th className="th-createdby">CreatedBy</th>
                <th className="th-action">Action</th>
              </tr>
            </thead>
            {data.data?.map((j) => {
              if (j.quiz_id !== 0) {
                return (
                  <tbody>
                    <tr className="tr-body">
                      <td className="td-quiz-id">{j.quiz_id}</td>
                      <td className="td-question">{j.question}</td>
                      <td className="td-option">{j.option_a}</td>
                      <td className="td-option">{j.option_b}</td>
                      <td className="td-option">{j.option_c}</td>
                      <td className="td-option">{j.option_d}</td>
                      <td className="td-answer">{j.correct_answer}</td>
                      <td className="td-createdby">{j.created_by}</td>
                      <td className="td-button">
                        <button
                          onClick={() =>
                            toUpdate(
                              j.quiz_id,
                              j.question,
                              j.option_a,
                              j.option_b,
                              j.option_c,
                              j.option_d,
                              j.correct_answer,
                              j.created_by
                            )
                          }
                        >
                          Edit
                        </button>
                        <button onClick={() => deleteQuiz(j.quiz_id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              }
            })}
          </table>

          <div className="logout">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </body>
  );
};
