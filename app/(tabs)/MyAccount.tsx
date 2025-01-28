import React, { useEffect, useState } from 'react';
import { useMainContext } from '../../contexts/useMainContext';
import { apiUrl, colors } from '../../utils/variables';
import { User } from '../../typings/projectTypes';
import Input from '../components/Input/Input';
import {
    View,
    Button,
    GestureResponderEvent,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import ToastComponent from '@/utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function MyAccount() {
    const {
        jwtToken,
        setContextError,
        setContextSuccess,
        setJwtToken,
        setIsLoggedIn,
    } = useMainContext();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const router = useRouter();

    function handleLogOut() {
        removeJwtToken();
        setJwtToken(undefined);
        setIsLoggedIn(false);
        router.replace('/');
    }
    async function removeJwtToken() {
        await AsyncStorage.removeItem('school-blog-jwt');
    }
    function createHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${jwtToken}`);
        return headers;
    }

    const extractPayload = (token: string) => {
        try {
            const base64Payload = token.split('.')[1];
            const jsonPayload = atob(base64Payload);
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Invalid token:', error);
            return '';
        }
    };
    useEffect(() => {
        if (!jwtToken) return;
        const id = extractPayload(jwtToken).id;
        getUser(id);
    }, [jwtToken]);

    async function getUser(id: string) {
        const getUser = await fetch(`${apiUrl}/users/${id}`, {
            method: 'GET',
            headers: createHeaders(),
            redirect: 'follow',
        });
        const user: User = await getUser.json();
        if (!getUser.ok) {
            console.error('ERROR:', user);
            setContextError(
                `Erro ao procurar o usuário a ser editado, id: ${id}`,
            );
            return;
        }
        setName(user.name);
        setEmail(user.email);
        setUserName(user.userName);
    }
    async function handleSubmit(e: GestureResponderEvent) {
        if (!jwtToken) return;
        e.preventDefault();
        if (userPassword != '' && confirmPassword != userPassword) {
            setContextError(
                `Por favor preencher a senha e a confirmação com o mesmo valor`,
            );
            return;
        }

        const payload: Partial<User> = {
            name,
            email,
            userName,
        };

        if (userPassword !== '') {
            payload.password = userPassword;
        }

        const id = extractPayload(jwtToken).id;
        const updateUser = await fetch(`${apiUrl}/users/${id}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify(payload),
            redirect: 'follow',
        });

        const updatedUser: User = await updateUser.json();
        if (!updateUser.ok) {
            console.error('ERROR:', updatedUser);
            setContextError(`Erro ao atualizar usuário!`);
            return;
        }

        setContextSuccess(`Usuário atualizado com sucesso!`);
    }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
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
                <Input
                    type="password"
                    label="New Password"
                    value={userPassword}
                    set={setUserPassword}
                />
                <Input
                    type="password"
                    label="Confirm new password"
                    value={confirmPassword}
                    set={setConfirmPassword}
                />
                <View style={styles.saveButton}>
                    <Button
                        onPress={handleSubmit}
                        title="Save"
                        color={colors.mainColor}
                    />
                </View>

                <TouchableOpacity onPress={handleLogOut}>
                    <Text style={styles.button}>LogOut</Text>
                </TouchableOpacity>
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
    saveButton: {
        marginBottom: 16,
    },
    button: {
        color: colors.mainColor,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: colors.mainColor,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
});
