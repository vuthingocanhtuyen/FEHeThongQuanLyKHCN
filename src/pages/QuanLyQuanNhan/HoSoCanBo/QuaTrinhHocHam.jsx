
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, Checkbox, Breadcrumb, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { renderOptions } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as QuaTrinhHocHamService from '../../../services/QuaTrinhHocHamService';
import * as DanhMucHocHamService from '../../../services/DanhMucHocHamService';
import CheckboxComponent from '../../../components/CheckBox/CheckBox'
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
import moment from 'moment';
const QuaTrinhHocHam = () => {

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
        HocHam: '',
        CaoNhat: '',
        GhiChu: '',
    })
    const [stateQuaTrinhHocHam, setStateQuaTrinhHocHam] = useState(inittial())
    const [stateQuaTrinhHocHamDetails, setStateQuaTrinhHocHamDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                code = 123,
                QuyetDinh,
                NgayQuyetDinh,
                HocHam, CaoNhat,

                GhiChu } = data
            const res = QuaTrinhHocHamService.createQuaTrinhHocHam({
                QuanNhanId,
                code,
                QuyetDinh,
                NgayQuyetDinh,
                HocHam, CaoNhat,

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
            const res = QuaTrinhHocHamService.updateQuaTrinhHocHam(
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
            const res = QuaTrinhHocHamService.deleteQuaTrinhHocHam(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = QuaTrinhHocHamService.deleteManyQuaTrinhHocHam(
                ids,
                token)
            return res
        },
    )
    useEffect(() => {
        setNgayQD(moment(stateQuaTrinhHocHamDetails['NgayQuyetDinh']));
        // setNgayQD(convertDateToString(stateQuaTrinhHocHamDetails['NgayQuyetDinh']));
    }, [form, stateQuaTrinhHocHamDetails, isOpenDrawer])

    const handleOnchangeDetailNgayQD = (date) => {
        setStateQuaTrinhHocHamDetails({
            ...stateQuaTrinhHocHamDetails,
            NgayQuyetDinh: date
        })
    }
    const handleOnchangeNgayQD = (date) => {
        setStateQuaTrinhHocHam({
            ...stateQuaTrinhHocHam,
            NgayQuyetDinh: date
        })
    }

    const getAllQuaTrinhHocHams = async () => {
        const res = await QuaTrinhHocHamService.getAllQuaTrinhHocHam()
        return res
    }

    // show


    const fetchGetQuaTrinhHocHam = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await QuaTrinhHocHamService.getQuaTrinhHocHamByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateQuaTrinhHocHamDetails({
                    QuyetDinh: res?.data.QuyetDinh,
                    NgayQuyetDinh: res?.data.NgayQuyetDinh,
                    HocHam: res?.data.HocHam,
                    CaoNhat: res?.data.CaoNhat,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateQuaTrinhHocHamDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhHocHamDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhHocHamDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsQuaTrinhHocHam(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsQuaTrinhHocHam = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyQuaTrinhHocHams = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                quatrinhhochamDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryQuaTrinhHocHam = useQuery({ queryKey: ['qthh'], queryFn: getAllQuaTrinhHocHams })
    const quatrinhhochamDetails = useQuery(['hosoquannhanqthh', quannhanId], fetchGetQuaTrinhHocHam, { enabled: !!quannhanId })

    const { isLoading: isLoadingQuaTrinhHocHam, data: qtcdcmkts } = queryQuaTrinhHocHam
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsQuaTrinhHocHam} />
            </div>
        )
    }




    const onChange = () => { }

    const fetchGetDetailsQuaTrinhHocHam = async (rowSelected) => {
        const res = await QuaTrinhHocHamService.getDetailsQuaTrinhHocHam(rowSelected)
        if (res?.data) {
            setStateQuaTrinhHocHamDetails({
                QuyetDinh: res?.data.QuyetDinh,
                NgayQuyetDinh: res?.data.NgayQuyetDinh,
                HocHam: res?.data.HocHam,
                CaoNhat: res?.data.CaoNhat,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsQuaTrinhHocHam(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhHocHamDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhHocHamDetails, isModalOpen])





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

    //const { data: quatrinhhochamDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetQuaTrinhHocHam, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", quatrinhhochamDetails)
    console.log("idquannhancongtac:", quannhanId)



    const CheckboxAction = () => {
        return (
            <div>
                <CheckboxComponent style={{ width: '25px' }} checked={stateQuaTrinhHocHamDetails.CaoNhat === '1'} onChange={handleChangeCheckCaoNhat}
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
            title: 'Học hàm',
            dataIndex: 'HocHam',
            key: 'HocHam',
        },
        {
            title: 'Cao nhất',
            dataIndex: 'CaoNhat',
            render: (text, record) => getCaoNhatCheckBox(record.CaoNhat)
        },

        // {
        //     title: 'Ghi chú',
        //     dataIndex: 'GhiChu',
        //     key: 'GhiChu',
        // },
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
        setStateQuaTrinhHocHamDetails({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            HocHam: '',
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


    const handleDeleteQuaTrinhHocHam = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                quatrinhhochamDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateQuaTrinhHocHam({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            HocHam: '',
            CaoNhat: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            QuyetDinh: stateQuaTrinhHocHam.QuyetDinh,
            NgayQuyetDinh: stateQuaTrinhHocHam.NgayQuyetDinh,
            HocHam: stateQuaTrinhHocHam.HocHam,
            CaoNhat: stateQuaTrinhHocHam.CaoNhat,
            GhiChu: stateQuaTrinhHocHam.GhiChu,
        }
        console.log("Finsh", stateQuaTrinhHocHam)
        mutation.mutate(params, {
            onSettled: () => {
                quatrinhhochamDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateQuaTrinhHocHam({
            ...stateQuaTrinhHocHam,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateQuaTrinhHocHamDetails({
            ...stateQuaTrinhHocHamDetails,
            [e.target.name]: e.target.value
        })
    }

    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }

    const onUpdateQuaTrinhHocHam = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhHocHamDetails }, {
            onSettled: () => {
                quatrinhhochamDetails.refetch()
            }
        })
    }




    const dataTable = quatrinhhochamDetails?.data?.length && quatrinhhochamDetails?.data?.map((quatrinhhochamDetails) => {
        return {
            ...quatrinhhochamDetails,
            key: quatrinhhochamDetails._id,
            NgayQuyetDinh: convertDateToString(quatrinhhochamDetails.NgayQuyetDinh)

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


    const fetchAllDanhMucHocHam = async () => {
        const res = await DanhMucHocHamService.getAllType()
        return res
    }

    const allDanhMucHocHam = useQuery({ queryKey: ['all-danhmuchocham'], queryFn: fetchAllDanhMucHocHam })
    const handleChangeSelect1 = (value) => {
        setStateQuaTrinhHocHam({
            ...stateQuaTrinhHocHam,
            HocHam: value
        })
        // console.log(stateQuanNhan)
    }
    const handleChangeSelectDetails = (value) => {
        setStateQuaTrinhHocHamDetails({
            ...stateQuaTrinhHocHamDetails,
            HocHam: value
        })
        // console.log(stateQuanNhan)
    }
    const handleChangeCheckCaoNhat = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        console.log("e: ", e.target.name, e.target.value)
        setStateQuaTrinhHocHam({
            ...stateQuaTrinhHocHam,
            CaoNhat: checkedValue,
            [e.target.name]: e.target.value
        });
    };


    const handleChangeCheckCaoNhatDetail = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        setStateQuaTrinhHocHamDetails({
            ...stateQuaTrinhHocHamDetails,
            CaoNhat: checkedValue,
        });
    };
    return (
        <div>
            <div>
                <WrapperHeader>Quá trình học hàm</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={quatrinhhochamDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingQuaTrinhHocHam} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới học hàm" open={isModalOpen} onCancel={handleCancel} footer={null}>
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

                                value={stateQuaTrinhHocHam['QuyetDinh']}
                                onChange={handleChangeCheckCaoNhat}
                                name="QuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            //   name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayQD} name="NgayQuyetDinh"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Học hàm"
                            name="HocHam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >

                            <Select
                                name="HocHam"
                                onChange={handleChangeSelect1}
                                options={renderOptions(allDanhMucHocHam?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Cao nhất"
                            name="CaoNhat"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhHocHam['CaoNhat']}
                                onChange={handleOnchange}
                                name="CaoNhat"
                            /> */}
                            <CheckboxComponent
                                style={{ width: '25px' }}
                                value={stateQuaTrinhHocHam['CaoNhat']}
                                checked={stateQuaTrinhHocHam['CaoNhat'] === 1}
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

                                value={stateQuaTrinhHocHam['GhiChu']}
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


            <DrawerComponent title='Chi tiết học hàm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateQuaTrinhHocHam}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Mã quyết định"
                            name="QuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhHocHamDetails['QuyetDinh']} onChange={handleOnchangeDetails} name="QuyetDinh" />
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
                            label="Học hàm"
                            name="HocHam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* // <InputComponent value={stateQuaTrinhHocHamDetails['HocHam']} onChange={handleOnchangeDetails} name="HocHam" />
                          */}
                            <Select
                                name="HocHam"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectDetails}
                                options={renderOptions(allDanhMucHocHam?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Cao nhất"
                            name="CaoNhat"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhHocHamDetails['CaoNhat']}
                                onChange={handleOnchangeDetails}
                                name="CaoNhat"
                            /> */}
                            <CheckboxComponent
                                style={{ width: '25px' }}
                                value={stateQuaTrinhHocHamDetails['CaoNhat']}
                                checked={stateQuaTrinhHocHamDetails['CaoNhat'] === 1}
                                onChange={handleChangeCheckCaoNhatDetail}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhHocHamDetails['GhiChu']} onChange={handleOnchangeDetails} name="GhiChu" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa quá trình học hàm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQuaTrinhHocHam}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quá trình học hàm này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default QuaTrinhHocHam;
