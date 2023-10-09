
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, Checkbox, Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as QuaTrinhHocViService from '../../../../services/QuaTrinhHocViService';
import * as DanhMucHocViService from '../../../../services/DanhMucHocViService';
import CheckboxComponent from '../../../../components/CheckBox/CheckBox'
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
import moment from 'moment';
const QuaTrinhHocVi = ({ quannhanId }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    // const quannhanId = user.QuanNhanId;
    const inittial = () => ({
        QuyetDinh: '',
        NgayQuyetDinh: '',
        HocVi: '',
        CaoNhat: '',
        GhiChu: '',
    })
    const [stateQuaTrinhHocVi, setStateQuaTrinhHocVi] = useState(inittial())
    const [stateQuaTrinhHocViDetails, setStateQuaTrinhHocViDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                code = 123,
                QuyetDinh,
                NgayQuyetDinh,
                HocVi, CaoNhat,

                GhiChu } = data
            const res = QuaTrinhHocViService.createQuaTrinhHocVi({
                QuanNhanId,
                code,
                QuyetDinh,
                NgayQuyetDinh,
                HocVi, CaoNhat,

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
            const res = QuaTrinhHocViService.updateQuaTrinhHocVi(
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
            const res = QuaTrinhHocViService.deleteQuaTrinhHocVi(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = QuaTrinhHocViService.deleteManyQuaTrinhHocVi(
                ids,
                token)
            return res
        },
    )


    const getAllQuaTrinhHocVis = async () => {
        const res = await QuaTrinhHocViService.getAllQuaTrinhHocVi()
        return res
    }

    // show


    const fetchGetQuaTrinhHocVi = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await QuaTrinhHocViService.getQuaTrinhHocViByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateQuaTrinhHocViDetails({
                    QuyetDinh: res?.data.QuyetDinh,
                    NgayQuyetDinh: res?.data.NgayQuyetDinh,
                    HocVi: res?.data.HocVi,
                    CaoNhat: res?.data.CaoNhat,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateQuaTrinhHocViDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhHocViDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhHocViDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsQuaTrinhHocVi(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsQuaTrinhHocVi = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyQuaTrinhHocVis = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                quatrinhhocviDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryQuaTrinhHocVi = useQuery({ queryKey: ['qthv'], queryFn: getAllQuaTrinhHocVis })
    const quatrinhhocviDetails = useQuery(['hosoquannhanqthv', quannhanId], fetchGetQuaTrinhHocVi, { enabled: !!quannhanId })

    const { isLoading: isLoadingQuaTrinhHocVi, data: qtcdcmkts } = queryQuaTrinhHocVi
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsQuaTrinhHocVi} />
            </div>
        )
    }




    const onChange = () => { }

    const fetchGetDetailsQuaTrinhHocVi = async (rowSelected) => {
        const res = await QuaTrinhHocViService.getDetailsQuaTrinhHocVi(rowSelected)
        if (res?.data) {
            setStateQuaTrinhHocViDetails({
                QuyetDinh: res?.data.QuyetDinh,
                NgayQuyetDinh: res?.data.NgayQuyetDinh,
                HocVi: res?.data.HocVi,
                CaoNhat: res?.data.CaoNhat,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsQuaTrinhHocVi(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhHocViDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhHocViDetails, isModalOpen])





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

    //const { data: quatrinhhocviDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetQuaTrinhHocVi, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", quatrinhhocviDetails)
    console.log("idquannhancongtac:", quannhanId)



    const CheckboxAction = () => {
        return (
            <div>
                <CheckboxComponent style={{ width: '25px' }} checked={stateQuaTrinhHocViDetails.CaoNhat === '1'} onChange={handleChangeCheckCaoNhat}
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
            title: 'Học vị',
            dataIndex: 'HocVi',
            key: 'HocVi',
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
        setStateQuaTrinhHocViDetails({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            HocVi: '',
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


    const handleDeleteQuaTrinhHocVi = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                quatrinhhocviDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateQuaTrinhHocVi({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            HocVi: '',
            CaoNhat: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            QuyetDinh: stateQuaTrinhHocVi.QuyetDinh,
            NgayQuyetDinh: stateQuaTrinhHocVi.NgayQuyetDinh,
            HocVi: stateQuaTrinhHocVi.HocVi,
            CaoNhat: stateQuaTrinhHocVi.CaoNhat,
            GhiChu: stateQuaTrinhHocVi.GhiChu,
        }
        console.log("Finsh", stateQuaTrinhHocVi)
        mutation.mutate(params, {
            onSettled: () => {
                quatrinhhocviDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateQuaTrinhHocVi({
            ...stateQuaTrinhHocVi,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateQuaTrinhHocViDetails({
            ...stateQuaTrinhHocViDetails,
            [e.target.name]: e.target.value
        })
    }

    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }

    const onUpdateQuaTrinhHocVi = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhHocViDetails }, {
            onSettled: () => {
                quatrinhhocviDetails.refetch()
            }
        })
    }




    const dataTable = quatrinhhocviDetails?.data?.length && quatrinhhocviDetails?.data?.map((quatrinhhocviDetails) => {
        return {
            ...quatrinhhocviDetails,
            key: quatrinhhocviDetails._id,
            NgayQuyetDinh: convertDateToString(quatrinhhocviDetails.NgayQuyetDinh)

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


    const fetchAllDanhMucHocVi = async () => {
        const res = await DanhMucHocViService.getAllType()
        return res
    }

    const allDanhMucHocVi = useQuery({ queryKey: ['all-danhmuchocvi'], queryFn: fetchAllDanhMucHocVi })
    const handleChangeSelect1 = (value) => {
        setStateQuaTrinhHocVi({
            ...stateQuaTrinhHocVi,
            HocVi: value
        })
        // console.log(stateQuanNhan)
    }
    const handleChangeSelectDetails = (value) => {
        setStateQuaTrinhHocViDetails({
            ...stateQuaTrinhHocViDetails,
            HocVi: value
        })
        // console.log(stateQuanNhan)
    }
    const handleChangeCheckCaoNhat = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        console.log("e: ", e.target.name, e.target.value)
        setStateQuaTrinhHocVi({
            ...stateQuaTrinhHocVi,
            CaoNhat: checkedValue,
            [e.target.name]: e.target.value
        });
    };


    const handleChangeCheckCaoNhatDetail = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        setStateQuaTrinhHocViDetails({
            ...stateQuaTrinhHocViDetails,
            CaoNhat: checkedValue,
        });
    };
    return (
        <div>
            <div>
                <WrapperHeader>Quá trình học vị</WrapperHeader>
                {/* <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div> */}
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={quatrinhhocviDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingQuaTrinhHocVi} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới học vị" open={isModalOpen} onCancel={handleCancel} footer={null}>
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

                                value={stateQuaTrinhHocVi['QuyetDinh']}
                                onChange={handleChangeCheckCaoNhat}
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

                                value={stateQuaTrinhHocVi['NgayQuyetDinh']}
                                onChange={handleChangeCheckCaoNhat}
                                name="NgayQuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Học vị"
                            name="HocVi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >

                            <Select
                                name="HocVi"
                                onChange={handleChangeSelect1}
                                options={renderOptions(allDanhMucHocVi?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Cao nhất"
                            name="CaoNhat"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhHocVi['CaoNhat']}
                                onChange={handleOnchange}
                                name="CaoNhat"
                            /> */}
                            <CheckboxComponent
                                style={{ width: '25px' }}
                                value={stateQuaTrinhHocVi['CaoNhat']}
                                checked={stateQuaTrinhHocVi['CaoNhat'] === 1}
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

                                value={stateQuaTrinhHocVi['GhiChu']}
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


            <DrawerComponent title='Chi tiết học vị' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateQuaTrinhHocVi}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Mã quyết định"
                            name="QuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhHocViDetails['QuyetDinh']} onChange={handleOnchangeDetails} name="QuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhHocViDetails['NgayQuyetDinh']} onChange={handleOnchangeDetails} name="NgayQuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Học vị"
                            name="HocVi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* // <InputComponent value={stateQuaTrinhHocViDetails['HocVi']} onChange={handleOnchangeDetails} name="HocVi" />
                          */}
                            <Select
                                name="HocVi"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectDetails}
                                options={renderOptions(allDanhMucHocVi?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Cao nhất"
                            name="CaoNhat"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhHocViDetails['CaoNhat']}
                                onChange={handleOnchangeDetails}
                                name="CaoNhat"
                            /> */}
                            <CheckboxComponent
                                style={{ width: '25px' }}
                                value={stateQuaTrinhHocViDetails['CaoNhat']}
                                checked={stateQuaTrinhHocViDetails['CaoNhat'] === 1}
                                onChange={handleChangeCheckCaoNhatDetail}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhHocViDetails['GhiChu']} onChange={handleOnchangeDetails} name="GhiChu" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa quá trình học vị" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQuaTrinhHocVi}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quá trình học vị này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default QuaTrinhHocVi;
