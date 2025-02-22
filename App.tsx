import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TestPage } from './src/pages/TestPage';
import { IncomePage } from './src/pages/IncomePage';
import { ExpensePage } from './src/pages/ExpensePage';
import { CategoryPage } from './src/pages/CategoryPage';
import { AddExpensePage } from './src/pages/AddExpensePage';
import { AddIncomePage } from './src/pages/AddIncomePage';
import { AddIncomeCategoryPage } from './src/pages/AddIncomeCategoryPage';
import { AddExpenseCategoryPage } from './src/pages/AddExpenseCategoryPage';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TestPage">
                <Stack.Screen name="TestPage" component={TestPage} />
                <Stack.Screen name="IncomePage" component={IncomePage} />
                <Stack.Screen name="ExpensePage" component={ExpensePage} />
                <Stack.Screen name="CategoryPage" component={CategoryPage} />
                <Stack.Screen name="AddExpensePage" component={AddExpensePage} />
                <Stack.Screen name="AddIncomePage" component={AddIncomePage} />
                <Stack.Screen name="AddIncomeCategoryPage" component={AddIncomeCategoryPage} />
                <Stack.Screen name="AddExpenseCategoryPage" component={AddExpenseCategoryPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
