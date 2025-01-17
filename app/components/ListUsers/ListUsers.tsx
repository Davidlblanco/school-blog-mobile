import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, StatusBar, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { User } from '@/typings/projectTypes';
import UseDebounce from '@/utils/UseDebounce';
import { apiUrl } from '@/utils/variables';
import ListItemUsers from './ListItemUsers';
import Search from '../Search/Search';
import ToastComponent from '@/utils/Toast';

export default function ListUsers() {
    const {
        jwtToken,
        searchUser,
        setSearchUser,
        role,
        contextSuccess,
        contextError,
    } = useMainContext();
    const router = useRouter();
    const [data, setData] = useState<User[]>([]);

    const getUsers = async () => {
        const orderByFilter = `&orderBy={"name":"asc"}`;
        const searchFilter = searchUser
            ? `&where={
                "OR":[
                    {"name":{"contains":"${searchUser}","mode":"insensitive"}},
                    {"email":{"contains":"${searchUser}","mode":"insensitive"}},
                    {"userName":{"contains":"${searchUser}","mode":"insensitive"}}
                ]
            }`
            : '';
        const users = await fetch(
            `${apiUrl}/users?rows=true${orderByFilter}${searchFilter}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        if (!users.ok) return;
        const userList: User[] = await users.json();
        setData(userList);
    };

    useEffect(() => {
        getUsers();
    }, [contextSuccess, contextError]);

    const debounceSearch = UseDebounce(() => getUsers(), 1000);
    useEffect(debounceSearch, [searchUser]);

    const canCreate = role === 'ADMIN';

    return (
        <>
            <SafeAreaProvider>
                <Search set={setSearchUser} value={searchUser} />
                {canCreate && (
                    <Button
                        onPress={() => router.push('/components/CreateUser/0')}
                        title="Create User"
                    />
                )}
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <ListItemUsers user={item} setData={setData} />
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
