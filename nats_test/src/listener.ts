import { clear } from "console";
import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connect to nats");
  const subscription = stan.subscribe("ticket:create");
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();
    typeof data === "string" &&
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
  });
});
