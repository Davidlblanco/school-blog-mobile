import { useMainContext } from '@/contexts/useMainContext';
import { Article } from '@/typings/projectTypes';
import UseDebounce from '@/utils/UseDebounce';
import { apiUrl } from '@/utils/variables';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, StatusBar, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ListItem from './ListItem';
import Search from '../Search/Search';
import Header from '../header/Header';
import ToastComponent from '@/utils/Toast';

export default function List() {
    const { jwtToken, search, setSearch, role } = useMainContext();
    const router = useRouter();
    const [data, setData] = useState<Article[]>([]);
    const getArticles = async () => {
        const activeFilter = role === 'STUDENT' ? `{"active":true}` : '{}';
        const searchFilter = search
            ? `&where={
                "OR":[
                    {"title":{"contains":"${search}","mode":"insensitive"}},
                    {"content":{"contains":"${search}","mode":"insensitive"}},
                    {"creator":{"name":{"contains":"${search}","mode":"insensitive"}}}
                ],
                "AND": [${activeFilter}]
            }`
            : `&where={"AND": [${activeFilter}]}`;
        const orderByFilter = `&orderBy={"date":"asc"}`;

        const articles = await fetch(
            `${apiUrl}/articles?rows=true${searchFilter}${orderByFilter}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        if (!articles.ok) return;
        const articlesList: Article[] = await articles.json();
        setData(articlesList);
    };
    useEffect(() => {
        getArticles();
    }, []);
    const debounceSearch = UseDebounce(() => getArticles(), 1000);
    useEffect(debounceSearch, [search]);
    const canCreate = role === 'ADMIN' || role === 'TECHER';
    return (
        <>
            <Header />
            <SafeAreaProvider>
                <Search set={setSearch} value={search} />
                {canCreate && (
                    <Button
                        onPress={() =>
                            router.push('/components/CreateUpdate/0')
                        }
                        title="CreateArticle"
                    />
                )}
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <ListItem article={item} setData={setData} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            <ToastComponent />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
});
