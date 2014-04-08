define(function() {
	return {
		defaultView: function() {
			return [
				'<div id="tabCompany" class="panel  panel-primary">',
				'	<div class="panel-heading">企业管理</div>',
				'	<div class="panel-body">',
				'		<div class="search">',
				'			<div class="input-group input-group-lg">',
				'				<input type="text" class="form-control"/>',
				'				<span class="input-group-btn">',
				'					<button class="btn btn-default" type="button">',
				'						<span class="glyphicon glyphicon-search"></span>',
				'					</button>',
				'				</span>',
				'			</div>',
				'		</div>',
				'		<div class="table-responsive">',
				'			<table class="table table-bordered table-hover">',
				'				<thead>',
				'					<tr>',
				'						<th>企业名称</th>',
				'						<th>企业类别</th>	',
				'						<th>添加日期</th>',
				'						<th>操作</th>',
				'					</tr>',
				'				</thead>',
				'				<tbody id="companyList">',
				'					<div class="loading">正在加载数据，请稍候……</div>',
				'				</tbody>',
				'			</table>',
				'		</div>',
				'	</div>',
				'</div>'
			].join('');
		},
		listView: function() {
			return [
				'<%for(var i =0,len = data.length;i<len;i++){var rcd = data[i];%>',
				'<tr data-bind="id" id="<%=rcd.id%>">',
				'	<td data-bind="name"></td>',
				'	<td data-bind="companyType"></td>',
				'	<td data-bind="judgeDate"></td>',
				'	<td >',
				'		<span class="glyphicon glyphicon-list-alt"></span>',
				'		<span class="glyphicon glyphicon-pencil"></span>',
				'		<span class="glyphicon glyphicon-remove"></span>',
				'	</td>',
				'</tr>',
				'<%}%>'
			].join('');
		}
	}
})