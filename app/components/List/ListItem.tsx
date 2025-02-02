import { View, StyleSheet, Text, Button } from 'react-native';
import React from 'react';
import { Article } from '@/typings/projectTypes';
import { Link } from 'expo-router';
import { useMainContext } from '@/contexts/useMainContext';
import { useRouter } from 'expo-router';
import { colors, listItemStyles } from '@/utils/variables';
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
                <Link href={`/components/ViewArticle/${id}`}>
                    <Text style={listItemStyles.title}>
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
                        <View style={listItemStyles.updatingSection}>
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
});
