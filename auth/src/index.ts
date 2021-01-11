import mongoose from "mongoose";
import { app } from "./app";
(async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("jwt_key must be defined");
    }
    await mongoose.connect("mongodb://auth-mongo-srv: 27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connect to mongoDB");
  } catch (err) {
    console.log(err);
  } finally {
    app.listen(3000, () => console.log("listening on port 3000!!!!!!"));
  }
})();
