import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    rollNumber: "",
  });
  const [value, setValue] = useState(false);
  const [Questions, setQuestions] = useState([
    { question: "", source: "", solution: "" },
  ]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submit = async () => {
    setLoading(true);
    const { name, email, rollNumber } = data;
    if (
      data.name.length > 0 &&
      data.email.length > 0 &&
      data.rollNumber.length > 0 &&
      Questions.length != 0
    ) {
      const payload = { name, email, rollNumber, Questions };
      console.log(payload);
      let response = await fetch(
        "https://sqlassignmentapi.herokuapp.com/upload",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
      console.log(response);
      toast(response.message);
      setValue(true);
    } else {
      toast.error("All fields are required");
    }
    setLoading(false);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...Questions];
    list[index][name] = value;
    setQuestions(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...Questions];
    list.splice(index, 1);
    setQuestions(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setQuestions([...Questions, { question: "", source: "", solution: "" }]);
  };
  if (value) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container p-5">
      <ToastContainer />
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            value={data.email}
            name="email"
            required
            onChange={handleChange}
            placeholder="Johndoe@gmail.com"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Full Name
          </label>
          <input
            type="name"
            required
            onChange={handleChange}
            value={data.name}
            name="name"
            placeholder="John Doe"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Roll No
          </label>
          <input
            type="name"
            onChange={handleChange}
            value={data.rollNumber}
            name="rollNumber"
            required
            placeholder="e.g. IC-2k19-94"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3 border py-5 px-1">
          <h3>Note : </h3>
          <ul>
            <li>You can Submit This form Only Once .</li>
            <li>You can submit max 10 questions . </li>
            <li>
              No Questions should be Repeated . See the question list before
              filling this form <Link to="/">Click here</Link>
            </li>
          </ul>
          {Questions.map((item, i) => {
            return (
              <>
                <label for="exampleInputPassword1" class="form-label">
                  Question : {i + 1}
                </label>
                <textarea
                  type="name"
                  required
                  onChange={(e) => handleInputChange(e, i)}
                  value={item.question}
                  name="question"
                  class="form-control"
                  id="exampleInputPassword1"
                />
                <label for="exampleInputPassword1" class="form-label">
                  Solution
                </label>
                <textarea
                  type="name"
                  required
                  onChange={(e) => handleInputChange(e, i)}
                  value={item.solution}
                  name="solution"
                  class="form-control"
                  id="exampleInputPassword1"
                />
                <label for="exampleInputPassword1" class="form-label">
                  Source
                </label>
                <input
                  type="name"
                  required
                  onChange={(e) => handleInputChange(e, i)}
                  value={item.source}
                  name="source"
                  class="form-control"
                  id="exampleInputPassword1"
                />
                <div className="d-flex justify-content-end m-2">
                  {Questions.length !== 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveClick(i)}
                      className="btn m-2 btn-danger"
                    >
                      Remove Question
                    </button>
                  )}
                  {Questions.length - 1 === i && i + 1 != 10 && (
                    <button
                      type="button"
                      onClick={handleAddClick}
                      className="btn m-2 btn-success"
                    >
                      Add More Question
                    </button>
                  )}
                </div>
              </>
            );
          })}
        </div>
        <button onClick={submit} type="button" class="btn btn-primary">
          Submit{" "}
          {loading && (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default Upload;
