
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions, getBase64 } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as TaiKhaoThiService from '../../../../services/TaiKhaoThiService';
import * as HinhThucKhaoThiService from '../../../../services/HinhThucKhaoThiService';
import { WrapperHeader, WrapperUploadFile } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'
import moment from 'moment';
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const TaiKhaoThi = ({ quannhanId }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)
    const user = useSelector((state) => state?.user)
    const [NgayQD, setNgayQD] = useState('');
    const searchInput = useRef(null);

    const inittial = () => ({
        ThoiDiem: moment(),
        Quy: '',
        Nam: '',
        HocKy: '',
        HinhThucKhaoThi: '',
        MaLopHocPhan: '',
        MonHoc: '',
        KhoiLuongCongViec: '',
        SoGioQuyDoi: '',
        FileCM: '',
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
                SoGioQuyDoi, FileCM,
                TrangThai = 0,

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
                SoGioQuyDoi, FileCM,
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
    const mutationUpdateTrangThai = useMutationHooks(
        (data) => {
            console.log("data update:", data);
            const { id, token, ...rests } = data;
            const updatedData = { ...rests, TrangThai: 1 }; // Update the TrangThai attribute to 1
            const res = TaiKhaoThiService.updateTaiKhaoThi(id, token, updatedData);
            return res;

        },

    )
    useEffect(() => {
        setNgayQD(moment(stateTaiKhaoThiDetails['ThoiDiem']));
        // setNgayQD(convertDateToString(stateQuaTrinhCongTacDetails['NgayQuyetDinh']));
    }, [form, stateTaiKhaoThiDetails, isOpenDrawer])

    const handleOnchangeDetailNgayQD = (date) => {
        setStateTaiKhaoThiDetails({
            ...stateTaiKhaoThiDetails,
            ThoiDiem: date
        })
    }
    const handleOnchangeNgayQD = (date) => {
        setStateTaiKhaoThi({
            ...stateTaiKhaoThi,
            ThoiDiem: date
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
            const res = TaiKhaoThiService.updateTaiKhaoThi(id, token, updatedData);
            return res;

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
                    FileCM: res?.data.FileCM,
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

    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai

    const queryTaiKhaoThi = useQuery({ queryKey: ['taikhaothi'], queryFn: getAllTaiKhaoThis })
    const taikhaothiDetails = useQuery(['hosoquannhantaikhaothi', quannhanId], fetchGetTaiKhaoThi, { enabled: !!quannhanId })
    console.log("tai huong dan:", taikhaothiDetails.data, queryTaiKhaoThi.data)
    const { isLoading: isLoadingTaiKhaoThi, data: quatrinhcongtacs } = queryTaiKhaoThi
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsTaiKhaoThi} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
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
                FileCM: res?.data.FileCM,
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
            ThoiDiem: '',
            Quy: '',
            Nam: '',
            HocKy: '',
            HinhThucKhaoThi: '',
            MaLopHocPhan: '',
            MonHoc: '',
            KhoiLuongCongViec: '',
            SoGioQuyDoi: '',
            FileCM: '',
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
            FileCM: '',
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
            FileCM: stateTaiKhaoThi.FileCM,
            GhiChu: stateTaiKhaoThi.GhiChu,

        }
        console.log("Finsh", stateTaiKhaoThi)
        mutation.mutate(params, {
            onSettled: () => {
                taikhaothiDetails.refetch()
            }
        })
    };





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
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiKhaoThiDetails }, {
            onSettled: () => {
                taikhaothiDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiKhaoThiDetails }, {
            onSettled: () => {
                taikhaothiDetails.refetch()
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

    const dataTable = taikhaothiDetails?.data?.length > 0 && taikhaothiDetails?.data?.map((taikhaothiDetails) => {
        return {
            ...taikhaothiDetails,
            key: taikhaothiDetails._id,
            TrangThai: getTrangThaiText(taikhaothiDetails.TrangThai)

        }
    })


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

    const handleChangeSelectDetails = (value) => {
        setStateTaiKhaoThiDetails({
            ...stateTaiKhaoThiDetails,
            HinhThucKhaoThi: value
        })
        // console.log(stateQuanNhan)
    }
    // const handleChangeSelect1 = (value) => {
    //     setStateTaiKhaoThi({
    //         ...stateTaiKhaoThi,
    //         HinhThucKhaoThi: value
    //     })
    //     // console.log(stateQuanNhan)
    // }
    // const handleOnchange = (e) => {
    //     console.log("e: ", e.target.name, e.target.value)

    //     setStateTaiKhaoThi({
    //         ...stateTaiKhaoThi,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const handleOnchangeFileCM = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateTaiKhaoThi({
            ...stateTaiKhaoThi,
            FileCM: file.preview
        })
    }
    const handleChange = (e, value) => {
        if (e.target) {
            console.log("e: ", e.target.name, e.target.value);
            setStateTaiKhaoThi({
                ...stateTaiKhaoThi,
                [e.target.name]: e.target.value
            });
        } else {
            setStateTaiKhaoThi({
                ...stateTaiKhaoThi,
                HinhThucKhaoThi: value
            })
        }
    };



    const handleOnchangeFileCMDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateTaiKhaoThiDetails({
            ...stateTaiKhaoThiDetails,
            FileCM: file.preview
        })
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
                            // name="ThoiDiem"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiKhaoThi['ThoiDiem']} onChange={handleChange} name="ThoiDiem" /> */}

                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayQD} name="ThoiDiem"
                                format="DD/MM/YYYY"
                            />

                        </Form.Item>

                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi['Quy']} onChange={handleChange} name="Quy" />
                        </Form.Item>

                        <Form.Item
                            label="Năm"
                            name="Nam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.Nam} onChange={handleChange} name="Nam" />
                        </Form.Item>
                        <Form.Item
                            label="Học kỳ"
                            name="HocKy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.HocKy} onChange={handleChange} name="HocKy" />
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
                                onChange={handleChange}
                                options={renderOptions(allHinhThucKhaoThi?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mã lớp học phần"
                            name="MaLopHocPhan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.MaLopHocPhan} onChange={handleChange} name="MaLopHocPhan" />
                        </Form.Item>
                        <Form.Item
                            label="Môn học"
                            name="MonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.MonHoc} onChange={handleChange} name="MonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="Khối lượng công việc"
                            name="KhoiLuongCongViec"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.KhoiLuongCongViec} onChange={handleChange} name="KhoiLuongCongViec" />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ quy đổi"
                            name="SoGioQuyDoi"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThi.SoGioQuyDoi} onChange={handleChange} name="SoGioQuyDoi" />
                        </Form.Item>




                        <Form.Item
                            lable="File chứng minh"
                            name="FileCM"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!'}]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCM} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateTaiKhaoThi?.FileCM && (
                                    <img src={stateTaiKhaoThi?.FileCM} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>



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
                            // name="ThoiDiem"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiKhaoThiDetails.ThoiDiem} onChange={handleOnchangeDetails} name="ThoiDiem" /> */}
                            <DatePicker
                                value={NgayQD}
                                onChange={handleOnchangeDetailNgayQD} name="ThoiDiem"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiKhaoThiDetails.Quy} onChange={handleOnchangeDetails} name="Quy" />
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
                                onChange={handleChangeSelectDetails}
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
                            label="File chứng minh"
                            name="FileCM"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCMDetails} maxCount={1}>
                                <Button >File chứng minh</Button>
                                {stateTaiKhaoThiDetails?.FileCM && (
                                    <img src={stateTaiKhaoThiDetails?.FileCM} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
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
            <ModalComponent title="Phê quyệt tải khảo thí" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt tải khảo thí này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin tải khảo thí" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  tải khảo thí này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default TaiKhaoThi;
