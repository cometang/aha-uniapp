const commen = {}


/**
 *@tryParseJson json转换容错
 *
 * @param data      需要json.parse的数据
 * @param dataType  异常后期望返回的类型（{} []）
 * @param isCompel  是否强制转换
 */
commen.tryParseJson = function(data,dataType=[],isCompel=true) {
    let resData = null
    try {
        resData = JSON.parse(data)
    }
    catch (e) {
        console.log('数据异常'+e)
        resData = isCompel?dataType:data
    }
    return resData
}


export default commen