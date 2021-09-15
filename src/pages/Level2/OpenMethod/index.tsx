import { rpx } from 'emrn-common';
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import CommSection from '../../../components/CommSection'
import Card from './Card';

export interface CardData {
  title: string,
  desc: string,
  btnText: BtnTexts,
}

export enum BtnTexts {
  unSuitable = '不符合条件',
  openAc = '立即开户',
  receiveFree = '免费领取',
  received = '已领取',
  buy = '直接购买',
  exchange = '立即兑换',
}

interface Props {

}

interface State {
  data: Array<CardData>
}

export default class OpenMethod extends Component<Props, State> {
  styles: any
  constructor(props: Props) {
    super(props)
    this.state = {
      data: []
    }
    this.styles = getCss()
  }

  componentDidMount() {
    this.dataConfig()
  }

  dataConfig = () => {
    enum titles {
      openAc = '开户专享',
      buy = '购买Level-2',
      exchange = '积分兑换',
    }

    enum descs {
      openAc1 = '新用户开户入金即送1年Level-2权限',
      openAc2 = '上月日均资产达一万元即送1个月权限',
      buy = '千档行情实时挂单，洞悉主力意图',
      exchange = '使用积分可在积分商城兑换Level-2',
    }

    // 权限判断
    const isOpenAC = true   // 是否开户
    const isOver3Moth = false  // 开通账户超过3个月
    const isReceived = false   // 是否已领取
    const isOver1W = false   // 上月日均资产达1万元以上


    // 待解决：用户已领取时(isOver3Moth = false && isReceived = true)：
    // 本月显示卡片1，下个月显示卡片二（openAc2）（关联数据：已开户月数、领取月数）
    let data: Array<CardData> = []
    if (isOpenAC) {
      data.push({
        title: titles.openAc,
        desc: isOver3Moth ? descs.openAc2 : descs.openAc1,
        btnText: isReceived ? BtnTexts.received : (isOver3Moth ? (isOver1W ? BtnTexts.receiveFree : BtnTexts.unSuitable) : BtnTexts.receiveFree)
      })
    } else {
      data.push({
        title: titles.openAc,
        desc: descs.openAc1,
        btnText: BtnTexts.openAc,
      })
    }
    data = data.concat([{
      title: titles.buy,
      desc: descs.buy,
      btnText: BtnTexts.buy,
    },
    {
      title: titles.exchange,
      desc: descs.exchange,
      btnText: BtnTexts.exchange,
    }])
    this.setState({
      data
    })
  }

  onPressBtn = (btnText: BtnTexts) => {
    switch (btnText) {
      case BtnTexts.openAc:
        this.gotoOpenAc()
        break
      case BtnTexts.receiveFree:
        this.receiveFree()
        break
      case BtnTexts.buy:
        this.goToBuy()
        break
      case BtnTexts.exchange:
        this.goToExchange()
        break
      default:
        break
    }
  }

  receiveFree = () => {
    const { data } = this.state;
    data[0].btnText = BtnTexts.received
    this.setState({
      data,
    })
  }

  gotoOpenAc = () => {

  }

  goToBuy = () => {
    // 跳转购买页
  }

  goToExchange = () => {
    // 跳转金融权益页面
  }

  render() {
    const { data } = this.state
    const { styles } = this
    return (
      <CommSection title="开通方式">
        {data.map((item, index) => {
          return (
            <View style={[index !== data.length - 1 && styles.cardWrap]}>
              <Card {...item} key={index} onPress={this.onPressBtn} />
            </View>
          )
        })}
      </CommSection>
    )
  }
}

function getCss() {
  return StyleSheet.create({
    cardWrap: {
      marginBottom: rpx(20)
    }
  })
}
