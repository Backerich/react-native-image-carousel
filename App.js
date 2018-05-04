import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, FlatList } from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const BAR_SPACE = 6
const circleRadius = 8

const images = [
  {key: 'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png'},
  {key: 'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg'},
  {key: 'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg'},
]

export default class Slider extends Component {
  constructor(props) {
    super(props)

  }

  numItems = images.length
  animVal = new Animated.Value(0)
  animated = true

  _renderItem = ({item}) => (
    <Image
      key={ images.indexOf(item) }
      source={{uri: item.key }}
      style={{ width: deviceWidth, resizeMode: 'contain' }}/>
  );

  render() {
    let barArray = []

    for (i=0; i < this.numItems; i++) {
      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-circleRadius, circleRadius],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View key={i} style={[ styles.track, { marginLeft: i === 0 ? 0 : BAR_SPACE,},]} >
          <Animated.View style={[styles.circle, { transform: [{ translateX: scrollBarVal },],},]} />
        </View>
      )
      barArray.push(thisBar)
    }

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={styles.container}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
            onScroll={ Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }]) }
            data={ images }
            renderItem={this._renderItem} />
          <View
            style={styles.barContainer}>
            {barArray}
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    zIndex: 2,
    marginTop: 15,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: 'rgba(0,0,0,.2)',
    overflow: 'hidden',
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius/2,
  },
  circle: {
    backgroundColor: '#5294d6',
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius/2,
  },
})
