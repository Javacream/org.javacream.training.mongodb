//Publisher example
use publishing
let publisher1 = {name: "Springer", address: {city:"Berlin", street: "Alexanderplatz"}}
let publisher2 = {name: "Addison", address: {city:"New York", street: "Central Park"}}
db.publishers.insertOne(publisher1)
db.publishers.insertOne(publisher2)
db.publishers.find({name:"Springer"})
db.publishers.find({"address.city": "Berlin"})
db.publishers.updateOne({name:"Springer"}, {$set: {phone: "030 12345"}})
db.publishers.updateOne({name:"Springer"}, {$set: {"address.city": "München"}})
db.publishers.find({name:"Springer"})
db.publishers.find({phone:null})
db.publishers.find({phone: {$ne: null}})
