function getDb(){
    let conn = new Mongo()
    return conn.getDB("test")
}

function setup(){
    let db = getDb()
    let books = []
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
        db.coll1.insertMany(books)
        books = []
        for (let i = 0; i < 15; i = i + 2){
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
        db.coll2.insertMany(books)

 
}

function compareColls(){
    let db = getDb()
    let result = db.coll1.aggregate(
        {$lookup: {
            from: "coll2",
            localField: "isbn",
            foreignField: "isbn",
            as: "books2"
          }
        }, 
        {$match: {books2: {$ne: []}}},
        {$project: {_id: 0, isbn:1, check: "$books2.isbn"}}
    )
 
    result.forEach(printjson)
}