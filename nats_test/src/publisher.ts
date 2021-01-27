import nats from "node-nats-streaming";

console.clear();
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("publisher connect to nats");
  const data = JSON.stringify({
    id: "123",
    title: "product",
    price: 20,
  });

  stan.publish("ticket:create", data, () => {
    console.log("Event publish");
  });
});
