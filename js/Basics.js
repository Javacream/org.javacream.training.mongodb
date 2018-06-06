function testBasics() {
	db.users.insert({
		username : "smith"
	})
	db.users.save({
		username : "jones"
	})

	print('Hello World')
	return db.users.find()
}