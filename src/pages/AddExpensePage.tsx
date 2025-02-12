import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { theme } from '../styles/theme';

export const AddExpensePage = ({ navigation }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    const saveExpense = () => {
        navigation.goBack();
    };

    return (
        <View style={theme.container}>
            <Text style={theme.title}>支出追加</Text>
            <TextInput
                placeholder="支出名"
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