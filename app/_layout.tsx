import { Slot } from 'expo-router';
import MainProvider from '@/contexts/useMainContext';

export default function Root() {
    return (
        <MainProvider>
            <Slot />
        </MainProvider>
    );
}
