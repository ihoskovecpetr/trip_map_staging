import axios from 'axios'

import { createUploadRequest } from 'LibGlobal/createUploadRequest'
import { getScreenshot } from 'LibGlobal/getScreenshot'

export function useSendSaveBlueprint() {
    return async ({ map }) => {
        getScreenshot(map).then(result => {
            createUploadRequest(result, () => {}, axios)
        })
    }
}
