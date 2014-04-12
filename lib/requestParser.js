module.exports={
	params:function  (req) {
		switch(req.method.toUpperCase()){
			case "POST":return JSON.parse(req.body.data);break;
			case "GET":return JSON.parse(req.param("data"));break;
		}
	}
}