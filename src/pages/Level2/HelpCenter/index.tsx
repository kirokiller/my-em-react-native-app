import { rpx } from 'emrn-common'
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import CommSection from '../../../components/CommSection'
import CommDivider from '../../../components/CommDivider'
import Theme from 'emrn-common/styles/theme'

interface Props {

}

interface State {

}

export default class HelpCenter extends Component<Props, State> {
  styles: any
  constructor(props: Props) {
    super(props)
    this.state = {

    }
    this.styles = getCss()
  }

  toDetail(item: any) {
    // 跳转详情
  }

  render() {
    const data = [
      { content: '新用户如何开通获取手机Level-2' },
      { content: '手机Level-2和PC Level-2的区别' },
      { content: '权限到期，如果续费购买Level-2' },
    ]
    const { styles } = this;
    return (
      <CommSection title="帮助中心">
        {data.map((item, index) =>
          <View>
            <View style={styles.itemContainer} key={index}>
              <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.content}
              </Text>
              <TouchableWithoutFeedback
                onPress={this.toDetail.bind(this, item)}
              >
                <Image
                  style={styles.icon}
                  source={Theme.getValue('$iconMore')}
                />
              </TouchableWithoutFeedback>
            </View>
            {index !== data.length - 1 && <CommDivider />}
          </View>
        )}
      </CommSection>
    )
  }
}

function getCss() {
  return StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: rpx(30),
    },
    title: {
      flex: 1,
      color: Theme.getValue('$color16'),
    },
    icon: {
      marginLeft: rpx(8),
      width: rpx(28),
      height: rpx(28)
    }
  })
}