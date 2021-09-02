import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherToday from '../Screens/WeatherToday';
import SevenDaysReport from '../Screens/SevenDaysReport';
import WeatherComparison from '../Screens/WeatherComparision';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Weather Today" component={WeatherToday} />
        <Stack.Screen name="Seven Days Report" component={SevenDaysReport}/>
        <Stack.Screen name="Weather Comparison" component={WeatherComparison}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

