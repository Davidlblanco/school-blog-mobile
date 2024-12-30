import { View, StyleSheet, Text, StatusBar } from 'react-native';
import React from 'react';
import { Article } from '@/typings/projectTypes';

export default function ListItem({
    id,
    title,
    content,
    active,
    creator: { name: creatorName },
}: Article) {
    return (
        <View style={styles.item}>
            {/* <Text style={styles.title}>{id}</Text> */}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>
                {content.substring(0, 50)}
                {content.length > 49 ? '...' : ''}
            </Text>
            <Text style={styles.title}>active:{active.toString()}</Text>
            <Text style={styles.title}>{creatorName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
