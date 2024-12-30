import { useMainContext } from '@/contexts/useMainContext';
import { Article } from '@/typings/projectTypes';
import UseDebounce from '@/utils/UseDebounce';
import { apiUrl } from '@/utils/variables';
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import ListItem from './ListItem';

export default function List() {
    const { jwtToken, search, setSearch, setOpenModalId, role } =
        useMainContext();

    const [data, setData] = useState<Article[]>([]);
    const getArticles = async () => {
        const activeFilter = role === 'STUDENT' ? `{"active":true}` : '{}';
        const searchFilter = search
            ? `&where={
                "OR":[
                    {"title":{"contains":"${search}","mode":"insensitive"}},
                    {"content":{"contains":"${search}","mode":"insensitive"}},
                    {"creator":{"name":{"contains":"${search}","mode":"insensitive"}}}
                ],
                "AND": [${activeFilter}]
            }`
            : `&where={"AND": [${activeFilter}]}`;
        const orderByFilter = `&orderBy={"date":"asc"}`;

        const articles = await fetch(
            `${apiUrl}/articles?rows=true${searchFilter}${orderByFilter}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        if (!articles.ok) return;
        const articlesList: Article[] = await articles.json();
        setData(articlesList);
    };
    useEffect(() => {
        getArticles();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <ListItem {...item} />}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
});

// import { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import { apiUrl } from '../../utils/variables';
// import { useMainContext } from '../../contexts/useMainContext';
// import { Article } from '../../typings/projectTypes';
// import { useNavigate } from 'react-router-dom';
// import Search from '../Search/Search';
// import UseDebounce from '../../utils/UseDebounce';
// import ModalRemoveItem from '../ModalRemoveItem/ModalRemoveItem';
// import { check, unCheck } from '../../utils/Icons';

// export default function List() {
//     const navigate = useNavigate();
//     const { jwtToken, search, setSearch, setOpenModalId, role } =
//         useMainContext();

//     const [data, setData] = useState<Article[]>([]);
//     const getArticles = async () => {
//         const activeFilter = role === 'STUDENT' ? `{"active":true}` : '{}';
//         const searchFilter = search
//             ? `&where={
//                     "OR":[
//                         {"title":{"contains":"${search}","mode":"insensitive"}},
//                         {"content":{"contains":"${search}","mode":"insensitive"}},
//                         {"creator":{"name":{"contains":"${search}","mode":"insensitive"}}}
//                     ],
//                     "AND": [${activeFilter}]
//                 }`
//             : `&where={"AND": [${activeFilter}]}`;
//         const orderByFilter = `&orderBy={"date":"asc"}`;

//         const articles = await fetch(
//             `${apiUrl}/articles?rows=true${searchFilter}${orderByFilter}`,
//             {
//                 method: 'GET',
//                 headers: {
//                     Authorization: `Bearer ${jwtToken}`,
//                     'Content-Type': 'application/json',
//                 },
//             },
//         );
//         if (!articles.ok) return;
//         const articlesList: Article[] = await articles.json();
//         setData(articlesList);
//     };
//     useEffect(() => {
//         getArticles();
//     }, []);

//     const debounceSearch = UseDebounce(() => getArticles(), 1000);
//     useEffect(debounceSearch, [search]);

//     const handleUpdateClick = (articleId: string) => {
//         navigate(`/updateArticle/${articleId}`);
//     };
//     const handleRemoveClick = (articleId: string) => {
//         setOpenModalId(articleId);
//     };
//     const handleDeleteSuccess = (articleId: string) => {
//         setData((prevData) =>
//             prevData.filter((article) => article.id !== articleId),
//         );
//     };

//     const adminTeacherColumns =
//         role === 'ADMIN' || role === 'TEACHER'
//             ? [
//                   {
//                       name: 'Update',
//                       cell: (row: Article) => (
//                           <button
//                               onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleUpdateClick(row.id);
//                               }}
//                               className="text-blue-500 hover:underline"
//                           >
//                               Update
//                           </button>
//                       ),
//                   },
//                   {
//                       name: 'Remove',
//                       cell: (row: Article) => (
//                           <>
//                               <button
//                                   onClick={() => handleRemoveClick(row.id)}
//                                   className="text-red-500 hover:underline"
//                               >
//                                   Remove
//                               </button>
//                               <ModalRemoveItem
//                                   id={row.id}
//                                   type={'article'}
//                                   onDeleteSuccess={() =>
//                                       handleDeleteSuccess(row.id)
//                                   }
//                               />
//                           </>
//                       ),
//                   },
//               ]
//             : [];

//     const columnsToRender = ['title', 'content'];
//     if (role !== 'STUDENT') {
//         columnsToRender.unshift('active');
//     }
//     const columns = [
//         ...(data[0]
//             ? columnsToRender.map((item) => ({
//                   name: item.charAt(0).toUpperCase() + item.slice(1),
//                   selector: (row: any) =>
//                       item === 'active'
//                           ? row[item]
//                               ? check
//                               : unCheck
//                           : row[item].substring(0, 50),
//                   width:
//                       item === 'active'
//                           ? '70px'
//                           : item === 'content'
//                           ? ''
//                           : '200px',
//               }))
//             : []),
//         {
//             name: 'name',
//             selector: (row: Article) => row['creator'].name,
//         },
//         ...adminTeacherColumns,
//     ];
//     const handleCreateClick = () => {
//         navigate(`/createArticle/`);
//     };
//     function handleRowClick(row: Article) {
//         navigate(`/${row.id}`);
//     }
//     const customStyles = {
//         rows: {
//             style: {
//                 cursor: 'pointer',
//             },
//         },
//     };
//     return (
//         <div className="p-4">
//             <div className="flex">
//                 <Search value={search} set={setSearch} />
//                 {(role === 'ADMIN' || role === 'TEACHER') && (
//                     <button
//                         onClick={handleCreateClick}
//                         className="ml-4 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//                     >
//                         Create
//                     </button>
//                 )}
//             </div>

//             <DataTable
//                 columns={columns}
//                 data={data}
//                 onRowClicked={handleRowClick}
//                 className="bg-white shadow-md rounded "
//                 customStyles={customStyles}
//                 conditionalRowStyles={[
//                     {
//                         when: (row) => row.active,
//                         style: {
//                             backgroundColor: 'white',
//                         },
//                     },
//                     {
//                         when: (row) => !row.active,
//                         style: {
//                             backgroundColor: '#f0f0f0',
//                         },
//                     },
//                 ]}
//             />
//         </div>
//     );
// }
