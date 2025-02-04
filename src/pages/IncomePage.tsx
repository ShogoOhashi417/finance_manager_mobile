import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { theme } from '../styles/theme';

const dummyData = [
    { id: '1', description: '給与', amount: '¥300,000' },
    { id: '2', description: '副収入', amount: '¥50,000' },
    { id: '3', description: '投資収益', amount: '¥20,000' },
];

export const IncomePage = () => {
    return (
        <View style={theme.container}>
            <Text style={theme.title}>収入管理</Text>
            <FlatList
                data={dummyData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={theme.item}>
                        <Text style={theme.description}>{item.description}</Text>
                        <Text style={theme.amount}>{item.amount}</Text>
                    </View>
                )}
            />
        </View>
    );
};
