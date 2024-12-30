// import ContentHolder from './components/ContentHolder/ContentHolder';

import Login from './components/Login/Login';
import { useMainContext } from '../contexts/useMainContext';
import { Text } from 'react-native';

export default function IsLoggedIn() {
    const { isLoggedIn } = useMainContext();
    return <>{isLoggedIn ? <Login /> : <><Text>not logged in</Text><Login /></>}</>;
}
