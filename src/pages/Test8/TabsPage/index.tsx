/**
 * Radio Button 样式
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { rpx } from 'emrn-common';
import { Theme } from 'emrn-common';
import { singlePx } from '../../../utils';

interface Porps {
  navigation: any
}

const tabs = [
  { tab: 'tab1', key: '1' },
  { tab: 'tab2', key: '2' },
  { tab: 'tab3', key: '3' },
]

const p2Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: rpx(12),
    paddingVertical: rpx(12),
  },
  tabItem: {
    borderWidth: singlePx(),
    borderRightWidth: 0,
    // borderColor: Theme.getValue('$color9'),
    borderLeftColor: Theme.getValue('$color9'),
    borderTopColor: Theme.getValue('$color9'),
    borderRightColor: Theme.getValue('$color9'),
    borderBottomColor: Theme.getValue('$color9'),
    paddingHorizontal: rpx(24),
    paddingVertical: rpx(12),
  },
  firstTab: {
    borderTopStartRadius: rpx(5),
    borderBottomStartRadius: rpx(5),
  },
  lastTab: {
    borderRightWidth: singlePx(),
    borderTopEndRadius: rpx(5),
    borderBottomEndRadius: rpx(5),
  },
  activeItem: {
    // borderColor: Theme.getValue('$color21_3')
    borderLeftColor: Theme.getValue('$color21_3'),
    borderTopColor: Theme.getValue('$color21_3'),
    borderRightColor: Theme.getValue('$color21_3'),
    borderBottomColor: Theme.getValue('$color21_3'),
  },
  activeText: {
    color: Theme.getValue('$color21_3')
  },
  afterActiveItem: {
    borderLeftColor: Theme.getValue('$color21_3')
  }
})


interface Page2Props {

}

interface Page2State {
  activeTab: string
}

export default class Page2 extends Component<Page2Props, Page2State> {
  constructor(props: Page2Props) {
    super(props)
    this.state = {
      activeTab: '1'
    }
  }

  onChangeTabs = (activeTab: string) => {
    this.setState({
      activeTab
    })
  }

  render() {
    const { activeTab } = this.state;
    const activeIndex = tabs.findIndex(item => item.key === activeTab)
    let afterActiveIndex = -1
    if (activeIndex !== -1) {
      afterActiveIndex = activeIndex + 1
    }
    return (
      <View style={p2Styles.container}>
        {tabs.map((item, index) => {
          return (
            <TouchableWithoutFeedback onPress={() => this.onChangeTabs(item.key)} key={item.key}>
              <View
                style={[
                  p2Styles.tabItem,
                  item.key === activeTab && p2Styles.activeItem,
                  index === 0 && p2Styles.firstTab,
                  index === tabs.length - 1 && p2Styles.lastTab,
                  index === afterActiveIndex && p2Styles.afterActiveItem,
                ]}
              >
                <Text>{item.tab}</Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </View>
    )
  }
}
