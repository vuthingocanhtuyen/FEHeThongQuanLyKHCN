
import React, { useEffect, useState, useRef } from 'react';
import { Form, Table, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { getBase64 } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as DaiHocService from '../../../services/DaiHocService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
const DaiHoc = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)


    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const quyen = user.isAdmin;
    const inittial = () => ({
        He: '',
        Nganh: '',
        Truong: '',
        QuocGia: '',
        NamNhan: '',
        TrangThai: '',
        GhiChu: '',
    })
    const [stateDaiHoc, setStateDaiHoc] = useState(inittial())
    const [stateDaiHocDetails, setStateDaiHocDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                code = 123,
                He,
                Nganh,
                Truong,
                QuocGia, NamNhan,
                TrangThai = 0,
                GhiChu } = data
            const res = DaiHocService.createDaiHoc({
                QuanNhanId,
                code,
                He,
                Nganh,
                Truong,
                QuocGia, NamNhan,
                TrangThai,
                GhiChu
            })
            console.log("data create daihoc:", res.data)
            return res

        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            console.log("data update:", data)
            const { id,
                token,
                ...rests } = data
            const res = DaiHocService.updateDaiHoc(
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
            const res = DaiHocService.updateDaiHoc(id, token, updatedData);
            return res;

        },

    )

    const mutationUpdateNhapLai = useMutationHooks(
        (data) => {
            console.log("data update:", data);
            const { id, token, ...rests } = data;
            const updatedData = { ...rests, TrangThai: 2 }; // Update the TrangThai attribute to 1
            const res = DaiHocService.updateDaiHoc(id, token, updatedData);
            return res;

        },

    )
    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = DaiHocService.deleteDaiHoc(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = DaiHocService.deleteManyDaiHoc(
                ids,
                token)
            return res
        },
    )


    const getAllDaiHocs = async () => {
        const res = await DaiHocService.getAllDaiHoc()
        return res
    }

    // show


    const fetchGetDaiHoc = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await DaiHocService.getDaiHocByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateDaiHocDetails({
                    He: res?.data.He,
                    Nganh: res?.data.Nganh,
                    NamNhan: res?.data.NamNhan,
                    Truong: res?.data.Truong,
                    QuocGia: res?.data.QuocGia,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateDaiHocDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDaiHocDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDaiHocDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsDaiHoc(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsDaiHoc = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyDaiHocs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                daihocDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai

    const queryDaiHoc = useQuery({ queryKey: ['daihocs'], queryFn: getAllDaiHocs })
    const daihocDetails = useQuery(['hosoquannhandaihoc', quannhanId], fetchGetDaiHoc, { enabled: !!quannhanId })
    console.log("dauhoc:", daihocDetails.data)

    const { isLoading: isLoadingDaiHoc, data: daihocs } = queryDaiHoc
    const renderAction = () => {
        let additionalActions = null;
        if (quyen === "admin") {
            additionalActions = (
                <>
                    <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                    <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
                </>
            );
        }
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDaiHoc} />
                {additionalActions}
            </div>
        )
    }
    const onChange = () => { }

    const fetchGetDetailsDaiHoc = async (rowSelected) => {
        const res = await DaiHocService.getDetailsDaiHoc(rowSelected)
        if (res?.data) {
            setStateDaiHocDetails({
                He: res?.data.He,
                Nganh: res?.data.Nganh,
                Truong: res?.data.Truong,
                QuocGia: res?.data.QuocGia,
                NamNhan: res?.data.NamNhan,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsDaiHoc(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDaiHocDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDaiHocDetails, isModalOpen])





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

    //const { data: daihocDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetDaiHoc, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", daihocDetails)
    console.log("idquannhancongtac:", quannhanId)



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },

        {
            title: 'Hệ',
            dataIndex: 'He',
            key: 'He',
        },
        {
            title: 'Ngành',
            dataIndex: 'Nganh',
            key: 'Nganh',
        },
        {
            title: 'Trường',
            dataIndex: 'Truong',
            key: 'Truong',
        },


        {
            title: 'Quốc gia',
            dataIndex: 'QuocGia',
            key: 'QuocGia',
        },
        {
            title: 'Năm nhận',
            dataIndex: 'NamNhan',
            key: 'NamNhan',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'TrangThai',
            key: 'TrangThai',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'GhiChu',
            key: 'GhiChu',
        },
        {
            title: 'Chức năng',
            dataIndex: 'action',
            render: renderAction
        },


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
        setStateDaiHocDetails({
            He: '',
            Nganh: '',
            Truong: '',
            QuocGia: '',
            NamNhan: '',
            TrangThai: '',
            GhiChu: '',
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


    const handleDeleteDaiHoc = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                daihocDetails.refetch()
            }
        })
    }
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


    const handleCancel = () => {
        setIsModalOpen(false);
        setStateDaiHoc({
            He: '',
            Nganh: '',
            Truong: '',
            QuocGia: '',
            NamNhan: '',
            TrangThai: '',
            GhiChu: '',
        })
        form.resetFields()
    };
    const handleCancelPheDuyet = () => {
        setIsModalOpenPheDuyet(false)
    }
    const handleCancelNhapLai = () => {
        setIsModalOpenNhapLai(false)
    }


    const onFinish = () => {
        const params = {
            He: stateDaiHoc.He,
            Nganh: stateDaiHoc.Nganh,
            Truong: stateDaiHoc.Truong,
            QuocGia: stateDaiHoc.QuocGia,
            NamNhan: stateDaiHoc.NamNhan,
            //     TrangThai: stateDaiHoc.TrangThai,
            GhiChu: stateDaiHoc.GhiChu,
        }
        console.log("Finsh", stateDaiHoc)
        mutation.mutate(params, {
            onSettled: () => {
                daihocDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateDaiHoc({
            ...stateDaiHoc,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateDaiHocDetails({
            ...stateDaiHocDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateDaiHoc = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDaiHocDetails }, {
            onSettled: () => {
                daihocDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateDaiHocDetails }, {
            onSettled: () => {
                daihocDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateDaiHocDetails }, {
            onSettled: () => {
                daihocDetails.refetch()
            }
        })
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

    const dataTable = daihocDetails?.data?.length && daihocDetails?.data?.map((daihocDetails) => {
        return {
            ...daihocDetails,
            key: daihocDetails._id,
            TrangThai: getTrangThaiText(daihocDetails.TrangThai)
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

    return (
        <div>
            <div>
                <WrapperHeader>Đại học</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={daihocDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingDaiHoc} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới đại học" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            label="Hệ"
                            name="He"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDaiHoc['He']}
                                onChange={handleOnchange}
                                name="He"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngành"
                            name="Nganh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDaiHoc['Nganh']}
                                onChange={handleOnchange}
                                name="Nganh"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Trường"
                            name="Truong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDaiHoc['Truong']}
                                onChange={handleOnchange}
                                name="Truong"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Quốc gia"
                            name="QuocGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDaiHoc['QuocGia']}
                                onChange={handleOnchange}
                                name="QuocGia"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Năm nhận"
                            name="NamNhan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDaiHoc['NamNhan']}
                                onChange={handleOnchange}
                                name="NamNhan"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDaiHoc['GhiChu']}
                                onChange={handleOnchange}
                                name="GhiChu"
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


            <DrawerComponent title='Chi tiết đại học' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateDaiHoc}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Hệ"
                            name="He"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDaiHocDetails['He']} onChange={handleOnchangeDetails} name="He" />
                        </Form.Item>

                        <Form.Item
                            label="Ngành"
                            name="Nganh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDaiHocDetails['Nganh']} onChange={handleOnchangeDetails} name="Nganh" />
                        </Form.Item>

                        <Form.Item
                            label="Trường"
                            name="Truong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDaiHocDetails['Truong']} onChange={handleOnchangeDetails} name="Truong" />
                        </Form.Item>

                        <Form.Item
                            label="Quốc Gia"
                            name="QuocGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDaiHocDetails['QuocGia']} onChange={handleOnchangeDetails} name="QuocGia" />
                        </Form.Item>

                        <Form.Item
                            label="Năm nhận"
                            name="NamNhan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDaiHocDetails['NamNhan']} onChange={handleOnchangeDetails} name="NamNhan" />
                        </Form.Item>


                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDaiHocDetails['GhiChu']} onChange={handleOnchangeDetails} name="GhiChu" />
                        </Form.Item>



                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa quá trình đại học" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDaiHoc}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quá trình đại học này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt quá trình đại học" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt quá trình đại học này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin quá trình đại học" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedNhapLai}>
                    <div>Bạn có chắc yêu cầu nhập lại  quá trình đại học này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default DaiHoc;
