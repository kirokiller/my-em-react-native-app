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

export default class index extends Component<Props, State> {
  style: any
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
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View>
          <AdBanner />
        </View>
        <View>
          <MyLevel2 />
        </View>
        <View>
          <OpenMethod />
        </View>
        <View>
          <HelpCenter />
        </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.getValue('$color6'),
  }
})