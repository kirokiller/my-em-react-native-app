import config from './config'
let serverList: any
export default async function getServerList() {
  serverList = {
    choiceServer: config.link,
  }
  return serverList
}