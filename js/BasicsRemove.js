function basicRemove(){
	db.users.remove({"favorites.cities": "Cheyenne"})
	return db.users.find()
}

function basicDrop(){
	db.users.drop();
	
};