import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { apiUrl, colors } from '../../../utils/variables';
import { useMainContext } from '@/contexts/useMainContext';
interface ModalProps {
    id: string;
    type: 'article' | 'user';
    onDeleteSuccess: () => void;
}

export default function ModalRemoveItem(props: ModalProps) {
    const { id, type, onDeleteSuccess } = props;
    const {
        openModalId,
        setOpenModalId,
        jwtToken,
        setContextSuccess,
        setContextError,
    } = useMainContext();
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
            onDeleteSuccess();
        } catch (error) {
            setContextError('Failed to delete item');
            console.error('ERROR:', error);
        }
    }

    if (openModalId !== id) return null;
    return (
        <View style={styles.container}>
            <Text>{`Are you sure you want to remove this ${type}?`}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleDelete}>
                    <Text style={styles.secondary}>Yes</Text>
                </TouchableOpacity>
                <Button
                    onPress={() => setOpenModalId('')}
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
        padding: 16,
        borderRadius: 4,
    },
    text: {
        color: colors.darkText,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
    },
    secondary: {
        color: colors.mainColor,
        lineHeight: 30,
        marginHorizontal: 8,
    },
});
