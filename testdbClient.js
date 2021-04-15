const gF = require('./generalFunctions')
const testData = require('./database/test-data.json')
/**
 * @param {Object} testData
 * @returns {Number} num
 */
exports.count = () => {
    const data = testData
    const count = Object.keys(data).length
    // console.log(testData)
    return count
}

/**
 * 
 * @param {Array} NumArray 
 * @returns {Array} ramdomDatas
 */
exports.getRamdomData = (NumArray) => {
    const ramdomDatas = []
    const dataArray = testData.slice()
    for(let i = 0; i < NumArray.length; i++){
        dataArray.forEach((object) => {
            if(Number(object.id) === NumArray[i]){
                ramdomDatas.push(object)
                return 
            }
        })
    }
    return ramdomDatas
}
