import { View, StyleSheet, Text, Button } from 'react-native';
import React from 'react';
import { User } from '@/typings/projectTypes';
import { Link } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { useRouter } from 'expo-router';
import ModalRemoveItem from '../ModalRemoveItem/ModalRemoveItem';

interface ListItemProps {
    user: User;
    setData: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function ListItemUsers(props: ListItemProps) {
    const { id, name, email, userName, active } = props.user;
    const { setData } = props;
    const { role, setOpenModalId } = useMainContext();
    const canUpdate = role === 'ADMIN';
    const router = useRouter();

    const handleDeleteSuccess = (userId: string) => {
        setData((prevData) => prevData.filter((user) => user.id !== userId));
    };

    return (
        <View style={styles.item}>
            <Link href={`/components/CreateUser/${id}`}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.title}>{email}</Text>
                <Text style={styles.title}>{userName}</Text>
                <Text style={styles.title}>active: {active.toString()}</Text>
                {canUpdate && (
                    <>
                        <Button
                            onPress={() =>
                                router.push(`/components/CreateUser/${id}`)
                            }
                            title="Update"
                        />
                        <Button
                            onPress={() => setOpenModalId(id)}
                            title="Delete"
                        />
                    </>
                )}
            </Link>
            <ModalRemoveItem
                id={id}
                onDeleteSuccess={() => handleDeleteSuccess(id)}
                type="user"
            />
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
