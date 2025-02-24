import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { theme } from '../styles/theme';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

const fetchIncomeCategoryData = async (setIncomeCategoryList: any) => {
    try {
        const apiUrl = 'http://localhost/api/v1/income_category';

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('ネットワークの応答が正常ではありません');
        }
        const data = await response.json();
        setIncomeCategoryList(data.income_category_info_list);
    } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
    }
};

const fetchExpenseCategoryData = async (setExpenseCategoryList: any) => {
    try {
        const apiUrl = 'http://localhost/api/v1/expenditure_category';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('ネットワークの応答が正常ではありません');
        }
        const data = await response.json();
        setExpenseCategoryList(data.expenditure_category_info_list);
    } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
    }
};

const IncomeCategories = () => {
    const [incomeCategoryList, setIncomeCategoryList] = useState([]);

    useEffect(() => {
        fetchIncomeCategoryData(setIncomeCategoryList);
    }, []);

    const navigation = useNavigation();

    return (
        <View>
            <Button title="収入カテゴリー追加" onPress={() => navigation.navigate('AddIncomeCategoryPage')} />
            <FlatList
                data={incomeCategoryList}
                keyExtractor={(item: { id: string }) => item.id}
                renderItem={({ item }) => (
                    <View style={theme.item}>
                        <Text style={theme.description}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const ExpenseCategories = () => {
    const [expenseCategoryList, setExpenseCategoryList] = useState([]);

    useEffect(() => {
        fetchExpenseCategoryData(setExpenseCategoryList);
    }, []);

    const navigation = useNavigation();

    return (
        <View>
            <Button title="支出カテゴリー追加" onPress={() => navigation.navigate('AddExpenseCategoryPage')} />
            <FlatList
                data={expenseCategoryList}
                keyExtractor={(item: { id: string }) => item.id}
                renderItem={({ item }) => (
                    <View style={theme.item}>
                        <Text
                            style={theme.description}
                            onPress={() => navigation.navigate('EditExpenseCategoryPage', { categoryId: item.id })}
                        >{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export const CategoryPage = () => {
    const [index, setIndex] = useState(0);
    const routes = [
        { key: 'income', title: '収入' },
        { key: 'expense', title: '支出' },
    ];

    const sceneMap = SceneMap({
        income: IncomeCategories,
        expense: ExpenseCategories,
    });

    return (
        <View style={theme.container}>
            <Text style={theme.title}>カテゴリー管理</Text>
            <TabView
                navigationState={{ index, routes }}
                renderScene={sceneMap}
                onIndexChange={setIndex}
                initialLayout={{ width: 300 }}
            />
        </View>
    );
};
