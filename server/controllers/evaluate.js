const moment = require('moment')
var configs=require('../config')
const debug = require('debug')('controllers.member')
var mysql=require('knex')({
    client: 'mysql',
    connection: {
        host: configs.mysql.host,
        port: configs.mysql.port,
        user: configs.mysql.user,
        password: configs.mysql.pass,
        database: configs.mysql.db,
        charset: configs.mysql.char
    }
})
function update(body) {
    const open_id = body.openId;
    return mysql('memberInfo').count('open_id as hasMember').where({
        open_id
    })
    .then(res => {
        // 如果存在用户则更新
        if (res[0].hasMember) {
            return mysql('memberInfo').update({
                kind:body.kind,
                result:body.result
            }).where({
                open_id
            })
        } else {
            return mysql('memberInfo').insert({
                open_id, 
                kind:body.kind,
                result:body.result
            })
        }
    })
    .then(() => ({
        open_id: open_id,
        kind:body.kind,
        result:body.result
    }))
    .catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}
function getdiseaseinfo(openId){
    return mysql('diseaseInfo').select('*').where({ open_id: openId }).first();
}
function gethealthinfo(openId){
    return mysql('healthInfo').select('*').where({ open_id: openId }).first();
}
function getmemberinfo(openId){
    return mysql('memberInfo').select('*').where({ open_id: openId }).first();
}
function evaluatemem(member,health,disease){
	var kind="";
	var result="";
	var ageold40=moment().subtract(40, 'years').format('YYYY-MM-DD')>=member.birthday;
	var ageold55=moment().subtract(55, 'years').format('YYYY-MM-DD')>=member.birthday;
	//男性>=45岁、女性>=55岁
	var judgeageflag=false;
	if(member.gender=="男"){
		judgeageflag=moment().subtract(45, 'years').format('YYYY-MM-DD')>=member.birthday;
	}else{
		judgeageflag=moment().subtract(55, 'years').format('YYYY-MM-DD')>=member.birthday;
	}
	var tangniaoflag=false;
	var tangniaobingfaflag=false;
	var icd10=JSON.parse(disease.icd10);
	for(code in icd10["11"].subdise){
		if(icd10["11"].subdise[code].choose){
			tangniaoflag=true;
			break;
		}
	}
	for(code in icd10["12"].subdise){
		if(icd10["12"].subdise[code].choose){
			tangniaobingfaflag=true;
			break;
		}
	}
	var gaoxueyaflag=false;
	for(code in icd10["15"].subdise){
		if(icd10["15"].subdise[code].choose){
			gaoxueyaflag=true;
			break;
		}
	}
	var naoxueguanflag=false;
	for(code in icd10["6"].subdise){
		if(icd10["6"].subdise[code].choose){
			naoxueguanflag=true;
			break;
		}
	}
	var zhouweixueguanflag=false;
	for(code in icd10["7"].subdise){
		if(icd10["7"].subdise[code].choose){
			zhouweixueguanflag=true;
			break;
		}
	}
	var xinzangflag=false;
	for(code in icd10["9"].subdise){
		if(icd10["9"].subdise[code].choose){
			xinzangflag=true;
			break;
		}
	}
	//一、直接诊断
	//1、极高危：if 风险评估中，选中了ASCVD或ASCVD大类下面的任何一类（包括急性心梗、冠心病猝死、其他冠心病死亡、急性缺血性卒中、有症状的周围血管病患者）
	if(naoxueguanflag||zhouweixueguanflag||xinzangflag){
		if(kind===""&&result===""){
			kind="直接诊断";
			result="极高危";
		}
	}
	//2、高危：if {【风险评估中，选中了糖尿病或糖尿病并发症大类下面的任何一类 且年龄>=40岁】
		// 或者【LDL-C>=4.9mmol/L(190mg/dl)】或者【TC>=7.2mmol/L（280mg/dl)】
		// 或者【风险评估中，选中吸烟>=30支/d】或者【收缩压>=180mmHg和（或）舒张压>=110mmHg】
		// 或者【吸烟>=30支/d】
	if(((tangniaobingfaflag||tangniaoflag)&&ageold40)||health.LDLC>=4.9||health.cholesterol>=7.2||
		health.smokevalue>=30||(health.systolicpressure>=180||health.diastolicpressure>=110)){
		if(kind===""&&result===""){
			kind="直接诊断";
			result="高危";
		}
	}
	//二、10年发病风险
	//判断风险因子个数：危险因素：吸烟、低HDL-C、男性>=45岁、女性>=55岁
	var factorsnum2=0;
	if(judgeageflag){
		factorsnum2++;
	}
	if(health.smokevalue>0){
		factorsnum2++;
	}
	if(health.HDLC<0.91){
		factorsnum2++;
	}
	//1、高危： if 高血压=Y，且 【危险因素=2】且【4.1mmol/L=<TC<5.2mmol/L或2.6mmol/L=<LDL-C<3.4mmol/L】
	if(gaoxueyaflag&&factorsnum2==2&&((health.cholesterol>=4.1&&health.cholesterol<5.2)||(health.LDLC>=2.6&&health.LDLC<3.4))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="高危";
		}
	}
	//2、高危： if 高血压=Y，且 【危险因素=2】且【5.2mmol/L=<TC<7.2mmol/L或3.4mmol/L=<LDL-C<4.9mmol/L】
	if(gaoxueyaflag&&factorsnum2==2&&((health.cholesterol>=5.2&&health.cholesterol<7.2)||(health.LDLC>=3.4&&health.LDLC<4.9))){
		if(kind===""&&result===""){	
			kind="10年发病风险";
			result="高危";
		}
	}
	//3、高危： if 高血压=Y，且 【危险因素=3】且【3.1mmol/L=<TC<4.1mmol/L或1.8mmol/L=<LDL-C<2.6mmol/L】
	if(gaoxueyaflag&&factorsnum2==3&&((health.cholesterol>=3.1&&health.cholesterol<4.1)||(health.LDLC>=1.8&&health.LDLC<2.6))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="高危";
		}
	}
	//4、高危： if 高血压=Y，且 【危险因素=3】且【4.1mmol/L=<TC<5.2mmol/L或2.6mmol/L=<LDL-C<3.4mmol/L】
	if(gaoxueyaflag&&factorsnum2==3&&((health.cholesterol>=4.1&&health.cholesterol<5.2)||(health.LDLC>=2.6&&health.LDLC<3.4))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="高危";
		}
	}
	//5、高危： if 高血压=Y，且 【危险因素=3】且【5.2mmol/L=<TC<7.2mmol/L或3.4mmol/L=<LDL-C<4.9mmol/L】
	if(gaoxueyaflag&&factorsnum2==3&&((health.cholesterol>=5.2&&health.cholesterol<7.2)||(health.LDLC>=3.4&&health.LDLC<4.9))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="高危";
		}
	}

	//6、低危： if 高血压=N，且 【危险因素=0或1】且【3.1mmol/L=<TC<4.1mmol/L或1.8mmol/L=<LDL-C<2.6mmol/L】
	if(!gaoxueyaflag&&(factorsnum2==0||factorsnum2==1)&&((health.cholesterol>=3.1&&health.cholesterol<4.1)||(health.LDLC>=1.8&&health.LDLC<2.6))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="低危";
		}
	}
	//7、低危： if 高血压=N，且 【危险因素=0或1】且【4.1mmol/L=<TC<5.2mmol/L或2.6mmol/L=<LDL-C<3.4mmol/L】
	if(!gaoxueyaflag&&(factorsnum2==0||factorsnum2==1)&&((health.cholesterol>=4.1&&health.cholesterol<5.2)||(health.LDLC>=2.6&&health.LDLC<3.4))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="低危";
		}
	}
	//8、低危： if 高血压=N，且 【危险因素=0或1】且【5.2mmol/L=<TC<7.2mmol/L或3.4mmol/L=<LDL-C<4.9mmol/L】
	if(!gaoxueyaflag&&(factorsnum2==0||factorsnum2==1)&&((health.cholesterol>=5.2&&health.cholesterol<7.2)||(health.LDLC>=3.4&&health.LDLC<4.9))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="低危";
		}
	}
	//9、低危： if 高血压=N，且 【危险因素=2】且【3.1mmol/L=<TC<4.1mmol/L或1.8mmol/L=<LDL-C<2.6mmol/L】
	if(!gaoxueyaflag&&factorsnum2==2&&((health.cholesterol>=3.1&&health.cholesterol<4.1)||(health.LDLC>=1.8&&health.LDLC<2.6))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="低危";
		}
	}
	//10、低危： if 高血压=N，且 【危险因素=2】且【4.1mmol/L=<TC<5.2mmol/L或2.6mmol/L=<LDL-C<3.4mmol/L】
	if(!gaoxueyaflag&&factorsnum2==2&&((health.cholesterol>=4.1&&health.cholesterol<5.2)||(health.LDLC>=2.6&&health.LDLC<3.4))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="低危";
		}
	}
	//11、低危： if 高血压=N，且 【危险因素=3】且【3.1mmol/L=<TC<4.1mmol/L或1.8mmol/L=<LDL-C<2.6mmol/L】
	if(!gaoxueyaflag&&factorsnum2==3&&((health.cholesterol>=3.1&&health.cholesterol<4.1)||(health.LDLC>=1.8&&health.LDLC<2.6))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="低危";
		}
	}
	//12、低危： if 高血压=Y，且 【危险因素=0】且【3.1mmol/L=<TC<4.1mmol/L或1.8mmol/L=<LDL-C<2.6mmol/L】
	if(gaoxueyaflag&&factorsnum2==0&&((health.cholesterol>=3.1&&health.cholesterol<4.1)||(health.LDLC>=1.8&&health.LDLC<2.6))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="低危";
		}
	}
	//13、低危： if 高血压=Y，且 【危险因素=0】且【4.1mmol/L=<TC<5.2mmol/L或2.6mmol/L=<LDL-C<3.4mmol/L】
	if(gaoxueyaflag&&factorsnum2==0&&((health.cholesterol>=4.1&&health.cholesterol<5.2)||(health.LDLC>=2.6&&health.LDLC<3.4))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="低危";
		}
	}
	//14、低危： if 高血压=Y，且 【危险因素=0】且【5.2mmol/L=<TC<7.2mmol/L或3.4mmol/L=<LDL-C<4.9mmol/L】
	if(gaoxueyaflag&&factorsnum2==0&&((health.cholesterol>=5.2&&health.cholesterol<7.2)||(health.LDLC>=3.4&&health.LDLC<4.9))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="低危";
		}
	}
	//15、低危： if 高血压=Y，且 【危险因素=1】且【3.1mmol/L=<TC<4.1mmol/L或1.8mmol/L=<LDL-C<2.6mmol/L】
	if(gaoxueyaflag&&factorsnum2==1&&((health.cholesterol>=3.1&&health.cholesterol<4.1)||(health.LDLC>=1.8&&health.LDLC<2.6))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="低危";
		}
	}

	//16、中危： if 高血压=N，且 【危险因素=2】且【5.2mmol/L=<TC<7.2mmol/L或3.4mmol/L=<LDL-C<4.9mmol/L】
	if(!gaoxueyaflag&&factorsnum2==2&&((health.cholesterol>=5.2&&health.cholesterol<7.2)||(health.LDLC>=3.4&&health.LDLC<4.9))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="中危";
		}
	}
	//17、中危： if 高血压=N，且 【危险因素=3】且【4.1mmol/L=<TC<5.2mmol/L或2.6mmol/L=<LDL-C<3.4mmol/L】
	if(!gaoxueyaflag&&factorsnum2==3&&((health.cholesterol>=4.1&&health.cholesterol<5.2)||(health.LDLC>=2.6&&health.LDLC<3.4))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="中危";
		}
	}
	//18、中危： if 高血压=N，且 【危险因素=3】且【5.2mmol/L=<TC<7.2mmol/L或3.4mmol/L=<LDL-C<4.9mmol/L】
	if(!gaoxueyaflag&&factorsnum2==3&&((health.cholesterol>=5.2&&health.cholesterol<7.2)||(health.LDLC>=3.4&&health.LDLC<4.9))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="中危";
		}
	}

	//19、中危： if 高血压=Y，且 【危险因素=1】且【4.1mmol/L=<TC<5.2mmol/L或2.6mmol/L=<LDL-C<3.4mmol/L】
	if(gaoxueyaflag&&factorsnum2==1&&((health.cholesterol>=4.1&&health.cholesterol<5.2)||(health.LDLC>=2.6&&health.LDLC<3.4))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="中危";
		}
	}
	//20、中危： if 高血压=Y，且 【危险因素=1】且【5.2mmol/L=<TC<7.2mmol/L或3.4mmol/L=<LDL-C<4.9mmol/L】
	if(gaoxueyaflag&&factorsnum2==1&&((health.cholesterol>=5.2&&health.cholesterol<7.2)||(health.LDLC>=3.4&&health.LDLC<4.9))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="中危";
		}
	}
	//21、中危： if 高血压=Y，且 【危险因素=2】且【3.1mmol/L=<TC<4.1mmol/L或1.8mmol/L=<LDL-C<2.6mmol/L】
	if(gaoxueyaflag&&factorsnum2==2&&((health.cholesterol>=3.1&&health.cholesterol<4.1)||(health.LDLC>=1.8&&health.LDLC<2.6))){
		if(kind===""&&result===""){
			kind="10年发病风险";
			result="中危";
		}
	}
	//三、余生发病风险
	//风险因素个数：
	// 1、收缩压>=160mmHg和（或）舒张压>=100mmHg
	// 2、HDL-C<1.0mmol/L(40mg/dl)
	// 3、非-HDL-C>=5.2mmol/L(200mg/dl)    
	// 4、BMI>=28kg/m2
	// 5、吸烟
	var factorsnum3=0;
	if(health.systolicpressure>=160||health.diastolicpressure>=100){
		factorsnum3++
	}
	if(health.HDLC<1.0){
		factorsnum3++
	}
	// var nonhdlc=health.cholesterol-health.HDLC;
	var nonhdlc=health.cholesterol;
	if(nonhdlc>=5.2){
		factorsnum3++
	}
	var BMI=health.weight/((health.height/100)*(health.height/100))
	if(BMI>=28){
		factorsnum3++
	}
	if(health.smokevalue>0){
		factorsnum3++
	}
	if(kind=="10年发病风险"&&result=="中危"&&!ageold55&&factorsnum3>=2){
		kind="余生发病风险";
		result="高危";
	}
	return {kind:kind,result:result};
}

// 用户信息接口
module.exports = {
    // 小程序请求 websocket 地址
    get: async ctx => {
        var openId=ctx.query.openId;
        var member = await getmemberinfo(openId);
        var health = await gethealthinfo(openId);
        var disease = await	getdiseaseinfo(openId);
        var evaluateresult=evaluatemem(member,health,disease);
        evaluateresult.openId=openId;
        var data = await update(evaluateresult);
        ctx.state.data =data;
    },

    // 信道将信息传输过来的时候
    post: async ctx => {
        ctx.state.data ={};
    }

}