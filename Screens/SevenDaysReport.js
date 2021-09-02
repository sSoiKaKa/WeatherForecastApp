import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function SevenDaysReport({navigation}) {
  return (
    <View style = {styles.container}>
        <Text onPress = {() => navigation.navigate('Weather Comparison')}>7 Days Report</Text>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
