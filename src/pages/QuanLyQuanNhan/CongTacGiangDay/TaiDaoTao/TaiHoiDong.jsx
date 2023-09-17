
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions, getBase64 } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as TaiHoiDongService from '../../../../services/TaiHoiDongService';
import * as CapHoiDongService from '../../../../services/CapHoiDongService';
import * as VaiTroHoiDongService from '../../../../services/VaiTroHoiDongService';
import { WrapperHeader, WrapperUploadFile } from './style'

import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const TaiHoiDong = ({ }) => {

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
    const inittial = () => ({
        CapHoiDong: '',
        LoaiHoiDong: '',
        VaiTro: '',
        ThoiDiem: '',
        Quy: '',
        Nam: '',
        KhoiLuongCongViec: '',
        SoGioQuyDoi: '',
        FileCM: '',
        TrangThai: 0,
        GhiChu: '',
    })
    const [stateTaiHoiDong, setStateTaiHoiDong] = useState(inittial())
    const [stateTaiHoiDongDetails, setStateTaiHoiDongDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                CapHoiDong,
                LoaiHoiDong,
                VaiTro,
                ThoiDiem, Quy, Nam, KhoiLuongCongViec, SoGioQuyDoi, FileCM, TrangThai = 0, GhiChu } = data
            const res = TaiHoiDongService.createTaiHoiDong({
                QuanNhanId, ThoiDiem,
                CapHoiDong,
                LoaiHoiDong,
                VaiTro,
                ThoiDiem, Quy, Nam,
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
            const res = TaiHoiDongService.updateTaiHoiDong(
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
            const res = TaiHoiDongService.updateTaiHoiDong(id, token, updatedData);
            return res;

        },

    )


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
            const res = TaiHoiDongService.updateTaiHoiDong(id, token, updatedData);
            return res;

        },

    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = TaiHoiDongService.deleteTaiHoiDong(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = TaiHoiDongService.deleteManyTaiHoiDong(
                ids,
                token)
            return res
        },
    )


    const getAllTaiHoiDongs = async () => {
        const res = await TaiHoiDongService.getAllTaiHoiDong()
        return res
    }

    // show


    const fetchGetTaiHoiDong = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("iđn tai hd:", quannhanId)
        if (quannhanId) {

            const res = await TaiHoiDongService.getTaiHoiDongByQuanNhanId(quannhanId)
            console.log("taihd res: ", res)
            if (res?.data) {
                setStateTaiHoiDongDetails({
                    CapHoiDong: res?.data.CapHoiDong,
                    LoaiHoiDong: res?.data.LoaiHoiDong,
                    VaiTro: res?.data.VaiTro,
                    ThoiDiem: res?.data.ThoiDiem,
                    Quy: res?.data.Quy,
                    MaLopHocPhan: res?.data.MaLopHocPhan,
                    Nam: res?.data.Nam,
                    KhoiLuongCongViec: res?.data.KhoiLuongCongViec,
                    SoGioQuyDoi: res?.data.SoGioQuyDoi,
                    FileCM: res?.data.FileCM,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateTaiHoiDongDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiHoiDongDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiHoiDongDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsTaiHoiDong(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsTaiHoiDong = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyTaiHoiDongs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                taihoidongDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai

    const queryTaiHoiDong = useQuery({ queryKey: ['taihoidong'], queryFn: getAllTaiHoiDongs })
    const taihoidongDetails = useQuery(['hosoquannhantaihoidong', quannhanId], fetchGetTaiHoiDong, { enabled: !!quannhanId })
    console.log("tai huong dan:", taihoidongDetails.data, queryTaiHoiDong.data)
    const { isLoading: isLoadingTaiHoiDong, data: quatrinhcongtacs } = queryTaiHoiDong
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsTaiHoiDong} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsTaiHoiDong = async (rowSelected) => {
        const res = await TaiHoiDongService.getDetailsTaiHoiDong(rowSelected)
        if (res?.data) {
            setStateTaiHoiDongDetails({
                CapHoiDong: res?.data.CapHoiDong,
                LoaiHoiDong: res?.data.LoaiHoiDong,
                VaiTro: res?.data.VaiTro,
                ThoiDiem: res?.data.ThoiDiem,
                Quy: res?.data.Quy,
                Nam: res?.data.Nam,
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
            fetchGetDetailsTaiHoiDong(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiHoiDongDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiHoiDongDetails, isModalOpen])





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
            title: 'Hội đồng',
            dataIndex: 'LoaiHoiDong',
            key: 'LoaiHoiDong',
        },
        {
            title: 'Số lượng',
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
        setStateTaiHoiDongDetails({
            CapHoiDong: '',
            LoaiHoiDong: '',
            VaiTro: '',
            ThoiDiem: '',
            Quy: '',
            Nam: '',
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


    const handleDeleteTaiHoiDong = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                taihoidongDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateTaiHoiDong({
            CapHoiDong: '',
            LoaiHoiDong: '',
            VaiTro: '',
            ThoiDiem: '',
            Quy: '',
            Nam: '',
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
            CapHoiDong: stateTaiHoiDong.CapHoiDong,
            LoaiHoiDong: stateTaiHoiDong.LoaiHoiDong,
            VaiTro: stateTaiHoiDong.VaiTro,
            ThoiDiem: stateTaiHoiDong.ThoiDiem,
            Quy: stateTaiHoiDong.Quy,
            Nam: stateTaiHoiDong.Nam,
            KhoiLuongCongViec: stateTaiHoiDong.KhoiLuongCongViec,
            SoGioQuyDoi: stateTaiHoiDong.SoGioQuyDoi,
            FileCM: stateTaiHoiDong.FileCM,
            GhiChu: stateTaiHoiDong.GhiChu,
        }
        console.log("Finsh", stateTaiHoiDong)
        mutation.mutate(params, {
            onSettled: () => {
                taihoidongDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateTaiHoiDong({
            ...stateTaiHoiDong,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateTaiHoiDongDetails({
            ...stateTaiHoiDongDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateTaiHoiDong = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiHoiDongDetails }, {
            onSettled: () => {
                taihoidongDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiHoiDongDetails }, {
            onSettled: () => {
                taihoidongDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiHoiDongDetails }, {
            onSettled: () => {
                taihoidongDetails.refetch()
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

    const dataTable = taihoidongDetails?.data?.length > 0 && taihoidongDetails?.data?.map((taihoidongDetails) => {
        return {
            ...taihoidongDetails,
            key: taihoidongDetails._id,
            TrangThai: getTrangThaiText(taihoidongDetails.TrangThai)

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




    //test



    //Cấp hội đồng
    const fetchAllCapHoiDong = async () => {
        const res = await CapHoiDongService.getAllType()
        return res
    }
    const allCapHoiDong = useQuery({ queryKey: ['all-caphoidong'], queryFn: fetchAllCapHoiDong })
    console.log("caphoidong:", allCapHoiDong.data)


    const fetchCapHoiDong = async () => {
        const res = await CapHoiDongService.getAllCapHoiDong();
        return res;
    };

    const CapHoiDongQuery = useQuery(['allcaphoidong'], fetchCapHoiDong);
    const CapHoiDong = CapHoiDongQuery.data;
    console.log("all caphoidong:", CapHoiDong);

    const handleChangeSelect1 = (value) => {
        const selectedCapHD = value;


        const filteredDataTable = Array.isArray(CapHoiDong) ? CapHoiDong.filter((data) => {
            return data.TenCapHoiDong === selectedCapHD;
        }) : [];


        console.log("all caphoidong1:", filteredDataTable,);

        console.log("loaihoidong:", filteredDataTable.map((option) => option.CapHoiDong || ' '), selectedCapHD);
        const tenLoaiOptions = filteredDataTable.map((option) => option.TenLoaiHoiDong);




        setStateTaiHoiDong({
            ...stateTaiHoiDong,
            CapHoiDong: value,
            TenLoaiHoiDong: tenLoaiOptions[0],
            tenLoaiOptions: tenLoaiOptions,
        })
        console.log("Tên loại hội đồng: ", tenLoaiOptions)
    }

    //loại hội đồng

    const fetchAllLoaiHoiDong = async () => {

        const res = await CapHoiDongService.getAllTypeByLoaiHoiDong()
        return res
    }

    const allLoaiHoiDong = useQuery(['all-loaihoidong'], fetchAllLoaiHoiDong)
    console.log("loaihd: ", allLoaiHoiDong.data)

    const handleChangeSelect3 = (value) => {
        setStateTaiHoiDong({
            ...stateTaiHoiDong,
            LoaiHoiDong: value
        })
        // console.log(stateQuanNhan)
    }


    //vai trò hội đồng
    const fetchAllVaiTroHoiDOng = async () => {
        const res = await VaiTroHoiDongService.getAllType()
        return res
    }

    const allVaiTroHoiDong = useQuery({ queryKey: ['all-vaitrohoidong'], queryFn: fetchAllVaiTroHoiDOng })
    const handleChangeSelect2 = (value) => {
        setStateTaiHoiDong({
            ...stateTaiHoiDong,
            VaiTro: value
        })
        // console.log(stateQuanNhan)
    }

    const handleOnchangeFileCM = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateTaiHoiDong({
            ...stateTaiHoiDong,
            FileCM: file.preview
        })
    }


    const handleOnchangeFileCMDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateTaiHoiDongDetails({
            ...stateTaiHoiDongDetails,
            FileCM: file.preview
        })
    }
    return (
        <div>
            <div>
                <WrapperHeader>Tải hội đồng</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={taihoidongDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingTaiHoiDong} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm  tải hội đồng" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
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
                            label="Cấp hội đồng"
                            name="CapHoiDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="CapHoiDong"
                                onChange={handleChangeSelect1}
                                options={renderOptions(allCapHoiDong?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Loại hội đồng"
                            name="LoaiHoiDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiHoiDong['LoaiHoiDong']} onChange={handleOnchange} name="LoaiHoiDong" /> */}

                            <Select
                                name="LoaiHoiDong"
                                onChange={handleChangeSelect3}

                                options={renderOptions(allLoaiHoiDong?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Vai trò"
                            name="VaiTro"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiHoiDong.VaiTro} onChange={handleOnchange} name="VaiTro" />
                       */}
                            <Select
                                name="VaiTro"
                                onChange={handleChangeSelect2}
                                options={renderOptions(allVaiTroHoiDong?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm"
                            name="ThoiDiem"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDong.ThoiDiem} onChange={handleOnchange} name="ThoiDiem" />
                        </Form.Item>
                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDong.Quy} onChange={handleOnchange} name="Quy" />


                        </Form.Item>
                        <Form.Item
                            label="Năm"
                            name="Nam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDong.Nam} onChange={handleOnchange} name="Nam" />
                        </Form.Item>

                        <Form.Item
                            label="Khối lượng công việc"
                            name="KhoiLuongCongViec"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDong.KhoiLuongCongViec} onChange={handleOnchange} name="KhoiLuongCongViec" />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ quy đổi"
                            name="SoGioQuyDoi"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDong.SoGioQuyDoi} onChange={handleOnchange} name="SoGioQuyDoi" />
                        </Form.Item>

                        {/* <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDong.TrangThai} onChange={handleOnchange} name="TrangThai" />
                        </Form.Item> */}


                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!'}]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCM} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateTaiHoiDong?.FileCM && (
                                    <img src={stateTaiHoiDong?.FileCM} style={{
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


            <DrawerComponent title='Cập nhật chi tiết tải hội đồng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateTaiHoiDong}
                        autoComplete="on"
                        form={form}
                    >




                        <Form.Item
                            label="Cấp hội đồng"
                            name="CapHoiDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="CapHoiDong"
                                onChange={handleChangeSelect1}
                                options={renderOptions(allCapHoiDong?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Loại hội đồng"
                            name="LoaiHoiDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiHoiDongDetails['LoaiHoiDong']} onChange={handleOnchangeDetails} name="LoaiHoiDong" /> */}
                            <Select
                                name="LoaiHoiDong"
                                onChange={handleChangeSelect3}
                                options={renderOptions(allLoaiHoiDong?.data?.data)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Vai trò"
                            name="VaiTro"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiHoiDong.VaiTro} onChange={handleOnchange} name="VaiTro" />
                       */}
                            <Select
                                name="VaiTro"
                                onChange={handleChangeSelect2}
                                options={renderOptions(allVaiTroHoiDong?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm"
                            name="ThoiDiem"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDongDetails.ThoiDiem} onChange={handleOnchangeDetails} name="ThoiDiem" />
                        </Form.Item>
                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDongDetails.Quy} onChange={handleOnchangeDetails} name="Quy" />


                        </Form.Item>
                        <Form.Item
                            label="Năm"
                            name="Nam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDongDetails.Nam} onChange={handleOnchangeDetails} name="Nam" />
                        </Form.Item>

                        <Form.Item
                            label="Khối lượng công việc"
                            name="KhoiLuongCongViec"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDongDetails.KhoiLuongCongViec} onChange={handleOnchangeDetails} name="KhoiLuongCongViec" />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ quy đổi"
                            name="SoGioQuyDoi"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDongDetails.SoGioQuyDoi} onChange={handleOnchangeDetails} name="SoGioQuyDoi" />
                        </Form.Item>

                        {/* <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHoiDongDetails.TrangThai} onChange={handleOnchangeDetails} name="TrangThai" />
                        </Form.Item> */}
                        <Form.Item
                            label="File chứng minh"
                            name="image"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCMDetails} maxCount={1}>
                                <Button >Select File</Button>
                                {stateTaiHoiDongDetails?.FileCM && (
                                    <img src={stateTaiHoiDongDetails?.FileCM} style={{
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
            <ModalComponent title="Xóa tải hội đồng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteTaiHoiDong}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa tải hội đồng này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Phê quyệt tải hội đồng" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt tải hội đồng này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin tải hội đồng" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  tải hội đồng này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default TaiHoiDong;
