// import userModal from "../../db/schema/userModal.js";

import userModal from "../../db/schema/userModal.js";

const findUserDataById = (findBy, findData) => {
  let yourKeyVariable = `${findBy}`;
  const query = {
    [yourKeyVariable]: findData,
  };
  return userModal
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
