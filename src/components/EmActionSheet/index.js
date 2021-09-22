import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'
import RootSiblings from 'react-native-root-siblings';
import { rpx } from 'emrn-common';

export default function (options) {
  let { onSelect = () => { }, onCancel = () => { }, closeAfterSelected = true } = options
  options.onSelect = (value, item, index) => {
    onSelect(value, item, index)
    if (closeAfterSelected) {
      instance.destroy()
    }
  }
  options.onCancel = () => {
    onCancel()
    instance.destroy()
  }
  const instance = new RootSiblings(<ActionSheet options={options}></ActionSheet>)
  return instance
}

class ActionSheet extends Component {
  constructor(props) {
    super(props)

    let { title, items } = props.options
    let height = 0
    if (title) {
      height += rpx(100)
    }
    height += rpx(100) * items.length
    height += rpx(120)
    this.actionSheetHeight = height
    this.translateValue = new Animated.Value(height)
  }

  componentDidMount () {
    Animated.timing(
      this.translateValue,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }
    ).start()
  }

  render () {
    let { title, items, cancel = '取消', selectedValue, onSelect, onCancel, needAnimation = true } = this.props.options

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => onCancel()}>
          <View style={styles.mask}></View>
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.actionSheet, { transform: [{ translateY: needAnimation ? this.translateValue : 0 }] }]}>
          {
            title && <View style={[styles.item, styles.titleItem]}>
              <Text style={styles.title}>{title}</Text>
            </View>
          }
          <View style={styles.items}>
            {
              items.map((item, index) => {
                return (
                  <TouchableHighlight key={item.value} onPress={() => { onSelect(item.value, item, index) }} underlayColor="#eee">
                    <View style={styles.item}>
                      <Text style={[styles.itemText, selectedValue == item.value && styles.itemTextSelected]}>{item.text}</Text>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
          </View>
          <TouchableHighlight onPress={() => { onCancel() }} underlayColor="#eee">
            <View style={[styles.item, styles.cancelItem]}>
              <Text style={[styles.itemText, styles.itemTextSelected]}>{cancel}</Text>
            </View>
          </TouchableHighlight>
        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: Dimensions.get('window').height,
    ...Platform.select({
      web: {
        position: 'fixed',
        maxWidth: '450px'
      }
    })
  },
  actionSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 20
  },
  title: {
    fontSize: rpx(32),
    color: '#333'
  },
  items: {

  },
  item: {
    paddingHorizontal: rpx(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: rpx(100),
    borderTopWidth: rpx(1),
    borderTopColor: '#eee'
  },
  titleItem: {
    justifyContent: 'flex-start'
  },
  cancelItem: {
    height: rpx(120),
    borderTopWidth: rpx(20),
    borderTopColor: '#f7f8fa'
  },
  itemText: {
    fontSize: rpx(32),
    color: '#333'
  },
  itemTextSelected: {
    color: '#3381e3'
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10
  },
})