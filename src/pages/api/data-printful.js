const {
  fetchAndTransformDataPrintful,
} = require("./Lib/fetchAndTransformDataPrintful");

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      const { variantIdsArr } = req.body;
      try {
        const finalResult = await fetchAndTransformDataPrintful(
          variantIdsArr,
          res
        );
        res.status(200).json({
          finalResult,
        });
      } catch (e) {
        console.error("data-printful Error: ", { e });
        res.status(500).json({
          e,
        });
      }

      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
