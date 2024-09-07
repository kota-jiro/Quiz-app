import { useContext, useState } from "react";
import "../css/Add.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export const Add = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const [title, setTitle] = useState("");

  const [response, setResponse] = useState("");

  const adddTodoAPI = async (newTodo) => {
    try {
      await axios.post(
        "https://apex.oracle.com/pls/apex/josh_mp_workspace/todo/Todo",
        newTodo
      );
      return true;
    } catch (err) {
      setResponse(err.response.data.message);
      return;
    }
  };

  const handleAddtodo = async () => {
    const data = {
      createdBy: userData.account_id,
      title: title
    }
    const status = await adddTodoAPI(data);
    status && navigate("/home");
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row justify-content-center ">
        <div className="col-5 text-white ">
          <div className="add-container text-center ">
            <div className="add-task-container overflow-auto">
              <p style={{color:"black"}}>ID: {userData.account_id}</p>
              <div className="row justify-content-center ">
                <div className="col-7 mt-4 ">
                  <p className="text-danger fw-bold">{response}</p>
                  <input
                    className="add-input w-100"
                    type="text"
                    placeholder="Add:"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-7 mt-4">
                  <button className="btn-add w-100" onClick={handleAddtodo}>
                    Add
                  </button>
                </div>
              </div>
            </div>
            <i
              onClick={() => navigate("/home")}
              className="btn-return bi bi-arrow-return-left"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};
