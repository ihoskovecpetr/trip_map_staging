import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { VARIANTS_PRINTFUL } from 'constants/constants'

import { getLazyDownloader } from 'LibGlobal/getLazyDownloader'
import { useProductSelector } from 'redux/order/reducer'
import { useGetCurrency } from 'Hooks/useGetCurrency'

let cachedResponse = {}

const fetchDataPrintful = async (variantIdsArr, currency) => {
    const resp = await axios.post(`api/data-printful`, {
        variantIdsArr,
        currency
    })

    return resp
}

export function useGetDataPrintful() {
    const [data, setData] = useState(null)
    const { locale } = useRouter()
    const currency = useGetCurrency()

    const variantIdsArr = VARIANTS_PRINTFUL.map(variant => variant.id)

    const getSetPrice = async () => {
        try {
            const lazyDownloadDataPrintfull = () => {
                return getLazyDownloader(
                    () => cachedResponse[currency],
                    () => fetchDataPrintful(variantIdsArr, currency),
                    currency
                )()
            }
            const response = await lazyDownloadDataPrintfull()

            cachedResponse = { [locale]: response, ...cachedResponse }

            setData(response.data.finalResult)
        } catch (e) {
            console.log({ getSetPrice_error: 'e' })
        }
    }

    useEffect(() => {
        setData(null)
        getSetPrice()
    }, [JSON.stringify(variantIdsArr), currency])

    const data_memo = useMemo(() => {
        return data
    }, [data])

    return { dataPrintful: data_memo }
}
