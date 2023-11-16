use('training')
db.data.drop()

let sawitzki_document = {
    'lastname': 'Sawitzki', 
    'firstname': ['Rainer', 'Ulrich'], 
    'height': 183,
    'address': {
     'city': 'München',
     'street': 'Marienplatz'
    }
 }

 let meier_document = {
    'lastname': 'Meier', 
    'firstname': 'Hannah', 
    'height': 183,
    'address': {
     'city': 'München',
     'street': 'Marienplatz'
    }
 }


 db.data.insertMany([sawitzki_document, meier_document])

 db.data.find()
 