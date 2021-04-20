require('dotenv').config()
const env = process.env
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let mongoose = require('mongoose');
// GUIツールCompassへ接続するには 「mongodb://MONGO_USER:MONGO_PASS@localhost:MONGO_PORT」
mongoose.connect(`mongodb://${env.MONGO_USER}:${env.MONGO_PASS}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB_NAME}?authSource=${env.MONGO_DB_NAME}`, {
    useNewUrlParser: true, useUnifiedTopology: true
})
// スキーマ
let Schema = mongoose.Schema
let menuSchema = new Schema({
    id: String,
    name: String,
    type: String,
    range: {
        min : String,
        max : String
    },
    filename: String
})
// MONGO_COLLECTION_NAMEの複数形のMONGO_COLLECTION_NAMEsコレクションがなければ作られる
let menuinfoModel = mongoose.model(env.MONGO_COLLECTION_NAME, menuSchema)
    
/**
 * MONGO_COLLECTION_NAMEsコレクション内のオブジェクト数を数える関数
 */
exports.count = async () => {
    let objects = await menuinfoModel.find()
    return objects.length
}

/**
 * ランダムな数値配列通りのオブジェクトを取得する
 * @param {*} ramdomNums 
 */
exports.getRamdomData = async (ramdomNums) => {
    console.log(ramdomNums)
    let objects = []
    for await (let num of ramdomNums) {
        await menuinfoModel.find({ id: num }, (err, data) => {
            objects.push(data[0])
        })
    }
    return objects
}


