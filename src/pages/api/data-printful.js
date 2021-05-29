const {
  fetchAndTransformDataPrintful,
} = require("./Lib/fetchAndTransformDataPrintful");

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      console.log("Hitting_data_printful");

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
