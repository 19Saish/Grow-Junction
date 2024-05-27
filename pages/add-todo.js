import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { createTodo } from "../src/graphql/mutations";
import { v4 as uuid } from "uuid";

const AddTodo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const submitHandler = async (e) => {
    const id = uuid();
    e.preventDefault();
    await API.graphql({
      query: createTodo,
      variables: { input: { name, description, id } },
    });
    console.log("success");
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={nameChangeHandler} />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={descriptionChangeHandler}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default withAuthenticator(AddTodo);
