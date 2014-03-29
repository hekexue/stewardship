define(["jquery"], function($) {
	var apiResponseConfig = {
		RESSTATUS: "_r_",
		RESSTATUSOK: "ok",
		RESDATA: "data"

	},
		dataSafeConfig = {
			DATASAFE: true
		},
		MVCInnerEventConfig = {
			VRR: "View:RecordRemove",
			VRC: "View:RecordChange",
			MRR: "Model:RecordRemove",
			MRC: "Model:RecordChange"
		}
	return $.extend({}, apiResponseConfig, dataSafeConfig, MVCInnerEventConfig);
})