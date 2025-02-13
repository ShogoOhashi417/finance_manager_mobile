import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

// TODO: エンドポイントを変更
const csrfTokenUrl = 'http://localhost/api/v1/csrf-token';
const saveIncomeUrl = 'http://localhost/api/v1/income';

export const AddIncomePage = ({ navigation }: { navigation: any }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
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
    }, []);

    const saveExpense = async () => {
        try {
            const response = await axios.post(saveIncomeUrl, {
                income_name: description,
                income_category_id: category,
                income_amount: amount,
                calendar_date: date,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken, // CSRFトークンをヘッダーに追加
                },
            });
            navigation.goBack();
        } catch (error) {
        }
    };

    return (
        <View style={theme.container}>
            <Text style={theme.title}>収入追加</Text>
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
            <Button title="保存" onPress={saveExpense} />
        </View>
    );
};
