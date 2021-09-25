import Logger from 'emrn-common/utils/logger'
import EmAlert from 'emrn-common/components/EmAlert'
import { GMT8 } from 'emrn-common/utils/format'
import axios from 'axios'
import getServerList from './serverList'
const errorMessage = '网络繁忙，请稍候重试'
const timeout = 20 * 1000;


interface RequestOptions {
  method: string
  url: string
  params: any
  header: object
  timeout: number,
  responseType: string
}
export interface ApiReponse {
  status: number,
  data: any
  message: string
  serverTime?: Date
}
export default async function request(
  method: string,
  apiName: string,
  params: object | null,
  address = 'choiceServer'
): Promise<ApiReponse> {
  const header: any = {
    'Content-Type': 'application/x-www-form-urlencoded ;charset=UTF-8'
  }
  const serverList = await getServerList()
  const options = {
    method,
    url: `${serverList[address]}${apiName}`,
    params,
    header,
    timeout,
    responseType: 'json'
  }
  console.log(`[ajax options]:`, options)
  Logger.log(`[请求choice数据接口入参]: ${JSON.stringify(options)}`)
  return new Promise((resolve, reject) => {
    axios(options).then((res) => {
      const status = res.status;
      if (status === 200) {
        let serverTime = new Date()
        if (res.headers['date']) {
          serverTime = GMT8(res.headers['date'])
        }
        let { data } = res;
        console.log(`[response]: `, res.data)
        return responseHandler(
          options,
          {
            status: 0,
            data,
            message: '',
            serverTime,
          },
          resolve,
          reject,
        )
      }
    }).catch((error) => {
      console.log(error)
      Logger.log(`[请求失败(${options.url})]:${error}`)
      let message = errorMessage;
      if (/timeout/i.test(error + '')) {
        message = '请求超时,请稍后再试'
      }
      return responseHandler(
        options,
        {
          status: 2,
          data: null,
          message,
        },
        resolve,
        reject,
      )
    })
  })
}

function responseHandler(
  options: RequestOptions,
  result: any,
  resolve: (result: ApiReponse) => void,
  reject: (result: string) => void,
) {
  const { status, message } = result
  if (status == 0) {
    Logger.log(`[响应内容(${options.url})]:成功 status=0`)
    resolve(result)
  } else {
    Logger.log(`[响应内容(${options.url})]:${JSON.stringify(result)}`)
    reject(message)
  }
}

