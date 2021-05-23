const { Kafka } = require("kafkajs");
const msg = process.argv[2];
async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["192.168.0.10:9092"],
    });
    const producer = kafka.producer();
    console.log("Connecting to Kafka producer");
    await producer.connect();
    console.log("Successfully Connected");
    const partition = msg[0] < "n" ? 0 : 1;
    const result = await producer.send({
      topic: "Users",
      messages: [{ value: msg, partition: partition }],
    });
    console.log(`Message Sent Successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
    console.log("Disconnected from admin Server");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
}
run();
