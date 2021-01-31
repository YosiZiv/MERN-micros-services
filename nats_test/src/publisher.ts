import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  const publisher = new TicketCreatedPublisher(stan);
  publisher.publish({
    id: "123",
    title: "product",
    price: 20,
  });
});
