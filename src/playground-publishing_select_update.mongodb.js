use('training')

function printCursor(cursor) {
  cursor.forEach((e) => console.log(JSON.stringify(e)))
}
function printDocument(doc) {
  console.log(JSON.stringify(doc))
}

//let criterion = {name: {'$exists': true}}
//let updateDocument = {'$set': {type: 'Publisher'}}

//db.data.updateMany(criterion, updateDocument)
printCursor(db.data.find({type: 'Publisher'}))