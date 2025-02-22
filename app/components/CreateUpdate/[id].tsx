import { View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import Input from '../Input/Input';
import { useMainContext } from '@/contexts/useMainContext';
import { apiUrl, colors, formContainerStyles } from '@/utils/variables';
import { Article } from '@/typings/projectTypes';
import AccessDenied from '../AccessDenied/AccessDenied';
import ToastComponent from '@/utils/Toast';

export default function CreateUpdate() {
    const { id: paramId } =
        useLocalSearchParams<'/components/CreateUpdate/[id]'>();
    const id = paramId === '0' ? undefined : paramId;
    const [active, setActive] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
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

    async function handleSubmit() {
        const payload = {
            active,
            content,
            title,
            filePath: imageUrl,
        };

        const createUpdateArticle = await fetch(
            `${apiUrl}/articles${id ? `/${id}` : ''}`,
            {
                method: id ? 'PATCH' : 'POST',
                headers: createHeaders(),
                body: JSON.stringify(payload),
                redirect: 'follow',
            },
        );
        const article: Article = await createUpdateArticle.json();
        if (!createUpdateArticle.ok) {
            console.error('ERROR:', article);
            setContextError(`Erro ao ${id ? 'atualizar' : 'criar'} artigo!`);
            return;
        }
        setContextSuccess(`Artigo ${id ? 'atualizado' : 'criado'}!`);
        router.dismiss(1);
    }

    async function setInitialParameters() {
        const getArticle = await fetch(`${apiUrl}/articles/${id}`, {
            method: 'GET',
            headers: createHeaders(),
            redirect: 'follow',
        });
        const article: Article = await getArticle.json();
        if (!getArticle.ok) {
            console.error('ERROR:', article);
            setContextError(
                `Erro ao procurar o artigo a ser editado, id: ${id}`,
            );
            return;
        }
        setActive(article.active);
        setTitle(article.title);
        setContent(article.content);
        navigation.setOptions({ title: article.title });
        if (article.filePath) setImageUrl(article.filePath);
    }

    useEffect(() => {
        if (!id) {
            navigation.setOptions({ title: 'New Article' });
            return;
        }
        setInitialParameters();
    }, []);

    if (role !== 'ADMIN' && role !== 'TEACHER') return <AccessDenied />;

    return (
        <View style={formContainerStyles.container}>
            <View style={formContainerStyles.innerContainer}>
                <Input
                    type="checkbox"
                    label="Status"
                    value={active}
                    set={setActive}
                />
                <Input
                    type="text"
                    label="Title"
                    value={title}
                    set={setTitle}
                    required
                />
                <Input
                    type="textarea"
                    label="Content"
                    value={content}
                    set={setContent}
                    required
                />
                <Input
                    type="text"
                    label="Image url"
                    value={imageUrl}
                    set={setImageUrl}
                />
                <Button
                    color={colors.mainColor}
                    onPress={handleSubmit}
                    title="Save"
                />
            </View>
            <ToastComponent />
        </View>
    );
}
