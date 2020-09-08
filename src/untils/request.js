/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
const getTokenHeader = () => {
  const header = {};
  const token = localStorage.getItem('iop-auth-token');
  if (token) {
    header['token'] = token;
  } else {
    router.push('/login')
  }
  return header;
};
/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: errortext,
  });
};

/**
 * 配置request请求时的默认参数
 */
const extendRequest = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  getResponse: true, // 返回原始response
  requestType: 'json', // POST 默认请求格式，动态设置 Content-Type，可手动设置 headers 覆盖
});

const request = async (url, option) => {
  const requestOption = option || {};
  let header = getTokenHeader();
  const optionHeader = (option && option.header) || {};
  header = { ...header, ...optionHeader };
  requestOption.headers = header;
  const res = extendRequest(url, requestOption);
  const { data } = await res;
  if (data.code === 401) {
    router.push('/login')
  } else {
    return data;
  }
};

export default request;
