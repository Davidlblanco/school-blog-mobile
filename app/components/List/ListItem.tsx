import { View, StyleSheet, Text, Button } from 'react-native';
import React from 'react';
import { Article } from '@/typings/projectTypes';
import { Link } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { useRouter } from 'expo-router';
import ModalRemoveItem from '../ModalRemoveItem/ModalRemoveItem';
interface ListItemProps {
    article: Article;
    setData: React.Dispatch<React.SetStateAction<Article[]>>;
}
export default function ListItem(props: ListItemProps) {
    const {
        id,
        title,
        content,
        active,
        creator: { name: creatorName },
    } = props.article;
    const { setData } = props;
    const { role, setOpenModalId } = useMainContext();
    const canUpdate = role === 'ADMIN' || role === 'TECHER';
    const router = useRouter(); //
    const handleDeleteSuccess = (articleId: string) => {
        setData((prevData) =>
            prevData.filter((article) => article.id !== articleId),
        );
    };
    return (
        <View style={styles.item}>
            <Link href={`/components/ViewArticle/${id}`}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.title}>
                    {content.substring(0, 50)}
                    {content.length > 49 ? '...' : ''}
                </Text>
                <Text style={styles.title}>active:{active.toString()}</Text>
                <Text style={styles.title}>{creatorName}</Text>
                {canUpdate ? (
                    <>
                        <Button
                            onPress={() =>
                                router.push(`/components/CreateUpdate/${id}`)
                            }
                            title="Update"
                        />
                        <Button
                            onPress={() => setOpenModalId(id)}
                            title="Delete"
                        />
                    </>
                ) : null}
            </Link>
            <ModalRemoveItem
                id={id}
                onDeleteSuccess={() => handleDeleteSuccess(id)}
                type="article"
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
