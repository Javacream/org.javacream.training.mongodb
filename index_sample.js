function setUp(){
    let conn = new Mongo()
    return conn.getDB("test")
}

function createNumbers() {
    let db = setUp()
	for (i = 0; i < 20000; i++) {
		db.numbers.save({
			num : i
		});
	}
}
function dropNumbers() {
    let db = setUp()
	db.numbers.drop()
}

function withoutIndex() {
    let db = setUp()
    print(db.numbers.count())
	return db.numbers.find({
		num : {
			"$gt" : 19995
		}
	}).explain('executionStats')

}

function withIndex() {
    let db = setUp()
	db.numbers.ensureIndex({
		num : 1
	})
	print(db.numbers.count())
	return db.numbers.find({
		num : {
			"$gt" : 19995
		}
	}).explain('executionStats')
}

function getIndexes(){
	return db.numbers.getIndexes()
}