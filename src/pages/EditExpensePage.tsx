import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import PickerWithModal from '../components/PickerWithModal';

// TODO: エンドポイントを変更
const csrfTokenUrl = 'http://localhost/api/v1/csrf-token';
const updateExpenseUrl = (id: string) => `http://localhost/api/v1/expenditure/update/${id}`;

export const EditExpensePage = ({ route, navigation }: { route: any; navigation: any }) => {
    const { expenseId, expenseName, expenseAmount, expenseDate, expenseCategory } = route.params;
    const [name, setName] = useState(expenseName);
    const [amount, setAmount] = useState(String(expenseAmount));
    const [date, setDate] = useState(expenseDate);
    const [category, setCategory] = useState(String(expenseCategory));
    const [csrfToken, setCsrfToken] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost/api/v1/expenditure_category');
                setCategories(response.data.expenditure_category_info_list || []);
            } catch (error) {
                console.error('カテゴリーの取得に失敗しました:', error);
            }
        };
        fetchCategories();
    }, []);

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
            await axios.put(updateExpenseUrl(expenseId), {
                expenditure_name: name,
                expenditure_amount: amount,
                calendar_date: date,
                expenditure_category_id: category,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            navigation.navigate('ExpensePage');
        } catch (error) {
            console.error('支出の更新に失敗しました:', error);
        }
    };

    const categoryOptions = categories.map((expenseCategory: any) => ({
        label: expenseCategory.name,
        value: String(expenseCategory.id),
    }));

    return (
        <View style={theme.container}>
            <Text style={theme.title}>支出編集</Text>
            <Text style={theme.inputTitle}>支出名</Text>
            <TextInput
                placeholder="支出名"
                value={name}
                onChangeText={setName}
                style={theme.input}
            />
            <Text style={theme.inputTitle}>金額</Text>
            <TextInput
                placeholder="金額"
                value={amount}
                onChangeText={setAmount}
                style={theme.input}
                keyboardType="numeric"
            />
            <Text style={theme.inputTitle}>日時</Text>
            <TextInput
                placeholder="日時"
                value={date}
                onChangeText={setDate}
                style={theme.input}
            />
            <Text style={theme.inputTitle}>カテゴリー</Text>
            <View style={theme.inputTitle}>
                <PickerWithModal
                    selectedValue={category}
                    onValueChange={(value) => setCategory(value.toString())}
                    options={categoryOptions}
                />
            </View>
            <Button title="更新" onPress={updateExpense} />
        </View>
    );
}; 