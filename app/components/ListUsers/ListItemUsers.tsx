import { View, StyleSheet, Text, Button } from 'react-native';
import React from 'react';
import { User } from '@/typings/projectTypes';
import { Link } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { useRouter } from 'expo-router';
import ModalRemoveItem from '../ModalRemoveItem/ModalRemoveItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/utils/variables';

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
        <View style={styles.itemWrapper}>
            <View style={styles.item}>
                {canUpdate && (
                    <View style={styles.icon}>
                        <Icon
                            name={active ? 'check-circle' : 'cancel'}
                            size={24}
                            color={active ? 'green' : 'red'}
                        />
                    </View>
                )}
                <Link
                    href={`/components/CreateUser/${id}`}
                    style={styles.content}
                >
                    <Text style={styles.title}>
                        {name}
                        {'\n'}
                    </Text>
                    <Text style={styles.userInfo}>
                        {email}
                        {'\n'}
                    </Text>
                    <Text style={styles.userInfo}>
                        {userName}
                        {'\n'}
                    </Text>

                    {canUpdate && (
                        <View style={styles.updatingSection}>
                            <Button
                                onPress={() => setOpenModalId(id)}
                                title="Delete"
                                color={colors.mainColor}
                            />
                        </View>
                    )}
                </Link>
            </View>
            <ModalRemoveItem
                id={id}
                onDeleteSuccess={() => handleDeleteSuccess(id)}
                type="user"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderColor: colors.greyShadow,
        marginBottom: 16,
    },
    item: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        minWidth: '100%',
    },
    title: {
        fontSize: 32,
        color: colors.darkText,
    },
    userInfo: {
        fontSize: 15,
        color: colors.darkText,
        marginLeft: 50,
        lineHeight: 30,
    },
    content: {},
    icon: {
        marginTop: 12,
        marginRight: 10,
    },
    updatingSection: {
        paddingTop: 16,
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
    },
});
