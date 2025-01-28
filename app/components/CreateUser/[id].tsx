import { View, Button, GestureResponderEvent, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import Input from '../Input/Input';
import { useMainContext } from '@/contexts/useMainContext';
import { apiUrl, colors } from '@/utils/variables';
import { User, UserType } from '@/typings/projectTypes';
import AccessDenied from '../AccessDenied/AccessDenied';
import ToastComponent from '@/utils/Toast';
import RNPickerSelect from 'react-native-picker-select';

export default function CreateUpdateUser() {
    const {
        id: paramId, // string
    } = useLocalSearchParams<'/components/CreateUser/[id]'>();
    const id = paramId === '0' ? undefined : paramId;
    const [active, setActive] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [type, setType] = useState<UserType>('STUDENT');
    const { jwtToken, setContextError, setContextSuccess, role } =
        useMainContext();
    const navigation = useNavigation();
    const router = useRouter();

    function createHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${jwtToken}`);
        return headers;
    }

    async function handleSubmit(e: GestureResponderEvent) {
        const payload: Partial<User> = {
            active,
            name,
            email,
            userName,
            type,
        };
        if (!id) {
            payload.password = 'Ch@ngeMe1';
        }

        const createUpdateUser = await fetch(
            `${apiUrl}/users${id ? `/${id}` : ''}`,
            {
                method: id ? 'PATCH' : 'POST',
                headers: createHeaders(),
                body: JSON.stringify(payload),
                redirect: 'follow',
            },
        );
        const user: User = await createUpdateUser.json();
        if (!createUpdateUser.ok) {
            console.error('ERROR:', user);
            setContextError(`Erro ao ${id ? 'atualizar' : 'criar'} usuário!`);
            return;
        }
        setContextSuccess(`User ${id ? 'updated' : 'created'}!`);
        router.dismiss(1);
    }

    async function setInitialParameters() {
        const getUser = await fetch(`${apiUrl}/users/${id}`, {
            method: 'GET',
            headers: createHeaders(),
            redirect: 'follow',
        });
        const user: User = await getUser.json();
        if (!getUser.ok) {
            console.error('ERROR:', user);
            setContextError(`Error trying to find user, id: ${id}`);
            return;
        }
        setActive(user.active);
        setName(user.name);
        setEmail(user.email);
        setUserName(user.userName);
        setType(user.type);
        navigation.setOptions({ title: user.userName });
    }

    useEffect(() => {
        if (!id) {
            navigation.setOptions({ title: 'New User' });
            return;
        }
        setInitialParameters();
    }, [id]);

    if (role !== 'ADMIN') return <AccessDenied />;

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Input
                    type="checkbox"
                    label="Status"
                    value={active}
                    set={setActive}
                />
                <Input
                    type="text"
                    label="Name"
                    value={name}
                    set={setName}
                    required
                />
                <Input
                    type="email"
                    label="Email"
                    value={email}
                    set={setEmail}
                    required
                />
                <Input
                    type="text"
                    label="User name"
                    value={userName}
                    set={setUserName}
                    required
                />
                <View style={styles.selectHolder}>
                    <RNPickerSelect
                        onValueChange={(value) => setType(value)}
                        items={[
                            { label: 'Admin', value: 'ADMIN' },
                            { label: 'Teacher', value: 'TEACHER' },
                            { label: 'Student', value: 'STUDENT' },
                        ]}
                        value={type}
                        // style={pickerSelectStyles}
                    />
                </View>
                <Button
                    onPress={handleSubmit}
                    color={colors.mainColor}
                    title="Save"
                />
            </View>
            <ToastComponent />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.lightBg,
        height: '100%',
    },
    innerContainer: {
        borderRadius: 10,
        padding: 16,
        backgroundColor: '#fff',
    },
    selectHolder: {
        borderWidth: 1,
        borderColor: colors.greyShadow,
        marginBottom: 16,
    },
});
