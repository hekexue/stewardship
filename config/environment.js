var username = "program",
	password = "programuser",
	mongoHost = "10.0.2.15",
	mongoPort = "",
	mongoBase = "stewardship",
	mongoOptions = "";
module.exports = {
	env: "develop",
	mongoConnection: "mongodb://" + (username ? username + ":" + password + "@" : "") + (mongoHost ? mongoHost : "localhost") + (mongoPort ? ":" + mongoPort : ":27017") + (mongoBase ? "/" + mongoBase : "") + (mongoOptions ? "?" + mongoOptions : "")
}
