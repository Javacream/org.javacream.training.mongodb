use('training')

function printCursor(cursor) {
  cursor.forEach((e) => console.log(JSON.stringify(e)))
}
function printDocument(doc) {
  console.log(JSON.stringify(doc))
}


let criterion = { price: 
                        { 
                          '$lte': 2.99
                        } 
                }

printCursor(db.data.find(criterion)) //drei Treffer
