define(function() {
	return {
		defaultView: function() {
			var view = [
				'<div id="tabProduct" class=" panel  panel-primary">',
				'<div class="panel-heading">产品监管</div>',
				'<div class="panel-body">',
				'	<div class="search row">',
				'		<div class="col-lg-6">',
				'			<a href="#product/add" class="btn btn-success btn-lg">',
				'				<span class="glyphicon glyphicon-plus "></span>',
				'				新建产品',
				'			</a>',
				'		</div>',
				'		<div class="col-lg-6">',
				'			<div class="input-group input-group-lg">',
				'				<input type="text" class="form-control"/>',
				'				<span class="input-group-btn">',
				'					<button class="btn btn-default" type="button">',
				'						<span class="glyphicon glyphicon-search"></span>',
				'					</button>',
				'				</span>',
				'			</div>',
				'		</div>',
				'	</div>',
				'	<div class="table-responsive">',
				'		<table class="table table-bordered table-hover table-striped">',
				'			<thead>',
				'				<tr>',
				'					<th>产品名称</th>',
				'					<th>所属企业</th>',
				'					<th>企业类型</th>',
				'					<th>风险评价</th>',
				'					<th>监管方式</th>',
				'					<th>评价日期</th>',
				'					<th>操作</th>',
				'				</tr>',
				'			</thead>',
				'			<tbody id="productList">',
				'				<tr><td colspan="7"><div class="loading">正在加载数据，请稍候……</div></td></tr>',
				'			</tbody>',
				'			</table>',
				'		</div>',
				'	</div>',
				'</div>',
				'</div>'
			];
			return view.join('');
		},
		listView: function() {
			var list = [
				'<%if(!data || data.length === 0){%>',
				'	<tr><td colspan="7"><div class="loading">no data</div></td></tr>',
				'<%}else{ var rcd = null;%>',
				'<%for(var i =0,len = data.length;i<len;i++){rcd = data[i];%>',
				'	<tr data-bind="id" id="<%=rcd._id%>">',
				'		<td data-bind="name"><%=rcd.name%></td>',
				'		<td data-bind="company"><%=rcd.company%></td>',
				'		<td data-bind="companyType"><%=rcd.companyType%></td>',
				'		<td data-bind="riskLevel"><%=rcd.riskLevel%></td>',
				'		<td data-bind="superviseType"><%=rcd.superviseComment%></td>',
				'		<td data-bind="judgeDate"><%=(new Date()).toLocaleString()%></td>',
				'		<td>',
				'			<a href="#product/edit/<%=rcd._id%>" class="button hook-edit">',
				'				<span class="glyphicon glyphicon-pencil action green"></span>',
				'			</a>',
				'			<a href="#product/remove/<%=rcd._id%>" class="button hook-del">',
				'				<span class="glyphicon glyphicon-remove action red"></span>',
				'			</a>',
				'		</td>',
				'	</tr>',
				'<%}}%>'
			];
			return list.join('');
		},
		stewardship: function() {
			return [
				'<div class="modal" id="stewradshipWindow" data-backdrop="static">',
				'	<div class="modal-dialog">',
				'		<div class="modal-content">',
				'			<div class="modal-header">',
				'					产品风险评定',
				'				<button type="button" class="close" aria-hidden="true">&times;</button>',
				'			</div>',
				'			<div class="modal-body">',
				'				<div id="stewardshipTable">',
				'					<div class="loading">正在加载数据，请稍候……</div>',
				'				</div>',
				'			</div>',
				'			<div class="modal-footer">',
				'				<button class="btn btn-success">确定</button>',
				'			</div>',
				'		</div>',
				'	</div>',
				'</div>'
			].join('');
		},
		add: function() {
			return [
				'<div class="modal" id="productRrecordWin" data-backdrop="static">',
				'	<!-- div.modal-dialog>div.modal-content>(div.modal-header+div.modal-body+div.modal-footer) -->',
				'	<div class="modal-dialog">',
				'		<div class="modal-content">',
				'			<div class="modal-header">',
				'				添加产品',
				'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
				'			</div>',
				'			<div class="modal-body" id="recordForm">',
				'					<form class="form-horizontal" id="product-form-0" data-model="product" data-id="0" role="form">',
				'						<div class="form-group">',
				'							<label for="pdname" class="col-sm-2 control-label">产品名称</label>',
				'							<div class="col-sm-10">',
				'								<input type="text" data-bind="name" class="form-control" id="pdname" placeholder="请输入产品名称"/>',
				'							</div>',
				'						</div>',
                '                       <div class="form-group">',
                '							<label for="pdname" class="col-sm-2 control-label">企业名称</label>',
                '							<div class="col-sm-10">',
                '								<input type="text" data-bind="company" class="form-control" id="pdname" placeholder="请输入企业名称"/>',
                '							</div>',
                '						</div>',
                '                       <div class="form-group">',
                '						    <label for="pdname" class="col-sm-2 control-label">企业类型</label>',
                '							<div class="col-sm-10">',
                '								<input type="text" data-bind="companyType" class="form-control" id="pdname" placeholder="请选择企业类型"/>',
                '							</div>',
                '						</div>',
				'						<div class="form-group">',
				'							<label for="iputAddDate" class="col-sm-2 control-label">添加日期</label>',
				'							<div class="col-sm-10">',
				'								<span class="form-control"><%=(new Date()).toLocaleString()%></span>',
				'							</div>',
				'						</div>',
				'						<div class="form-group">',
				'							<label for="inputPassword3" class="col-sm-2 control-label">风险评定</label>',
				'							<div class="col-sm-10">',
				'								<div class="input-group">',
				'									<input type="text" data-bind="superviseType" class="form-control">',
				'									<div class="input-group-btn">',
				'										<button type="button" class="btn btn-default dropdown-toggle hook-stewardship" >评定</button>',
				'									</div>',
				'									<!-- /btn-group -->',
				'								</div>',
				'								<!-- /input-group -->',
				'							</div>',
				'						</div>',
				'						<div class="form-group">',
				'							<label for="inputPassword3" class="col-sm-2 control-label">产品备注</label>',
				'							<div class="col-sm-10">',
				'								<textarea type="" data-bind="backlog" class="col-sm-12 backlog" placeholder="请输入产品备注信息"></textarea>',
				'							</div>',
				'						</div>',
				'					</form>',
				'			</div>',
				'			<div class="modal-footer">',
				'				<button id="btnSaveRecord" class="btn btn-success">保存</button>',
				'			</div>',
				'		</div>',
				'	</div>',
				'</div>'
			].join('');
		},
		record: function() {
			return [
				'<div id="recordForm">',
				'<form class="form-horizontal" role="form" id="product-form-0" data-id="0" data-model="product">',
				'	<div class="form-group">',
				'		<label for="pdname" class="col-sm-2 control-label">产品名称</label>',
				'		<div class="col-sm-10">',
				'			<input type="text" data-bind="name" class="form-control" id="pdname" placeholder="请输入产品名称"/>',
				'		</div>',
				'	</div>',
                '   <div class="form-group">',
                '		<label for="pdname" class="col-sm-2 control-label">企业名称</label>',
                '		<div class="col-sm-10">',
                '			<input type="text" data-bind="company" class="form-control" id="pdname" placeholder="请输入企业名称"/>',
                '		</div>',
                '	</div>',
                '   <div class="form-group">',
                '		<label for="pdname" class="col-sm-2 control-label">企业类型</label>',
                '		<div class="col-sm-10">',
                '           <select data-bind="companyClass" class="form-control">',
                '               <option value="1">一类企业</option>',
                '               <option value="2">二类企业</option>',
                '               <option value="3">三类企业</option>',
                '               <option value="4">四类企业</option>',
                '           </select>',
                '	    </div>',
                '	</div>',
				'	<div class="form-group">',
				'		<label for="iputAddDate" class="col-sm-2 control-label">添加日期</label>',
				'		<div class="col-sm-10">',
				'			<span class="form-control"><%=(new Date()).toLocaleString()%></span>',
				'		</div>',
				'	</div>',
				'	<div class="form-group">',
				'		<label for="inputPassword3" class="col-sm-2 control-label">风险评定</label>',
				'		<div class="col-sm-10">',
				'			<div class="input-group">',
				'				<input type="text" disabled data-bind="superviseComment" class="form-control">',
				'				<div class="input-group-btn">',
				'					<button type="button" class="btn btn-default dropdown-toggle hook-stewardship" >评定</button>',
				'				</div>',
				'				<!-- /btn-group -->',
				'			</div>',
				'			<!-- /input-group -->',
				'		</div>',
				'	</div>',
				'	<div class="form-group">',
				'		<label for="inputPassword3" class="col-sm-2 control-label">产品备注</label>',
				'		<div class="col-sm-10">',
				'			<textarea type="" data-bind="backlog" class="col-sm-12 backlog" placeholder="请输入产品备注信息"></textarea>',
				'		</div>',
				'	</div>',
				'</form>',
				'</div>'
			].join("");
		}
	}
})