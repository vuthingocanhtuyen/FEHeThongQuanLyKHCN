
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as TaiKhaoThiService from '../../../../services/TaiKhaoThiService';
import * as HinhThucKhaoThiService from '../../../../services/HinhThucKhaoThiService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const TaiKhaoThi = ({ }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const inittial = () => ({
        ThoiDiem: '',
        Quy: '',
        Nam: '',
        HocKy: '',
        HinhThucKhaoThi: '',
        MaLopHocPhan: '',
        MonHoc: '',
        KhoiLuongCongViec: '',
        SoGioQuyDoi: '',
        TrangThai: '',
        GhiChu: '',
    })
    const [stateTaiKhaoThi, setStateTaiKhaoThi] = useState(inittial())
    const [stateTaiKhaoThiDetails, setStateTaiKhaoThiDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                ThoiDiem,
                Quy,
                Nam,
                HocKy,
                HinhThucKhaoThi,
                MaLopHocPhan,
                MonHoc,
                KhoiLuongCongViec,
                SoGioQuyDoi,
                TrangThai,

                GhiChu } = data
            const res = TaiKhaoThiService.createTaiKhaoThi({
                QuanNhanId, ThoiDiem,
                Quy,
                Nam,
                HocKy,
                HinhThucKhaoThi,
                MaLopHocPhan,
                MonHoc,
                KhoiLuongCongViec,
                SoGioQuyDoi,
                TrangThai,

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
            const res = TaiKhaoThiService.updateTaiKhaoThi(
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
            const res = TaiKhaoThiService.deleteTaiKhaoThi(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = TaiKhaoThiService.deleteManyTaiKhaoThi(
                ids,
                token)
            return res
        },
    )


    const getAllTaiKhaoThis = async () => {
        const res = await TaiKhaoThiService.getAllTaiKhaoThi()
        return res
    }

    // show


    const fetchGetTaiKhaoThi = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("iđn tai hd:", quannhanId)
        if (quannhanId) {

            const res = await TaiKhaoThiService.getTaiKhaoThiByQuanNhanId(quannhanId)
            console.log("taihd res: ", res)
            if (res?.data) {
                setStateTaiKhaoThiDetails({
                    ThoiDiem: res?.data.ThoiDiem,
                    Quy: res?.data.Quy,
                    Nam: res?.data.Nam,
                    HocKy: res?.data.HocKy,
                    HinhThucKhaoThi: res?.data.HinhThucKhaoThi,
                    MaLopHocPhan: res?.data.MaLopHocPhan,
                    MonHoc: res?.data.MonHoc,
                    KhoiLuongCongViec: res?.data.KhoiLuongCongViec,
                    SoGioQuyDoi: res?.data.SoGioQuyDoi,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateTaiKhaoThiDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiKhaoThiDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiKhaoThiDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsTaiKhaoThi(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsTaiKhaoThi = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyTaiKhaoThis = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                taikhaothiDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryTaiKhaoThi = useQuery({ queryKey: ['taikhaothi'], queryFn: getAllTaiKhaoThis })
    const taikhaothiDetails = useQuery(['hosoquannhantaikhaothi', quannhanId], fetchGetTaiKhaoThi, { enabled: !!quannhanId })
    console.log("tai huong dan:", taikhaothiDetails.data, queryTaiKhaoThi.data)
    const { isLoading: isLoadingTaiKhaoThi, data: quatrinhcongtacs } = queryTaiKhaoThi
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsTaiKhaoThi} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsTaiKhaoThi = async (rowSelected) => {
        const res = await TaiKhaoThiService.getDetailsTaiKhaoThi(rowSelected)
        if (res?.data) {
            setStateTaiKhaoThiDetails({
                ThoiDiem: res?.data.ThoiDiem,
                Quy: res?.data.Quy,
                Nam: res?.data.Nam,
                HocKy: res?.data.HocKy,
                HinhThucKhaoThi: res?.data.HinhThucKhaoThi,
                MaLopHocPhan: res?.data.MaLopHocPhan,
                MonHoc: res?.data.MonHoc,
                KhoiLuongCongViec: res?.data.KhoiLuongCongViec,
                SoGioQuyDoi: res?.data.SoGioQuyDoi,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsTaiKhaoThi(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiKhaoThiDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiKhaoThiDetails, isModalOpen])





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



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Lớp',
            dataIndex: 'MaLopHocPhan',
            key: 'MaLopHocPhan',
        },
        {
            title: 'Học phần',
            dataIndex: 'MonHoc',
            key: 'MonHoc',
        },
        {
            title: 'Hình thức',
            dataIndex: 'HinhThucKhaoThi',
            key: 'HinhThucKhaoThi',
        },
        {
            title: 'Số bài, SV',
            dataIndex: 'KhoiLuongCongViec',
            key: 'KhoiLuongCongViec',
        },

        {
            title: 'Số giờ',
            dataIndex: 'SoGioQuyDoi',
            key: 'SoGioQuyDoi',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'TrangThai',
            key: 'TrangThai',
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
        setStateTaiKhaoThiDetails({
            SoQuyetDinh: '',
            NgayQuyetDinh: '',
            ChucVu: '',
            DonVi: '',
            KetThuc: '',
            DonViSinhHoatHocThuat: '',
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


    const handleDeleteTaiKhaoThi = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                taikhaothiDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateTaiKhaoThi({
            ThoiDiem: '',
            Quy: '',
            Nam: '',
            HocKy: '',
            HinhThucKhaoThi: '',
            MaLopHocPhan: '',
            MonHoc: '',
            KhoiLuongCongViec: '',
            SoGioQuyDoi: '',
            TrangThai: '',
            GhiChu: '',

        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            ThoiDiem: stateTaiKhaoThi.ThoiDiem,
            Quy: stateTaiKhaoThi.Quy,
            Nam: stateTaiKhaoThi.Nam,
            HocKy: stateTaiKhaoThi.HocKy,
            HinhThucKhaoThi: stateTaiKhaoThi.HinhThucKhaoThi,
            MaLopHocPhan: stateTaiKhaoThi.MaLopHocPhan,
            MonHoc: stateTaiKhaoThi.MonHoc,
            KhoiLuongCongViec: stateTaiKhaoThi.KhoiLuongCongViec,
            SoGioQuyDoi: stateTaiKhaoThi.SoGioQuyDoi,
            TrangThai: stateTaiKhaoThi.TrangThai,
            GhiChu: stateTaiKhaoThi.GhiChu,

        }
        console.log("Finsh", stateTaiKhaoThi)
        mutation.mutate(params, {
            onSettled: () => {
                taikhaothiDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateTaiKhaoThi({
            ...stateTaiKhaoThi,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateTaiKhaoThiDetails({
            ...stateTaiKhaoThiDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateTaiKhaoThi = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiKhaoThiDetails }, {
            onSettled: () => {
                taikhaothiDetails.refetch()
            }
        })
    }

    const dataTable = taikhaothiDetails?.data?.length && taikhaothiDetails?.data?.map((taikhaothiDetails) => {
        return { ...taikhaothiDetails, key: taikhaothiDetails._id }
    })
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])


    const fetchAllHinhThucKhaoThi = async () => {
        const res = await HinhThucKhaoThiService.getAllType()
        return res
    }

    const allHinhThucKhaoThi = useQuery({ queryKey: ['all-hinhthuckhaothi'], queryFn: fetchAllHinhThucKhaoThi })
    const handleChangeSelect1 = (value) => {
        setStateTaiKhaoThi({
            ...stateTaiKhaoThi,
            HinhThucKhaoThi: value
        })
        // console.log(stateQuanNhan)
    }

    return (
        <div>
            <div>
                <WrapperHeader>Tải khảo thí</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={taikhaothiDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingTaiKhaoThi} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm chi tiết tải khảo thí" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Thời điểm"
                            name="ThoiDiem"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi['ThoiDiem']} onChange={handleOnchange} name="ThoiDiem" />



                        </Form.Item>

                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi['Quy']} onChange={handleOnchange} name="Quy" />
                        </Form.Item>

                        <Form.Item
                            label="Năm"
                            name="Nam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.Nam} onChange={handleOnchange} name="Nam" />
                        </Form.Item>
                        <Form.Item
                            label="Học kỳ"
                            name="HocKy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.HocKy} onChange={handleOnchange} name="HocKy" />
                        </Form.Item>
                        <Form.Item
                            label="Hình thức khảo thí"
                            name="HinhThucKhaoThi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiKhaoThi.NgayBatDau} onChange={handleOnchange} name="NgayBatDau" />
                        */}
                            <Select
                                name="HinhThucKhaoThi"
                                onChange={handleChangeSelect1}
                                options={renderOptions(allHinhThucKhaoThi?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mã lớp học phần"
                            name="MaLopHocPhan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.MaLopHocPhan} onChange={handleOnchange} name="MaLopHocPhan" />
                        </Form.Item>
                        <Form.Item
                            label="Môn học"
                            name="MonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.MonHoc} onChange={handleOnchange} name="MonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="Khối lượng công việc"
                            name="KhoiLuongCongViec"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.KhoiLuongCongViec} onChange={handleOnchange} name="KhoiLuongCongViec" />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ quy đổi"
                            name="SoGioQuyDoi"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.SoGioQuyDoi} onChange={handleOnchange} name="SoGioQuyDoi" />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.TrangThai} onChange={handleOnchange} name="TrangThai" />
                        </Form.Item>


                        {/* <Form.Item

                            name="image"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!'}]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateTaiKhaoThi?.image && (
                                    <img src={stateTaiKhaoThi?.image} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item> */}



                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>


            <DrawerComponent title='Cập nhật chi tiết tải khảo thí' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateTaiKhaoThi}
                        autoComplete="on"
                        form={form}
                    >



                        <Form.Item
                            label="Thời điểm"
                            name="ThoiDiem"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThiDetails['ThoiDiem']} onChange={handleOnchangeDetails} name="ThoiDiem" />



                        </Form.Item>

                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThiDetails['Quy']} onChange={handleOnchangeDetails} name="Quy" />
                        </Form.Item>

                        <Form.Item
                            label="Năm"
                            name="Nam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThiDetails.Nam} onChange={handleOnchangeDetails} name="Nam" />
                        </Form.Item>
                        <Form.Item
                            label="Học kỳ"
                            name="HocKy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThiDetails.HocKy} onChange={handleOnchangeDetails} name="HocKy" />
                        </Form.Item>
                        <Form.Item
                            label="Hình thức khảo thí"
                            name="HinhThucKhaoThi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiKhaoThi.NgayBatDau} onChange={handleOnchange} name="NgayBatDau" />
                        */}
                            <Select
                                name="HinhThucKhaoThi"
                                onChange={handleChangeSelect1}
                                options={renderOptions(allHinhThucKhaoThi?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mã lớp học phần"
                            name="MaLopHocPhan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThiDetails.MaLopHocPhan} onChange={handleOnchangeDetails} name="MaLopHocPhan" />
                        </Form.Item>
                        <Form.Item
                            label="Môn học"
                            name="MonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThiDetails.MonHoc} onChange={handleOnchangeDetails} name="MonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="Khối lượng công việc"
                            name="KhoiLuongCongViec"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThiDetails.KhoiLuongCongViec} onChange={handleOnchangeDetails} name="KhoiLuongCongViec" />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ quy đổi"
                            name="SoGioQuyDoi"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThiDetails.SoGioQuyDoi} onChange={handleOnchangeDetails} name="SoGioQuyDoi" />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThiDetails.TrangThai} onChange={handleOnchangeDetails} name="TrangThai" />
                        </Form.Item>

                        {/* <Form.Item
                            label=""
                            name="image"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button >Select File</Button>
                                {stateTaiKhaoThiDetails?.image && (
                                    <img src={stateTaiKhaoThiDetails?.image} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item> */}
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa tải khảo thí" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteTaiKhaoThi}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa tải khảo thí này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default TaiKhaoThi;
