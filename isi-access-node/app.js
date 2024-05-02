const express = require("express");
const sdk = require("node-appwrite");
const cors = require("cors");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cors({ origin: "*" }));

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66317412002e821ec18e")
  .setKey(
    "df0e4aaa5e94e663b299ed6ff8c1642f68f1bfa76c28c9f3a46d815bacb721f0b395b9daa4d74a51174d3377344738fb1db825a6d2ab674e32f08f9d7f6514b73a08efbbd52fbef501ad0cb33272c28417dc7ca4881e0493a23919e35120fab6642b4c2bc26d73fa800cd3b0112b660aec12bdc633537868bcee4cb131c0972b"
  );

const messaging = new sdk.Messaging(client);

app.post("/", async (req, res) => {
  const { creator, title } = req.body;
  const message = await messaging.createSms(
    sdk.ID.unique(),
    `${creator} has created a new post with the title ${title}! Open our application to see more details.`,
    ["6633ef69002e40697ae9"]
  );

  res.send({ message: "Message sent successfully", messageId: message.$id });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
