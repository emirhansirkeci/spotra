const express = require("express");
const cors = require("cors");

const translate = require("bing-translate-api");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.post("/translate", async (req, res) => {
  let { text, translateFrom, translateTo } = req.body;

  if (!text || !text.trim())
    return res.status(400).json({
      code: 400,
      message: "Invalid request. Please provide a valid text parameter.",
    });

  if (!translateTo)
    return res.status(400).json({
      code: 400,
      message:
        "Invalid request. Please provide a valid target langauge parameter.",
    });

  try {
    translate
      .translate(
        text,
        translateFrom == "auto" ? null : translateFrom,
        translateTo
      )
      .then((response) => {
        const formattedResult =
          response.translation.charAt(0).toUpperCase() +
          response.translation.slice(1).toLowerCase();

        res.json({
          source: translateFrom,
          target: translateTo,
          text,
          result: formattedResult,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error("Error fetching data.", err.message);

    res.status(500).json({
      code: 500,
      message: "Internal Server Error. Failed to fetch data.",
    });
  }
});

app.use("*", (req, res) => {
  res.status(400).json({
    code: 400,
    message: "Invalid request.",
    endpoints: ["/translate"],
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}.`);
});
