import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TestPage } from './src/pages/TestPage';
import { NextPage } from './src/pages/NextPage';
import { IncomePage } from './src/pages/IncomePage';
import { ExpensePage } from './src/pages/ExpensePage';
import { CategoryPage } from './src/pages/CategoryPage';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TestPage">
                <Stack.Screen name="TestPage" component={TestPage} />
                <Stack.Screen name="NextPage" component={NextPage} />
                <Stack.Screen name="IncomePage" component={IncomePage} />
                <Stack.Screen name="ExpensePage" component={ExpensePage} />
                <Stack.Screen name="CategoryPage" component={CategoryPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
