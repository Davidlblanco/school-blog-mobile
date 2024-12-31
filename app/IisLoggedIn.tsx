import Login from './components/Login/Login';
import { useMainContext } from '../contexts/useMainContext';
import List from './components/List/List';
import Header from './components/header/Header';

export default function IsLoggedIn() {
    const { isLoggedIn } = useMainContext();
    return (
        <>
            {isLoggedIn ? (
                <>
                    <Header />
                    <List />
                </>
            ) : (
                <Login />
            )}
        </>
    );
}
