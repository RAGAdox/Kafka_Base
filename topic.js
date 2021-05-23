const { Kafka } = require("kafkajs");

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["192.168.0.10:9092"],
    });
    const admin = kafka.admin();
    console.log("Connecting to Kafka Admin");
    await admin.connect();
    console.log("Successfully Connected");
    console.log("Creating Topics");
    await admin.createTopics({
      topics: [
        {
          topic: "Users",
          numPartitions: 2,
        },
      ],
    });
    console.log("Successfully Created Topics");
    await admin.disconnect();
    console.log("Disconnected from admin Server");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
}
run();
