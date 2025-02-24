import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

// TODO: エンドポイントを変更
const csrfTokenUrl = 'http://localhost/api/v1/csrf-token';
const updateCategoryUrl = (id: string) => `http://localhost/api/v1/expenditure_category/${id}`;

export const EditExpenseCategoryPage = ({ route, navigation }: { route: any; navigation: any }) => {
    const { categoryId, categoryName } = route.params;
    const [name, setName] = useState(categoryName);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get(csrfTokenUrl);
                setCsrfToken(response.data.token);
            } catch (error) {
                console.error('CSRFトークンの取得に失敗しました:', error);
            }
        };

        fetchCsrfToken();
    }, [categoryId]);

    const updateCategory = async () => {
        try {
            await axios.put(updateCategoryUrl(categoryId), {
                expenditureCategoryName: name,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            navigation.navigate('CategoryPage');
        } catch (error) {
            console.error('カテゴリの更新に失敗しました:', error);
        }
    };

    return (
        <View style={theme.container}>
            <Text style={theme.title}>支出カテゴリ編集</Text>
            <TextInput
                placeholder="カテゴリ名"
                value={name}
                onChangeText={setName}
                style={theme.input}
            />
            <Button title="更新" onPress={updateCategory} />
        </View>
    );
};
