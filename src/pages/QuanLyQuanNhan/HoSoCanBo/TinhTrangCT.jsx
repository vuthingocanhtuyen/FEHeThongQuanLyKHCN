
import React, { useEffect, useState, useRef } from 'react';
import { Form, Table, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { getBase64 } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as TinhTrangCongTacService from '../../../services/TinhTrangCongTacService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
import moment from 'moment';
const TinhTrangCongTac = ({ }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)

    const [NgayQD, setNgayQD] = useState('');
    const [NgayKT, setNgayKT] = useState('');
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const inittial = () => ({
        QuyetDinh: '',
        NgayQuyetDinh: moment(),
        TrangThaiCongTac: '',
        DonVi: '',
        KetThuc: moment(),
        DonViSinhHoatHocThuat: '',
        TrangThai: '',

    })
    const [stateTinhTrangCongTac, setStateTinhTrangCongTac] = useState(inittial())
    const [stateTinhTrangCongTacDetails, setStateTinhTrangCongTacDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                code = 123
                , QuyetDinh,
                NgayQuyetDinh,
                TrangThaiCongTac,
                KetThuc,
                TrangThai = 0,
            } = data
            const res = TinhTrangCongTacService.createTinhTrangCongTac({
                QuanNhanId,
                code,
                QuyetDinh,
                NgayQuyetDinh,
                TrangThaiCongTac,
                KetThuc,
                TrangThai,

            })
            console.log("data create ttct:", res.data)
            return res

        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            console.log("data update:", data)
            const { id,
                token,
                ...rests } = data
            const res = TinhTrangCongTacService.updateTinhTrangCongTac(
                id,
                token,
                { ...rests })
            return res
        },

    )
    const mutationUpdateTrangThai = useMutationHooks(
        (data) => {
            console.log("data update:", data);
            const { id, token, ...rests } = data;
            const updatedData = { ...rests, TrangThai: 1 }; // Update the TrangThai attribute to 1
            const res = TinhTrangCongTacService.updateTinhTrangCongTac(id, token, updatedData);
            return res;

        },

    )

    // ngày quyết định
    useEffect(() => {
        setNgayQD(moment(stateTinhTrangCongTacDetails['NgayQuyetDinh']));
        // setNgayQD(convertDateToString(stateTinhTrangCongTacDetails['NgayQuyetDinh']));
    }, [form, stateTinhTrangCongTacDetails, isOpenDrawer])

    const handleOnchangeDetailNgayQD = (date) => {
        setStateTinhTrangCongTacDetails({
            ...stateTinhTrangCongTacDetails,
            NgayQuyetDinh: date
        })
    }
    const handleOnchangeNgayQD = (date) => {
        setStateTinhTrangCongTac({
            ...stateTinhTrangCongTac,
            NgayQuyetDinh: date
        })
    }
    // ngày kết thúc
    useEffect(() => {
        setNgayKT(moment(stateTinhTrangCongTacDetails['KetThuc']));
        // setNgayQD(convertDateToString(stateTinhTrangCongTacDetails['NgayQuyetDinh']));
    }, [form, stateTinhTrangCongTacDetails, isOpenDrawer])

    const handleOnchangeDetailNgayKT = (date) => {
        setStateTinhTrangCongTacDetails({
            ...stateTinhTrangCongTacDetails,
            KetThuc: date
        })
    }
    const handleOnchangeNgayKT = (date) => {
        setStateTinhTrangCongTac({
            ...stateTinhTrangCongTac,
            KetThuc: date
        })
    }
    const handleCancelPheDuyet = () => {
        setIsModalOpenPheDuyet(false)
    }
    const handleCancelNhapLai = () => {
        setIsModalOpenNhapLai(false)
    }

    const mutationUpdateNhapLai = useMutationHooks(
        (data) => {
            console.log("data update:", data);
            const { id, token, ...rests } = data;
            const updatedData = { ...rests, TrangThai: 2 }; // Update the TrangThai attribute to 1
            const res = TinhTrangCongTacService.updateTinhTrangCongTac(id, token, updatedData);
            return res;

        },

    )
    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = TinhTrangCongTacService.deleteTinhTrangCongTac(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = TinhTrangCongTacService.deleteManyTinhTrangCongTac(
                ids,
                token)
            return res
        },
    )


    const getAllTinhTrangCongTacs = async () => {
        const res = await TinhTrangCongTacService.getAllTinhTrangCongTac()
        return res
    }

    // show


    const fetchGetTinhTrangCongTac = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await TinhTrangCongTacService.getTinhTrangCongTacByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateTinhTrangCongTacDetails({
                    QuyetDinh: res?.data.QuyetDinh,
                    NgayQuyetDinh: res?.data.NgayQuyetDinh,
                    TrangThaiCongTac: res?.data.TrangThaiCongTac,
                    KetThuc: res?.data.KetThuc,
                    TrangThai: res?.data.TrangThai,

                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateTinhTrangCongTacDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTinhTrangCongTacDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTinhTrangCongTacDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsTinhTrangCongTac(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsTinhTrangCongTac = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyTinhTrangCongTacs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                tinhtrangcongtacDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai



    const queryTinhTrangCongTac = useQuery({ queryKey: ['tinhtrangcongtacs'], queryFn: getAllTinhTrangCongTacs })
    const tinhtrangcongtacDetails = useQuery(['hosoquannhanttct', quannhanId], fetchGetTinhTrangCongTac, { enabled: !!quannhanId })
    console.log("qt công tác:", tinhtrangcongtacDetails.data, queryTinhTrangCongTac.data)
    const { isLoading: isLoadingTinhTrangCongTac, data: tinhtrangcongtacs } = queryTinhTrangCongTac
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsTinhTrangCongTac} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsTinhTrangCongTac = async (rowSelected) => {
        const res = await TinhTrangCongTacService.getDetailsTinhTrangCongTac(rowSelected)
        if (res?.data) {
            setStateTinhTrangCongTacDetails({
                QuyetDinh: res?.data.QuyetDinh,
                NgayQuyetDinh: res?.data.NgayQuyetDinh,
                TrangThaiCongTac: res?.data.TrangThaiCongTac,
                KetThuc: res?.data.KetThuc,
                TrangThai: res?.data.TrangThai,

            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsTinhTrangCongTac(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTinhTrangCongTacDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTinhTrangCongTacDetails, isModalOpen])





    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();

    };
    const handleReset = (clearFilters) => {
        clearFilters();

    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

    });


    //Show dữ liệu

    //const { data: tinhtrangcongtacDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetTinhTrangCongTac, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", tinhtrangcongtacDetails)
    console.log("idquannhancongtac:", quannhanId)



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Số quyết định',
            dataIndex: 'QuyetDinh',
            key: 'QuyetDinh',
        },
        {
            title: 'Ngày quyết định',
            dataIndex: 'NgayQuyetDinh',
            key: 'NgayQuyetDinh',
        },
        {
            title: 'Trạng thái công tác',
            dataIndex: 'TrangThaiCongTac',
            key: 'TrangThaiCongTac',
        },

        {
            title: 'Kết thúc',
            dataIndex: 'KetThuc',
            key: 'KetThuc',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'TrangThai',
            key: 'TrangThai',
        },
        // {
        //     title: 'Chức năng',
        //     dataIndex: 'action',
        //     render: renderAction
        // },


    ];
    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected])

    useEffect(() => {
        if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
            message.success()
        } else if (isErrorDeletedMany) {
            message.error()
        }
    }, [isSuccessDelectedMany])

    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateTinhTrangCongTacDetails({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            TrangThaiCongTac: '',
            KetThuc: '',
            TrangThai: '',

        })
        form.resetFields()
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }


    const handleDeleteTinhTrangCongTac = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                tinhtrangcongtacDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateTinhTrangCongTac({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            TrangThaiCongTac: '',
            KetThuc: '',
            TrangThai: '',

        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            QuyetDinh: stateTinhTrangCongTac.QuyetDinh,
            NgayQuyetDinh: stateTinhTrangCongTac.NgayQuyetDinh,
            TrangThaiCongTac: stateTinhTrangCongTac.TrangThaiCongTac,
            KetThuc: stateTinhTrangCongTac.KetThuc,
            //  TrangThai: stateTinhTrangCongTac.TrangThai,
        }
        console.log("Finsh", stateTinhTrangCongTac)
        mutation.mutate(params, {
            onSettled: () => {
                tinhtrangcongtacDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateTinhTrangCongTac({
            ...stateTinhTrangCongTac,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateTinhTrangCongTacDetails({
            ...stateTinhTrangCongTacDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateTinhTrangCongTac = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateTinhTrangCongTacDetails }, {
            onSettled: () => {
                tinhtrangcongtacDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateTinhTrangCongTacDetails }, {
            onSettled: () => {
                tinhtrangcongtacDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateTinhTrangCongTacDetails }, {
            onSettled: () => {
                tinhtrangcongtacDetails.refetch()
            }
        })
    }
    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }

    function getTrangThaiText(statusValue) {
        switch (statusValue) {
            case 0:
                return 'Đang chờ phê duyệt';
            case 1:
                return 'Đã phê duyệt';
            case 2:
                return 'Đã từ chối - Nhập lại';
            default:
                return 'Trạng thái không hợp lệ';
        }
    }

    const dataTable = tinhtrangcongtacDetails?.data?.length && tinhtrangcongtacDetails?.data?.map((tinhtrangcongtacDetails) => {
        return {
            ...tinhtrangcongtacDetails,
            key: tinhtrangcongtacDetails._id,
            TrangThai: getTrangThaiText(tinhtrangcongtacDetails.TrangThai),
            NgayQuyetDinh: convertDateToString(tinhtrangcongtacDetails.NgayQuyetDinh),
            KetThuc: convertDateToString(tinhtrangcongtacDetails.KetThuc)
        }
    })
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])
    useEffect(() => {
        if (isSuccessUpdatedNhapLai && dataUpdatedNhapLai?.status === 'OK') {
            message.success()
            handleCancelNhapLai()
        } else if (isErrorUpdatedNhapLai) {
            message.error()
        }
    }, [isSuccessUpdatedNhapLai])


    useEffect(() => {
        if (isSuccessUpdatedTT && dataUpdatedTT?.status === 'OK') {
            message.success()
            handleCancelPheDuyet()
        } else if (isErrorUpdatedTT) {
            message.error()
        }
    }, [isSuccessUpdatedTT])

    return (
        <div>
            <div>
                <WrapperHeader>Tình trạng công tác</WrapperHeader>
                {/* <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div> */}
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={tinhtrangcongtacDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingTinhTrangCongTac} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới tình trạng công tác" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >

                        <Form.Item
                            label="Mã quyết định"
                            name="QuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateTinhTrangCongTac['QuyetDinh']}
                                onChange={handleOnchange}
                                name="QuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            //  name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayQD} name="NgayQuyetDinh"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái công tác"
                            name="TrangThaiCongTac"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateTinhTrangCongTac['TrangThaiCongTac']}
                                onChange={handleOnchange}
                                name="TrangThaiCongTac"
                            />
                        </Form.Item>



                        <Form.Item
                            label="Kết thúc"
                        //  name="KetThuc"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayKT} name="KetThuc"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>


            <DrawerComponent title='Chi tiết tình trạng công tác' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateTinhTrangCongTac}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Mã quyết định"
                            name="QuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTinhTrangCongTacDetails['QuyetDinh']} onChange={handleOnchangeDetails} name="QuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            //  name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayQD}
                                onChange={handleOnchangeDetailNgayQD} name="NgayQuyetDinh"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái công tác"
                            name="TrangThaiCongTac"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTinhTrangCongTacDetails['TrangThaiCongTac']} onChange={handleOnchangeDetails} name="TrangThaiCongTac" />
                        </Form.Item>



                        <Form.Item
                            label="Kết thúc"
                        //   name="KetThuc"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayKT}
                                onChange={handleOnchangeDetailNgayKT} name="KetThuc"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>





                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa tình trạng công tác" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteTinhTrangCongTac}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa tình trạng công tác này không?</div>
                </Loading>
            </ModalComponent>


            <ModalComponent title="Phê quyệt tình trạng công tác" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt tình trạng công tác này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin tình trạng công tác" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  tình trạng công tác này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default TinhTrangCongTac;
