const mongoose = require('mongoose')
const FullStore = require('../../mongoModels/fullStore')

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            const { reduxStore, storeId } = req.body

            try {
                const updatedStore = await FullStore.findOneAndUpdate(
                    {
                        storeId: storeId
                    },
                    { ...reduxStore },
                    { new: true }
                )

                if (updatedStore) {
                    res.status(200).json({
                        ok: 'UPDATED',
                        storeId: storeId,
                        updatedStore
                    })
                } else {
                    res.status(203).json({
                        ok: 'NOT_UPDATED'
                    })
                }
            } catch (e) {
                console.error('save_redux_store Error: ', { e })
                res.status(500).json({
                    e
                })
            }

            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
}
