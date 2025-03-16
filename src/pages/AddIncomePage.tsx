import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import PickerWithModal from '../components/PickerWithModal';

// TODO: エンドポイントを変更
const csrfTokenUrl = 'http://localhost/api/v1/csrf-token';
const saveIncomeUrl = 'http://localhost/api/v1/income';

export const AddIncomePage = ({ navigation }: { navigation: any }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost/api/v1/income_category');
                setCategories(response.data.income_category_info_list || []);
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

    const saveIncome = async () => {
        try {
            await axios.post(saveIncomeUrl, {
                income_name: description,
                income_category_id: category,
                income_amount: amount,
                calendar_date: date,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            navigation.navigate('IncomePage');
        } catch (error) {
            console.error('収入の保存に失敗しました:', error);
        }
    };

    const categoryOptions = categories.map((incomeCategory: any) => ({
        label: incomeCategory.name,
        value: String(incomeCategory.id),
    }));

    return (
        <View style={theme.container}>
            <Text style={theme.title}>収入追加</Text>
            <Text style={theme.inputTitle}>収入名</Text>
            <TextInput
                placeholder="収入名"
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
            <Button title="保存" onPress={saveIncome} />
        </View>
    );
};
