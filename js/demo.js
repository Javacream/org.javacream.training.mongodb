var doDemo = function() {

	var name = "Hugo"
	var number = 4.2
	var state = true
	var list = [ "A", "B", "C" ]
	var object = {lastname : "Sawitzki",givenNames : [ "Rainer", "Ulrich" ]}
	}

	print("name=" + name)
	print("obj=" + object.info())
	print("personen-name=" + object.name)
	print("personen-name=" + object["name"])
	object["age"] = 42
	print("personen-age=" + object["age"])
	print("personen-age=" + object.age)
	object.height = 183
	print("personen-height=" + object["height"])

}

var anotherFunction = function(config, callback) {
	print(config.host)
	print(config.port)
	callback(config.host, config.port)
}

var configurationObject = {
		host : "localhost",
		port : "8080"
	}
var callbackFunction =
	function(host, port) {
	print("Connectiong to " + host)
}
anotherFunction(configurationObject, callbackFunction)
