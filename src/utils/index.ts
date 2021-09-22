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