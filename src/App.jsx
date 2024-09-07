import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Quiz } from "./project/Quiz";
import { Login } from "./project/Login";
import { Register } from "./project/Register";
import { TeacherLogin } from "./project/TeacherLogin";
import { TeacherRegister } from "./project/TeacherRegister";
import { Home } from "./project/Home";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Admin } from "./project/Admin";
import { AddQuestion } from "./project/AddQuestion";
import { AdminResult } from "./project/AdminResult";
import { UpdateQuiz } from "./project/UpdateQuiz";

export const AppContext = createContext();

function App() {
  const client = new QueryClient();

  const [usersData, setUsersData] = useState({});
  const [quiz_id, setQuizID] = useState("");
  const [option_a, setOptionA] = useState("");
  const [option_b, setOptionB] = useState("");
  const [option_c, setOptionC] = useState("");
  const [option_d, setOptionD] = useState("");
  const [correct_answer, setCorrectAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [created_by, setCreatedBy] = useState("");

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          usersData,
          setUsersData,
          quiz_id,
          setQuizID,
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
          question,
          setQuestion,
          created_by,
          setCreatedBy,
        }}
      >
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path="/" element={<Quiz />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/teacherlogin" element={<TeacherLogin />} />
              <Route path="/teacherregister" element={<TeacherRegister />} />
              <Route path="/home" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/add" element={<AddQuestion />} />
              <Route path="/adminresult" element={<AdminResult />} />
              <Route path="/updatequiz" element={<UpdateQuiz />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
