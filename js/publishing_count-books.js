function doMapReduce() {

	var mapFunction = function() {
		emit("length", this.books.length)
		emit("length2", this.books.length)
	}

	var reduceFunction = function(key, booksLengthList) {
		result = 0
		for (var i = 0; i < booksLengthList.length; i++){
			result+= booksLengthList[i]
		}
		return result

	}

	return db.publishers.mapReduce(mapFunction, reduceFunction, {
		out : "examples"
	})
}