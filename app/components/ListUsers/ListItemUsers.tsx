import { View, StyleSheet, Text, Button } from 'react-native';
import React from 'react';
import { User } from '@/typings/projectTypes';
import { Link } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, listItemStyles } from '@/utils/variables';

interface ListItemProps {
    user: User;
}

export default function ListItemUsers(props: ListItemProps) {
    const { id, name, email, userName, active } = props.user;
    const { role } = useMainContext();
    const canUpdate = role === 'ADMIN';
    const router = useRouter();

    return (
        <View style={listItemStyles.itemWrapper}>
            <View style={listItemStyles.item}>
                {canUpdate && (
                    <View style={listItemStyles.icon}>
                        <Icon
                            name={active ? 'check-circle' : 'cancel'}
                            size={24}
                            color={active ? 'green' : 'red'}
                        />
                    </View>
                )}
                <Link href={`/components/CreateUser/${id}`}>
                    <Text style={listItemStyles.title}>
                        {name}
                        {'\n'}
                    </Text>
                    <Text style={listItemStyles.userInfo}>
                        {email}
                        {'\n'}
                    </Text>
                    <Text style={listItemStyles.userInfo}>
                        {userName}
                        {'\n'}
                    </Text>

                    {canUpdate && (
                        <View style={listItemStyles.updatingSection}>
                            <Button
                                onPress={() =>
                                    router.navigate(
                                        `/components/ModalRemoveItem/article/${id}`,
                                    )
                                }
                                title="Delete"
                                color={colors.mainColor}
                            />
                        </View>
                    )}
                </Link>
            </View>
        </View>
    );
}
