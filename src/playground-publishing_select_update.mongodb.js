use ('training')

function printCursor(cursor){
    cursor.forEach((e) => console.log(JSON.stringify(e)))
}
function printDocument(doc){
  console.log(JSON.stringify(doc))
}


//printCursor(db.data.find({title: "Title2", price: 2.99})) //ein Treffer
//printCursor(db.data.find({title: "Title2", price: 3.99})) //kein Treffer
//printCursor(db.data.find({name: 'Springer'}))

//Ich möchte alle Dokumente haben, die sich auf einer Berliner Addresse beziehen
//printCursor(db.data.find({city: 'Berlin'})) //kein Treffer, city müsste Top Level sein
//printCursor(db.data.find({address.city: 'Berlin'})) //Syntax Error
//printCursor(db.data.find({'address.city': 'Berlin'})) //Trffer