import { Stack } from 'expo-router';
import MainProvider from '@/contexts/useMainContext';

export default function Root() {
    return (
        <MainProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </MainProvider>
    );
}
