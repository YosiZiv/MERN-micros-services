import { clear, log } from "console";
import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreateListener } from "./events/ticket-created-listener";
clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  log("Listener connect to nats");
  stan.on("close", () => {
    log("Nats connection closed!");
    process.exit();
  });
  new TicketCreateListener(stan).listen();
});
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
