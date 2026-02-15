const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());    
app.use(express.json());

const blockedIPs = []

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5,              // 5 requests per minute for each IP address
    message: "Too many reports. Please wait."
});

const WEBHOOK_URL = "https://discord.com/api/webhooks/1471721082003132609/WUEHz65AwlJE0Hz7_G5LIvWZ4-O4oRnH581MGiSdMEO4uTL1dbpCr4EggRitvKeYE0Gr";

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const PORT = process.env.PORT || 3000;

app.post("/report", async (req, res) => {

    const data = req.body;

    const userIP = req.ip;

    if (blockedIPs.includes(userIP)) {
        return res.status(403).send("You are blocked from using this website.");
    }
    
    //Save to file
    fs.appendFileSync(
        "reports.txt",
        `Name: ${data.name}
Issue: ${data.issue}
Contact: ${data.contact}
------------------\n`
    );

    //Send to Discord
    await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            content:
`🚨 New Vending Machine Report!

Name: ${data.name}
Issue: ${data.issue}
Contact: ${data.contact}`
        })
    });

    res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
