import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';

export const CategoryPage = () => {
    const incomeCategories = ['給与', '副収入', '投資'];
    const expenseCategories = ['家賃', '食費', '交通費'];

    return (
        <View style={theme.container}>
            <Text style={theme.title}>カテゴリー管理</Text>
            <View style={theme.tabContainer}>
                <TouchableOpacity style={theme.tab}>
                    <Text style={theme.tabText}>収入カテゴリー</Text>
                </TouchableOpacity>
                <TouchableOpacity style={theme.tab}>
                    <Text style={theme.tabText}>支出カテゴリー</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={theme.table}>
                    <Text style={theme.tableHeader}>収入カテゴリー</Text>
                    {incomeCategories.map((category, index) => (
                        <Text key={index} style={theme.tableRow}>{category}</Text>
                    ))}
                </View>
                <View style={theme.table}>
                    <Text style={theme.tableHeader}>支出カテゴリー</Text>
                    {expenseCategories.map((category, index) => (
                        <Text key={index} style={theme.tableRow}>{category}</Text>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};
