const {
  fetchAndTransformDataPrintful,
} = require("./Lib/fetchAndTransformDataPrintful");

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      console.log("Hitting_data_printful");

      const { variantIdsArr } = req.body;

      const finalResult = await fetchAndTransformDataPrintful(
        variantIdsArr,
        res
      );

      res.status(200).json({
        finalResult,
      });

      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
