export const getIsProduction = () => {
    return process.env.NODE_ENV === 'production'
}
