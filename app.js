const express = require('express')
const app = express()
const cors = require('cors')
// const dbClient = require('./testdbClient')
const mongoClient = require('./mongodbClient')

const S3 = require('./s3')
const gF = require('./generalFunctions')

app.use(cors({ origin: true, credentials: false }))

app.post('/menu', async(req, res) => {
    console.log('post /menu !!!')
    const count = await mongoClient.count()
    // const count = dbClient.count()
    const ramdomNums = gF.getUniqueNums(count, 10)
    const ramObjects = await mongoClient.getRamdomData(ramdomNums)
    // const ramdomDatas = dbClient.getRamdomData(ramdomNums)

    const ramDataAndBase64Array = await Promise.all([
        gF.replaceRangeCount(ramObjects),
        S3.getBase64Array(ramObjects)
    ])

    const preparedData = gF.prepareToResponce(ramDataAndBase64Array)
    res.send(preparedData[0])
})

app.listen(8080, ()=> {
    console.log("Listening: 8080");
});