define(function() {
	return {
		table: function() {
			var tb = [
				'<div class="modal" id="stewradshipTable" data-backdrop="static">',
				' <div class="modal-dialog">',
				'   <div class="modal-content">',
				'     <div class="modal-header">',
				'       <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
				'       <h4 class="modal-title">产品风险评价表</h4>',
				'     </div>',
				'     <div class="modal-body">',
				'<table class="tb" data-model="stewardship">',
				'<thead>',
				'	<tr>',
				'		<th colspan="2" rowspan="3">分级项目</th>',
				'		<th colspan="4">危害程度</th>',
				'		<th colspan="9">危害因素</th>',
				'		<th colspan="3">风险等级</th>',
				'	</tr>',
				'	<tr>',
				'		<th col="1" class="Damage-rate" rowspan="2">',
				'			非常',
				'			<br>',
				'			严重',
				'			<br>（A）</th>',
				'		<th col="2" class="Damage-rate" rowspan="2">严重（B）</th>',
				'		<th col="3" class="Damage-rate" rowspan="2">一般（C）</th>',
				'		<th col="4" class="Damage-rate" rowspan="2">微弱（D）</th>',
				'		<th colspan="3">质量数据（Q1）</th>',
				'		<th colspan="5">敏感因子及其他潜在影响（Q2）</th>',
				'		<th col="13" rowspan="2">全过程概率（Q）</th>',
				'		<th col="14" class="Damage-rate" rowspan="2">高风险</th>',
				'		<th col="15" class="Damage-rate" rowspan="2">较高风险</th>',
				'		<th col="16" class="Damage-rate" rowspan="2">一般风险</th>',
				'	</tr>',
				'	<tr>',
				'		<th col="5">历史数据（Q11）</th>',
				'		<th col="6">通报预警（Q12）</th>',
				'		<th col="7">索赔退货（Q13）</th>',
				'		<th col="8">技术法规（Q21）</th>',
				'		<th col="9">社会关注（Q22）</th>',
				'		<th col="10">贸易方式（Q23）</th>',
				'		<th col="11">使用环境（Q24）</th>',
				'		<th col="12">潜在影响（Q25）</th>',
				'	</tr>',
				'</thead>',
				'<tbody>',
				'	<!-- tr>td[rowspan=7]+td*17 -->',
				'	<tr id="001">',
				'		<td rowspan="7">物理危害</td>',
				'		<td class="row-title">电气危害</td>',
				'		<td row="1" col="1" data-bind="physicalDamage.electric.damageLevel">',
				'			<span data-bind="physicalDamage.electric.A" class="check">A</span>',
				'		</td>',
				'		<td row="1"  col="2">',
				'			<span data-bind="physicalDamage.electric.B"  class="check">B</span>',
				'		</td>',
				'		<td row="1" col="3">',
				'			<span data-bind="physicalDamage.electric.C" class="check">C</span>',
				'		</td>',
				'		<td row="1" col="4">',
				'			<span data-bind="physicalDamage.electric.D" class="check">D</span>',
				'		</td>',
				'		<td row="1" col="5">',
				'			<input data-bind="physicalDamage.electric.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="1" col="6">',
				'			<input data-bind="physicalDamage.electric.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="1" col="7">',
				'			<input data-bind="physicalDamage.electric.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="1" col="8">',
				'			<input data-bind="physicalDamage.electric.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="1" col="9">',
				'			<input data-bind="physicalDamage.electric.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="1" col="10">',
				'			<input data-bind="physicalDamage.electric.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="1" col="11">',
				'			<input data-bind="physicalDamage.electric.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="1" col="12">',
				'			<input data-bind="physicalDamage.electric.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="1" col="13">',
				'			<input data-bind="physicalDamage.electric.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="1" col="14" data-bind="physicalDamage.electric.riskLevel">',
				'			<span data-bind="physicalDamage.electric.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="1" col="15">',
				'			<span data-bind="physicalDamage.electric.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="1" col="16">',
				'			<span data-bind="physicalDamage.electric.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="002">',
				'		<td class="row-title">机械危害</td>',
				'		<td row="2" col="1"  data-bind="physicalDamage.mechanical.damageLevel">',
				'			<span data-bind="physicalDamage.mechanical.A" class="check">A</span>',
				'		</td>',
				'		<td row="2" col="2">',
				'			<span data-bind="physicalDamage.mechanical.B" class="check">B</span>',
				'		</td>',
				'		<td row="2" col="3">',
				'			<span data-bind="physicalDamage.mechanical.C" class="check">C</span>',
				'		</td>',
				'		<td row="2" col="4">',
				'			<span data-bind="physicalDamage.mechanical.D" class="check">D</span>',
				'		</td>',
				'		<td row="2" col="5">',
				'			<input data-bind="physicalDamage.mechanical.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="2" col="6">',
				'			<input data-bind="physicalDamage.mechanical.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="2" col="7">',
				'			<input data-bind="physicalDamage.mechanical.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="2" col="8">',
				'			<input data-bind="physicalDamage.mechanical.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="2" col="9">',
				'			<input data-bind="physicalDamage.mechanical.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="2" col="10">',
				'			<input data-bind="physicalDamage.mechanical.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="2" col="11">',
				'			<input data-bind="physicalDamage.mechanical.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="2" col="12">',
				'			<input data-bind="physicalDamage.mechanical.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="2" col="13">',
				'			<input data-bind="physicalDamage.mechanical.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="2" col="14"  data-bind="physicalDamage.mechanical.riskLevel">',
				'			<span data-bind="physicalDamage.mechanical.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="2" col="15">',
				'			<span data-bind="physicalDamage.mechanical.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="2" col="16">',
				'			<span data-bind="physicalDamage.mechanical.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="003">',
				'		<td class="row-title">电磁危害</td>',
				'		<td row="3" col="1"  data-bind="physicalDamage.electromagnetic.damageLevel">',
				'			<span  data-bind="physicalDamage.electromagnetic.A"  class="check">A</span>',
				'		</td>',
				'		<td row="3" col="2">',
				'			<span data-bind="physicalDamage.electromagnetic.B"  class="check">B</span>',
				'		</td>',
				'		<td row="3" col="3">',
				'			<span data-bind="physicalDamage.electromagnetic.C"  class="check">C</span>',
				'		</td>',
				'		<td row="3" col="4">',
				'			<span data-bind="physicalDamage.electromagnetic.D"  class="check">D</span>',
				'		</td>',
				'		<td row="3" col="5">',
				'			<input data-bind="physicalDamage.electromagnetic.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="3" col="6">',
				'			<input data-bind="physicalDamage.electromagnetic.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="3" col="7">',
				'			<input data-bind="physicalDamage.electromagnetic.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="3" col="8">',
				'			<input data-bind="physicalDamage.electromagnetic.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="3" col="9">',
				'			<input data-bind="physicalDamage.electromagnetic.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="3" col="10">',
				'			<input data-bind="physicalDamage.electromagnetic.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="3" col="11">',
				'			<input data-bind="physicalDamage.electromagnetic.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="3" col="12">',
				'			<input data-bind="physicalDamage.electromagnetic.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="3" col="13">',
				'			<input data-bind="physicalDamage.electromagnetic.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="3" col="14" data-bind="physicalDamage.riskLevel.>',
				'			<span data-bind="physicalDamage.electromagnetic.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="3" col="15">',
				'			<span data-bind="physicalDamage.electromagnetic.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="3" col="16">',
				'			<span data-bind="physicalDamage.electromagnetic.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="004">',
				'		<td class="row-title">发热灼伤及火灾危害</td>',
				'		<td row="4" col="1">',
				'			<span  data-bind="physicalDamage.hotAndFire.A"  class="check">A</span>',
				'		</td>',
				'		<td row="4" col="2">',
				'			<span data-bind="physicalDamage.hotAndFire.B" class="check">B</span>',
				'		</td>',
				'		<td row="4" col="3">',
				'			<span data-bind="physicalDamage.hotAndFire.C" class="check">C</span>',
				'		</td>',
				'		<td row="4" col="4">',
				'			<span data-bind="physicalDamage.hotAndFire.D" class="check">D</span>',
				'		</td>',
				'		<td row="4" col="5">',
				'			<input data-bind="physicalDamage.hotAndFire.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="4" col="6">',
				'			<input data-bind="physicalDamage.hotAndFire.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="4" col="7">',
				'			<input data-bind="physicalDamage.hotAndFire.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="4" col="8">',
				'			<input data-bind="physicalDamage.hotAndFire.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="4" col="9">',
				'			<input data-bind="physicalDamage.hotAndFire.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="4" col="10">',
				'			<input data-bind="physicalDamage.hotAndFire.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="4" col="11">',
				'			<input data-bind="physicalDamage.hotAndFire.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="4" col="12">',
				'			<input data-bind="physicalDamage.hotAndFire.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="4" col="13">',
				'			<input data-bind="physicalDamage.hotAndFire.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="4" col="14">',
				'			<span data-bind="physicalDamage.hotAndFire.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="4" col="15">',
				'			<span data-bind="physicalDamage.hotAndFire.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="4" col="16">',
				'			<span data-bind="physicalDamage.hotAndFire.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="005">',
				'		<td class="row-title">放射性危害</td>',
				'		<td row="5" col="1">',
				'			<span data-bind="physicalDamage.radioactive.A"  class="check">A</span>',
				'		</td>',
				'		<td row="5" col="2">',
				'			<span data-bind="physicalDamage.radioactive.B"  class="check">B</span>',
				'		</td>',
				'		<td row="5" col="3">',
				'			<span  data-bind="physicalDamage.radioactive.C" class="check">C</span>',
				'		</td>',
				'		<td row="5" col="4">',
				'			<span data-bind="physicalDamage.radioactive.D"  class="check">D</span>',
				'		</td>',
				'		<td row="5" col="5">',
				'			<input data-bind="physicalDamage.radioactive.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="5" col="6">',
				'			<input data-bind="physicalDamage.radioactive.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="5" col="7">',
				'			<input data-bind="physicalDamage.radioactive.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="5" col="8">',
				'			<input data-bind="physicalDamage.radioactive.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="5" col="9">',
				'			<input data-bind="physicalDamage.radioactive.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="5" col="10">',
				'			<input data-bind="physicalDamage.radioactive.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="5" col="11">',
				'			<input data-bind="physicalDamage.radioactive.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="5" col="12">',
				'			<input data-bind="physicalDamage.radioactive.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="5" col="13">',
				'			<input data-bind="physicalDamage.radioactive.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="5" col="14">',
				'			<span data-bind="physicalDamage.radioactive.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="5" col="15">',
				'			<span data-bind="physicalDamage.radioactive.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="5" col="16">',
				'			<span data-bind="physicalDamage.radioactive.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="006">',
				'		<td class="row-title">听力视力危害</td>',
				'		<td row="6" col="1">',
				'			<span data-bind="physicalDamage.hearingAndSight.A"  class="check">A</span>',
				'		</td>',
				'		<td row="6" col="2">',
				'			<span data-bind="physicalDamage.hearingAndSight.B"  class="check">B</span>',
				'		</td>',
				'		<td row="6" col="3">',
				'			<span data-bind="physicalDamage.hearingAndSight.C"  class="check">C</span>',
				'		</td>',
				'		<td row="6" col="4">',
				'			<span data-bind="physicalDamage.hearingAndSight.D"  class="check">D</span>',
				'		</td>',
				'		<td row="6" col="5">',
				'			<input data-bind="physicalDamage.hearingAndSight.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="6" col="6">',
				'			<input data-bind="physicalDamage.hearingAndSight.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="6" col="7">',
				'			<input data-bind="physicalDamage.hearingAndSight.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="6" col="8">',
				'			<input data-bind="physicalDamage.hearingAndSight.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="6" col="9">',
				'			<input  data-bind="physicalDamage.hearingAndSight.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="6" col="10">',
				'			<input data-bind="physicalDamage.hearingAndSight.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="6" col="11">',
				'			<input data-bind="physicalDamage.hearingAndSight.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="6" col="12">',
				'			<input data-bind="physicalDamage.hearingAndSight.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="6" col="13">',
				'			<input data-bind="physicalDamage.hearingAndSight.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="6" col="14">',
				'			<span data-bind="physicalDamage.hearingAndSight.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="6" col="15">',
				'			<span data-bind="physicalDamage.hearingAndSight.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="6" col="16">',
				'			<span data-bind="physicalDamage.hearingAndSight.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="007">',
				'		<td class="row-title">物理环境危害</td>',
				'		<td row="7" col="1">',
				'			<span data-bind="physicalDamage.physicalEnvironment.A"  class="check">A</span>',
				'		</td>',
				'		<td row="7" col="2">',
				'			<span data-bind="physicalDamage.physicalEnvironment.B"  class="check">B</span>',
				'		</td>',
				'		<td row="7" col="3">',
				'			<span data-bind="physicalDamage.physicalEnvironment.C"  class="check">C</span>',
				'		</td>',
				'		<td row="7" col="4">',
				'			<span data-bind="physicalDamage.physicalEnvironment.D"  class="check">D</span>',
				'		</td>',
				'		<td row="7" col="5">',
				'			<input data-bind="physicalDamage.physicalEnvironment.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="7" col="6">',
				'			<input data-bind="physicalDamage.physicalEnvironment.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="7" col="7">',
				'			<input data-bind="physicalDamage.physicalEnvironment.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="7" col="8">',
				'			<input data-bind="physicalDamage.physicalEnvironment.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="7" col="9">',
				'			<input data-bind="physicalDamage.physicalEnvironment.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="7" col="10">',
				'			<input data-bind="physicalDamage.physicalEnvironment.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="7" col="11">',
				'			<input data-bind="physicalDamage.physicalEnvironment.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="7" col="12">',
				'			<input data-bind="physicalDamage.physicalEnvironment.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="7" col="13">',
				'			<input data-bind="physicalDamage.physicalEnvironment.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="7" col="14">',
				'			<span data-bind="physicalDamage.physicalEnvironment.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="7" col="15">',
				'			<span data-bind="physicalDamage.physicalEnvironment.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="7" col="16">',
				'			<span data-bind="physicalDamage.physicalEnvironment.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="008">',
				'		<td rowspan="3">化学危害</td>',
				'		<td class="row-title">有毒有害物质危害</td>',
				'		<td row="8" col="1">',
				'			<span  data-bind="chemicalDamage.poisonous.A"  class="check">A</span>',
				'		</td>',
				'		<td row="8" col="2">',
				'			<span data-bind="chemicalDamage.poisonous.B"  class="check">B</span>',
				'		</td>',
				'		<td row="8" col="3">',
				'			<span data-bind="chemicalDamage.poisonous.C"  class="check">C</span>',
				'		</td>',
				'		<td row="8" col="4">',
				'			<span data-bind="chemicalDamage.poisonous.D"  class="check">D</span>',
				'		</td>',
				'		<td row="8" col="5">',
				'			<input data-bind="chemicalDamage.poisonous.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="8" col="6">',
				'			<input data-bind="chemicalDamage.poisonous.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="8" col="7">',
				'			<input data-bind="chemicalDamage.poisonous.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="8" col="8">',
				'			<input data-bind="chemicalDamage.poisonous.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="8" col="9">',
				'			<input data-bind="chemicalDamage.poisonous.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="8" col="10">',
				'			<input data-bind="chemicalDamage.poisonous.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="8" col="11">',
				'			<input data-bind="chemicalDamage.poisonous.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="8" col="12">',
				'			<input data-bind="chemicalDamage.poisonous.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="8" col="13">',
				'			<input data-bind="chemicalDamage.poisonous.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="8" col="14">',
				'			<span data-bind="chemicalDamage.poisonous.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="8" col="15">',
				'			<span data-bind="chemicalDamage.poisonous.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="8" col="16">',
				'			<span data-bind="chemicalDamage.poisonous.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="009">',
				'		<td class="row-title">伤害皮肤危害</td>',
				'		<td row="9" col="1">',
				'			<span  data-bind="chemicalDamage.skinHarmful.A"  class="check">A</span>',
				'		</td>',
				'		<td row="9" col="2">',
				'			<span data-bind="chemicalDamage.skinHarmful.B"  class="check">B</span>',
				'		</td>',
				'		<td row="9" col="3">',
				'			<span data-bind="chemicalDamage.skinHarmful.C"  class="check">C</span>',
				'		</td>',
				'		<td row="9" col="4">',
				'			<span data-bind="chemicalDamage.skinHarmful.D"  class="check">D</span>',
				'		</td>',
				'		<td row="9" col="5">',
				'			<input data-bind="chemicalDamage.skinHarmful.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="9" col="6">',
				'			<input data-bind="chemicalDamage.skinHarmful.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="9" col="7">',
				'			<input data-bind="chemicalDamage.skinHarmful.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="9" col="8">',
				'			<input data-bind="chemicalDamage.skinHarmful.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="9" col="9">',
				'			<input data-bind="chemicalDamage.skinHarmful.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="9" col="10">',
				'			<input data-bind="chemicalDamage.skinHarmful.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="9" col="11">',
				'			<input data-bind="chemicalDamage.skinHarmful.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="9" col="12">',
				'			<input data-bind="chemicalDamage.skinHarmful.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="9" col="13">',
				'			<input data-bind="chemicalDamage.skinHarmful.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="9" col="14">',
				'			<span data-bind="chemicalDamage.skinHarmful.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="9" col="15">',
				'			<span data-bind="chemicalDamage.skinHarmful.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="9" col="16">',
				'			<span data-bind="chemicalDamage.skinHarmful.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="010">',
				'		<td class="row-title">化学环境危害</td>',
				'		<td row="10" col="1">',
				'			<span data-bind="chemicalDamage.chemicalEnvironment.A"  class="check">A</span>',
				'		</td>',
				'		<td row="10" col="2">',
				'			<span data-bind="chemicalDamage.chemicalEnvironment.B"  class="check">B</span>',
				'		</td>',
				'		<td row="10" col="3">',
				'			<span data-bind="chemicalDamage.chemicalEnvironment.C"  class="check">C</span>',
				'		</td>',
				'		<td row="10" col="4">',
				'			<span data-bind="chemicalDamage.chemicalEnvironment.D"  class="check">D</span>',
				'		</td>',
				'		<td row="10" col="5">',
				'			<input data-bind="chemicalDamage.chemicalEnvironment.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="10" col="6">',
				'			<input data-bind="chemicalDamage.chemicalEnvironment.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="10" col="7">',
				'			<input data-bind="chemicalDamage.chemicalEnvironment.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="10" col="8">',
				'			<input data-bind="chemicalDamage.chemicalEnvironment.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="10" col="9">',
				'			<input data-bind="chemicalDamage.chemicalEnvironment.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="10" col="10">',
				'			<input data-bind="chemicalDamage.chemicalEnvironment.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="10" col="11">',
				'			<input data-bind="chemicalDamage.chemicalEnvironment.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="10" col="12">',
				'			<input data-bind="chemicalDamage.chemicalEnvironment.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="10" col="13">',
				'			<input data-bind="chemicalDamage.chemicalEnvironment.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="10" col="14">',
				'			<span data-bind="chemicalDamage.chemicalEnvironment.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="10" col="15">',
				'			<span data-bind="chemicalDamage.chemicalEnvironment.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="10" col="16">',
				'			<span data-bind="chemicalDamage.chemicalEnvironment.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="011">',
				'		<td rowspan="2">生物危害</td>',
				'		<td class="row-title">生物致病危害</td>',
				'		<td row="11" col="1">',
				'			<span data-bind="biologicalDamage.pathogenic.A"  class="check">A</span>',
				'		</td>',
				'		<td row="11" col="2">',
				'			<span  data-bind="biologicalDamage.pathogenic.B"  class="check">B</span>',
				'		</td>',
				'		<td row="11" col="3">',
				'			<span  data-bind="biologicalDamage.pathogenic.C"  class="check">C</span>',
				'		</td>',
				'		<td row="11" col="4">',
				'			<span data-bind="biologicalDamage.pathogenic.D"  class="check">D</span>',
				'		</td>',
				'		<td row="11" col="5">',
				'			<input data-bind="biologicalDamage.pathogenic.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="11" col="6">',
				'			<input data-bind="biologicalDamage.pathogenic.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="11" col="7">',
				'			<input data-bind="biologicalDamage.pathogenic.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="11" col="8">',
				'			<input data-bind="biologicalDamage.pathogenic.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="11" col="9">',
				'			<input data-bind="biologicalDamage.pathogenic.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="11" col="10">',
				'			<input data-bind="biologicalDamage.pathogenic.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="11" col="11">',
				'			<input data-bind="biologicalDamage.pathogenic.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="11" col="12">',
				'			<input data-bind="biologicalDamage.pathogenic.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="11" col="13">',
				'			<input data-bind="biologicalDamage.pathogenic.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="11" col="14">',
				'			<span data-bind="biologicalDamage.pathogenic.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="11" col="15">',
				'			<span data-bind="biologicalDamage.pathogenic.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="11" col="16">',
				'			<span data-bind="biologicalDamage.pathogenic.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="012">',
				'		<td class="row-title">生物环境危害</td>',
				'		<td row="12" col="1">',
				'			<span  data-bind="biologicalDamage.biologicalEnvironment.A"  class="check">A</span>',
				'		</td>',
				'		<td row="12" col="2">',
				'			<span data-bind="biologicalDamage.biologicalEnvironment.B"  class="check">B</span>',
				'		</td>',
				'		<td row="12" col="3">',
				'			<span data-bind="biologicalDamage.biologicalEnvironment.C"  class="check">C</span>',
				'		</td>',
				'		<td row="12" col="4">',
				'			<span data-bind="biologicalDamage.biologicalEnvironment.D"  class="check">D</span>',
				'		</td>',
				'		<td row="12" col="5">',
				'			<input data-bind="biologicalDamage.biologicalEnvironment.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="12" col="6">',
				'			<input data-bind="biologicalDamage.biologicalEnvironment.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="12" col="7">',
				'			<input data-bind="biologicalDamage.biologicalEnvironment.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="12" col="8">',
				'			<input data-bind="biologicalDamage.biologicalEnvironment.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="12" col="9">',
				'			<input data-bind="biologicalDamage.biologicalEnvironment.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="12" col="10">',
				'			<input data-bind="biologicalDamage.biologicalEnvironment.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="12" col="11">',
				'			<input data-bind="biologicalDamage.biologicalEnvironment.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="12" col="12">',
				'			<input data-bind="biologicalDamage.biologicalEnvironment.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="12" col="13">',
				'			<input data-bind="biologicalDamage.biologicalEnvironment.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="12" col="14">',
				'			<span data-bind="biologicalDamage.biologicalEnvironment.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="12" col="15">',
				'			<span data-bind="biologicalDamage.biologicalEnvironment.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="12" col="16">',
				'			<span data-bind="biologicalDamage.biologicalEnvironment.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="013">',
				'		<td rowspan="2">消费者权益危害</td>',
				'		<td class="row-title">消费者受欺诈伤害</td>',
				'		<td row="13" col="1">',
				'			<span  data-bind="consumersRightDamage.cheatedDamage.A" class="check">A</span>',
				'		</td>',
				'		<td row="13" col="2">',
				'			<span data-bind="consumersRightDamage.cheatedDamage.B"  class="check">B</span>',
				'		</td>',
				'		<td row="13" col="3">',
				'			<span data-bind="consumersRightDamage.cheatedDamage.C"  class="check">C</span>',
				'		</td>',
				'		<td row="13" col="4">',
				'			<span data-bind="consumersRightDamage.cheatedDamage.D"  class="check">D</span>',
				'		</td>',
				'		<td row="13" col="5">',
				'			<input data-bind="consumersRightDamage.cheatedDamage.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="13" col="6">',
				'			<input data-bind="consumersRightDamage.cheatedDamage.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="13" col="7">',
				'			<input data-bind="consumersRightDamage.cheatedDamage.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="13" col="8">',
				'			<input data-bind="consumersRightDamage.cheatedDamage.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="13" col="9">',
				'			<input data-bind="consumersRightDamage.cheatedDamage.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="13" col="10">',
				'			<input data-bind="consumersRightDamage.cheatedDamage.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="13" col="11">',
				'			<input data-bind="consumersRightDamage.cheatedDamage.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="13" col="12">',
				'			<input data-bind="consumersRightDamage.cheatedDamage.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="13" col="13">',
				'			<input data-bind="consumersRightDamage.cheatedDamage.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="13" col="14">',
				'			<span data-bind="consumersRightDamage.cheatedDamage.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="13" col="15">',
				'			<span data-bind="consumersRightDamage.cheatedDamage.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="13" col="16">',
				'			<span data-bind="consumersRightDamage.cheatedDamage.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'	<tr id="014">',
				'		<td class="row-title">误导造成的伤害</td>',
				'		<td row="14" col="1">',
				'			<span data-bind="consumersRightDamage.misleadDamage.A"  class="check">A</span>',
				'		</td>',
				'		<td row="14" col="2">',
				'			<span data-bind="consumersRightDamage.misleadDamage.B"  class="check">B</span>',
				'		</td>',
				'		<td row="14" col="3">',
				'			<span data-bind="consumersRightDamage.misleadDamage.C"  class="check">C</span>',
				'		</td>',
				'		<td row="14" col="4">',
				'			<span data-bind="consumersRightDamage.misleadDamage.D"  class="check">D</span>',
				'		</td>',
				'		<td row="14" col="5">',
				'			<input data-bind="consumersRightDamage.misleadDamage.q11" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="14" col="6">',
				'			<input data-bind="consumersRightDamage.misleadDamage.q12" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="14" col="7">',
				'			<input data-bind="consumersRightDamage.misleadDamage.q13" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="14" col="8">',
				'			<input data-bind="consumersRightDamage.misleadDamage.q21" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="14" col="9">',
				'			<input data-bind="consumersRightDamage.misleadDamage.q22" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="14" col="10">',
				'			<input data-bind="consumersRightDamage.misleadDamage.q23" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="14" col="11">',
				'			<input data-bind="consumersRightDamage.misleadDamage.q24" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="14" col="12">',
				'			<input data-bind="consumersRightDamage.misleadDamage.q25" type="text" class="ipt"/>',
				'		</td>',
				'		<td row="14" col="13">',
				'			<input data-bind="consumersRightDamage.misleadDamage.Q" type="text" disabled class="ipt"/>',
				'		</td>',
				'		<td row="14" col="14">',
				'			<span data-bind="consumersRightDamage.misleadDamage.riskHigh" type="risk" class="risk"><span class="riskText highRisk">高</span></span>',
				'		</td>',
				'		<td row="14" col="15">',
				'			<span data-bind="consumersRightDamage.misleadDamage.riskLessHigh" type="risk" class="risk"><span class="riskText lessHighRisk">较高</span></span>',
				'		</td>',
				'		<td row="14" col="16">',
				'			<span data-bind="consumersRightDamage.misleadDamage.riskNormal" type="risk" class="risk"><span class="riskText normalRisk">一般</span></span>',
				'		</td>',
				'	</tr>',
				'</tbody>',
				'<tfoot>',
				'	<tr>',
				'		<td colspan="2">产品整体风险评价</td>',
				'		<td colspan="16">',
				'			<input data-bind="superviseComment" disabled type="text" class="ipt"/>',
				'		</td>',
				'	</tr>',
				'</tfoot>',
				'</table>',
				'     </div>',
				'     <div class="modal-footer">',
				'		<button type="button" class="btn btn-primary hook-ok">确定</button>',
				'		<button type="button" class="btn btn-primary hook-reset">重置</button>',
				'		<button type="button" class="btn btn-default hook-cancel" data-dismiss="modal">取消</button>',
				'     </div>',
				'   </div>',
				' </div>',
				'</div>'
			];
			return tb.join("");
		}
	}
})