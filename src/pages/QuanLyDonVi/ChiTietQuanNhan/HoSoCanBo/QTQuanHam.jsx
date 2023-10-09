
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'

import { renderOptions } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as QuaTrinhQuanHamService from '../../../../services/QTQuanHamService';
import * as DanhMucCapBacService from '../../../../services/DanhMucCapBacService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
import moment from 'moment';
const QTQuanHam = ({ quannhanId }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);

    const inittial = () => ({
        QuyetDinh: '',
        NgayQuyetDinh: '',
        QuanHam: '',
        GhiChu: '',
    })
    const [stateQuaTrinhQuanHam, setStateQuaTrinhQuanHam] = useState(inittial())
    const [stateQuaTrinhQuanHamDetails, setStateQuaTrinhQuanHamDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId, code = 123
                , QuyetDinh,
                NgayQuyetDinh, QuanHam,
                GhiChu } = data
            const res = QuaTrinhQuanHamService.createQuaTrinhQuanHam({
                QuanNhanId, code, QuyetDinh,
                NgayQuyetDinh, QuanHam,
                GhiChu
            })
            console.log("data create qtct:", res.data)
            return res

        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            console.log("data update:", data)
            const { id,
                token,
                ...rests } = data
            const res = QuaTrinhQuanHamService.updateQuaTrinhQuanHam(
                id,
                token,
                { ...rests })
            return res
        },

    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = QuaTrinhQuanHamService.deleteQuaTrinhQuanHam(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = QuaTrinhQuanHamService.deleteManyQuaTrinhQuanHam(
                ids,
                token)
            return res
        },
    )


    const getAllQuaTrinhQuanHams = async () => {
        const res = await QuaTrinhQuanHamService.getAllQuaTrinhQuanHam()
        return res
    }

    // show


    const fetchGetQuaTrinhQuanHam = async (context) => {

        if (quannhanId) {

            const res = await QuaTrinhQuanHamService.getQuaTrinhQuanHamByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateQuaTrinhQuanHamDetails({
                    QuyetDinh: res?.data.QuyetDinh,
                    NgayQuyetDinh: res?.data.NgayQuyetDinh,
                    QuanHam: res?.data.QuanHam,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateQuaTrinhQuanHamDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhQuanHamDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhQuanHamDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsQuaTrinhQuanHam(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsQuaTrinhQuanHam = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyQuaTrinhQuanHams = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                quatrinhquanhamDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryQuaTrinhQuanHam = useQuery({ queryKey: ['quanhams'], queryFn: getAllQuaTrinhQuanHams })
    const quatrinhquanhamDetails = useQuery(['hosoquannhanquanham', quannhanId], fetchGetQuaTrinhQuanHam, { enabled: !!quannhanId })
    console.log("qt công tác:", quatrinhquanhamDetails.data, queryQuaTrinhQuanHam.data)
    const { isLoading: isLoadingQuaTrinhQuanHam, data: quanhams } = queryQuaTrinhQuanHam
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsQuaTrinhQuanHam} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsQuaTrinhQuanHam = async (rowSelected) => {
        const res = await QuaTrinhQuanHamService.getDetailsQuaTrinhQuanHam(rowSelected)
        if (res?.data) {
            setStateQuaTrinhQuanHamDetails({
                QuyetDinh: res?.data.QuyetDinh,
                NgayQuyetDinh: res?.data.NgayQuyetDinh,
                QuanHam: res?.data.QuanHam,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsQuaTrinhQuanHam(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhQuanHamDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhQuanHamDetails, isModalOpen])





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

    //const { data: quatrinhquanhamDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetQuaTrinhQuanHam, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", quatrinhquanhamDetails)
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
            title: 'Quân hàm',
            dataIndex: 'QuanHam',
            key: 'QuanHam',
        },

        {
            title: 'Ghi chú',
            dataIndex: 'GhiChu',
            key: 'GhiChu',
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
        setStateQuaTrinhQuanHamDetails({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            QuanHam: '',
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


    const handleDeleteQuaTrinhQuanHam = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                quatrinhquanhamDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateQuaTrinhQuanHam({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            QuanHam: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            QuyetDinh: stateQuaTrinhQuanHam.QuyetDinh,
            NgayQuyetDinh: stateQuaTrinhQuanHam.NgayQuyetDinh,
            QuanHam: stateQuaTrinhQuanHam.QuanHam,
            GhiChu: stateQuaTrinhQuanHam.GhiChu,
        }
        console.log("Finsh", stateQuaTrinhQuanHam)
        mutation.mutate(params, {
            onSettled: () => {
                quatrinhquanhamDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateQuaTrinhQuanHam({
            ...stateQuaTrinhQuanHam,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateQuaTrinhQuanHamDetails({
            ...stateQuaTrinhQuanHamDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateQuaTrinhQuanHam = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhQuanHamDetails }, {
            onSettled: () => {
                quatrinhquanhamDetails.refetch()
            }
        })
    }
    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }
    const dataTable = quatrinhquanhamDetails?.data?.length && quatrinhquanhamDetails?.data?.map((quatrinhquanhamDetails) => {
        return {
            ...quatrinhquanhamDetails,
            key: quatrinhquanhamDetails._id,
            NgayQuyetDinh: convertDateToString(quatrinhquanhamDetails.NgayQuyetDinh)
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



    const fetchAllCapBac = async () => {
        const res = await DanhMucCapBacService.getAllType()
        return res
    }

    const allCapBac = useQuery({ queryKey: ['all-capbac'], queryFn: fetchAllCapBac })
    const handleChangeSelect1 = (value) => {
        setStateQuaTrinhQuanHam({
            ...stateQuaTrinhQuanHam,
            QuanHam: value
        })
        // console.log(stateQuanNhan)
    }
    const handleChangeSelectDetails = (value) => {
        setStateQuaTrinhQuanHamDetails({
            ...stateQuaTrinhQuanHamDetails,
            QuanHam: value
        })
        // console.log(stateQuanNhan)
    }




    return (
        <div>
            <div>
                <WrapperHeader>Quá trình quân hàm</WrapperHeader>
                {/* <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div> */}
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={quatrinhquanhamDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingQuaTrinhQuanHam} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới quá trình quân hàm" open={isModalOpen} onCancel={handleCancel} footer={null}>
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

                                value={stateQuaTrinhQuanHam['QuyetDinh']}
                                onChange={handleOnchange}
                                name="QuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhQuanHam['NgayQuyetDinh']}
                                onChange={handleOnchange}
                                name="NgayQuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Quân hàm"
                            name="QuanHam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhQuanHam['QuanHam']}
                                onChange={handleOnchange}
                                name="QuanHam"
                            /> */}

                            <Select
                                name="QuanHam"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelect1}
                                options={renderOptions(allCapBac?.data?.data)}
                            />


                        </Form.Item>


                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhQuanHam['GhiChu']}
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


            <DrawerComponent title='Chi tiết quá trình quân hàm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateQuaTrinhQuanHam}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Mã quyết định"
                            name="QuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhQuanHamDetails['QuyetDinh']} onChange={handleOnchangeDetails} name="QuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhQuanHamDetails['NgayQuyetDinh']} onChange={handleOnchangeDetails} name="NgayQuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Quân hàm"
                            name="QuanHam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateQuaTrinhQuanHamDetails['QuanHam']} onChange={handleOnchangeDetails} name="QuanHam" /> */}

                            <Select
                                name="QuanHam"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}
                                // value={stateQuaTrinhQuanHamDetails.QuanHam}
                                onChange={handleChangeSelectDetails}
                                options={renderOptions(allCapBac?.data?.data)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhQuanHamDetails['GhiChu']} onChange={handleOnchangeDetails} name="GhiChu" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa quá trình quân hàm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQuaTrinhQuanHam}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quá trình quân hàm này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default QTQuanHam;
