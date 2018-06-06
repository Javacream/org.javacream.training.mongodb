function insertPublishers() {
	db.publishing.remove({});
	var publisherCount = 5;
	var booksCount = 10;

	for ( var i = 0; i < publisherCount; i++) {
		var publisher = {
			name : 'Publisher' + i,
			address : {
				city : 'PublisherCity' + i,
//				street : 'PublisherStreet' + i
			},
			books : []
		}
		for ( var j = 0; j < booksCount; j++) {
			var counter = i * booksCount + j	
			var book = {
				isbn : 'Isbn' + counter,
				title : 'Title' + counter,
				price : 9.99 + i*10 + counter,
				pages : 25 * counter,
				publishedAt: new ISODate("2012-01-16T10:35:54.985Z")
			}
			publisher.books.push(book);
			if (i%2){
				book.tags=['science', 'politics']
			}else{
				book.tags=['sports', 'cinema']
			}
		}
		db.publishing.insert(publisher);

	}
	
	
}

function basicQueryByName(){
	return db.publishing.find({name: 'Publisher1'})
}

function basicQueryByNameAndProjection(){
	return db.publishing.find({name: 'Publisher1'}, {name: 1, address:1})
}

function basicQueryByName(){
	return db.publishing.find({name: 'Publisher1'})
}
function updatePublisherName(){
	db.publishing.update({name: 'Publisher1'}, {$set: {name: 'Changed Publisher1'}})
	return db.publishing.find({name: 'Changed Publisher1'}, {name: 1})
}
function deleteABookFromPublisher(){
	db.publishing.update({name: 'Publisher0'}, {$pop: {books: 1}})
	var publisherBooks = db.publishing.find({name: 'Publisher0'}, {books: 1})
	return publisherBooks;
}
function deleteABookFromPublisherWithTitle(){
	db.publishing.update({name: 'Publisher0'}, {$pull: {books: {title: 'Title1'}}})
	var publisherBooks = db.publishing.find({name: 'Publisher0'}, {books: 1})
	return publisherBooks;
}

function deleteAddressFromPublisher0(){
	db.publishing.update({name: 'Publisher0'}, {$unset: {address: 1}})
	return db.publishing.find({name: 'Publisher0'})
}
function addLocationsToPublisher0(){
	db.publishing.update({name: 'Publisher0'}, {$set: {locations: ['Berlin', 'Stuttgart', 'Heidelberg']}})
	return db.publishing.find({name: 'Publisher0'})
}
function findPublisherWithMatchingBookTitle(title){
	return db.publishing.find({'books.title': title} , {name: 1})
}

//e.g. /Title[0-5]
function findPublisherWithMatchingBookTitleUsingRegex(ex){
	return db.publishing.find({'books.title': ex} , {name: 1})
}

function findPublisherWithMatchingBookTitle(title){
	return db.publishing.find({'books.title': title} , {name: 1})
}

function findPublisherWithCheapBooks(max){
	return db.publishing.find({'books.price': {$lt: max}} , {name: 1})
}


function complexQuery(){
	return db.publishing.find({books: {$elemMatch: {'isbn': 'Isbn37', 'title': 'Title37'}
	}}, {name: 1})
}