// import { Stack } from 'expo-router';
import { Slot } from 'expo-router';
import MainProvider from '@/contexts/useMainContext';

export default function Root() {
    // Set up the auth context and render our layout inside of it.
    return (
        <MainProvider>
            <Slot />
            {/* <Stack /> */}
        </MainProvider>
    );
}
