import Login from './components/Login/Login';
import { useMainContext } from '../contexts/useMainContext';
import List from './components/List/List';

export default function IsLoggedIn() {
    const { isLoggedIn } = useMainContext();
    return <>{isLoggedIn ? <List /> : <Login />}</>;
}
