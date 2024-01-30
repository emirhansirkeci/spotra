export const notFound = (req, res) => {
  res.status(404).json({
    code: 404,
    message: "Invalid request.",
    endpoints: {
      "/translate": {
        methodsAllowed: ["POST"],
      },
    },
  });
};
