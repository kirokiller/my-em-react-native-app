// 东财混合开发接口调试
import React, { Component } from 'react'
import { Text, View, Button, Image, EmNavigation } from 'em-react-native'
import HeaderRight from "emrn-common/components/EmTitleRight";
import Hybrid from 'emrn-common/utils/hybrid'
import { StyleSheet } from 'react-native'
import { rpx } from 'emrn-common';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  navigation: any
}

export default class Test5 extends Component<Props> {
  _navBlurListener: any
  _navFocusListener: any
  screenViewTag: any
  static navigationOptions = ({ navigation }: { navigation: any }) => {
    return {
      title: '与App交互',
      headerRight: <HeaderRight
        showShare
        shareBtnType="text"
        onPress={() => {
          navigation.getParam('onShare')?.()
        }}
      />
    }
  }


  constructor(props: Props) {

    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    this._subscribeNavigation()
  }



  componentDidMount() {
    // this.getPassport()
    // this.getContainer()
    this._setNavigation()
  }

  componentWillUnmount() {
    this._navBlurListener && this._navBlurListener.remove();
    this._navFocusListener && this._navFocusListener.remove();
  }

  // 订阅navigation生命周期的更新
  _subscribeNavigation = () => {
    // willFocus
    // didFocus
    // willBlur
    // didBlur
    this._navFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        console.log('willFocus')
      }
    )
    this._navBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        console.log('willBlur')
      }
    )
  }


  _setNavigation = () => {
    this.props.navigation.setParams({
      onShare: this._onShare,
    })
  }

  getPassport = async () => {
    try {
      const passport = await Hybrid.Passport.getUserInfo()
      console.log("🚀 ~ file: Test5.tsx ~ line 88 ~ Test5 ~ getPassport= ~ passport", passport)
    } catch (e) {
      console.log(e)
    }
  }

  getContainer = () => {
    Promise.all([
      Hybrid.Container.getApplicationInfo(),
      Hybrid.Container.getDeviceInfo()
    ]).then(result => {
      console.log('getContainer', result)
    })
  }

  _getPhone = () => {
    Hybrid.Phone.isPhoneAvailable().then(({ available }) => {
      if (available) {
        console.log('call phone');
        const request = {
          phoneNumber: '13043397099'
        }
        Hybrid.Phone.dial(request)
      }
    })
  }

  _onShare = () => {
    const request = {
      filters: ['weixin', 'pengyouquan', 'weibo', 'qq', 'qzone'],
      image: "https://emfed.eastmoney.com/public/resource/img/wechatlogo.png",
      title: '我的分享',
      url: `https://mguba.eastmoney.com/mguba/article/0/222`, // 可能存在不同应用对链接的屏蔽情况（弹框闪一下无法打开对应应用分享）
      desc: '分享描述',
    }
    Hybrid.Social.share(request)
  }

  _shareScreenShot = () => {
    // qq分享至我的文件助手没有出现返回弹窗，无法返回主应用，后台显示主应用名称但实际进入为QQ（仅在开发中测试过）
    const request = {
      filters: ['weixin', 'qq'],
      title: '分享标题',
      desc: '分享描述',
      showTitle: true,
      viewtag: this.screenViewTag,
      // viewHeigh H5需要截取页面高度
      bangs: false,
      preview: true,
      showPreviewSource: true,
      navCropStatus: false,
      // qrCodeConfig: {
      //   qrCodeContent: "https://appcert.eastmoney.com/h52n/CommScheme",
      //   qrCodeLongClickMsg: "长按识别二维码  下载东方财富APP",
      //   bottomText: '扫描或长按二维码',
      //   curveText: '下载东方财富APP',
      //   linkType: '820',
      //   style: 'white'
      // }
    }
    Hybrid.Social.shareScreenShot(request);
  }

  _createQRCodeAndShare = () => {
    const request = {
      content: 'erweimaneirong',
      needlogo: true,
    }
    Hybrid.Social.createQRCode(request).then(({ base64Data }) => {
      const request2 = {
        filters: ['qq', 'weixin'],
        showTitle: '我的标题',
        base64Data: base64Data,
        // qrCodeConfig: {}
        preview: true,
        showPreviewSource: true,
        banges: false,
      }

      Hybrid.Social.shareBase64Image(request2)
    })
  }

  _toast = () => {
    // 持续点击时，提示消息呈队列弹出显示，考虑使用节流函数
    const request = {
      gravity: 'center',
      text: '弹出消息内容',
    }
    Hybrid.Toast.show(request)
  }

  _goBack = () => {
    // EmNavigation主要用兼容web导航操作,navigation必传
    const { navigation } = this.props;
    EmNavigation.goBack(navigation);
    // Nvigation Props refrence Version:3.x
    // this.props.navigation
    //   navigate
    //   goBck
    //   addListener 
    //   isFocused 
    //   state 
    //   setParams 
    //   getParam 
    //   dispatch // 发送一个action至router 参考NavigationActions用法
    //   dangerouslyGetParent 
  }



  _toTest1 = () => {
    const { navigation } = this.props;
    navigation.navigate('Test1')
    // navigate
    //  routeName
    //  params
    //  action
    //  key
  }


  render() {

    const data = [
      { title: '电话', onPress: this._getPhone },
      { title: '截屏分享', onPress: this._shareScreenShot },
      { title: '生成二维码并分享', onPress: this._createQRCodeAndShare },
      { title: 'Toast', onPress: this._toast },
      { title: 'To Test1', onPress: this._toTest1 }
    ]
    return (
      <View onLayout={({ target }: { target: any }) => {
        this.screenViewTag = target;
      }}>
        {
          data.map(item => <View style={styles.btn}>
            <Button title={item.title} onPress={item.onPress} />
          </View>)
        }
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#3480E3', '#A06AEA', '#E0451D']}
          style={styles.btn}
        >
          <Text style={styles.buttonText}>
            Sign in with Facebook
          </Text>
        </LinearGradient>
        <Button
          title="返回首页"
          onPress={this._goBack}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    marginBottom: rpx(12)
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
})
