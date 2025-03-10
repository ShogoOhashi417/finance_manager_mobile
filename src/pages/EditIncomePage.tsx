import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

// TODO: エンドポイントを変更
const csrfTokenUrl = 'http://localhost/api/v1/csrf-token';
const updateIncomeUrl = (id: string) => `http://localhost/api/v1/income/update/${id}`;

export const EditIncomePage = ({ route, navigation }: { route: any; navigation: any }) => {
    const { incomeId, incomeName, incomeAmount, incomeDate, incomeCategory } = route.params;
    const [description, setDescription] = useState(incomeName);
    const [amount, setAmount] = useState(String(incomeAmount));
    const [date, setDate] = useState(incomeDate);
    const [category, setCategory] = useState(incomeCategory);
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
    }, [incomeId]);

    const updateIncome = async () => {
        try {
            await axios.put(updateIncomeUrl(incomeId), {
                income_name: description,
                income_amount: amount,
                calendar_date: date,
                income_category_id: category,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken, // CSRFトークンをヘッダーに追加
                },
            });
            navigation.navigate('IncomePage');
        } catch (error) {
            console.error('収入の更新に失敗しました:', error);
        }
    };

    return (
        <View style={theme.container}>
            <Text style={theme.title}>収入編集</Text>
            <TextInput
                placeholder="収入名"
                value={description}
                onChangeText={setDescription}
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
            <Button title="更新" onPress={updateIncome} />
        </View>
    );
};
