const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

// REQUIRED for Render to get real IP
app.set("trust proxy", true);

app.use(cors());
app.use(express.json());

const blockedIPs = [];

const WEBHOOK_URL = process.env.WEBHOOK_URL; // safer

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const PORT = process.env.PORT || 3000;

// Test route so you don't see Cannot GET
app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.post("/report", async (req, res) => {
  console.log("Report route triggered");

  const time = Date.now()
  const formattedTime = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

  const { name, issue, contact } = req.body;
  const userIP = req.ip;

  console.log("IP:", userIP);

  if (!name || !issue || !contact) {
    return res.status(400).send("Missing fields.");
  }

  if (blockedIPs.includes(userIP)) {
    return res.status(403).send("You are blocked.");
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



