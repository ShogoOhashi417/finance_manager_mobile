import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import PickerWithModal from '../components/PickerWithModal';

// TODO: エンドポイントを変更
const csrfTokenUrl = 'http://localhost/api/v1/csrf-token';
const saveExpenseUrl = 'http://localhost/api/v1/expenditure';

export const AddExpensePage = ({ navigation }: { navigation: any }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
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
    }, []);

    const saveExpense = async () => {
        try {
            await axios.post(saveExpenseUrl, {
                expenditure_name: description,
                expenditure_category_id: category,
                expenditure_amount: amount,
                calendar_date: date,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            navigation.goBack();
        } catch (error) {
            console.error('支出の保存に失敗しました:', error);
        }
    };

    const categoryOptions = categories.map((expenseCategory: any) => ({
        label: expenseCategory.name,
        value: String(expenseCategory.id),
    }));

    return (
        <View style={theme.container}>
            <Text style={theme.title}>支出追加</Text>
            <Text style={theme.inputTitle}>支出名</Text>
            <TextInput
                placeholder="支出名"
                value={description}
                onChangeText={setDescription}
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
            <Button title="保存" onPress={saveExpense} />
        </View>
    );
};
