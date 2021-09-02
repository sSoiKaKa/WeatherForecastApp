import React, { Component } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { getData } from '../Database/FirebaseFirestore';

class WeatherComparison extends Component {

  state = {
    tempChart: null,
    humdChart: null,
    loading: true
  }

  componentDidMount() {
    const {route, navigation} = this.props;

    const [day, month, year] = route.params.date.split("-");

    const date = new Date(`${year}-${month}-${day}`);

    const dates = new Array();
    const dataPromises = new Array();

    for (let i = 1; i <= 7; ++i) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() - i);

      const dateConverted = `${correctDate(newDate.getDate())}-${correctDate(newDate.getMonth() + 1)}-${newDate.getFullYear()}`;

      dates.push(dateConverted);
      dataPromises.push(getData(dateConverted))
    }

    const labels = new Array();

    const realTemp = new Array();
    const realHumd = new Array();
    const predictionTemp = new Array();
    const predictionHumd = new Array();

    Promise.all(dataPromises)
    .then(response => {
      response.forEach((item, i) => {
        Object.keys(item).map((sample, k) => {
          realTemp.push(item[sample].realData.temp);
          realHumd.push(item[sample].realData.humd);

          predictionTemp.push(item[sample].predictionData.temp);
          predictionHumd.push(item[sample].predictionData.humd);

          if (k % 4 == 2)
            labels.push(dates[i].split("-").slice(0, 2).join("-"));
          else
            labels.push("");
        })
      })

      this.setState({
        tempChart: {
          labels: labels,
          datasets: [
            {
              data: realTemp,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }, {
              data: predictionTemp,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }
          ],
          legend: ["Real", "Prediction"] // optional
        },
        humdChart: {
          labels: labels,
          datasets: [
            {
              data: realHumd,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }, {
              data: predictionHumd,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }
          ],
          legend: ["Real", "prediction"] // optional
        },
        loading: false
      });
    });
  }

  render() {
    const chartConfig = {
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

    return !this.state.loading && (
      <View style={styles.container}r>
        <LineChart
          data={this.state.tempChart}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
        />

        <Text style={ styles.text }>Temperature</Text>

        <LineChart
          data={this.state.humdChart}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
        />

        <Text style={ styles.text }>Humidity</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 32
  }
});

function correctDate(input) {
  return input <= 9 ? `0${input}` : input;
}

export default WeatherComparison;