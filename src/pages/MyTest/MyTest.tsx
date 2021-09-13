import React, { Component } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Text, View, StyleSheet, Animated } from 'react-native';
import StickyHeader from './StickyHeader';
import MyTopHeader from './MyTopHeader';
import MyTabs from './MyTabs';
import FirstContent from './FirstContent';
import SecondContent from './SecondContent';
import ThirdContent from './ThirdContent';
import rpx from 'emrn-common/utils/rpx'
import Theme from 'emrn-common/styles/theme'

interface Props { }

interface State {
  activeTab: number;
  scrollY: Animated.Value;
  tabs: string[];
}

export default class MyTest extends Component<Props, State> {
  styles: any;
  refScrollView: any;
  stickHeaderY: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 0,
      scrollY: new Animated.Value(0),
      tabs: ['tab1', 'tab2', 'tab3'],
    };

    this.styles = getCss(Theme.getTheme());
    this.stickHeaderY = 0;
  }

  static navigationOptions = ({


  })



  componentDidMount() { }

  _onLayout = (event: LayoutChangeEvent) => {
    this.stickHeaderY = event.nativeEvent.layout.height;
  };

  onChangeTabs: (activeTab: number) => void = activeTab => {
    console.log('MyTest -> componentDidMount -> activeTab', activeTab);
    this.setState({
      activeTab,
    });
  };

  renderContent = () => {
    const { activeTab } = this.state;
    switch (activeTab) {
      case 0:
        return <FirstContent />;
      case 1:
        return <SecondContent />;
      case 2:
        return <ThirdContent />;
      default:
        return null;
    }
  };

  render() {
    const myTest = (
      <View style={{ height: 900, backgroundColor: 'green' }}>
        <Text>MyTest</Text>
      </View>
    );

    const { activeTab } = this.state;
    const tabs = ['tab1', 'tab2', 'tab3'];
    return (
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: this.state.scrollY },
              },
            },
          ],
          { useNativeDriver: true },
        )}>
        <View onLayout={this._onLayout}>
          {/* <Text style={[this.styles.topHeader]}>这是头部</Text> */}
          <MyTopHeader />
        </View>
        <StickyHeader
          stickScrollY={this.state.scrollY}
          headerHeight={this.stickHeaderY}>
          <View>
            <MyTabs
              onChangeTabs={this.onChangeTabs}
              activeTab={activeTab}
              tabs={tabs}
            />
          </View>
        </StickyHeader>
        <View style={{ backgroundColor: 'white' }}>{this.renderContent()}</View>
        {myTest}
      </Animated.ScrollView>
    );
  }
}

function getCss(theme: string) {
  return StyleSheet.create({
    topHeader: {
      height: rpx(60),
      textAlign: 'center',
      backgroundColor: 'yellow',
    },

    stickHeader: {
      height: rpx(90),
      textAlign: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
    },
    contentContainer: {
      height: 1800,
      backgroundColor: 'green',
    },
  });
}
