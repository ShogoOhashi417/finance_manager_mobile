import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

// TODO: エンドポイントを変更
const csrfTokenUrl = 'http://localhost/api/v1/csrf-token';
const saveCategoryUrl = 'http://localhost/api/v1/category';

export const AddIncomeCategoryPage = ({ navigation }: { navigation: any }) => {
    const [categoryName, setCategoryName] = useState('');
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
    }, []);

    const saveCategory = async () => {
        try {
            await axios.post(saveCategoryUrl, {
                category_name: categoryName,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken, // CSRFトークンをヘッダーに追加
                },
            });
            navigation.goBack();
        } catch (error) {
            console.error('カテゴリの保存に失敗しました:', error);
        }
    };

    return (
        <View style={theme.container}>
            <Text style={theme.title}>カテゴリ追加</Text>
            <TextInput
                placeholder="カテゴリ名"
                value={categoryName}
                onChangeText={setCategoryName}
                style={theme.input}
            />
            <Button title="保存" onPress={saveCategory} />
        </View>
    );
};
