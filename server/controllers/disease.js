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
function save(body) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(' enough sleep~');
    //     }, body);
    // })
    // return mysql('memberInfo').select('*').where({ open_id: openId }).first();
    
    const open_id = body.openId;
    return mysql('diseaseInfo').count('open_id as hasMember').where({
        open_id
    })
    .then(res => {
        // 如果存在用户则更新
        if (res[0].hasMember) {
            return mysql('diseaseInfo').update({
                icd10:JSON.stringify(body.icd10)
            }).where({
                open_id
            })
        } else {
            return mysql('diseaseInfo').insert({
                open_id, 
                icd10:JSON.stringify(body.icd10)
            })
        }
    })
    .then(() => ({
        open_id: open_id,
        icd10:body.icd10
    }))
    .catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

function getdiseaseinfo(openId){
    return mysql('diseaseInfo').select('*').where({ open_id: openId }).first();
}
// 用户信息接口
module.exports = {
    // 小程序请求 websocket 地址
    get: async ctx => {
        var openId=ctx.query.openId;
        var data = await getdiseaseinfo(openId)
        ctx.state.data =data;
    },

    // 信道将信息传输过来的时候
    post: async ctx => {
        const create_time = moment().format('YYYY-MM-DD HH:mm:ss')
        const last_visit_time = create_time
    	var body=ctx.request.body;
        var val = await save(body);
        ctx.state.data =val;
    }

}