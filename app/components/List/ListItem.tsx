import { View, StyleSheet, Text, Button } from 'react-native';
import React from 'react';
import { Article } from '@/typings/projectTypes';
import { Link } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { useRouter } from 'expo-router';
import ModalRemoveItem from '../ModalRemoveItem/ModalRemoveItem';
import { colors } from '@/utils/variables';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    const router = useRouter();
    const handleDeleteSuccess = (articleId: string) => {
        setData((prevData) =>
            prevData.filter((article) => article.id !== articleId),
        );
    };
    if (!canUpdate && !active) return null;
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
                    href={`/components/ViewArticle/${id}`}
                    style={styles.content}
                >
                    <Text style={styles.title}>
                        {title}
                        {'\n'}
                    </Text>
                    <Text style={styles.articleContent}>
                        {content.substring(0, 50)}
                        {content.length > 49 ? '...' : ''}
                        {'\n'}
                    </Text>

                    <Text style={styles.name}>
                        By: {creatorName}
                        {'\n'}
                    </Text>
                    {canUpdate ? (
                        <View style={styles.updatingSection}>
                            <Button
                                onPress={() =>
                                    router.push(
                                        `/components/CreateUpdate/${id}`,
                                    )
                                }
                                title="Update"
                                color={colors.mainColor}
                            />
                            <Button
                                onPress={() => setOpenModalId(id)}
                                title="Delete"
                                color={colors.mainColor}
                            />
                        </View>
                    ) : null}
                </Link>
            </View>
            <ModalRemoveItem
                id={id}
                onDeleteSuccess={() => handleDeleteSuccess(id)}
                type="article"
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
        // borderWidth: 1,
    },
    title: {
        fontSize: 32,
        color: colors.darkText,
    },
    articleContent: {
        fontSize: 15,
        color: colors.darkText,
        marginLeft: 50,
        lineHeight: 30,
    },
    name: {
        color: colors.darkText,
        fontSize: 12,
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
