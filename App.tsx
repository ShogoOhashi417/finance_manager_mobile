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
import { EditIncomeCategoryPage } from './src/pages/EditIncomeCategoryPage';
import { EditExpenseCategoryPage } from './src/pages/EditExpenseCategoryPage';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TopPage">
                <Stack.Screen name="TopPage" component={TestPage} options={{ title: 'トップ' }} />
                <Stack.Screen name="IncomePage" component={IncomePage} options={{ title: '収入管理' }} />
                <Stack.Screen name="ExpensePage" component={ExpensePage} options={{ title: '支出管理' }} />
                <Stack.Screen name="CategoryPage" component={CategoryPage} options={{ title: 'カテゴリ管理' }} />
                <Stack.Screen name="AddExpensePage" component={AddExpensePage} options={{ title: '支出追加' }} />
                <Stack.Screen name="AddIncomePage" component={AddIncomePage} options={{ title: '収入追加' }} />
                <Stack.Screen name="AddIncomeCategoryPage" component={AddIncomeCategoryPage} options={{ title: '収入カテゴリ追加' }} />
                <Stack.Screen name="AddExpenseCategoryPage" component={AddExpenseCategoryPage} options={{ title: '支出カテゴリ追加' }} />
                <Stack.Screen name="EditExpenseCategoryPage" component={EditExpenseCategoryPage} options={{ title: '支出カテゴリ編集' }} />
                <Stack.Screen name="EditIncomeCategoryPage" component={EditIncomeCategoryPage} options={{ title: '収入カテゴリ編集' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
