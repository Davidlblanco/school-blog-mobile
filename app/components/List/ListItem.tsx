import { View, StyleSheet, Text, Button } from 'react-native';
import React from 'react';
import { Article } from '@/typings/projectTypes';
import { Link } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { useRouter } from 'expo-router';
import { colors } from '@/utils/variables';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ListItemProps {
    article: Article;
}
export default function ListItem(props: ListItemProps) {
    const {
        id,
        title,
        content,
        active,
        creator: { name: creatorName },
    } = props.article;
    const { role } = useMainContext();
    const canUpdate = role === 'ADMIN' || role === 'TECHER';
    const router = useRouter();

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
                                onPress={() =>
                                    router.navigate(
                                        `/components/ModalRemoveItem/article/${id}`,
                                    )
                                }
                                title="Delete"
                                color={colors.mainColor}
                            />
                        </View>
                    ) : null}
                </Link>
            </View>
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
