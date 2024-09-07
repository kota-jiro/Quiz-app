import { useNavigate } from "react-router-dom";
import "../css/Update.css";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

export const Update = () => {
  const navigate = useNavigate();
  const { updateId, updateTitle, setUpdateTitle } = useContext(AppContext);
  const updateTask = async (updatePost) => {
    try {
      await axios.put(
        `https://apex.oracle.com/pls/apex/josh_mp_workspace/todo/Todo/${updateId}`,
        updatePost
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTask = async () => {
    try {
      axios.delete(
        `https://apex.oracle.com/pls/apex/josh_mp_workspace/todo/Todo/${updateId}`
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    const data = {
      title: updateTitle,
    };
    const status = await updateTask(data);
    status && navigate("/home");
  };
  const handleDelete = async () => {
    const status = await deleteTask();
    status && navigate("/home");
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row justify-content-center ">
        <div className="col-5 text-white ">
          <div className="update-container text-center ">
            <div className="update-task-container overflow-auto">
              <div className="row justify-content-center ">
                <div className="col-7 mt-4 ">
                  <input
                    id="update-input"
                    className="update-input w-100"
                    type="text"
                    placeholder="Update:"
                    defaultValue={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                  />
                </div>
                <div className="col-7 mt-4 ">
                  <button
                    className="btn-update-delete w-100"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
                <div className="col-7 mt-4 ">
                  <button
                    className="btn-update-delete w-100"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {updateId} :{updateTitle}
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
