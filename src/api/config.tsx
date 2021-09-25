/**
 * 接口配置
 * dev: 开发
 * test: 测试
 * prd: 生产
 */
const env = "prd";
interface coninterface {
  link: string;
  h5Server: string;
  searchLink: string;
  share?: any;
  h5Resource: any;
}

function useConfig() {
  let config: coninterface = {
    dev: {
      link: "http://172.30.66.33:9500/DataCenterRN_API",
      h5Server: "http://emtest5.eastmoney.com/dztrade/",
      h5Resource: "https://emfed.eastmoney.com/public/resource/img/",
      searchLink: 'https://emdatah5.eastmoney.com/dc/ABase/SearchStockInfo'
    },
    test: {
      link: "https://graydatacenter.eastmoney.com/securities/api/data/v1/get",
      h5Server: "http://emtest5.eastmoney.com/dztrade/",
      h5Resource: "https://emfed.eastmoney.com/public/resource/img/",
      searchLink: 'https://emdatah5.eastmoney.com/dc/ABase/SearchStockInfo'
    },
    prd: {
      link: "https://datacenter.eastmoney.com/securities/api/data/v1/get",
      h5Server: "https://emrnweb.eastmoney.com/dztrade/",
      h5Resource: "https://emfed.eastmoney.com/public/resource/img/",
      searchLink: 'https://emdatah5.eastmoney.com/dc/ABase/SearchStockInfo'
    },
  }[env];
  config.share = function (route: any, title: string) {
    return {
      filters: ["weixin", "pengyouquan", "weibo", "qq", "qzone"],
      title: decodeURI(title),
      image: config.h5Resource + "wechatlogo.png",
      desc: "查看市场大宗交易详情，就用东方财富APP", //decodeURI(desc),
      url: `${config.h5Server + route}`,
    };
  };
  return config;
}
export default useConfig();

