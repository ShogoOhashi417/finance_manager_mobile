import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { theme } from '../styles/theme';
import { TabView, SceneMap } from 'react-native-tab-view';

const IncomeCategories = () => {
    const incomeCategories = ['給与', '副収入', '投資'];
    return (
        <View>
            {incomeCategories.map((category, index) => (
                <View key={index} style={theme.item}>
                    <Text style={theme.categoryItem}>{category}</Text>
                </View>
            ))}
        </View>
    );
};

const ExpenseCategories = () => {
    const expenseCategories = ['家賃', '食費', '交通費'];
    return (
        <View>
            {expenseCategories.map((category, index) => (
                <View key={index} style={theme.item}>
                    <Text style={theme.categoryItem}>{category}</Text>
                </View>
            ))}
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
