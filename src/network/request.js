import axios from 'axios'
import QS from 'qs'
// export function request(config,success,failure) {
//     //1.创建axios实例
//     const instance = axios.create({
//         baseURL:'http://123.207.32.32:8000',
//         timeout: 5000
//     })
//     //2.发送真正的网络请求
//     instance(config)
//         .then(res =>{
//             success(res)
//         })
//         .catch(err =>{
//             failure(err)
//         })
//
// }

// export function request(config) {
//     //1.创建axios实例
//     const instance = axios.create({
//         baseURL:'http://123.207.32.32:8000',
//         timeout: 5000
//     })
//     //2.发送真正的网络请求
//     instance(config.url)
//         .then(res =>{
//             config.success(res)
//         })
//         .catch(err =>{
//             config.failure(err)
//         })
//
// }

// export function request(config) {
//     return new Promise((resolve,reject) =>{
//         //1.创建axios实例
//         const instance = axios.create({
//             baseURL:'http://123.207.32.32:8000',
//             timeout: 5000
//         })
//         //2.发送真正的网络请求
//         instance(config)
//             .then(res =>{
//                 resolve(res)
//             })
//             .catch(err =>{
//                reject(err)
//             })
//     })
//
// }


//终极封装
export function request(config) {

        //1.创建axios实例
        const instance = axios.create({
            baseURL:'http://localhost:8000',
            timeout: 5000
        })
        //2.发送真正的网络请求
        return instance(config)


}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        //1.创建axios实例

        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
}




