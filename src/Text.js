/**
 * 设置全局字体
 */

import { Text, Platform } from 'react-native'
import { cloneElement } from 'react'
import _ from 'lodash'

Text.prototype.render = _.wrap(Text.prototype.render, function (func, ...args) {
  let originText = func.apply(this, args);
  let attrs 
  if (Platform.OS !== 'web') {
    attrs = {
      style: [
        {
          fontFamily: 'PingFang SC'
        },
        originText.props.style
      ]
    }
    attrs.allowFontScaling = false
  }else{
    attrs = {
      style: {...originText.props.style, ...{fontFamily: 'PingFang SC'}}
    }
  }
  return cloneElement(originText, attrs);
});
