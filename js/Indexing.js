function createNumbers() {
	for (i = 0; i < 200000; i++) {
		db.numbers.save({
			num : i
		});
	}
}
function dropNumbers() {
	db.numbers.drop()
}

function withoutIndex() {
	print(db.numbers.count())
	return db.numbers.find({
		num : {
			"$gt" : 199995
		}
	}).explain()

}

function withIndex() {
	db.numbers.ensureIndex({
		num : 1
	})
	print(db.numbers.count())
	return db.numbers.find({
		num : {
			"$gt" : 199995
		}
	}).explain()
}

function getIndexes(){
	return db.numbers.getIndexes()
}