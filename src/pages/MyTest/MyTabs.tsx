import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { getReactContainerWidth } from 'emrn-common/utils/container';
import rpx from 'emrn-common/utils/rpx'

interface Props {
  onChangeTabs: (tab: number) => void;
  activeTab: number;
  tabs: string[];
}

interface State {
  tabAnimated: Animated.Value;
}

const width = getReactContainerWidth();
const tabWidth = rpx(140);
const paddingWidth = rpx(80);
const lineWidth = rpx(60);
const initialWidth = paddingWidth + (tabWidth - lineWidth) / 2;

export default class MyTabs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tabAnimated: new Animated.Value(initialWidth),
    };
  }

  static defaultProps = {
    onChangeTabs: () => { },
    tabs: [],
  };

  handleTabChange: (tab: number) => void = tab => {
    const { activeTab } = this.props;
    if (tab !== activeTab) {
      this.tabAnimatedvStart(tab);
      const { onChangeTabs } = this.props;
      onChangeTabs(tab);
    }
  };

  tabAnimatedvStart: (index: number) => void = index => {
    const { tabs } = this.props;
    const toValue =
      initialWidth +
      ((width - paddingWidth * 2 - tabWidth * tabs.length) / 2 +
        (tabWidth - lineWidth) +
        lineWidth) *
      index;

    Animated.timing(this.state.tabAnimated, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { activeTab, tabs } = this.props;
    const { tabAnimated } = this.state;
    return (
      <React.Fragment>
        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => (
            <TouchableWithoutFeedback
              onPress={() => {
                this.handleTabChange(index);
              }}>
              <View style={styles.tabItem}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index && styles.selectedText,
                  ]}>
                  {tab}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <Animated.View
          style={[
            styles.selectedLine,
            { transform: [{ translateX: tabAnimated }] },
          ]}
        />
        <View />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    height: rpx(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    paddingHorizontal: paddingWidth,
  },
  tabItem: {
    width: tabWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0ffff',
  },
  tabText: {},
  selectedLine: {
    height: rpx(8),
    width: lineWidth,
    borderRadius: rpx(3),
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 1,
  },
  selectedText: {
    color: '#00bfff',
  },
});
