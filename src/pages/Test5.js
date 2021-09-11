import React, { Component } from 'react'
import { Text, View, Button, Image, EmNavigation } from 'em-react-native'
import Hybrid from '../utils/hybrid'

export default class Test5 extends Component {
  static navigationOptions = {
    title: '与App交互'
  }

  constructor(props) {
    super(props)
    this.state = {
      passport: null
    }
  }

  async componentDidMount () {
    try {
      const passport = await Hybrid.Passport.getUserInfo()
      this.setState({
        passport
      })
    } catch (e) {
      alert(e)
    }
  }

  render () {
    const { navigation } = this.props
    const { passport } = this.state
    return (
      <View>
        <Text>通行证信息: {JSON.stringify(passport)}</Text>
        <Button
          title="返回首页"
          onPress={() => {
            EmNavigation.goBack(navigation)
          }}
        />
      </View>
    )
  }
}
