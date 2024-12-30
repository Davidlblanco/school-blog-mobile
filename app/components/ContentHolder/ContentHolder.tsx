import { View } from 'react-native';

import { Link } from 'expo-router';

export default function ContentHolder() {
    return (
        <View>
            <Link href="/components/ContentHolder/PageOne">pageOne Link</Link>
            <Link href="/components/ContentHolder/PageTwo">pageTwo Link</Link>
        </View>
    );
}
