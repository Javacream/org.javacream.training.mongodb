var firstMongo = function(){
	db.people.insert({lastname : "Sawitzki",givenNames : [ "Rainer", "Ulrich" ]})
	print (db.people.find())
}


var secondMongo = function(){
	db.books.insert({isbn : "Isbn10001",title : "Title Egal"})
}