function createRooms() {
	for (var i = 0; i < 10000; i++){
		db.rooms.insert({style:"single",capacity:1})
	}
	for (var i = 0; i < 10000; i++){
		db.rooms.insert({style:"king",capacity:1})
	}
	for (var i = 0; i < 10000; i++){
		db.rooms.insert({style:"double",capacity:2})
	}
	for (var i = 0; i < 10000; i++){
		db.rooms.insert({style:"queen",capacity:4})
	}

}

function doRoomsMapReduce(){
	db.rooms.mapReduce(function(){
		emit(this.style, this.capacity)
		emit("total", this.capacity)
	}, 
	
	function(key, values){
		var result = 0
		for (var i = 0; i < values.length; i++){
			result += values[i]
		}
		
		return result
	}, {out: "rooms_result"})
}