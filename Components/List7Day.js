import React, { Component } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { getData } from "../Database/FirebaseFirestore";
import icons from "../icons";

class Weather1Day extends Component {

    state = {
        loading: true,
        data: null
    }

    componentDidMount() {
        getData(this.props.date)
            .then(response => {
                this.setState({
                    loading: false,
                    data: response
                });
            });
    }

    render() {

        const date = this.props.date.split("-")
            .slice(0, 2)
            .join("-");

        return !this.state.loading && (
            <View style={styles.item} >
                <View>
                    <Image source={ icons[this.state.data["6h-12h"].realData.weather] } style={styles.image} />
                </View>
                <Text>{this.state.data["6h-12h"].realData.temp}C</Text>
                <Text style={{ marginBottom: 10 }}>{this.state.data["6h-12h"].realData.humd}%</Text>
                <Text>{ date }</Text>
            </View>
        );
    }

}

class List7Day extends Component {

    render() {

        const [day, month, year] = this.props.currentDate.split("-");

        const date = new Date(`${year}-${month}-${day}`);

        const listWeather = new Array();

        for (let i = 1; i <= 7; ++i) {
            const newDate = new Date(date);
            newDate.setDate(date.getDate() - i);

            const dateConverted = `${correctDate(newDate.getDate())}-${correctDate(newDate.getMonth() + 1)}-${newDate.getFullYear()}`
            listWeather.push(<Weather1Day key={i} date={dateConverted} />)
        }

        return (
            
            <View style={styles.container}>
                { listWeather }
            </View>
        );

    }
}

function correctDate(input) {
    return input <= 9 ? `0${input}` : input;
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      marginTop: 80
    },
  
    item: {
        flex: 1,
        flexGrow: 1,
        alignItems: "center"
    },

    image: {
        width: 40,
        height: 40
    }
});

export default List7Day;