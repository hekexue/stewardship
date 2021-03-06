define(["jquery"], function($) {
	var apiResponseConfig = {
		RESSTATUS: "_r_",
		RESSTATUSOK: "ok",
		RESDATA: "data",
		SERVICEURL: "service/index"
	},
		dataSafeConfig = {
			DATASAFE: true
		},
		MVCInnerEventConfig = {
			VRR: "View:RecordRemove",
			VRC: "View:RecordChange",
			MRR: "Model:RecordRemove",
			MRC: "Model:RecordChange",
            FIELDCHANGE:"Model:FieldChange"
		}
	return $.extend({}, apiResponseConfig, dataSafeConfig, MVCInnerEventConfig);
})