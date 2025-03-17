import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';

// TODO: エンドポイントを変更
const apiUrl = 'http://localhost/api/v1/expenditure';

const fetchData = async (setExpenditureList: any) => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('ネットワークの応答が正常ではありません');
        }
        const data = await response.json();
        setExpenditureList(data.expenditure_info_list);
    } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
    }
};

export const ExpensePage = () => {
    const navigation = useNavigation();
    const [expenditureList, setExpenditureList] = useState([]);

    useEffect(() => {
        fetchData(setExpenditureList);
    }, []);

    const navigateToEditExpensePage = (expenseId: string, expenseName: string, expenseAmount: string, expenseDate: string, expenseCategory: string) => {
        navigation.navigate('EditExpensePage', { expenseId, expenseName, expenseAmount, expenseDate, expenseCategory });
    };

    return (
        <View style={theme.container}>
            <Text style={theme.title}>支出管理</Text>
            <Button title="支出追加" onPress={() => navigation.navigate('AddExpensePage')} />
            <ScrollView horizontal>
                <FlatList
                    data={expenditureList}
                    keyExtractor={(item: { id: string }) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={theme.item}
                            onPress={() => navigateToEditExpensePage(
                                item.id,
                                item.name,
                                item.amount,
                                item.calendar_date,
                                item.category_id
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
