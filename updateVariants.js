function getDb(){
    let conn = new Mongo()
    return conn.getDB("test")
}

function setUp(){
    const db = getDb()
    db.data.drop()
    db.data.insertOne({_id: 1, value:1})
}

function updateOneDemo(){
    print("updateOne returns statistics")
    printjson(db.data.updateOne({_id:1}, {$inc: {value: 1}}))

}

function findAndUpdateOneDemo(){
    print("findOneAndUpdate returns original document")
    printjson(db.data.findOneAndUpdate({_id:1}, {$inc: {value: 1}}))
    print("findOneAndUpdate returns original document if option returnNewDocument is set")
    printjson(db.data.findOneAndUpdate({_id:1}, {$inc: {value: 1}}, {"returnNewDocument": true}))

}

function doDemo(){
    setUp()
    updateOneDemo()
    findAndUpdateOneDemo()
}