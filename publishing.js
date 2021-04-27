//Publisher example
function getDb(){
    let conn = new Mongo()
    return conn.getDB("publishing")
}

function setUpPublishing(){
    let db = getDb()
    let publisher1 = {name: "Springer", address: {city:"Berlin", street: "Alexanderplatz"}}
    let publisher2 = {name: "Addison", address: {city:"New York", street: "Central Park"}}
    db.publishers.insertOne(publisher1)
    db.publishers.insertOne(publisher2)
    const books = []

    for (let i = 0; i < 10; i++){
        books.push({isbn: "ISBN" + i, title: "Title"+i, price:9.99*i, pages: 100*i})
    }

    books[5].publishingDate = new Date()
    books[3].inStock = true
    db.books.insertMany(books)

}

function tearDownPublishing(){
    let db = getDb()
    db.publishers.drop()
    db.books.drop()

}
function publishersExample(){
    let db = getDb()
    printCursor(db.publishers.find({name:"Springer"}))
    printCursor(db.publishers.find({"address.city": "Berlin"}))
    db.publishers.updateOne({name:"Springer"}, {$set: {phone: "030 12345"}})
    db.publishers.updateOne({name:"Springer"}, {$set: {"address.city": "München"}})
    printCursor(db.publishers.find({name:"Springer"}))
    printCursor(db.publishers.find({phone:null}))
    printCursor(db.publishers.find({phone: {$ne: null}}))
}


function booksExample(){
    let db = getDb()
    printCursor(db.books.find({price: {$gt: 39.99}}))
    printCursor(db.books.find({title: {$regex: /T.*7/}}))
    printCursor(db.books.find({title: {"$in": ["Title3", "Title5"]}}, {price:1}))
}

function printCursor(cursor){
    cursor.forEach(printjson)
}

