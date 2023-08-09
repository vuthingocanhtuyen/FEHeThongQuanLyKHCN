// import { Button, Form, Space } from 'antd'
// import React from 'react'
// import { WrapperHeader, WrapperUploadFile } from './style'
// import TableComponent from '../../../components/TableComponent/TableComponent'

// import InputComponent from '../../../components/InputComponent/InputComponent'
// import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
// import Loading from '../../../components/LoadingComponent/Loading'
// import ModalComponent from '../../../components/ModalComponent/ModalComponent'
// import * as message from '../../../components/Message/Message'
// import { getBase64 } from '../../../utils'

// import { useEffect } from 'react'

// import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useRef } from 'react'
// import { useMutationHooks } from '../../../hooks/useMutationHook'
// import * as UserService from '../../../services/UserService'
// import { useIsFetching, useQuery, useQueryClient } from '@tanstack/react-query'
// import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'

// const NgoaiNgu = () => {
//     const [rowSelected, setRowSelected] = useState('')
//     const [isOpenDrawer, setIsOpenDrawer] = useState(false)
//     const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
//     const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
//     const [isLoadingAdd, setIsLoadingAdd] = useState(false)

//     const user = useSelector((state) => state?.user)
//     const searchInput = useRef(null);

//     const [stateUserDetails, setStateUserDetails] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         isAdmin: false,
//         avatar: '',
//         address: ''
//     })

//     const [form] = Form.useForm();

//     const mutationUpdate = useMutationHooks(
//         (data) => {
//             const { id,
//                 token,
//                 ...rests } = data
//             const res = UserService.updateUser(
//                 id,
//                 { ...rests }, token)
//             return res
//         },
//     )

//     const mutationDeletedMany = useMutationHooks(
//         (data) => {
//             const { token, ...ids
//             } = data
//             const res = UserService.deleteManyUser(
//                 ids,
//                 token)
//             return res
//         },
//     )

//     const handleDelteManyUsers = (ids) => {
//         mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
//             onSettled: () => {
//                 queryClient.invalidateQueries(['users'])
//             }
//         })
//     }

//     const mutationDeleted = useMutationHooks(
//         (data) => {
//             const { id,
//                 token,
//             } = data
//             const res = UserService.deleteUser(
//                 id,
//                 token)
//             return res
//         },
//     )

//     const fetchGetDetailsUser = async (rowSelected) => {
//         const res = await UserService.getDetailsUser(rowSelected)
//         if (res?.data) {
//             setStateUserDetails({
//                 name: res?.data?.name,
//                 email: res?.data?.email,
//                 phone: res?.data?.phone,
//                 isAdmin: res?.data?.isAdmin,
//                 address: res?.data?.address,
//                 avatar: res.data?.avatar
//             })
//         }
//         setIsLoadingUpdate(false)
//     }

//     const fetchGetAddUser = async (rowSelected) => {
//         const res = await UserService.getDetailsUser(rowSelected)
//         if (res?.data) {
//             setStateUserDetails({
//                 name: res?.data?.name,
//                 email: res?.data?.email,
//                 phone: res?.data?.phone,
//                 isAdmin: res?.data?.isAdmin,
//                 address: res?.data?.address,
//                 avatar: res.data?.avatar
//             })
//         }
//         setIsLoadingAdd(false)
//     }


//     useEffect(() => {
//         form.setFieldsValue(stateUserDetails)
//     }, [form, stateUserDetails])

//     useEffect(() => {
//         if (rowSelected && isOpenDrawer) {
//             setIsLoadingUpdate(true)
//             fetchGetDetailsUser(rowSelected)
//         }
//     }, [rowSelected, isOpenDrawer])

//     useEffect(() => {
//         if (rowSelected && isOpenDrawer) {
//             setIsLoadingAdd(true)
//             fetchGetAddUser(rowSelected)
//         }
//     }, [rowSelected, isOpenDrawer])





//     const handleDetailsProduct = () => {
//         setIsOpenDrawer(true)
//     }

//     const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
//     const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
//     const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

//     const queryClient = useQueryClient()
//     const users = queryClient.getQueryData(['users'])
//     const isFetchingUser = useIsFetching(['users'])
//     const renderAction = () => {
//         return (
//             <div>
//                 <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
//                 <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />

//             </div>
//         )
//     }

