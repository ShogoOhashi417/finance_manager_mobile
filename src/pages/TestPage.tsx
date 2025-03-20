import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../styles/theme';

type RootStackParamList = {
    TopPage: undefined;
    IncomePage: undefined;
    ExpensePage: undefined;
    CategoryPage: undefined;
    ReportPage: undefined;
    AddExpensePage: undefined;
    AddIncomePage: undefined;
    EditIncomePage: { id: string };
    EditExpensePage: { id: string };
    AddIncomeCategoryPage: undefined;
    AddExpenseCategoryPage: undefined;
    EditIncomeCategoryPage: { id: string };
    EditExpenseCategoryPage: { id: string };
};

export const TestPage = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={theme.container}>
            <Button title="収入管理" onPress={() => navigation.navigate('IncomePage')} />
            <Button title="支出管理" onPress={() => navigation.navigate('ExpensePage')} />
            <Button title="カテゴリー管理" onPress={() => navigation.navigate('CategoryPage')} />
            <Button title="レポート" onPress={() => navigation.navigate('ReportPage')} />
        </View>
    );
};
