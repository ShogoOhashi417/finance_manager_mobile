import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

// TODO: エンドポイントを変更
const csrfTokenUrl = 'http://localhost/api/v1/csrf-token';
const updateExpenseUrl = () => `http://localhost/api/v1/expenditure/update`;

export const EditExpensePage = ({ route, navigation }: { route: any; navigation: any }) => {
    const { expenseId, expenseName, expenseAmount, expenseDate, expenseCategory } = route.params;
    const [name, setName] = useState(expenseName);
    const [amount, setAmount] = useState(String(expenseAmount));
    const [date, setDate] = useState(expenseDate);
    const [category, setCategory] = useState(expenseCategory);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get(csrfTokenUrl);
                setCsrfToken(response.data.token);
            } catch (error) {
                console.error('CSRFトークンの取得に失敗しました:', error);
            }
        };

        fetchCsrfToken();
    }, [expenseId]);

    const updateExpense = async () => {
        try {
            await axios.put(updateExpenseUrl(), {
                id: expenseId,
                expenditure_name: name,
                expenditure_amount: amount,
                calendar_date: date,
                expenditure_category_id: category,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken, // CSRFトークンをヘッダーに追加
                },
            });
            navigation.navigate('ExpensePage');
        } catch (error) {
            console.error('支出の更新に失敗しました:', error);
        }
    };

    return (
        <View style={theme.container}>
            <Text style={theme.title}>支出編集</Text>
            <TextInput
                placeholder="支出名"
                value={name}
                onChangeText={setName}
                style={theme.input}
            />
            <TextInput
                placeholder="金額"
                value={amount}
                onChangeText={setAmount}
                style={theme.input}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="日時"
                value={date}
                onChangeText={setDate}
                style={theme.input}
            />
            <TextInput
                placeholder="カテゴリー"
                value={category}
                onChangeText={setCategory}
                style={theme.input}
            />
            <Button title="更新" onPress={updateExpense} />
        </View>
    );
}; 