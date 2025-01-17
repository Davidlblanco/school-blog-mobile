import { Slot, Stack } from 'expo-router';
import MainProvider from '@/contexts/useMainContext';

export default function Root() {
    return (
        <MainProvider>
            <Slot />
            {/* <Stack /> */}
        </MainProvider>
    );
}
// import { Tabs } from 'expo-router';

// export default function TabLayout() {
//     return (
//         <Tabs>
//             <Tabs.Screen
//                 name="list"
//                 options={{
//                     href: 'isLoggedIn',
//                 }}
//             />

//             {/* <Tabs.Screen
//                 name="admin"
//                 options={{
//                     href: '/components/ListUsers/ListItemUsers',
//                 }}
//             /> */}
//         </Tabs>
//     );
// }
