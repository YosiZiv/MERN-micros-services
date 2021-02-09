import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
(async () => {
  if (
    !process.env.JWT_KEY ||
    !process.env.MONGO_URI ||
    !process.env.NATS_URL ||
    !process.env.NATS_CLUSTER_ID ||
    !process.env.NATS_CLIENT_ID
  ) {
    throw new Error("ENV are missing");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection close!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Starting...");
    console.log("Listening on port 3000!!!!!!!!");
  });
})();
