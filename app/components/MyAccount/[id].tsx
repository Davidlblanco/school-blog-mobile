import React, { useEffect, useState } from 'react';
import { useMainContext } from '../../../contexts/useMainContext';
import { apiUrl } from '../../../utils/variables';
import { User } from '../../../typings/projectTypes';
import Input from '../Input/Input';
import { View, Button, GestureResponderEvent } from 'react-native';
import ToastComponent from '@/utils/Toast';

export default function MyAccount() {
    const { jwtToken, setContextError, setContextSuccess } = useMainContext();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

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
        <>
            <View>
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
                <Button onPress={handleSubmit} title="save" />
            </View>
            <ToastComponent />
        </>
    );
}

// export default function MyAccount() {
//     const { jwtToken, setContextError, setContextSuccess } = useMainContext();
//     const [name, setName] = useState<string>('');
//     const [email, setEmail] = useState<string>('');
//     const [userName, setUserName] = useState<string>('');
//     const [userPassword, setUserPassword] = useState<string>('');
//     const [confirmPassword, setConfirmPassword] = useState<string>('');

//     function createHeaders() {
//         const headers = new Headers();
//         headers.append('Content-Type', 'application/json');
//         headers.append('Authorization', `Bearer ${jwtToken}`);
//         return headers;
//     }

//     const extractPayload = (token: string) => {
//         try {
//             const base64Payload = token.split('.')[1];
//             const jsonPayload = atob(base64Payload);
//             return JSON.parse(jsonPayload);
//         } catch (error) {
//             console.error('Invalid token:', error);
//             return '';
//         }
//     };
//     useEffect(() => {
//         if (!jwtToken) return;
//         const id = extractPayload(jwtToken).id;
//         getUser(id);
//     }, [jwtToken]);

//     async function getUser(id: string) {
//         const getUser = await fetch(`${apiUrl}/users/${id}`, {
//             method: 'GET',
//             headers: createHeaders(),
//             redirect: 'follow',
//         });
//         const user: User = await getUser.json();
//         if (!getUser.ok) {
//             console.error('ERROR:', user);
//             setContextError(
//                 `Erro ao procurar o usuário a ser editado, id: ${id}`,
//             );
//             return;
//         }
//         setName(user.name);
//         setEmail(user.email);
//         setUserName(user.userName);
//     }
//     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//         if (!jwtToken) return;
//         e.preventDefault();
//         if (userPassword != '' && confirmPassword != userPassword) {
//             setContextError(
//                 `Por favor preencher a senha e a confirmação com o mesmo valor`,
//             );
//             return;
//         }

//         const payload: Partial<User> = {
//             name,
//             email,
//             userName,
//         };

//         if (userPassword !== '') {
//             payload.password = userPassword;
//         }

//         const id = extractPayload(jwtToken).id;
//         const updateUser = await fetch(`${apiUrl}/users/${id}`, {
//             method: 'PATCH',
//             headers: createHeaders(),
//             body: JSON.stringify(payload),
//             redirect: 'follow',
//         });

//         const updatedUser: User = await updateUser.json();
//         if (!updateUser.ok) {
//             console.error('ERROR:', updatedUser);
//             setContextError(`Erro ao atualizar usuário!`);
//             return;
//         }

//         setContextSuccess(`Usuário atualizado com sucesso!`);
//     }
//     return (
//         <div className="p-4 bg-white rounded shadow-md m-4">
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <Input
//                     type="text"
//                     label="Name"
//                     value={name}
//                     set={setName}
//                     required
//                 />
//                 <Input
//                     type="email"
//                     label="Email"
//                     value={email}
//                     set={setEmail}
//                     required
//                 />
//                 <Input
//                     type="text"
//                     label="User name"
//                     value={userName}
//                     set={setUserName}
//                     required
//                 />
//                 <Input
//                     type="password"
//                     label="New Password"
//                     value={userPassword}
//                     set={setUserPassword}
//                 />
//                 <Input
//                     type="password"
//                     label="Confirm new password"
//                     value={confirmPassword}
//                     set={setConfirmPassword}
//                 />
//                 <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//                 >
//                     Save
//                 </button>
//             </form>
//         </div>
//     );
// }
