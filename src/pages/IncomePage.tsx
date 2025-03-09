import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ScrollView } from 'react-native';
import { theme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';

// TODO: エンドポイントを変更
const apiUrl = 'http://localhost/api/v1/income';

const fetchData = async (setIncomeList: any) => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('ネットワークの応答が正常ではありません');
        }
        const data = await response.json();
        setIncomeList(data.income_info_list);
    } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
    }
};

export const IncomePage = () => {
    const navigation = useNavigation();
    const [incomeList, setIncomeList] = useState([]);

    useEffect(() => {
        fetchData(setIncomeList);
    }, []);

    return (
        <View style={theme.container}>
            <Text style={theme.title}>収入管理</Text>
            <Button title="収入追加" onPress={() => navigation.navigate('AddIncomePage')} />
            <ScrollView horizontal>
                <FlatList
                    data={incomeList}
                    keyExtractor={(item: { id: string }) => item.id}
                    renderItem={({ item }) => (
                        <View style={theme.item}>
                            <Text
                                style={theme.description}
                                onPress={() => navigation.navigate('EditIncomePage', { incomeId: item.id })}
                            >{item.name}</Text>
                            <Text style={theme.amount}>{item.amount}</Text>
                            <Text style={theme.description}>{item.calendar_date}</Text>
                            <Text style={theme.description}></Text>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
};
