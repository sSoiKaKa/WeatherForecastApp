import React from "react";
import { Text, View, StyleSheet, Image } from 'react-native';
import CloudyIcon from '../assets/Icons/cloudy.png';
import NightIcon from '../assets/Icons/night.png';
import RainyIcon from '../assets/Icons/rainy.png';
import SunnyIcon from '../assets/Icons/sunny.png';

export default Title = (props) => {
    return (
        <View>
          <View style={{ marginTop: 40 }}>
            <Text style={styles.header} >WeatherForecast</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.subHeader} >{props.date}</Text>
          </View>

          <View style={{ marginTop: 20, display: "flex", alignItems: "center" }}>
            <Image source={ props.icon } />
          </View>
          
          <View style={{ marginTop: 20 }}>
            <Text style={ styles.data }>{props.temp}C / {props.humd}%</Text>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center"
    },
  
    header: {
      fontSize: 24,
      textAlign: "center"
    },
  
    subHeader: {
      fontSize: 16,
      textAlign: "center"
    }, 
  
    data: {
      fontSize: 20,
      textAlign: "center"
    }
  });