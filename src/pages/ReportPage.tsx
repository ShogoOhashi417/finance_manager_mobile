import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export const ReportPage = () => {
    return (
        <View style={theme.container}>
            <Text style={styles.title}>レポート</Text>
            <Text>ここにレポートの内容が表示されます</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
}); 