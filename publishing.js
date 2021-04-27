//Publisher example
function setUp(){
    let conn = new Mongo()
    return conn.getDB("publishing")
}

function tearDown(db){
    db.publishers.drop()
    db.books.drop()

}
function publishersExample(){
    let db = setUp()
    let publisher1 = {name: "Springer", address: {city:"Berlin", street: "Alexanderplatz"}}
    let publisher2 = {name: "Addison", address: {city:"New York", street: "Central Park"}}
    db.publishers.insertOne(publisher1)
    db.publishers.insertOne(publisher2)
    db.publishers.find({name:"Springer"}).forEach(printjson)
    db.publishers.find({"address.city": "Berlin"})
    db.publishers.updateOne({name:"Springer"}, {$set: {phone: "030 12345"}})
    db.publishers.updateOne({name:"Springer"}, {$set: {"address.city": "München"}})
    db.publishers.find({name:"Springer"}).forEach(printjson)
    db.publishers.find({phone:null}).forEach(printjson)
    db.publishers.find({phone: {$ne: null}}).forEach(printjson)
    tearDown(db)
}


function booksExample(){
    let db = setUp()
    for (let i = 0; i < 10; i++){
        db.books.insertOne({isbn: "ISBN" + i, title: "Title"+i, price:9.99*i, pages: 100*i})
    }
    db.books.find({price: {$gt: 39.99}}).forEach(printjson)
    db.books.find({title: {$regex: /T.*7/}}).forEach(printjson)

}
