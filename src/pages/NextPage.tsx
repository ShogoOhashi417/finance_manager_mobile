import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../styles/theme';

export const NextPage = () => {
    return (
        <View style={theme.container}>
            <Text>次のページです！</Text>
        </View>
    );
};
