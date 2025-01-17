import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { Article } from '@/typings/projectTypes';
import { apiUrl } from '@/utils/variables';

export default function ViewArticle() {
    const { id } = useLocalSearchParams<'/components/ViewArticle/[id]'>();
    const { jwtToken } = useMainContext();
    const [article, setArticle] = useState<Article>();
    const getArticle = async () => {
        try {
            const articles = await fetch(`${apiUrl}/articles/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!articles.ok) return;
            const article: Article = await articles.json();
            setArticle(article);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getArticle();
    }, []);
    if (!article) return;
    return (
        <View>
            <Text>{article.title}</Text>
            {article.filePath ? (
                <Image
                    src={article.filePath}
                    alt={article.title}
                    className="rounded mr-4 mb-4 w-full	max-w-xl h-auto"
                />
            ) : null}
            <Text>{article.content}</Text>

            <Text>{article.creator.name}</Text>
            <Text>{article.date.split('T')[0]}</Text>
        </View>
    );
}
