import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');


// <创建内容，保存为正常（已发布）>
api.getTags = function(cnt, callback) {
	util.call(baseUrl + '/content/getTags', cnt, callback)
}

//根据标签id获取 内容列表
api.getContents = function(cnt, callback) {
	util.call(baseUrl + '/content/getContents', cnt, callback)
}
	


export default api
