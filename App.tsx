import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomePage from './src/screens/HomePage'
export default function App() {
  return (
    <SafeAreaView style = {{flex: 1}}>
      <HomePage/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})