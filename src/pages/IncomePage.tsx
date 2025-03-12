import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';

// TODO: エンドポイントを変更
const apiUrl = 'http://localhost/api/v1/income';

const fetchData = async (setIncomeList: any) => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('ネットワークの応答が正常ではありません');
        }
        const data = await response.json();
        setIncomeList(data.income_info_list);
    } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
    }
};

export const IncomePage = () => {
    const navigation = useNavigation();
    const [incomeList, setIncomeList] = useState([]);

    useEffect(() => {
        fetchData(setIncomeList);
    }, []);

    const navigateToEditIncomePage = (
        incomeId: string,
        incomeName: string,
        incomeAmount: string,
        incomeDate: string,
        incomeCategory: string
    ) => {
        navigation.navigate(
            'EditIncomePage',
            { incomeId, incomeName, incomeAmount, incomeDate, incomeCategory }
        );
    };

    return (
        <View style={theme.container}>
            <Text style={theme.title}>収入管理</Text>
            <Button title="収入追加" onPress={() => navigation.navigate('AddIncomePage')} />
            <ScrollView horizontal>
                <FlatList
                    data={incomeList}
                    keyExtractor={(item: { id: string }) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={theme.item}
                            onPress={() => navigateToEditIncomePage(
                                item.id,
                                item.name,
                                item.amount,
                                item.calendar_date,
                                item.category_name
                            )}
                        >
                            <Text style={theme.description}>
                                {item.name}
                            </Text>
                            <Text style={theme.amount}>
                                {item.amount}
                            </Text>
                            <Text style={theme.description}>
                                {item.calendar_date}
                            </Text>
                            <Text style={theme.description}>
                                {item.category_name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </View>
    );
};
