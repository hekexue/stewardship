var username = "program",
	password = "programuser",
	mongoHost = "192.168.1.106",
	mongoPort = "",
	mongoBase = "productstewardship",
	mongoOptions = "";
module.exports = {
	env: "develop",
	mongoConnection: "mongodb://" + (username ? username + ":" + password + "@" : "") + (mongoHost ? mongoHost : "localhost") + (mongoPort ? ":" + mongoPort : ":27017") + (mongoBase ? "/" + mongoBase : "") + (mongoOptions ? "?" + mongoOptions : "")
}
