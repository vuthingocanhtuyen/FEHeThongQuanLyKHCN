
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { renderOptions } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as QTCDCMKTService from '../../../services/QTCDCMKTService';
import * as DanhMucCDCMKTService from '../../../services/DanhMucCDCMKTService';
import { WrapperHeader } from './style'
import CheckboxComponent from '../../../components/CheckBox/CheckBox'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
import moment from 'moment';
const QTCDCMKT = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [NgayQD, setNgayQD] = useState('');
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const inittial = () => ({
        QuyetDinh: '',
        NgayQuyetDinh: moment(),
        CDCMKT: '',
        CaoNhat: '',
        GhiChu: '',
    })
    const [stateQTCDCMKT, setStateQTCDCMKT] = useState(inittial())
    const [stateQTCDCMKTDetails, setStateQTCDCMKTDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                code = 123,
                QuyetDinh,
                NgayQuyetDinh,
                CDCMKT, CaoNhat,

                GhiChu } = data
            const res = QTCDCMKTService.createQTCDCMKT({
                QuanNhanId,
                code,
                QuyetDinh,
                NgayQuyetDinh,
                CDCMKT, CaoNhat,

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
            const res = QTCDCMKTService.updateQTCDCMKT(
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
            const res = QTCDCMKTService.deleteQTCDCMKT(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = QTCDCMKTService.deleteManyQTCDCMKT(
                ids,
                token)
            return res
        },
    )
    useEffect(() => {
        setNgayQD(moment(stateQTCDCMKTDetails['NgayQuyetDinh']));
        // setNgayQD(convertDateToString(stateQTCDCMKTDetails['NgayQuyetDinh']));
    }, [form, stateQTCDCMKTDetails, isOpenDrawer])

    const handleOnchangeDetailNgayQD = (date) => {
        setStateQTCDCMKTDetails({
            ...stateQTCDCMKTDetails,
            NgayQuyetDinh: date
        })
    }
    const handleOnchangeNgayQD = (date) => {
        setStateQTCDCMKT({
            ...stateQTCDCMKT,
            NgayQuyetDinh: date
        })
    }

    const getAllQTCDCMKTs = async () => {
        const res = await QTCDCMKTService.getAllQTCDCMKT()
        return res
    }

    // show


    const fetchGetQTCDCMKT = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await QTCDCMKTService.getQTCDCMKTByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateQTCDCMKTDetails({
                    QuyetDinh: res?.data.QuyetDinh,
                    NgayQuyetDinh: res?.data.NgayQuyetDinh,
                    CDCMKT: res?.data.CDCMKT,
                    CaoNhat: res?.data.CaoNhat,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateQTCDCMKTDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQTCDCMKTDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQTCDCMKTDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsQTCDCMKT(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsQTCDCMKT = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyQTCDCMKTs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                qtcdcmktDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryQTCDCMKT = useQuery({ queryKey: ['qtcdcmkts'], queryFn: getAllQTCDCMKTs })
    const qtcdcmktDetails = useQuery(['hosoquannhanqtcdcmkt', quannhanId], fetchGetQTCDCMKT, { enabled: !!quannhanId })

    const { isLoading: isLoadingQTCDCMKT, data: qtcdcmkts } = queryQTCDCMKT
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsQTCDCMKT} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsQTCDCMKT = async (rowSelected) => {
        const res = await QTCDCMKTService.getDetailsQTCDCMKT(rowSelected)
        if (res?.data) {
            setStateQTCDCMKTDetails({
                QuyetDinh: res?.data.QuyetDinh,
                NgayQuyetDinh: res?.data.NgayQuyetDinh,
                CDCMKT: res?.data.CDCMKT,
                CaoNhat: res?.data.CaoNhat,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsQTCDCMKT(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQTCDCMKTDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQTCDCMKTDetails, isModalOpen])





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

    //const { data: qtcdcmktDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetQTCDCMKT, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", qtcdcmktDetails)
    console.log("idquannhancongtac:", quannhanId)


    const CheckboxAction = () => {
        return (
            <div>
                <CheckboxComponent style={{ width: '25px' }} checked={stateQTCDCMKTDetails.CaoNhat === '1'} onChange={handleChangeCheckCaoNhat}
                />
            </div>
        );
    }

    function getCaoNhatCheckBox(statusValue) {
        switch (statusValue) {
            case 0:
                return (
                    <div>
                        <CheckboxComponent style={{ width: '25px' }} />
                    </div>
                );

            case 1:
                return (
                    <div>
                        <CheckboxComponent style={{ width: '25px' }}
                            checked={true}
                            onChange={handleChangeCheckCaoNhat}
                        />

                    </div>
                );

            default:
                return (
                    <div>
                        <CheckboxComponent style={{ width: '25px' }} />
                    </div>
                );
        }
    }
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },

        {
            title: 'Quyết định',
            dataIndex: 'QuyetDinh',
            key: 'QuyetDinh',
        },
        {
            title: 'Ngày quyết định',
            dataIndex: 'NgayQuyetDinh',
            key: 'NgayQuyetDinh',
        },
        {
            title: 'CDCMKT',
            dataIndex: 'CDCMKT',
            key: 'CDCMKT',
        },
        {
            title: 'Cao nhất',
            dataIndex: 'CaoNhat',
            render: (text, record) => getCaoNhatCheckBox(record.CaoNhat)
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
        setStateQTCDCMKTDetails({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            CDCMKT: '',
            CaoNhat: '',
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


    const handleDeleteQTCDCMKT = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                qtcdcmktDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateQTCDCMKT({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            CDCMKT: '',
            CaoNhat: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            QuyetDinh: stateQTCDCMKT.QuyetDinh,
            NgayQuyetDinh: stateQTCDCMKT.NgayQuyetDinh,
            CDCMKT: stateQTCDCMKT.CDCMKT,
            CaoNhat: stateQTCDCMKT.CaoNhat,
            GhiChu: stateQTCDCMKT.GhiChu,
        }
        console.log("Finsh", stateQTCDCMKT)
        mutation.mutate(params, {
            onSettled: () => {
                qtcdcmktDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateQTCDCMKT({
            ...stateQTCDCMKT,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateQTCDCMKTDetails({
            ...stateQTCDCMKTDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateQTCDCMKT = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQTCDCMKTDetails }, {
            onSettled: () => {
                qtcdcmktDetails.refetch()
            }
        })
    }
    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }
    const dataTable = qtcdcmktDetails?.data?.length && qtcdcmktDetails?.data?.map((qtcdcmktDetails) => {
        return {
            ...qtcdcmktDetails,
            key: qtcdcmktDetails._id,
            NgayQuyetDinh: convertDateToString(qtcdcmktDetails.NgayQuyetDinh)
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


    const fetchAllCDCMKT = async () => {
        const res = await DanhMucCDCMKTService.getAllType()
        return res
    }

    const allCDCMKT = useQuery({ queryKey: ['all-cdcmkt'], queryFn: fetchAllCDCMKT })
    const handleChangeSelect1 = (value) => {
        setStateQTCDCMKT({
            ...stateQTCDCMKT,
            CDCMKT: value
        })
        // console.log(stateQuanNhan)
    }
    const handleChangeSelectDetails = (value) => {
        setStateQTCDCMKTDetails({
            ...stateQTCDCMKTDetails,
            CDCMKT: value
        })
        // console.log(stateQuanNhan)
    }
    const handleChangeCheckCaoNhat = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        console.log("e: ", e.target.name, e.target.value)
        setStateQTCDCMKT({
            ...stateQTCDCMKT,
            CaoNhat: checkedValue,
            [e.target.name]: e.target.value
        });
    };


    const handleChangeCheckCaoNhatDetail = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        setStateQTCDCMKTDetails({
            ...stateQTCDCMKTDetails,
            CaoNhat: checkedValue,
        });
    };

    return (
        <div>
            <div>
                <WrapperHeader>Chức danh chuyên môn kỹ thuật</WrapperHeader>
                {/* <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div> */}
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={qtcdcmktDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingQTCDCMKT} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới CDCMKT" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            label="Quyết định"
                            name="QuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQTCDCMKT['QuyetDinh']}
                                onChange={handleChangeCheckCaoNhat}
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
                            label="CDCMKT"
                            name="CDCMKT"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                                style={{ width: '100%' }}

                                value={stateQTCDCMKT['CDCMKT']}
                                onChange={handleOnchange}
                                name="CDCMKT"
                            /> */}
                            <Select
                                name="CDCMKT"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelect1}
                                options={renderOptions(allCDCMKT?.data?.data)}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Cao nhất"
                            name="CaoNhat"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                                style={{ width: '100%' }}

                                value={stateQTCDCMKT['CaoNhat']}
                                onChange={handleOnchange}
                                name="CaoNhat"
                            /> */}
                            <CheckboxComponent
                                style={{ width: '25px' }}
                                value={stateQTCDCMKT['CaoNhat']}
                                checked={stateQTCDCMKT['CaoNhat'] === 1}
                                onChange={handleChangeCheckCaoNhat}

                            />
                        </Form.Item>
                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQTCDCMKT['GhiChu']}
                                onChange={handleChangeCheckCaoNhat}
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


            <DrawerComponent title='Chi tiết chức danh chuyên môn kỹ thuật' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateQTCDCMKT}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Mã quyết định"
                            name="QuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQTCDCMKTDetails['QuyetDinh']} onChange={handleOnchangeDetails} name="QuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            // name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayQD}
                                onChange={handleOnchangeDetailNgayQD} name="NgayQuyetDinh"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>

                        <Form.Item
                            label="CDCMKT"
                            name="CDCMKT"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateQTCDCMKTDetails['CDCMKT']} onChange={handleOnchangeDetails} name="CDCMKT" /> */}
                            <Select
                                name="CDCMKT"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectDetails}
                                options={renderOptions(allCDCMKT?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Cao nhất"
                            name="CaoNhat"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                                style={{ width: '100%' }}

                                value={stateQTCDCMKTDetails['CaoNhat']}
                                onChange={handleOnchangeDetails}
                                name="CaoNhat"
                            /> */}
                            <CheckboxComponent
                                style={{ width: '25px' }}
                                value={stateQTCDCMKTDetails['CaoNhat']}
                                checked={stateQTCDCMKTDetails['CaoNhat'] === 1}
                                onChange={handleChangeCheckCaoNhatDetail}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQTCDCMKTDetails['GhiChu']} onChange={handleOnchangeDetails} name="GhiChu" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa quá trình CDCMKT" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQTCDCMKT}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa qquá trình CDCMKT này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default QTCDCMKT;
