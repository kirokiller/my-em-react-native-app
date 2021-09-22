/**
 * 接口配置
 * dev: 开发
 * test: 测试
 * prd: 生产
 */
import { Platform } from "em-react-native";
// import SnsShare from "./sns-share";
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
  if (Platform.OS == "web") {
    /* const settings = (window as any).globalAppSettings;
    if (settings) {
      config = {
        link: settings["link"] + '/securities/api/data/v1/get',
        h5Server: settings["h5Server"] + "/dztrade",
        h5Resource: settings["h5Resource"] + "/public/resource/img/",
        searchLink: settings['searchLink'] + '/dc/ABase/SearchStockInfo'
      };
    }
    config.share = function (route: string, title: string) {
      new SnsShare("#index-share", {
        shareData: {
          title: decodeURI(title),
          desc: "查看市场大宗交易详情，就用东方财富APP", //decodeURI(desc),
          imgUrl: config.h5Resource + "wechatlogo.png",
          link: window.location.href,
        },
      });
    }; */
  } else {
    config.share = function (route: any, title: string) {
      return {
        filters: ["weixin", "pengyouquan", "weibo", "qq", "qzone"],
        title: decodeURI(title),
        image: config.h5Resource + "wechatlogo.png",
        desc: "查看市场大宗交易详情，就用东方财富APP", //decodeURI(desc),
        url: `${config.h5Server + route}`,
      };
    };
  }
  return config;
}
export default useConfig();

