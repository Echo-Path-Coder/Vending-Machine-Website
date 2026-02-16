const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

// Render to get real IP
app.set("trust proxy", true);

app.use(cors());
app.use(express.json());

const blockedIPs = [];

//Discord's webhook
const WEBHOOK_URL = process.env.WEBHOOK_URL; 

const SNACK_WEBHOOK = process.env.SNACK_WEBHOOK;

const QUESTION_WEBHOOK = process.env.QUESTION_WEBHOOK;

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const PORT = process.env.PORT || 3000;

// Test route 
app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.post("/report", async (req, res) => {
  console.log("Report route triggered");

  // Get the times needed
  const time = new Date()
  const formattedTime = `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`;


  const { name, issue, contact } = req.body;
  const userIP = req.ip;

  console.log("IP:", userIP);

  if (!name || !issue || !contact) {
    return res.status(400).send("Missing fields the input fields in Report Problem.");
  }

  if (blockedIPs.includes(userIP)) {
    return res.status(403).send("You are blocked");
  }

  try {
    fs.appendFileSync(
      "reports.txt",
`IP: ${userIP}
Time: ${formattedTime}
Name: ${name}
Issue: ${issue}
Contact: ${contact}
------------------\n`
    );

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content:
`🚨 New Vending Machine Report!
Time: ${formattedTime}
Name: ${name}
Issue: ${issue}
Contact: ${contact}`
      })
    });

    res.sendStatus(200);

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).send("Server error.");
  }
});

app.post("/snack", async (req, res) => {

  const { name, snackName, reason } = req.body;
  const userIP = req.ip;

  if (!snackName || !reason) {
    return res.status(400).send("Missing fields.");
  }

  try {

    await fetch(SNACK_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content:
`🍫 New Snack Suggestion

Snack: ${snackName}
Name: ${name}
Reason: ${reason}`
      })
    });

    res.sendStatus(200);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

app.post("/question", async (req, res) => {

  const { question, name, contact } = req.body;
  const userIP = req.ip;

  if (!question || !contact) {
    return res.status(400).send("Missing fields.");
  }

  try {

    await fetch(QUESTION_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content:
`❓ New Question!

Question: ${question}
Name: ${name}
Contact: ${contact}`
      })
    });

    res.sendStatus(200);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});













