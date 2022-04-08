import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://xxxxx/xxx/xxx',
    timeout: 5000
  });

  // axios请求拦截
  instance.interceptors.request.use(config => {
    // config.headers.Authorization = window.sessionStorage.getItem('token');
    // 拦截之后必须返还信息
    return config
  }, err => {
    console.log(err);
 });

  return instance(config)
}
