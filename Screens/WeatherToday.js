import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, AppRegistry, Button } from 'react-native';
import { getData } from '../Database/FirebaseFirestore';
import Title from '../Components/Title';
import List7Day from '../Components/List7Day';
import icons from "../icons";

class WeatherToday extends Component {

  state = {
    data: null,
    isLoading: true,
    date: '29-05-2021'
  }

  componentDidMount() {
    getData(this.state.date)
      .then(response => {
        this.setState({
          data: response,
          isLoading: false
        });

        console.log(response);
      });
  }

  render() {

    let main = null;

    if (!this.state.isLoading) {
      const currentHour = (new Date()).getHours();

      let hoursData = null;

      if (currentHour <= 6)
        hoursData = this.state.data["0h-6h"];
      else if (currentHour <= 12)
        hoursData = this.state.data["6h-12h"];
      else if (currentHour <= 18)
        hoursData = this.state.data["12h-18h"];
      else
        hoursData = this.state.data["18h-24h"];

      main = (
        <View style={styles.container}>
          <Title 
            date={ this.state.date }
            icon={icons[hoursData.realData.weather]}
            temp={ hoursData.realData.temp }
            humd={ hoursData.realData.humd } />

          <List7Day
            currentDate={ this.state.date } />

          <Button title="Show Chart" onPress={() => this.props.navigation.navigate("Weather Comparison", {
            date: this.state.date
          })} />
        </View>
      );
    }

    return (
      <View style = {styles.container}>
          { main }
      </View>
    );

  } 
    
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

export default WeatherToday;