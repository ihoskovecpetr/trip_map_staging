let promise = {}

const resetPendingPromise = () => {
    promise = {}
}

let count = 0

const getLazyDownloader = (getResult, getPromise, uniqueString = 'unique') => {
    return async () => {
        const result = getResult()

        count++

        if (result) {
            console.log('returning_result')

            promise = {}
            return result
        }

        if (promise[uniqueString]) {
            console.log('returning_existing_promisse')
            return promise[uniqueString]
        }

        console.log('returning_new_promisse')

        promise[uniqueString] = getPromise()
        return promise[uniqueString]
    }
}

module.exports = {
    getLazyDownloader,
    resetPendingPromise
}
