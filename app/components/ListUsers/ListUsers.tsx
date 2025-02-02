import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Button, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { User } from '@/typings/projectTypes';
import UseDebounce from '@/utils/UseDebounce';
import { apiUrl, colors, listStyles } from '@/utils/variables';
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
            <SafeAreaProvider style={listStyles.container}>
                <Search set={setSearchUser} value={searchUser} />
                {canCreate && (
                    <View style={canCreate && listStyles.button}>
                        <Button
                            onPress={() =>
                                router.push('/components/CreateUser/0')
                            }
                            title="Create User"
                            color={colors.mainColor}
                        />
                    </View>
                )}
                <SafeAreaView style={listStyles.list}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <ListItemUsers user={item} />}
                        keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            <ToastComponent />
        </>
    );
}
