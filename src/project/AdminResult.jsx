import { useNavigate } from "react-router-dom";
import "../project css/AdminResult.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const AdminResult = () => {
  let navigate = useNavigate();

  const getResult = async () => {
    try {
      const data = await axios.get(
        `https://apex.oracle.com/pls/apex/josh_mp_workspace/result/getresult`
      );
      return data.data.items;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const deleteResult = (id) => {
    try {
      axios.delete(
        `https://apex.oracle.com/pls/apex/josh_mp_workspace/result/result/${id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const data = useQuery({
    queryKey: ["query"],
    queryFn: getResult,
    refetchInterval: 500,
  });

  const question = async () => {
    navigate("/admin");
  };
  const logout = async () => {
    navigate("/");
  };

  return (
    <body>
      <div className="admin-r-container">
        <div className="admin-r-wrapper">
          <div className="admin-r-button">
            <div className="admin-r-button-1">
              <button onClick={question}>Question</button>
            </div>
            <div className="admin-r-button-2">
              <button>Result</button>
            </div>
          </div>

          <table className="table-result">
            <thead>
              <tr>
                <th>Result ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Section</th>
                <th>Date Taken</th>
                <th>Action</th>
              </tr>
            </thead>
            {data.data?.map((j) => {
              if (j.result_id !== 0) {
                return (
                  <tbody>
                    <tr>
                      <td>{j.result_id}</td>
                      <td>{j.firstname}</td>
                      <td>{j.lastname}</td>
                      <td>{j.section}</td>
                      <td>{j.date_taken}</td>
                      <td className="td-r-button">
                        <button onClick={() => deleteResult(j.result_id)}>
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