//     const handleSearch = (selectedKeys, confirm, dataIndex) => {
//         confirm();
//         // setSearchText(selectedKeys[0]);
//         // setSearchedColumn(dataIndex);
//     };
//     const handleReset = (clearFilters) => {
//         clearFilters();
//         // setSearchText('');
//     };

//     const getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//             <div
//                 style={{
//                     padding: 8,
//                 }}
//                 onKeyDown={(e) => e.stopPropagation()}
//             >
//                 <InputComponent
//                     ref={searchInput}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{
//                         marginBottom: 8,
//                         display: 'block',
//                     }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         onClick={() => clearFilters && handleReset(clearFilters)}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Reset
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered) => (
//             <SearchOutlined
//                 style={{
//                     color: filtered ? '#1890ff' : undefined,
//                 }}
//             />
//         ),
//         onFilter: (value, record) =>
//             record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//         onFilterDropdownOpenChange: (visible) => {
//             if (visible) {
//                 setTimeout(() => searchInput.current?.select(), 100);
//             }
//         },
//         // render: (text) =>
//         //   searchedColumn === dataIndex ? (
//         //     // <Highlighter
//         //     //   highlightStyle={{
//         //     //     backgroundColor: '#ffc069',
//         //     //     padding: 0,
//         //     //   }}
//         //     //   searchWords={[searchText]}
//         //     //   autoEscape
//         //     //   textToHighlight={text ? text.toString() : ''}
//         //     // />
//         //   ) : (
//         //     text
//         //   ),
//     });

//     const columns = [
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             sorter: (a, b) => a.name.length - b.name.length,
//             ...getColumnSearchProps('name')
//         },
//         {
//             title: 'Email',
//             dataIndex: 'email',
//             sorter: (a, b) => a.email.length - b.email.length,
//             ...getColumnSearchProps('email')
//         },
//         {
//             title: 'Address',
//             dataIndex: 'address',
//             sorter: (a, b) => a.address.length - b.address.length,
//             ...getColumnSearchProps('address')
//         },
//         {
//             title: 'Admin',
//             dataIndex: 'isAdmin',
//             filters: [
//                 {
//                     text: 'True',
//                     value: true,
//                 },
//                 {
//                     text: 'False',
//                     value: false,
//                 }
//             ],
//         },
//         {
//             title: 'Phone',
//             dataIndex: 'phone',
//             sorter: (a, b) => a.phone - b.phone,
//             ...getColumnSearchProps('phone')
//         },
//         {
//             title: 'Action',
//             dataIndex: 'action',
//             render: renderAction
//         },
//     ];
//     const dataTable = users?.data?.length > 0 && users?.data?.map((user) => {
//         return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' }
//     })

//     useEffect(() => {
//         if (isSuccessDelected && dataDeleted?.status === 'OK') {
//             message.success()
//             handleCancelDelete()
//         } else if (isErrorDeleted) {
//             message.error()
//         }
//     }, [isSuccessDelected])

//     useEffect(() => {
//         if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
//             message.success()
//         } else if (isErrorDeletedMany) {
//             message.error()
//         }
//     }, [isSuccessDelectedMany])

//     const handleCloseDrawer = () => {
//         setIsOpenDrawer(false);
//         setStateUserDetails({
//             name: '',
//             email: '',
//             phone: '',
//             isAdmin: false,
//         })
//         form.resetFields()
//     };

//     useEffect(() => {
//         if (isSuccessUpdated && dataUpdated?.status === 'OK') {
//             message.success()
//             handleCloseDrawer()
//         } else if (isErrorUpdated) {
//             message.error()
//         }
//     }, [isSuccessUpdated])

//     const handleCancelDelete = () => {
//         setIsModalOpenDelete(false)
//     }

//     const handleDeleteUser = () => {
//         mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
//             onSettled: () => {
//                 queryClient.invalidateQueries(['users'])
//             }
//         })
//     }

//     const handleOnchangeDetails = (e) => {
//         setStateUserDetails({
//             ...stateUserDetails,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleOnchangeAvatarDetails = async ({ fileList }) => {
//         const file = fileList[0]
//         if (!file.url && !file.preview) {
//             file.preview = await getBase64(file.originFileObj);
//         }
//         setStateUserDetails({
//             ...stateUserDetails,
//             avatar: file.preview
//         })
//     }
//     const onUpdateUser = () => {
//         mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
//             onSettled: () => {
//                 queryClient.invalidateQueries(['users'])
//             }
//         })
//     }

//     return (
//         <div>
//             <WrapperHeader>Ngoại ngữ</WrapperHeader>
//             <div style={{ marginTop: '20px' }}>
//                 <TableComponent handleDelteMany={handleDelteManyUsers} columns={columns} isLoading={isFetchingUser} data={dataTable} onRow={(record, rowIndex) => {
//                     return {
//                         onClick: event => {
//                             setRowSelected(record._id)
//                         }
//                     };
//                 }} />
//             </div>
//             <DrawerComponent title='Chi tiết tham số' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
//                 <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

//                     <Form
//                         name="basic"
//                         labelCol={{ span: 2 }}
//                         wrapperCol={{ span: 22 }}
//                         onFinish={onUpdateUser}
//                         autoComplete="on"
//                         form={form}
//                     >
//                         <Form.Item
//                             label="Name"
//                             name="name"
//                             rules={[{ required: true, message: 'Please input your name!' }]}
//                         >
//                             <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
//                         </Form.Item>

//                         <Form.Item
//                             label="Email"
//                             name="email"
//                             rules={[{ required: true, message: 'Please input your email!' }]}
//                         >
//                             <InputComponent value={stateUserDetails['email']} onChange={handleOnchangeDetails} name="email" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Phone"
//                             name="phone"
//                             rules={[{ required: true, message: 'Please input your  phone!' }]}
//                         >
//                             <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
//                         </Form.Item>

//                         <Form.Item
//                             label="Adress"
//                             name="address"
//                             rules={[{ required: true, message: 'Please input your  address!' }]}
//                         >
//                             <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
//                         </Form.Item>

//                         <Form.Item
//                             label="Avatar"
//                             name="avatar"
//                             rules={[{ required: true, message: 'Please input your image!' }]}
//                         >
//                             <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
//                                 <Button >Select File</Button>
//                                 {stateUserDetails?.avatar && (
//                                     <img src={stateUserDetails?.avatar} style={{
//                                         height: '60px',
//                                         width: '60px',
//                                         borderRadius: '50%',
//                                         objectFit: 'cover',
//                                         marginLeft: '10px'
//                                     }} alt="avatar" />
//                                 )}
//                             </WrapperUploadFile>
//                         </Form.Item>
//                         <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
//                             <Button type="primary" htmlType="submit">
//                                 Cập nhật
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </Loading>
//             </DrawerComponent>
//             <ModalComponent title="Xóa tham số" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
//                 <Loading isLoading={isLoadingDeleted}>
//                     <div>Bạn có chắc xóa tham số này không?</div>
//                 </Loading>
//             </ModalComponent>
//         </div>
//     )
// }

// export default NgoaiNgu
// import { Button, Form, Space } from 'antd';
// import React from 'react';
// import { WrapperHeader, WrapperUploadFile } from './style';
// import TableComponent from '../../../components/TableComponent/TableComponent';
// import InputComponent from '../../../components/InputComponent/InputComponent';
// import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent';
// import Loading from '../../../components/LoadingComponent/Loading';
// import ModalComponent from '../../../components/ModalComponent/ModalComponent';
// import * as message from '../../../components/Message/Message';
// import { getBase64 } from '../../../utils';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useRef } from 'react';
// import { useMutationHooks } from '../../../hooks/useMutationHook';
// import * as QuanNhanService from '../../../services/QuanNhanService';
// import { useIsFetching, useQuery, useQueryClient } from '@tanstack/react-query';
// import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

// const NgoaiNgu = () => {
//   const [rowSelected, setRowSelected] = useState('');
//   const [isOpenDrawer, setIsOpenDrawer] = useState(false);
//   const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
//   const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
//   const [isLoadingAdd, setIsLoadingAdd] = useState(false);

//   // const fetchGetDetailsQuanNhan = async () => {
//   // const res = await QuanNhanService.getAllQuanNhan()
//   // console.log('res quan nhan', res)
//   // }
//   // const {isLoading, data} = useQuery(['quannhans'], fetchGetDetailsQuanNhan)
//   const user = useSelector((state) => state?.user);
//   const searchInput = useRef(null);

//   const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState({
//     QuanNhanId: '',
//     HoTen: '',
//     NgaySinh: '',
//     GioiTinh: '',
//     QueQuan: '',
//     DiaChi: '',
//     SoDienThoai: '',
//     Email: '',
//     HoatDong: false,
//     QuanHam: '',
//     DonVi: '',
//     LoaiQN: '',
//   });

//   const [form] = Form.useForm();

//   const mutationUpdate = useMutationHooks(
//     (data) => {
//       const { id, token, ...rests } = data;
//       const res = QuanNhanService.updateQuanNhan(id, { ...rests }, token);
//       return res;
//     },
//   );

//   const mutationDeletedMany = useMutationHooks(
//     (data) => {
//       const { token, ...ids } = data;
//       const res = QuanNhanService.deleteManyQuanNhan(ids, token);
//       return res;
//     },
//   );

//   const handleDelteManyQuanNhans = (ids) => {
//     mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
//       onSettled: () => {
//         queryClient.invalidateQueries(['quannhans']);
//       },
//     });
//   };

//   const mutationDeleted = useMutationHooks(
//     (data) => {
//       const { id, token } = data;
//       const res = QuanNhanService.deleteQuanNhan(id, token);
//       return res;
//     },
//   );

//   const fetchGetDetailsQuanNhan = async (rowSelected) => {
//     const res = await QuanNhanService.getDetailsQuanNhan(rowSelected);
//     if (res?.data) {
//       setStateQuanNhanDetails({
//         QuanNhanId: res?.data?.QuanNhanId,
//         HoTen: res?.data?.HoTen,
//         NgaySinh: res?.data?.NgaySinh,
//         GioiTinh: res?.data?.GioiTinh,
//         QueQuan: res?.data?.QueQuan,
//         DiaChi: res?.data?.DiaChi,
//         SoDienThoai: res?.data?.SoDienThoai,
//         Email: res?.data?.Email,
//         HoatDong: res?.data?.HoatDong,
//         QuanHam: res?.data?.QuanHam,
//         DonVi: res?.data?.DonVi,
//         LoaiQN: res?.data?.LoaiQN,
//       });
//     }
//     console.log('res quan nhan', res)
//     setIsLoadingUpdate(false);
//   };
//   // const {isLoading, data} = useQuery(['quannhans'], fetchGetDetailsQuanNhan)
//   const fetchGetAddQuanNhan = async (rowSelected) => {
//     const res = await QuanNhanService.getDetailsQuanNhan(rowSelected);
//     if (res?.data) {
//       setStateQuanNhanDetails({
//         QuanNhanId: res?.data?.QuanNhanId,
//         HoTen: res?.data?.HoTen,
//         NgaySinh: res?.data?.NgaySinh,
//         GioiTinh: res?.data?.GioiTinh,
//         QueQuan: res?.data?.QueQuan,
//         DiaChi: res?.data?.DiaChi,
//         SoDienThoai: res?.data?.SoDienThoai,
//         Email: res?.data?.Email,
//         HoatDong: res?.data?.HoatDong,
//         QuanHam: res?.data?.QuanHam,
//         DonVi: res?.data?.DonVi,
//         LoaiQN: res?.data?.LoaiQN,
//       });
//     }
//     setIsLoadingAdd(false);
//   };

//   useEffect(() => {
//     form.setFieldsValue(stateQuanNhanDetails);
//   }, [form, stateQuanNhanDetails]);

//   useEffect(() => {
//     if (rowSelected && isOpenDrawer) {
//       setIsLoadingUpdate(true);
//       fetchGetDetailsQuanNhan(rowSelected);
//     }
//   }, [rowSelected, isOpenDrawer]);

//   useEffect(() => {
//     if (rowSelected && isOpenDrawer) {
//       setIsLoadingAdd(true);
//       fetchGetAddQuanNhan(rowSelected);
//     }
//   }, [rowSelected, isOpenDrawer]);

//   const handleDetailsProduct = () => {
//     setIsOpenDrawer(true);
//   };

//   const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
//   const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted;
//   const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany;

//   const queryClient = useQueryClient();
//   const quannhans = queryClient.getQueryData(['quannhans']);
//   const isFetchingQuanNhan = useIsFetching(['quannhans']);

//   const renderAction = () => {
//     return (
//       <div>
//         <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
//         <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
//       </div>
//     );
//   };

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//   };

//   const handleReset = (clearFilters) => {
//     clearFilters();
//   };

//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <InputComponent
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: 'block',
//           }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? '#1890ff' : undefined,
//         }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//   });

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'HoTen',
//       sorter: (a, b) => a.HoTen.length - b.HoTen.length,
//       ...getColumnSearchProps('HoTen'),
//     },
//     {
//       title: 'Ngay Sinh',
//       dataIndex: 'NgaySinh',
//       sorter: (a, b) => a.NgaySinh.localeCompare(b.NgaySinh),
//       ...getColumnSearchProps('NgaySinh'),
//     },
//     {
//       title: 'Gioi Tinh',
//       dataIndex: 'GioiTinh',
//       sorter: (a, b) => a.GioiTinh.localeCompare(b.GioiTinh),
//       ...getColumnSearchProps('GioiTinh'),
//     },
//     {
//       title: 'Que Quan',
//       dataIndex: 'QueQuan',
//       sorter: (a, b) => a.QueQuan.localeCompare(b.QueQuan),
//       ...getColumnSearchProps('QueQuan'),
//     },
//     {
//       title: 'Dia Chi',
//       dataIndex: 'DiaChi',
//       sorter: (a, b) => a.DiaChi.localeCompare(b.DiaChi),
//       ...getColumnSearchProps('DiaChi'),
//     },
//     {
//       title: 'So Dien Thoai',
//       dataIndex: 'SoDienThoai',
//       sorter: (a, b) => a.SoDienThoai.localeCompare(b.SoDienThoai),
//       ...getColumnSearchProps('SoDienThoai'),
//     },
//     {
//       title: 'Email',
//       dataIndex: 'Email',
//       sorter: (a, b) => a.Email.localeCompare(b.Email),
//       ...getColumnSearchProps('Email'),
//     },
//     {
//       title: 'Hoat Dong',
//       dataIndex: 'HoatDong',
//       sorter: (a, b) => a.HoatDong.localeCompare(b.HoatDong),
//       ...getColumnSearchProps('HoatDong'),
//     },
//     {
//       title: 'Quan Ham',
//       dataIndex: 'QuanHam',
//       sorter: (a, b) => a.QuanHam.localeCompare(b.QuanHam),
//       ...getColumnSearchProps('QuanHam'),
//     },
//     {
//       title: 'Don Vi',
//       dataIndex: 'DonVi',
//       sorter: (a, b) => a.DonVi.localeCompare(b.DonVi),
//       ...getColumnSearchProps('DonVi'),
//     },
//     {
//       title: 'Loai Quan Nhan',
//       dataIndex: 'LoaiQN',
//       sorter: (a, b) => a.LoaiQN.localeCompare(b.LoaiQN),
//       ...getColumnSearchProps('LoaiQN'),
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       render: renderAction
//     },
//   ];
  
//   const dataTable = quannhans?.data?.length > 0 && quannhans?.data?.map((quannhan) => {
//     return { ...quannhan, key: quannhan._id }
//   });

//   useEffect(() => {
//     if (isSuccessDeleted && dataDeleted?.status === 'OK') {
//       message.success();
//       handleCancelDelete();
//     } else if (isErrorDeleted) {
//       message.error();
//     }
//   }, [isSuccessDeleted]);

//   useEffect(() => {
//     if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
//       message.success();
//     } else if (isErrorDeletedMany) {
//       message.error();
//     }
//   }, [isSuccessDeletedMany]);

//   const handleCloseDrawer = () => {
//     setIsOpenDrawer(false);
//     setStateQuanNhanDetails({
//       QuanNhanId: '',
//       HoTen: '',
//       NgaySinh: '',
//       GioiTinh: '',
//       QueQuan: '',
//       DiaChi: '',
//       SoDienThoai: '',
//       Email: '',
//       HoatDong: false,
//       QuanHam: '',
//       DonVi: '',
//       LoaiQN: '',
//     });
//     form.resetFields();
//   };

//   useEffect(() => {
//     if (isSuccessUpdated && dataUpdated?.status === 'OK') {
//       message.success();
//       handleCloseDrawer();
//     } else if (isErrorUpdated) {
//       message.error();
//     }
//   }, [isSuccessUpdated]);

//   const handleCancelDelete = () => {
//     setIsModalOpenDelete(false);
//   };

//   const handleDeleteQuanNhan = () => {
//     mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
//       onSettled: () => {
//         queryClient.invalidateQueries(['quannhans']);
//       },
//     });
//   };

//   const handleOnchangeDetails = (e) => {
//     setStateQuanNhanDetails({
//       ...stateQuanNhanDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOnchangeAvatarDetails = async ({ fileList }) => {
//     const file = fileList[0];
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setStateQuanNhanDetails({
//       ...stateQuanNhanDetails,
//       avatar: file.preview,
//     });
//   };

//   const onUpdateQuanNhan = () => {
//     mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQuanNhanDetails }, {
//       onSettled: () => {
//         queryClient.invalidateQueries(['quannhans']);
//       },
//     });
//   };

//   return (
//     <div>
//       <WrapperHeader>Ngoại ngữ</WrapperHeader>
//       <div style={{ marginTop: '20px' }}>
//       <TableComponent columns={columns} isLoading={isFetchingQuanNhan} data={dataTable} onRow={(record, rowIndex) => {
//   return {
//     onClick: event => {
//       setRowSelected(record._id);
//     }
//   };
// }} />
//       </div>
//       <ModalComponent title="Xóa tham số" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQuanNhan}>
//         <Loading isLoading={isLoadingDeleted}>
//           <div>Bạn có chắc xóa tham số này không?</div>
//         </Loading>
//       </ModalComponent>
//     </div>
//   );
// };

// export default NgoaiNgu;
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import * as QuanNhanService from '../../../services/QuanNhanService';

const NgoaiNgu = () => {
  const [data, setData] = useState([]);
  const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState({});
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user); 
  const fetchGetDetailsQuanNhan = async () => {
    try {
      console.log('User _id:', user.QuanNhanId);
      const resQuanNhan = await QuanNhanService.getQuanNhanByQuanNhanId(user.QuanNhanId, user.access_token);
      console.log('resQuanNhan:', resQuanNhan);
      if (resQuanNhan?.data) {
        const quanNhanId = resQuanNhan.data._id;
        console.log('tesst:', quanNhanId);
      // const res = await QuanNhanService.getDetailsQuanNhan(quanNhanId, user.access_token);
      if (resQuanNhan?.data) {
        setStateQuanNhanDetails({
          QuanNhanId: resQuanNhan?.data?.QuanNhanId,
          HoTen: resQuanNhan?.data?.HoTen,
          NgaySinh: resQuanNhan?.data?.NgaySinh,
          GioiTinh: resQuanNhan?.data?.GioiTinh,
          QueQuan: resQuanNhan?.data?.QueQuan,
          DiaChi: resQuanNhan?.data?.DiaChi,
          SoDienThoai: resQuanNhan?.data?.SoDienThoai,
          Email: resQuanNhan?.data?.Email,
          HoatDong: resQuanNhan?.data?.HoatDong,
          QuanHam: resQuanNhan?.data?.QuanHam,
          DonVi: resQuanNhan?.data?.DonVi,
          LoaiQN: resQuanNhan?.data?.LoaiQN,
        });
        setData([resQuanNhan.data]);
      }
      console.log('Dữ liệu từ API:', resQuanNhan);
      setIsLoadingUpdate(false);
    }} catch (error) {
      console.log('Error while fetching quan nhan details:', error);
      setIsLoadingUpdate(false);
    }
  };

  useEffect(() => {
    if (user && user.QuanNhanId) {
      setIsLoadingUpdate(true);
      fetchGetDetailsQuanNhan();
    }
  }, [user]);
  const columns = [
    {
      title: 'QuanNhanId',
      dataIndex: 'QuanNhanId',
      key: 'QuanNhanId',
    },
    {
      title: 'HoTen',
      dataIndex: 'HoTen',
      key: 'HoTen',
    },
    {
      title: 'NgaySinh',
      dataIndex: 'NgaySinh',
      key: 'NgaySinh',
    },
    {
      title: 'GioiTinh',
      dataIndex: 'GioiTinh',
      key: 'GioiTinh',
    },
    {
      title: 'QueQuan',
      dataIndex: 'QueQuan',
      key: 'QueQuan',
    },
    {
      title: 'DiaChi',
      dataIndex: 'DiaChi',
      key: 'DiaChi',
    },
    {
      title: 'SoDienThoai',
      dataIndex: 'SoDienThoai',
      key: 'SoDienThoai',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'HoatDong',
      dataIndex: 'HoatDong',
      key: 'HoatDong',
    },
    {
      title: 'LoaiQN',
      dataIndex: 'LoaiQN',
      key: 'LoaiQN',
    },
  ];

  return (
    <Table dataSource={data} columns={columns} />
  );
};

export default NgoaiNgu;
