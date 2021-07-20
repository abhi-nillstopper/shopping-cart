import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
});

const User = mongoose.model("Users", UserSchema);
export default User;