function searchPublisher() {
	return db.publishers.findOne({
		_id : "pub1"
	});
}

function updatePublisher(publisher, newPrice) {
	db.publishers.update({
		_id : publisher._id,
		version : publisher.version
	}, {
		$set : {
			price : newPrice
		},
		$inc : {
			version : 1
		}
	});
	return db.getLastErrorObj().n
}

function addVersionToPublishers() {
	db.publishers.update({
		_id : "pub1"
	}, {
		$set : {
			version : 0
		}
	})
}