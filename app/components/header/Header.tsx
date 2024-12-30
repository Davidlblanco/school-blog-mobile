// import { useMainContext } from '@/contexts/useMainContext';
// import { View, Text, Button } from 'react-native';

// export default function Header() {
//     const { setJwtToken, role } = useMainContext();

//     const navigate = useNavigate();

//     function handleLogOut() {
//         document.cookie =
//             'school-blog-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//         setJwtToken(undefined);
//     }

//     return (
//         <View>
//             <Text>Blog</Text>
//             <View>
//                 {role === 'ADMIN' ? (
//                     <Button onPress={() => navigate('/admin/ListUsers')}>
//                         Admin
//                     </Button>
//                 ) : null}

//                 <Button onPress={() => navigate('/myAccount')}>
//                     My account
//                 </Button>
//                 <Button onPress={handleLogOut}>LogOut</Button>
//             </View>
//         </View>
//     );
// }
