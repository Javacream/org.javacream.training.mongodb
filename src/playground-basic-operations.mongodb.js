use('training')
db.data.drop()


db.data.insertMany([{
    'lastname': 'Sawitzki',
    'firstname': ['Rainer', 'Ulrich'],
    'height': 183,
    'address': {
        'city': 'München',
        'street': 'Marienplatz'
    }
},
{
    'lastname': 'Meier',
    'firstname': 'Hannah',
    'height': 183,
    'address': {
        'city': 'München',
        'street': 'Marienplatz'
    }
}
])

db.data.find()
