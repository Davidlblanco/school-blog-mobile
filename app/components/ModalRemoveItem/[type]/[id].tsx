import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { apiUrl, colors } from '../../../../utils/variables';
import { useMainContext } from '@/contexts/useMainContext';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';

export default function ModalRemoveItem() {
    const { id, type } =
        useLocalSearchParams<'/components/ModalRemoveItem/[type]/[id]'>();
    const {
        openModalId,
        setOpenModalId,
        jwtToken,
        setContextSuccess,
        setContextError,
    } = useMainContext();
    const navigation = useNavigation();
    navigation.setOptions({ headerShown: false });

    async function handleDelete() {
        if (!jwtToken) return;
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${jwtToken}`);

        try {
            const response = await fetch(`${apiUrl}/${type}s/${id}`, {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow',
            });
            if (!response.ok) {
                const error = await response.json();
                setContextError(error.message);
                console.error('ERROR:', error);
                return;
            }
            const result = await response.text();
            setContextSuccess(result);
            setOpenModalId('');
            router.back();
        } catch (error) {
            setContextError('Failed to delete item');
            console.error('ERROR:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >{`Are you sure you want to remove this ${type}?`}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleDelete}>
                    <Text style={styles.secondary}>Yes</Text>
                </TouchableOpacity>
                <Button
                    onPress={() => router.back()}
                    title="No"
                    color={colors.mainColor}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.easyGrey,
        minWidth: '100%',
        minHeight: '100%',
        padding: 16,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        color: colors.darkText,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    secondary: {
        color: colors.mainColor,
        lineHeight: 30,
        marginHorizontal: 8,
    },
});
