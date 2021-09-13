import React, {Component} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Animated, StyleSheet} from 'react-native';

interface Props {
  stickHeaderY?: number;
  stickScrollY: Animated.Value;
  headerHeight?: number;
  style?: any;
}

interface State {
  stickLayoutY: number;
}

export default class StickyHeader extends Component<Props, State> {
  static defaultPorps = {
    stickyHeaderY: -1,
    stickScrollY: new Animated.Value(0),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      stickLayoutY: 0,
    };
  }

  _onLayout = (event: LayoutChangeEvent) => {
    this.setState({
      stickLayoutY: event.nativeEvent.layout.y,
    });
  };

  render() {
    const {stickHeaderY, stickScrollY, children, style, headerHeight} =
      this.props;
    const {stickLayoutY} = this.state;
    let y = stickHeaderY ?? stickLayoutY;
    y = y > 0 && headerHeight !== undefined ? y - headerHeight : y;
    const translateY = stickScrollY.interpolate({
      inputRange: [-1, 0, y, y + 1],
      outputRange: [0, 0, 0, 1],
    });
    return (
      <Animated.View
        onLayout={this._onLayout}
        style={[styles.container, style, {transform: [{translateY}]}]}>
        {children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
});
