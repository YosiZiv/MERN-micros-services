import mongoose from "mongoose";
import { Password } from "../services/password";
// An interface that describe the properties
// that are required to create a new User

interface UserAttrs {
  username: string;
  email: string;
  password: string;
}

// An interface that describe the properties
// that a user model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describe the properties
// that a user document has

interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      max: 100,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 30,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
