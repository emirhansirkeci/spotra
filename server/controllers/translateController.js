import translate from "bing-translate-api";

export const handleTranslationRequest = (req, res) => {
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
};
