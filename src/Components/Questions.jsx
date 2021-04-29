import React, { useState, useEffect } from "react";

const Questions = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    let response = await fetch(
      "https://sqlassignmentapi.herokuapp.com/"
    ).then((res) => res.json());
    setData(response);
    setLoading(false);
  }, []);
  console.log(data);
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
      <br/>
      {data?.length === 0 && (
        <h4 className="text-center"> No Questions found</h4>
      )}
      {data?.map((item, i) => (
        <div className="border mx-2 my-5">
          <h4>
            {i + 1} . {item.name} | {item.rollNumber}
          </h4>
          <>
            {item.Questions.map((x, i) => (
              <div className="p-1 border">
                <p>
                  Question {i + 1} . {x.question}
                </p>
                <p>Ans.{x.question}</p>
                <p>Source : {x.source}</p>
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
