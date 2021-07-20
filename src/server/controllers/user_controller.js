import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const UserController = {
  async CreateUser(req, res) {
    try {
      const { firstName, lastName, password, email } = req.body;

      const existentUser = await User.find({ email });

      if (existentUser.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await User.create({
          firstName,
          lastName,
          password: hashedPassword,
          email,
        });

        newUser = newUser.toObject();
        delete newUser["password"];

        return jwt.sign(newUser, process.env.TOKEN_SECRET, (err, token) => {
          if (!err) {
            return res.status(200).json({ user: token, user_id: newUser._id });
          }
        });
      }

      return res
        .status(200)
        .json({ message: "Email already exist!! please login" });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Error while registerering user" });
    }
  },

  async authenticateUser(req, res) {
    try {
      const { password, email } = req.body;
      if (!password && !email) {
        return res.status(200).json({ message: "Required field not present" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(200).json({
          message: "User not found! Do you want to register instead?",
        });
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const userResponse = {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        return jwt.sign(
          { user: userResponse },
          process.env.TOKEN_SECRET,
          (err, token) => {
            if (!err) {
              res.json({ user: token, user_id: userResponse._id });
            }
          }
        );
        // return res.json(userResponse);
      } else {
        return res
          .status(200)
          .json({ message: "email or password doesn't match!" });
      }
    } catch (err) {
      console.log("err", err);
      return res
        .status(400)
        .json({ message: `error while authenticating the user ${err}` });

      // throw Error();
    }
  },
};

export default UserController;
