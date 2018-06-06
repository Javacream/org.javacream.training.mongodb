function basicUpdateAddCountry() {
	db.users.update({
		username : "smith"
	}, {
		$set : {
			country : "Canada"
		}
	})
	return db.users.find({
		username : "smith"
	})
}

function basicUpdateRemoveCountry() {
	db.users.update({
		username : "smith"
	}, {
		$unset : {
			country : 1
		}
	})
	return db.users.find({
		username : "smith"
	})
}

function basicUpdateSet() {
	db.users.update({
		username : "smith"
	}, {
		$set : {
			favorites : {
				cities : [ "Chicago", "Cheyenne" ],
				movies : [ "Casablanca", "The Sting" ]
			}
		}
	})

	db.users.update({
		username : "jones"
	}, {
		"$set" : {
			favorites : {
				movies : [ "Casablanca", "Rocky" ]
			}
		}
	})

	return db.users.find()
}

function addToSet() {
	db.users.update({
		"favorites.movies" : "Casablanca"
	}, {
		$addToSet : {
			"favorites.movies" : "The Maltese Falcon"
		}
	}, false, true)
	return db.users.find()

}
function complexQuery() {
	return db.users.find({
		"favorites.movies" : "Casablanca"
	})
}
