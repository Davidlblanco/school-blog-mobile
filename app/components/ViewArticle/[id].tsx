import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { Article } from '@/typings/projectTypes';
import { apiUrl, colors } from '@/utils/variables';

export default function ViewArticle() {
    const { id } = useLocalSearchParams<'/components/ViewArticle/[id]'>();
    const { jwtToken } = useMainContext();
    const [article, setArticle] = useState<Article>();
    const [imageHeight, setImageHeight] = useState<number | null>(null);
    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width - 20;
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
            navigation.setOptions({ title: article.title });
        } catch (e) {
            console.log('Error:', e);
        }
    };

    useEffect(() => {
        getArticle();
    }, []);
    if (!article) return;
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {article.filePath ? (
                    <Image
                        source={{
                            uri: article.filePath,
                        }}
                        style={{
                            width: screenWidth,
                            height: imageHeight,
                            ...styles.image,
                        }}
                    />
                ) : null}
                <View style={styles.textContainer}>
                    <Text style={styles.content}>{article.content}</Text>
                    <Text style={styles.creator}>{article.creator.name}</Text>
                    <Text style={styles.date}>
                        {article.date.split('T')[0]}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.lightBg,
        height: '100%',
    },
    image: { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    innerContainer: {
        borderRadius: 10,
        backgroundColor: '#fff',
    },

    textContainer: {
        margin: 10,
    },
    content: {
        fontSize: 16,
        marginVertical: 10,
        color: colors.darkText,
    },
    creator: {
        fontSize: 14,
        marginTop: 5,
        color: colors.darkText,
        textAlign: 'right',
    },
    date: {
        fontSize: 14,
        color: colors.darkText,
        textAlign: 'right',
    },
});
