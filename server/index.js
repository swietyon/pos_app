const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();
const port = 8080;
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Max-Age", "3600");
  next();
});

const spaceProofs = {};
const timeProofs = {};
const userActivity = {};

app.post("/generate-proof", async (req, res) => {
  const { userId, spaceSize, timeInterval } = req.body;

  if (!spaceProofs[userId] && !timeProofs[userId]) {
    const space = reserveSpace(spaceSize);
    const time = reserveTime(timeInterval);

    const spaceProof = generateProof(space);
    const timeProof = await generateTimeProof(time);

    spaceProofs[userId] = { space, spaceProof };
    timeProofs[userId] = { time, timeProof };

    if (!userActivity[userId]) {
      userActivity[userId] = 1;
    } else {
      userActivity[userId]++;
    }

    res.json({
      success: true,
      message: "Proof of Space and Time generated successfully",
      data: { spaceProof, timeProof, userActivity: userActivity[userId] },
    });
  } else {
    res.json({
      success: true,
      message: "Proof of Space and Time already generated",
      data: {
        spaceProof: spaceProofs[userId]?.spaceProof,
        timeProof: timeProofs[userId]?.timeProof,
        userActivity: userActivity[userId],
      },
    });
  }
});

app.get("/proof-of-space-result/:userId", (req, res) => {
  const userId = req.params.userId;

  const spaceProof = spaceProofs[userId];
  const timeProof = timeProofs[userId];

  if (spaceProof || timeProof) {
    res.json({
      success: true,
      data: {
        spaceProof: spaceProof?.spaceProof,
        timeProof: timeProof?.timeProof,
      },
    });
  } else {
    res.json({
      success: false,
      message: "No proof of space or time found for the user",
    });
  }
});

app.use((req, res, next) => {
  res.header("Access-Control-Max-Age", "3600");
  next();
});

function reserveSpace(size) {
  return crypto.randomBytes(size).toString("hex");
}

function generateProof(space) {
  const proofHash = crypto.createHash("sha256").update(space).digest("hex");
  return proofHash;
}

function reserveTime(interval) {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      console.log("Proof of Time tick");
    }, interval);

    setTimeout(() => {
      clearInterval(intervalId);
      resolve();
    }, 60000);
  });
}

async function generateTimeProof(time) {
  await time;
  return "AdvancedTimeProof456";
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
