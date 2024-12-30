import ContentHolder from './components/ContentHolder/ContentHolder';
import Login from './components/Login/Login';
import { useMainContext } from '../contexts/useMainContext';

export default function IsLoggedIn() {
    const { isLoggedIn } = useMainContext();
    console.log('isLoggedIn', isLoggedIn);
    return <>{isLoggedIn ? <ContentHolder /> : <Login />}</>;
}
