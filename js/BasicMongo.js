var firstMongo = function(){
	var person = {}
	person.lastname= "Sawitzki"
	person.givenNames = [];
	person.givenNames[0] = "Rainer"
	person.givenNames[1] = "Ulrich"
	db.people.insert(person)
	print (db.people.find())
}


var secondMongo = function(){
	db.books.insert({isbn : "Isbn10001",title : "Title Egal"})
}