// import userModel from "../../db/schema/userModel.js";

import userModel from "../../db/schema/userModel.js";

const findUserDataById = (findBy, findData) => {
  let yourKeyVariable = `${findBy}`;
  const query = {
    [yourKeyVariable]: findData,
  };
  return userModel
    .findOne(query)
    .exec()
    .then((employees) => {
      return employees;
    })
    .catch((err) => {
      return "error occured";
    });
};

export default findUserDataById;
