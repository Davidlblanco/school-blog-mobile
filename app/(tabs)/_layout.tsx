import React from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function _layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="List"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="list" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="UserList"
                options={{
                    title: 'User List',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="people" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="MyAccount"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}
