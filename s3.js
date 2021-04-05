/**
 * s3と接続、操作をするクラス
 */
const AWS = require('aws-sdk')

const s3Client = new AWS.S3({
    accessKeyId: 'AKIA6NWWQML4XZINH6IL',
    secretAccessKey: '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',
    region: 'ap-northeast-1'
})

/**
 * @param {Object} jsonData
 * @return {BufferArray} ['base64buffer', 'base64Buffer', ....]
 * ramdomに選定されたDataからfilenameのみ抽出->そのfilenameの画像データを取得->配列にして解決
 */
exports.getBase64Array = async(ramdomObject) => {
    return new Promise((resolve, reject) => {
        try{
            let pendingFunc = []
            let params = {
                'Bucket': 'mytrainer-imgs',
                'Key': ''
            }
            // Promise.allで並列に処理するために、asyncGetObjectをpending状態で配列に格納している
            ramdomObject.forEach(element => {
                params.Key = element.filename
                pendingFunc.push(this.asyncGetObject(params))
            })
            Promise.all(pendingFunc)
            .then(
                result => {
                    resolve(result)
                })
            .catch(
                err => {throw new Error(err)})

        }catch(err){
            reject(err)
        }
    })
}

/**
 * @param {Array} ['BucketName', 'FileName']
 * @returns {String} <Promise> 
 * paramsに設置した値で画像のバイナリをS3から取得->base64に変換して解決
 */
exports.asyncGetObject = (params) => {
    return new Promise((resolve, reject) => {
        try{
            s3Client.getObject(params, (err, data) => {
                if(err){
                    throw new Error('s3 getObject Error')
                }else{
                    resolve(
                        data.Body.toString('base64')
                        // data.Body.toString('base64').slice(0, 10)
                    )
                }
            })
        }catch(err){
            reject(err)
        }
    })
}

