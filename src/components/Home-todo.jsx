import { useContext } from "react";
import "../css/Home-todo.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const navigate = useNavigate();
  const { userData, setUpdateTitle, setUpdateId, updateStatus, setUpdateStatus } = useContext(AppContext);

  const getTodoAPI = async () => {
    try {
      const data = await axios.get(
        `https://apex.oracle.com/pls/apex/josh_mp_workspace/todo/Todos/${userData.account_id}`
      );
      return data.data.items;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const statusAPI = async (newStatus) => {
    try {
      await axios.put(
        `https://apex.oracle.com/pls/apex/josh_mp_workspace/todo/Todo/status/${updateStatus}`,
        newStatus
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  };
  const data = useQuery({
    queryKey: ["todos"],
    queryFn: getTodoAPI,
    refetchInterval: 1000
  });

  const toUpdate = (todoId, title) => {
    setUpdateId(todoId);
    setUpdateTitle(title)
    navigate("/update");
  };
  const handleStatus = async (status, todo_id) => {
    setUpdateStatus(todo_id);
    if(status === 0){
      const data = {
        status: true
      }
      const status = await statusAPI(data);
      status && navigate("/home");
    } else if( status === 1 ) {
      const data = {
        status: false
      }
      const status = await statusAPI(data);
      status && navigate("/home");
    }
  };
  return (
    <div className="container">
      <span>ID: {userData.account_id}</span>
      {data.isLoading && <h1>Loading...</h1>}
      {data.data?.map((d) => {
        if (d.status === 0) {
          return (
            <div className="row justify-content-center">
              <div
                className="todo-task col-10"
                onClick={() => toUpdate(d.todo_id, d.title)}
              >
                {d.title}
              </div>
              <div className="col-1 pt-3">
                <i
                  className="task-checkbox bi bi-clipboard2-check"
                  onClick={() => handleStatus(d.status, d.todo_id)}
                ></i>
              </div>
            </div>
          );
        }
        return (
          <div className="row justify-content-center">
            <div
              className="task-finished todo-task col-10"
              onClick={() => toUpdate(d.todo_id, d.title)}
            >
              {d.title}
            </div>
            <div className="col-1 pt-3">
              <i
                className="checkbox-finish task-checkbox bi bi-clipboard2-check"
                onClick={() => handleStatus(d.status, d.todo_id)}
              ></i>
            </div>
          </div>
        );
      })}
      <i
        onClick={() => navigate("/add")}
        className="btn-add-task bi bi-plus-circle-fill"
      ></i>
      <i
        onClick={() => navigate("/")}
        className="btn-logout bi bi-box-arrow-in-left"
      ></i>
      
    </div>
  );
};
