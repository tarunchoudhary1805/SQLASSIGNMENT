import React, { useState, useEffect } from "react";

const Questions = () => {
  const [data, setData] = useState();
  useEffect(async () => {
    let response = await fetch("https://sqlassignmentapi.herokuapp.com/").then((res) =>
      res.json()
    );
    setData(response);
  }, []);
  console.log(data);
  return (
    <div className="container">
      <h2 className="text-center">Students Questions List</h2>
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
    </div>
  );
};

export default Questions;
