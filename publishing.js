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

    const tags1 = ["computer", "it", "databases"]
    const tags2 = ["school", "geography"]
    const tags3 = ["cooking"]

    for (let i = 0; i < 10; i++){
        const book = {isbn: "ISBN" + i, title: "Title"+i, price:9.99*i, pages: 100*i}
        if (i%3 == 0){
            book.tags = tags1
        }
        if (i%3 == 1){
            book.tags = tags2
        }
        if (i%3 == 2){
            book.tags = tags3
        }

        books.push(book)
    }

    books[5].publishingDate = new Date()
    books[3].inStock = true
    books[2].sections = ["Introduction", "The Java programming language", "JEE"]
    books[3].sections = ["Cooking is easy", "Advanced Tea", "Advanced coffee using Java"]
    books[3].sections = ["Holidays in the sun", "Java Island"]

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
    printCursor(db.books.find({tags: "computer"}))
    printCursor(db.books.find({tags: {"$all": ["computer", "databases"]}}))
    const query = {tags:{"$all": ["computer", "databases"]}}
    const projection = {"tags": {"$slice": 1}}
    printCursor(db.books.find( query, projection))

}

function printCursor(cursor){
    cursor.forEach(printjson)
}

