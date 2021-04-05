/**
 * @param {*} maxNum 
 * @param {*} elementCount 
 * @returns {Array} ramdomNums
 */
 exports.getUniqueNums = (maxNum, elementOfNum) => {
    let ramdomNums = []
    for(let i = 0; i < elementOfNum; i++){
        const ramdom = Math.random() * (maxNum - 1) + 1;
        if(ramdomNums.find(el => parseInt(ramdom) === el)){
            i--
        }else{
            ramdomNums.push(parseInt(ramdom))
        }
    }
    // console.log(ramdomNums)
    return ramdomNums
}

exports.getRamdomNum = (min, max) => {
    const ramNum = min +  Math.floor(Math.random() * (max - min))
    // console.log(ramNum)
    return ramNum
}

/**
 * @param {Array} ramdomDatas
 * @returns {Array} ramdomDatas
 * Rangeプロパティからランダムな数を生成し、置き換える関数
 */
 exports.replaceRangeCount = (ramdomDatas) => {
    return new Promise((resolve, reject) => {
        try{
            const newRamdomDatas = ramdomDatas.map((element) => {
                const min = Number(element.range.min)
                const max = Number(element.range.max)
                const ramNum = this.getRamdomNum(min, max)
                // ここで連想配列の参照を切っている
                const newElement = Object.assign({}, element)
                newElement.range = String(ramNum)
                return newElement
            })
            // console.log(ramdomDatas)
            resolve(newRamdomDatas)
        }catch(err){
            reject(err)
        }
    })
}

/**
 * Rangeを置き換えた後のランダムなデータとbase64のimageデータの塊からレスポンスできる値に整形する関数
 */
exports.prepareToResponce = (ramDataAndBase64Array) => {
    const Base64Array = ramDataAndBase64Array.splice(-1, 1)
    const ramDatas = ramDataAndBase64Array.slice()
    for (let i = 0; i < ramDatas[0].length; i++) {
        let base64 = Base64Array[0][i];
        let ramData = ramDatas[0][i];
        ramData.data = base64
    }
    return ramDatas
}