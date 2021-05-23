const { Kafka } = require("kafkajs");
const groupId = process.argv[2] || "test";
async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["192.168.0.10:9092"],
    });
    const consumer = kafka.consumer({ groupId: groupId });
    console.log("Connecting to Kafka Consumer");
    await consumer.connect();
    console.log("Successfully Connected");
    consumer.subscribe({ topic: "Users", fromBeginning: true });
    consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received Message ${result.message.value} from Partition ${result.partition} for topic ${result.topic} `
        );
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
  }
}
run();
