const bcrypt = require("bcrypt");
const mongooseUser = require("../models/user");

async function createUser(userParams) {
  const { username, email, password } = userParams;
  try {
    console.log(username, "aaa", email, "aaa", password);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new mongooseUser({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
    };
  } catch (e) {
    console.log(e);
    return false;
  }
}
async function getUser(userParams) {
  const { id } = userParams;
  try {
    const newUser = await mongooseUser.findById(id);
    return newUser;
  } catch (e) {
    console.log(e);
    return false;
  }
}
async function getUsers(userParams) {
  try {
    const newUser = await mongooseUser.find();
    return newUser;
  } catch (e) {
    console.log(e);
    return false;
  }
}
async function updateUser(userParams) {
  const id = userParams.id;
  const email = userParams.email;
  try {
    const user = await mongooseUser.findById(id);
    user.email = email;
    const userSave = await user.save();
    console.log(userSave);
    return userSave;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function deleteUser(userParams) {
  const id = userParams.id;
  try {
    const userDelete = await mongooseUser.findByIdAndDelete(id);
    return userDelete;
  } catch (e) {
    console.log(e);
    return false;
  }
}
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
};

//ind, findById, ve findByIdAndDelete Mongoose adlı kütüphaneye ait metodlardır ve MongoDB veritabanı ile çalışmak için kullanılır.
