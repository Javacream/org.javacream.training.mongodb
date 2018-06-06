populatePhones = function(area, start, stop) {
	for ( var i = start; i < stop; i++) {
		var country = 1 + ((Math.random() * 8) << 0);
		var num = (country * 1e10) + (area * 1e7) + i;
		db.phones.insert({
			_id : num,
			components : {
				country : country,
				area : area,
				prefix : (i * 1e-4) << 0,
				number : i
			},
			display : "+" + country + " " + area + "-" + i
		});
	}
}

scratchIndex = function() {
	db.phones.find().limit(2)
	db.system.indexes.find()
	db.phones.find({
		display : "+1 800-5650001"
	}).explain()

	db.phones.ensureIndex({
		display : 1
	}, {
		unique : true,
		dropDups : true
	})
}

scratchAggregation = function() {
	db.phones.count({
		'components.number' : {
			$gt : 5599999
		}
	})
	db.phones.distinct('components.number', {
		'components.number' : {
			$lt : 5550005
		}
	})
	db.phones.group({
		initial : {
			count : 0
		},
		reduce : function(phone, output) {
			output.count++;
		},
		cond : {
			'components.number' : {
				$gt : 5599999
			}
		},
		key : {
			'components.area' : true
		}
	})

	db.phones.group({
		initial : {
			prefixes : {}
		},
		reduce : function(phone, output) {
			output.prefixes[phone.components.prefix] = 1;
		},
		finalize : function(out) {
			var ary = [];
			for ( var p in out.prefixes) {
				ary.push(parseInt(p));
			}
			out.prefixes = ary;
		}
	})[0].prefixes
	function demo() {
		var searchIsbn = 'Isbn1';
		db.publishing.group({
			initial : {
				books : [],
				searchIsbn: 'Isbn1'
			},
			reduce : function(publisher, output) {
				var books = publisher.books
				var searchIsbn = output.searchIsbn
				for ( var i = 0; i < books.length; i++) {
					if (books[i].isbn == searchIsbn) {
						output.books.push(books[i]);
					}
				}
			},
			finalize: function(out){
				delete out.searchIsbn
			}
		})
	}

}
