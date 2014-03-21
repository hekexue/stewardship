
var username="program",
	password="program",
	mongoHost="localhost",
	mongoPort="",
	mongoBase="productstewardship",
	mongoOptions="";
module.exports={
	env:"develop",
	mongoConnection:"mongodb://"+(username?username+":"+password+"@":"")+ (mongoHost?mongoHost:"localhost")+(mongoPort?":"+mongoPort:":27017") + (mongoBase?"/"+mongoBase:"")+(mongoOptions? "?"+mongoOptions:"")
}