const moment = require('moment')
var configs=require('../config')
const debug = require('debug')('controllers.health')
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
function save(body) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(' enough sleep~');
    //     }, body);
    // })
    // return mysql('memberInfo').select('*').where({ open_id: openId }).first();
    
    let open_id = body.openId;
    let keys=Object.keys(body);
    let memberdata={};
    let allkeys=["name","gender","birthday","option1","option2","option3","option4","option5","option6","option7","option8","option9","result"]
    for(let i=0;i<keys.length;i++){
    	if(allkeys.indexOf(keys[i])!=-1){
    		memberdata[keys[i]]=body[keys[i]];
    	}
    }
    return mysql('yiyumember').count('open_id as hasMember').where({
        open_id
    })
    .then(res => {
        // 如果存在用户则更新
        if (res[0].hasMember) {
            return mysql('yiyumember').update(memberdata).where({
                open_id
            })
        } else {
        	memberdata.open_id=open_id;
            return mysql('yiyumember').insert(memberdata)
        }
    })
    .then(() => ({
        open_id: open_id
    }))
    .catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

function getyiyuend(openId){
    return mysql('yiyumember').select('*').where({ open_id: openId }).first();
}
// 用户信息接口
module.exports = {
    // 小程序请求 websocket 地址
    get: async ctx => {
        // const data = await tunnel.getTunnelUrl(ctx.req)
        // const tunnelInfo = data.tunnel

        // userMap[tunnelInfo.tunnelId] = data.userinfo
        let openId=ctx.query.openId;
        let data = await getyiyuend(openId)
        let result=0;
        for(let i=1;i<10;i++){
        	if(data["option"+i]!=undefined){
        		result+=parseInt(data["option"+i]);
        		console.log(data["option"+i]);
        	}
        }
        await save({openId:openId,result:result})
        ctx.state.data ={result:result};
    },

    // 信道将信息传输过来的时候
    post: async ctx => {
        let create_time = moment().format('YYYY-MM-DD HH:mm:ss')
        let last_visit_time = create_time
    	let body=ctx.request.body;
        let val = await save(body)
        ctx.state.data =val;
    }

}