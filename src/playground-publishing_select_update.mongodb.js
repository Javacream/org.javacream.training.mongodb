use ('training')

function printCursor(cursor){
    cursor.forEach((e) => console.log(JSON.stringify(e)))
}
function printDocument(doc){
  console.log(JSON.stringify(doc))
}

printCursor(db.publishers.find())
