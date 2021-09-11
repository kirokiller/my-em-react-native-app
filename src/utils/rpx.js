'use strict'

import { Dimensions } from 'react-native'

const deviceW = Math.min(414, Dimensions.get('window').width)

const basePx = 750

export default function rpx(px) {
  return (px * deviceW) / basePx
}
