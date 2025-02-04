import React, { useState } from 'react';
import { View, Text, FlatList, Button, Modal, TextInput } from 'react-native';
import { theme } from '../styles/theme';

const dummyData = [
    { id: '1', description: '食費', amount: '¥1,000' },
    { id: '2', description: '交通費', amount: '¥500' },
    { id: '3', description: '娯楽費', amount: '¥2,000' },
];

export const ExpensePage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    const addExpense = () => {
        // ここで支出を追加するロジックを実装します
        setModalVisible(false);
    };

    return (
        <View style={theme.container}>
            <Text style={theme.title}>支出管理</Text>
            <Button title="支出追加" onPress={() => setModalVisible(true)} />
            <FlatList
                data={dummyData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={theme.item}>
                        <Text style={theme.description}>{item.description}</Text>
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
