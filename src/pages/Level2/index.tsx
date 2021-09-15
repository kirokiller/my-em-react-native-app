import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Theme from 'emrn-common/styles/theme'
import TitleRight from 'emrn-common/components/EmTitleRight'
import AdBanner from './AdBanner'
import MyLevel2 from './MyLevel2'
import OpenMethod from './OpenMethod';
import HelpCenter from './HelpCenter';


interface Props {

}

interface State {

}

export default class Level2 extends Component<Props, State> {
  styles: any
  static navigationOptions = {
    title: 'Level-2专区',
    headerRight: (
      <TitleRight
        showShare={true}
        shareBtnType="text"
        pageCode={''}
        onPress={() => {

        }}
      ></TitleRight>
    ),
  }
  constructor(props: Props) {
    super(props)
    this.state = {

    }
    this.styles = getCss()
  }

  render() {
    const { styles } = this
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <AdBanner />
          <MyLevel2 />
          <OpenMethod />
          <HelpCenter />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

function getCss() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.getValue('$color6'),
    }
  })
}