const getNewTitleSubtitle = (result1, result2) => {
    const placeNameArr1 = result1.place_name.split(',')
    const subtitle1 = placeNameArr1[placeNameArr1.length - 1]?.trim()

    const newTitle1 = placeNameArr1[0]
    const newSubTitle1 = subtitle1 ? `— ${subtitle1} —` : ''

    if (!result2) {
        return { title: newTitle1, subtitle: newSubTitle1 }
    } else {
        const placeNameArr2 = result2.place_name.split(',')
        const subtitle2 = placeNameArr2[placeNameArr2.length - 1]?.trim()
        const newTitle2 = `${newTitle1} - ${placeNameArr2[0]}`
        const newSubTitle2 = subtitle1 && subtitle2 ? `— ${subtitle1}, ${subtitle2} —` : ''

        return { title: newTitle2, subtitle: newSubTitle2 }
    }
}

module.exports = {
    getNewTitleSubtitle
}
