import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Theme from 'emrn-common/styles/theme'
import rpx from 'emrn-common/utils/rpx'
import EmAlert from 'emrn-common/components/EmAlert'
import EmToast from 'emrn-common/components/EmToast'
import CommDivider from '../../../components/CommDivider'
import { toastDuration } from '../../../constants'

interface Props {

}

/* 
  UNOPEN  未开通
  OPEN  已开通
  DUESOON 即将到期
  EXPIRED 已到期
  UNKNOW  未知
*/
enum Authoritis { UNOPEN, OPEN, DUESOON, EXPIRED, UNKNOW }

interface State {
  data: {
    authority: Authoritis, // 权限
    date: string | null, // 到期时间
    devices: number,  // 登录设备数
    isOpenRemind: boolean, // 是否开启到期提醒
  }
}

export default class Card extends Component<Props, State> {
  styles: any

  constructor(props: Props) {
    super(props)
    this.state = {
      data: {
        authority: Authoritis.DUESOON,
        date: '2021-09-20',
        devices: 0,
        isOpenRemind: true,
      }
    }
    this.styles = getCss()
  }

  // 切换Lv2行情
  changeLv2Market = () => {
    EmAlert({
      message: '本设备已成功获取Level-2行情',
      buttons: ['确定']
    })
  }

  // 到期提醒
  changeRemind = () => {
    const { data: { isOpenRemind } } = this.state;
    EmToast(isOpenRemind ? '已取消Level-2权限到期提醒' : '已成功开启Level-2权限到期提醒', toastDuration)
    this.setState({
      data: { ...this.state.data, isOpenRemind: !isOpenRemind }
    })
  }

  // 权限描述
  renderDesc = () => {
    const { styles } = this;
    const { data: { authority, date, devices } } = this.state;

    const renderDeviceInfo = () => {
      if (devices === 0 || devices === 1) {
        return '当前设备已登录Level-2行情'
      }
      return '其他设备已登录Level-2行情'
    }

    const renderTitle = (tagName: string) => {
      return <View style={[styles.titleContainer, styles.descMargin]}>
        <Text style={styles.titleText}>手机超级Level-2</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{tagName}</Text>
        </View>
      </View>
    }

    switch (authority) {
      case Authoritis.UNOPEN:
        return <React.Fragment>
          <Text style={[styles.titleText, styles.descMargin, { fontWeight: 'normal' }]}>手机超级Level-2</Text>
          <Text style={styles.descText}>您尚未开通该权限</Text>
        </React.Fragment>
      case Authoritis.OPEN:
        return <React.Fragment>
          {renderTitle('已开通')}
          <Text style={[styles.descMargin, styles.descText]}>有效期至{date}</Text>
          <Text style={styles.descText}>{renderDeviceInfo()}</Text>
        </React.Fragment>
      case Authoritis.DUESOON:
        return <React.Fragment>
          {renderTitle('即将到期')}
          <Text style={[styles.descMargin, styles.descText]}>有效期至{date}</Text>
          <Text style={styles.descText}>{renderDeviceInfo()}</Text>
        </React.Fragment>
      case Authoritis.EXPIRED:
        return <React.Fragment>
          {renderTitle('已到期')}
          <Text style={[styles.descMargin, styles.descText]}>已于{date}到期</Text>
          <Text style={styles.descText}>您尚未开通该权限，请立即续费</Text>
        </React.Fragment>
      default:
        return null;
    }
  }

  render() {
    const { styles } = this;
    const { data: { authority, isOpenRemind } } = this.state;

    return (
      <View style={styles.container}>
        {/* 权限信息面板 */}
        <View style={styles.cardPannel}>
          <Image
            source={Theme.getValue('$phone')}
            resizeMode='stretch'
            style={styles.phone}
          />
          <View style={styles.cardDescription}>
            {this.renderDesc()}
          </View>
        </View>

        {/* 底部按钮 */}
        {(authority === Authoritis.OPEN || authority === Authoritis.DUESOON) && (
          <React.Fragment>
            <CommDivider marginLR={rpx(2)} />
            <View style={styles.cardBottom}>
              <TouchableWithoutFeedback onPress={this.changeLv2Market}>
                <View style={styles.btn}>
                  <Image
                    source={Theme.getValue('$qiehuan')}
                    style={[styles.icon, { marginRight: rpx(15) }]}
                    resizeMode='stretch'
                  />
                  <Text style={styles.btnText}>切换Level行情</Text>
                  <Image
                    source={Theme.getValue('$tishi')}
                    style={styles.icon}
                    resizeMode='contain'
                  />
                </View>
              </TouchableWithoutFeedback>
              <CommDivider direction='Y' />
              <TouchableWithoutFeedback onPress={this.changeRemind}>
                <View style={styles.btn}>
                  <Image
                    source={Theme.getValue('$daoqitixing')}
                    style={[styles.icon, { marginRight: rpx(10) }]}
                    resizeMode='contain'
                  />
                  <Text style={styles.btnText}>{isOpenRemind ? '已开启到期提醒' : '开启到期提醒'}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </React.Fragment>
        )}
      </View>
    )
  }
}

function getCss() {
  return StyleSheet.create({
    container: {
      borderRadius: rpx(14),
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      elevation: 2,
      backgroundColor: Theme.getValue('$color6_2')
    },
    cardPannel: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rpx(30),
      paddingVertical: rpx(25),
    },
    phone: {
      width: rpx(130),
      height: rpx(140),
      marginRight: rpx(30)
    },
    descMargin: {
      marginBottom: rpx(25)
    },
    cardDescription: {
      justifyContent: 'space-between',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      fontSize: rpx(32),
      fontWeight: "500",
      color: Theme.getValue('$color15_1'),
    },
    descText: {
      fontSize: rpx(28),
      color: Theme.getValue('$color16'),
    },
    tag: {
      alignItems: 'center',
      marginLeft: rpx(30),
      paddingHorizontal: rpx(7),
      paddingVertical: rpx(5),
      borderRadius: rpx(14),
      backgroundColor: Theme.getValue('$color40_1'),
    },
    tagText: {
      color: Theme.getValue('$color22_1'),
    },
    btn: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: rpx(15),
      paddingVertical: rpx(20)
    },
    btnText: {
      color: Theme.getValue('$color16'),
    },
    cardBottom: {
      flexDirection: 'row',
    },
    icon: {
      width: rpx(40),
      height: rpx(40)
    },
  })
}