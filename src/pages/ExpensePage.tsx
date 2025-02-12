import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Modal, TextInput } from 'react-native';
import { theme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';

const apiUrl = 'http://localhost/test-api2';

const fetchData = async (setExpenditureList) => {
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
    const [modalVisible, setModalVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [expenditureList, setExpenditureList] = useState([]);

    const addExpense = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        fetchData(setExpenditureList);
    }, []);

    return (
        <View style={theme.container}>
            <Text style={theme.title}>支出管理</Text>
            <Button title="支出追加" onPress={() => navigation.navigate('AddExpensePage')} />
            <FlatList
                data={expenditureList}
                keyExtractor={(item: { id: string }) => item.id}
                renderItem={({ item }) => (
                    <View style={theme.item}>
                        <Text style={theme.description}>{item.name}</Text>
                        <Text style={theme.amount}>{item.amount}</Text>
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={theme.modalView}>
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
                    <Button title="追加" onPress={addExpense} />
                    <Button title="キャンセル" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};
