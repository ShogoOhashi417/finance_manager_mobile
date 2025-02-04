import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';

export const TestPage = () => {
    const navigation = useNavigation();

    return (
        <View style={theme.container}>
            <Button title="次へボタン" onPress={() => navigation.navigate('NextPage')} />
            <Button title="収入管理" onPress={() => navigation.navigate('IncomePage')} />
            <Button title="支出管理" onPress={() => navigation.navigate('ExpensePage')} />
            <Button title="カテゴリー管理" onPress={() => navigation.navigate('CategoryPage')} />
        </View>
    );
};
