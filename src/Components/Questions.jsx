import React, { useState, useEffect } from "react";

const Questions = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState();
  useEffect(async () => {
    setLoading(true);
    let response = await fetch(
      "https://sqlassignmentapi.herokuapp.com/"
    ).then((res) => res.json());
    setData(response);
    setLoading(false);
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Students Questions List</h2>
      <div className="text-center">
        {loading && (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <br />
      {data?.length === 0 && (
        <h4 className="text-center"> No Questions found</h4>
      )}
      <button
        type="button"
        class="btn btn-primary noprint"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Student List
      </button>
      {data?.map((item, i) => (
        <div className="border mx-2 p-1 my-5">
          <h4 class="noprint">
            {i + 1} .<span className="text-danger"> Name : {item.name}</span>{" "}
            <br /> &nbsp; &nbsp;&nbsp; Roll Number : {item.rollNumber} <br />{" "}
            &nbsp; &nbsp;&nbsp; Date : {new Date(item.createdAt).toDateString()}
          </h4>
          <>
            {item.Questions.map((x, i) => (
              <div className="p-1 border">
                <h6 className="text-danger">
                  Question {i + 1} . {x.question}
                </h6>
                <p>Ans.{x.solution}</p>
                <p className="text-primary word-wrap">
                  Source :{" "}
                  <a href={`${x.source}`} target="_blank">
                    {x.source}
                  </a>
                </p>
              </div>
            ))}
          </>
        </div>
      ))}
      {data?.length != 0 && (
        <button className="btn btn-success noprint " onClick={window.print}>
          Print
        </button>
      )}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Student List (submitted assignment)
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table className="table">
                <thead>
                  <th>Student Name</th>
                  <th>Student Roll Number</th>
                </thead>
                <tbody>
                  {data?.map((item) => (
                    <tr>
                      <td>{item.name}</td> 
                      <td>{item.rollNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
