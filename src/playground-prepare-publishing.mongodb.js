function createDocuments(){
    let books = []
    for (let i = 0; i < 10; i++){
        let book = {isbn: "ISBN"+i, title: "Title" + i, price: 0.99 + i, pages: 50*i, description: "a book about computer science", authorName: ["Rainer Sawitzki"]}
        books.push(book)
    }
    let bookForAddison = {isbn: "ISBN42", title: "Title42", price: 42.99, pages: 999, description: "a sports book", authorName: ["Georg Metzger", "Hans Meier"]};
    let bookForAddison2 = {isbn: "ISBN43", title: "Title43", price: 4.99, pages: 999, description: "a sports book", authorName: ["Georg Metzger", "Hans Meier"]};
    let springer = {name: "Springer", address: {city: "Berlin", street: "Alexanderplatz"}, books: []}
    let authors = [{lastname: "Sawitzki", firstname: "Rainer", isbns:[]}, {lastname: "Metzger", firstname: "Georg", isbns:[]}, {lastname: "Meier", firstname: "Hans", isbns:[]}]
    authors[1].isbns.push(bookForAddison.isbn)
    authors[2].isbns.push(bookForAddison.isbn)
    books.forEach(e => {springer.books.push(e.isbn); e.publisherName = springer.name; authors[0].isbns.push(e.isbn)})
    let addison = {name: "Addison", address: {city: "Berlin", street: "Alexanderplatz"}, books: [bookForAddison]}
    bookForAddison.publisherName = addison.name;    
    bookForAddison2.publisherName = addison.name;    
    //books.push(bookForAddison)
    let oidsForSpringerBooks = db.data.insertMany(books)
    let oidForAddisonBook = db.data.insertMany([bookForAddison, bookForAddison2])
    springer.books = {oids: Object.values(oidsForSpringerBooks.insertedIds)}
    addison.books.push({oids: Object.values(oidForAddisonBook.insertedIds)})
    db.data.insertOne(springer)
    db.data.insertOne(addison)
    db.data.insertMany(authors)

}
use ("training")
//db.publishers.drop()
//db.books.drop()
db.data.drop()
db.createCollection("data")

createDocuments()