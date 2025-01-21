import { View, Text, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { Article } from '@/typings/projectTypes';
import { apiUrl } from '@/utils/variables';

export default function ViewArticle() {
    const { id } = useLocalSearchParams<'/components/ViewArticle/[id]'>();
    const { jwtToken } = useMainContext();
    const [article, setArticle] = useState<Article>();
    const [imageHeight, setImageHeight] = useState<number | null>(null);

    const screenWidth = Dimensions.get('window').width;
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
            if (article.filePath) {
                Image.getSize(
                    article.filePath,
                    (width, height) => {
                        const calculatedHeight = (height / width) * screenWidth;
                        setImageHeight(calculatedHeight);
                    },
                    (error) =>
                        console.error('Error fetching image size:', error),
                );
            }
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
            <Text>{article.title} </Text>
            {article.filePath ? (
                <Image
                    source={{
                        uri: article.filePath,
                    }}
                    style={{ width: screenWidth, height: imageHeight }}
                />
            ) : null}
            <Text>{article.content}</Text>

            <Text>{article.creator.name}</Text>
            <Text>{article.date.split('T')[0]}</Text>
        </View>
    );
}
