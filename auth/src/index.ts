import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
const app = express();

app.use(json());
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.get("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

(async () => {
  try {
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
