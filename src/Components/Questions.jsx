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
      {filter?.map((item) => (
        <h4>Questions Available : {item.question}</h4>
      ))}
      {data?.map((item, i) => (
        <div className="border mx-2 p-1 my-5">
          <h4>
            {i + 1} . Name : {item.name} <br /> &nbsp; &nbsp;&nbsp; Roll Number
            : {item.rollNumber} <br /> &nbsp; &nbsp;&nbsp; Date :{" "}
            {new Date(item.createdAt).toDateString()}
          </h4>
          <>
            {item.Questions.map((x, i) => (
              <div className="p-1 border">
                <h6>
                  Question {i + 1} . {x.question}
                </h6>
                <p>Ans.{x.question}</p>
                <h6>Source : {x.source}</h6>
              </div>
            ))}
          </>
        </div>
      ))}
      {data?.length != 0 && (
        <button className="btn btn-success " onClick={window.print}>
          Print
        </button>
      )}
    </div>
  );
};

export default Questions;
