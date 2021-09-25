import { Platform, StyleSheet } from 'react-native'
/**
 * 一像素函数
 * @returns
 */
export function singlePx() {
  return Platform.OS == 'web'
    ? 1
    : StyleSheet.hairlineWidth
}


//x轴时间数组构造函数
export function echartTimeArr() {
  let miniteArr = [];
  for (let i = 0; i < 60; i++) {
    let j = i < 10 ? '0' + i : i + ''
    miniteArr.push(j)
  }
  let timeArr = [];
  let initHour = 9;
  while (initHour >= 9 && initHour < 15) {
    if (initHour == 12) {
      initHour++;
      continue;
    }
    if (initHour == 9) {
      for (let i = 31; i < miniteArr.length; i++) {
        timeArr.push(initHour + ':' + i)
      }
    } else if (initHour == 11) {
      for (let i = 0; i <= 30; i++) {
        timeArr.push(initHour + ':' + miniteArr[i])
      }
    } else {
      let i = 0;
      if (initHour == 13) {
        i++
      }
      for (; i < miniteArr.length; i++) {
        timeArr.push(initHour + ':' + miniteArr[i])
      }
    }
    initHour++;
  }
  timeArr.push('15:00')
  return timeArr
}