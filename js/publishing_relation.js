function createData() {
	var publishersCount = 10;
	var booksCount = 1000;
	var authorsCount = 250;

	var publishers = [];
	var books = [];
	var authors = [];

	for ( var i = 0; i < publishersCount; i++) {
		var publisher = {
			_id: "pub" + i,	
			name : 'Publisher' + i,
			address : {
				city : 'PublisherCity' + i,
				street : 'PublisherStreet' + i
			},
			books : []
		}
		db.publishers.insert(publisher);
		publishers.push(publisher)
	}

	for ( var i = 0; i < booksCount; i++) {
		var book = {
			_id: "book" + i,	
			isbn : 'Isbn' + i,
			title : 'Title' + i,
			price : 9.99 + i,
			pages : 25 * i,
			publishedAt : new ISODate("2012-01-16T10:35:54.985Z"),
			authors : []
		}
		if (i % 2) {
			book.tags = [ 'science', 'politics' ]
		} else {
			book.tags = [ 'sports', 'cinema' ]
		}
		db.books.insert(book);
		books.push(book)
	}

	for ( var i = 0; i < authorsCount; i++) {
		var author = {
			_id: "author" + i,	
			lastname : 'AuthorLastname' + i,
			firstname : 'AuthorFirstname' + i,
			books : []
		}
		db.authors.insert(author);
		authors.push(author)
	}

	for ( var i = 0; i < publishersCount; i++) {
		var publisher = publishers[i];
		for ( var j = 0; j < 100; j++) {
			var book = books[i * 100 + j];
			publisher.books.push({
				$ref : 'books',
				$id : book._id
			})
			book.publisher = {$ref: 'publishers', $id: publisher._id}
		}
	}

	for ( var i = 0; i < authorsCount; i++) {
		var author = authors[i]
		for ( var j = 0; j < 4; j++) {
			var book = books[j * 250 + i];
			author.books.push({
				$ref : 'books',
				$id : book._id
			}

			)
			book.authors.push({
				$ref : 'authors',
				$id : author._id
			}

			)
		}
	}
	for (var i = 0; i < publishers.length; i++){
		db.publishers.update({_id: publishers[i]._id}, publishers[i])
	}
	for (var i = 0; i < books.length; i++){
		db.books.update({_id: books[i]._id}, books[i])
	}
	for (var i = 0; i < authors.length; i++){
		db.authors.update({_id: authors[i]._id}, authors[i])
	}
}

function clearData(){
	db.publishers.remove();
	db.authors.remove();
	db.books.remove();
	
}

function testRelation(){
	var publisher = db.publishers.findOne({name: 'Publisher1'})
	var bookOfPublisher = publisher.books[0]
	return db[bookOfPublisher.$ref].findOne({_id:bookOfPublisher.$id})
}

function testRelationAuthors(){
	var book = db.books.findOne({isbn: 'Isbn123'})
	return db[book.authors[0].$ref].findOne({_id:book.authors[0].$id})
}

















