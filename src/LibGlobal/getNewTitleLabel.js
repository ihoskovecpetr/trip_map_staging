export const getNewTitleLabel = place_name => {
    const preSplitArr = place_name.split(',')
    const placeNameArr = preSplitArr[0].split(' ')
    const newArr = [placeNameArr[0], placeNameArr[1], placeNameArr[2]]

    return newArr.join(' ')
}
