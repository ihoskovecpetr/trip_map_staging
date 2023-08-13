const { fetchAndTransformDataPrintful } = require('pages/api/library/fetchAndTransformDataPrintfulX')

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            const { variantIdsArr, currency } = req.body

            try {
                const finalResult = await fetchAndTransformDataPrintful(variantIdsArr, currency)
                res.status(200).json({
                    finalResult
                })
            } catch (e) {
                console.error('data-printful Error: ', { message: e.message })
                res.status(400).json({
                    message: e.message
                })
            }

            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
}
