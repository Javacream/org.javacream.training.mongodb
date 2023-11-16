use('training')

let sawitzki_document = {
    'lastname': 'Sawitzki', 
    'firstname': ['Rainer', 'Ulrich'], 
    'height': 183,
    'address': {
     'city': 'München',
     'street': 'Marienplatz'
    }
 }

 db.data.insertOne(sawitzki_document)
 