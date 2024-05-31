import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Hungrioo</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    height: '7%',
    width: '100%',
    backgroundColor: '#FF4C24',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex:1,
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '700',
  },
})
