
import React, { useEffect, useState, useRef } from 'react';
import { Form, Table, Button, Space, Select } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { renderOptions } from '../../../utils'

import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as QuaTrinhDieuChuyenService from '../../../services/QuaTrinhDieuChuyenService';
import * as QuanNhanService from '../../../services/QuanNhanService';
import * as ChucVuService from '../../../services/ChucVuDonViService'
import * as DonViService from '../../../services/DonViService'
import { WrapperHeader } from '../style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
import moment from 'moment';
const QuaTrinhDieuChuyen = ({ idQuanNhan }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)
    const [currentUserDonViCode, setCurrentUserDonViCode] = useState(null);

    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);

    const inittial = () => ({
        SoQuyetDinh: '',
        NgayQuyetDinh: '',
        DonViHienTai: '',
        NgayDenNhanChuc: '',
        DonViDen: '',
        ChucVuDen: '',
        DonViQuyetDinh: '',
        ChucVuHienTai: '',
        TrangThai: '',
        GhiChu: '',
    })
    const [stateQuaTrinhDieuChuyen, setStateQuaTrinhDieuChuyen] = useState(inittial())
    const [stateQuaTrinhDieuChuyenDetails, setStateQuaTrinhDieuChuyenDetails] = useState(inittial())


    const [form] = Form.useForm();
    const fetchGetDetailsQuanNhan = async () => {
        if (idQuanNhan) {
            const res = await QuanNhanService.getDetailsQuanNhan(idQuanNhan)
            console.log("qn:", res.data)
            return res.data
        }
    }

    const { data: quannhanDetails } = useQuery(['hosoquannhan', idQuanNhan], fetchGetDetailsQuanNhan, { enabled: !!idQuanNhan })
    const quannhanId = quannhanDetails?.QuanNhanId;
    const chucvuhientai = quannhanDetails?.HoatDong[0];
    const donvihientai = quannhanDetails?.DonVi[0];
    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                SoQuyetDinh, NgayQuyetDinh, DonViQuyetDinh, ChucVuHienTai = chucvuhientai, DonViHienTai = donvihientai, DonViDen, ChucVuDen, NgayDenNhanChuc, TrangThai = 0, edituser, edittime, GhiChu } = data
            const res = QuaTrinhDieuChuyenService.createQuaTrinhDieuChuyen({
                QuanNhanId, SoQuyetDinh, NgayQuyetDinh, DonViQuyetDinh, ChucVuHienTai, DonViHienTai, DonViDen, ChucVuDen, NgayDenNhanChuc, TrangThai, edituser, edittime, GhiChu
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
            const res = QuaTrinhDieuChuyenService.updateQuaTrinhDieuChuyen(
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
            const res = QuaTrinhDieuChuyenService.updateQuaTrinhDieuChuyen(id, token, updatedData);
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
            const res = QuaTrinhDieuChuyenService.updateQuaTrinhDieuChuyen(id, token, updatedData);
            return res;

        },

    )
    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = QuaTrinhDieuChuyenService.deleteQuaTrinhDieuChuyen(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = QuaTrinhDieuChuyenService.deleteManyQuaTrinhDieuChuyen(
                ids,
                token)
            return res
        },
    )


    const getAllQuaTrinhDieuChuyens = async () => {
        const res = await QuaTrinhDieuChuyenService.getAllQuaTrinhDieuChuyen()
        return res
    }

    // show


    const fetchGetQuaTrinhDieuChuyen = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await QuaTrinhDieuChuyenService.getQuaTrinhDieuChuyenByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateQuaTrinhDieuChuyenDetails({
                    SoQuyetDinh: res?.data.SoQuyetDinh,
                    NgayQuyetDinh: res?.data.NgayQuyetDinh,
                    DonViHienTai: res?.data.DonViHienTai,
                    NgayDenNhanChuc: res?.data.NgayDenNhanChuc,
                    DonViDen: res?.data.DonViDen,
                    DonViQuyetDinh: res?.data.DonViQuyetDinh,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                    ChucVuHienTai: res?.data.ChucVuHienTai,
                    ChucVuDen: res?.data.ChucVuDen,

                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateQuaTrinhDieuChuyenDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhDieuChuyenDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhDieuChuyenDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsQuaTrinhDieuChuyen(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsQuaTrinhDieuChuyen = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyQuaTrinhDieuChuyens = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                qtcongtacDetails.refetch()
            }
        })
    }
    const fetchAllDonVi = async () => {
        const res = await DonViService.getDonViConByTen("HVKTQS")
        return res
    }
    const fetchAllDonVi2 = async () => {
        const res = await DonViService.getDonViConOnly("HVKTQS")
        return res
    }
    const fetchAllChucVu = async () => {
        const res = await ChucVuService.getChucVuFromDonVi(currentUserDonViCode)
        return res
    }
    const fetchAllChucVu2 = async () => {
        const res = await ChucVuService.getDataChucVuByDonVi(currentUserDonViCode)
        return res
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai

    const allDonVi = useQuery({ queryKey: ['all-donvi'], queryFn: fetchAllDonVi })
    const allDonVi2 = useQuery({ queryKey: ['all-donvi2'], queryFn: fetchAllDonVi2 })
    const allChucVu = useQuery({ queryKey: ['all-chucvu'], queryFn: fetchAllChucVu })
    const allChucVu2 = useQuery({ queryKey: ['all-chucvu2'], queryFn: fetchAllChucVu2 })
    const queryQuaTrinhDieuChuyen = useQuery({ queryKey: ['quatrinhdieuchuyens'], queryFn: getAllQuaTrinhDieuChuyens })
    const qtcongtacDetails = useQuery(['hosoquannhanqtdieuchuyen', quannhanId], fetchGetQuaTrinhDieuChuyen, { enabled: !!quannhanId })
    console.log("qt điều chuyển:", qtcongtacDetails.data, queryQuaTrinhDieuChuyen.data)
    const { isLoading: isLoadingQuaTrinhDieuChuyen, data: quatrinhdieuchuyens } = queryQuaTrinhDieuChuyen
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsQuaTrinhDieuChuyen} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsQuaTrinhDieuChuyen = async (rowSelected) => {
        const res = await QuaTrinhDieuChuyenService.getDetailsQuaTrinhDieuChuyen(rowSelected)
        if (res?.data) {
            setStateQuaTrinhDieuChuyenDetails({
                SoQuyetDinh: res?.data.SoQuyetDinh,
                NgayQuyetDinh: res?.data.NgayQuyetDinh,
                DonViHienTai: res?.data.DonViHienTai,
                NgayDenNhanChuc: res?.data.NgayDenNhanChuc,
                DonViDen: res?.data.DonViDen,
                DonViQuyetDinh: res?.data.DonViQuyetDinh,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
                ChucVuHienTai: res?.data.ChucVuHienTai,
                ChucVuDen: res?.data.ChucVuDen,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsQuaTrinhDieuChuyen(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhDieuChuyenDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhDieuChuyenDetails, isModalOpen])





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

    //const { data: qtcongtacDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetQuaTrinhDieuChuyen, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", qtcongtacDetails)
    console.log("idquannhancongtac:", quannhanId)



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Số quyết định',
            dataIndex: 'SoQuyetDinh',
            key: 'SoQuyetDinh',
        },
        {
            title: 'Ngày quyết định',
            dataIndex: 'NgayQuyetDinh',
            key: 'NgayQuyetDinh',
        },
        {
            title: 'Cấp quyết định',
            dataIndex: 'DonViQuyetDinh',
            key: 'DonViQuyetDinh',
        },
        {
            title: 'Đơn vị hiện tại',
            dataIndex: 'DonViHienTai',
            key: 'DonViHienTai',
        },
        {
            title: 'Chức vụ hiện tại',
            dataIndex: 'ChucVuHienTai',
            key: 'ChucVuHienTai',
        },

        {
            title: 'Đơn vị đến',
            dataIndex: 'DonViDen',
            key: 'DonViDen',
        },
        {
            title: 'Chức vụ đến',
            dataIndex: 'ChucVuDen',
            key: 'ChucVuDen',
        },

        {
            title: 'Ngày nhận chức',
            dataIndex: 'NgayDenNhanChuc',
            key: 'NgayDenNhanChuc',
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
        setStateQuaTrinhDieuChuyenDetails({
            SoQuyetDinh: '',
            NgayQuyetDinh: '',
            DonViHienTai: '',
            NgayDenNhanChuc: '',
            DonViDen: '',
            ChucVuDen: '',
            DonViQuyetDinh: '',

            ChucVuHienTai: '',
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


    const handleDeleteQuaTrinhDieuChuyen = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                qtcongtacDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateQuaTrinhDieuChuyen({
            SoQuyetDinh: '',
            NgayQuyetDinh: '',
            DonViHienTai: '',
            NgayDenNhanChuc: '',
            DonViDen: '',
            ChucVuDen: '',
            DonViQuyetDinh: '',

            ChucVuHienTai: '',
            TrangThai: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            SoQuyetDinh: stateQuaTrinhDieuChuyen.SoQuyetDinh,
            NgayQuyetDinh: stateQuaTrinhDieuChuyen.NgayQuyetDinh,
            DonViHienTai: stateQuaTrinhDieuChuyen.DonViHienTai,
            NgayDenNhanChuc: stateQuaTrinhDieuChuyen.NgayDenNhanChuc,
            DonViDen: stateQuaTrinhDieuChuyen.DonViDen,
            DonViQuyetDinh: stateQuaTrinhDieuChuyen.DonViQuyetDinh,
            ChucVuHienTai: stateQuaTrinhDieuChuyen.ChucVuHienTai,
            ChucVuDen: stateQuaTrinhDieuChuyen.ChucVuDen,
            GhiChu: stateQuaTrinhDieuChuyen.GhiChu,
        }
        console.log("Finsh", stateQuaTrinhDieuChuyen)
        mutation.mutate(params, {
            onSettled: () => {
                qtcongtacDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateQuaTrinhDieuChuyen({
            ...stateQuaTrinhDieuChuyen,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeSelectDonVi = (value) => {
        try {
            const selectedDonVi = allDonVi2?.data?.data.find(DonVi => DonVi.name === value);
            if (selectedDonVi) {
                setCurrentUserDonViCode(selectedDonVi.code);
            }
            setStateQuaTrinhDieuChuyen({
                ...stateQuaTrinhDieuChuyen,
                DonViDen: selectedDonVi.code
            })

        }
        catch { }
    }
    const handleChangeSelectChucVu = (value) => {
        try {
            const selectedChucVu = allChucVu2?.data?.data.find(ChucVuDonVi => ChucVuDonVi.name === value);
            setStateQuaTrinhDieuChuyen({
                ...stateQuaTrinhDieuChuyen,
                ChucVuDen: selectedChucVu.chucvucode
            })
        }
        catch { }
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateQuaTrinhDieuChuyenDetails({
            ...stateQuaTrinhDieuChuyenDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateQuaTrinhDieuChuyen = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhDieuChuyenDetails }, {
            onSettled: () => {
                qtcongtacDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhDieuChuyenDetails }, {
            onSettled: () => {
                qtcongtacDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhDieuChuyenDetails }, {
            onSettled: () => {
                qtcongtacDetails.refetch()
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

    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }
    const dataTable = qtcongtacDetails?.data?.length && qtcongtacDetails?.data?.map((qtcongtacDetails) => {
        return {
            ...qtcongtacDetails,
            key: qtcongtacDetails._id,
            TrangThai: getTrangThaiText(qtcongtacDetails.TrangThai),
            NgayQuyetDinh: convertDateToString(qtcongtacDetails.NgayQuyetDinh),
            NgayDenNhanChuc: convertDateToString(qtcongtacDetails.NgayDenNhanChuc)

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
        if (currentUserDonViCode) {
            allDonVi.refetch();
        }
    }, [currentUserDonViCode, allDonVi]);
    useEffect(() => {
        if (currentUserDonViCode) {
            allChucVu.refetch();
        }
    }, [currentUserDonViCode, allChucVu]);
    useEffect(() => {
        if (currentUserDonViCode) {
            allDonVi2.refetch();
        }
    }, [currentUserDonViCode, allDonVi2]);
    useEffect(() => {
        if (currentUserDonViCode) {
            allChucVu2.refetch();
        }
    }, [currentUserDonViCode, allChucVu2]);

    return (
        <div>
            <div>
                <WrapperHeader>Quá trình điều chuyển</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={qtcongtacDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingQuaTrinhDieuChuyen} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới quá trình điều chuyển" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            name="SoQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyen['SoQuyetDinh']}
                                onChange={handleOnchange}
                                name="SoQuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyen['NgayQuyetDinh']}
                                onChange={handleOnchange}
                                name="NgayQuyetDinh"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Cấp quyết định"
                            name="DonViQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyen.DonViQuyetDinh}
                                onChange={handleOnchange}
                                name="DonViQuyetDinh"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Đơn vị hiện tại"
                            // name="DonViHienTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}
                                value={donvihientai}
                                readOnly
                            />
                        </Form.Item>

                        <Form.Item
                            label="Chức vụ hiện tại"
                            // name="ChucVuHienTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}
                                value={chucvuhientai}
                                readOnly
                            />
                        </Form.Item>

                        <Form.Item
                            label="Đơn vị đến"
                            name="DonViDen"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select

                                onChange={handleChangeSelectDonVi}
                                options={renderOptions(allDonVi?.data?.data)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Chức vụ đến"
                            name="ChucVuDen"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select

                                onChange={handleChangeSelectChucVu}
                                options={renderOptions(allChucVu?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ngày đến nhận chức"
                            name="NgayDenNhanChuc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyen.NgayDenNhanChuc}
                                onChange={handleOnchange}
                                name="NgayDenNhanChuc"
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


            <DrawerComponent title='Chi tiết quá trình điều chuyển' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateQuaTrinhDieuChuyen}
                        autoComplete="on"
                        form={form}
                    >


                        <Form.Item
                            label="Mã quyết định"
                            name="SoQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyenDetails['SoQuyetDinh']}
                                onChange={handleOnchangeDetails}
                                name="SoQuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyenDetails['NgayQuyetDinh']}
                                onChange={handleOnchangeDetails}
                                name="NgayQuyetDinh"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Cấp quyết định"
                            name="DonViQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyenDetails.DonViQuyetDinh}
                                onChange={handleOnchangeDetails}
                                name="DonViQuyetDinh"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Đơn vị hiện tại"
                            name="DonViHienTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyenDetails['DonViHienTai']}
                                onChange={handleOnchangeDetails}
                                name="DonViHienTai"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Chức vụ hiện tại"
                            name="ChucVuHienTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyenDetails['ChucVuHienTai']}
                                onChange={handleOnchangeDetails}
                                name="ChucVuHienTai"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Đơn vị đến"
                            name="DonViDen"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyenDetails['DonViDen']}
                                onChange={handleOnchangeDetails}
                                name="DonViDen"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Chức vụ đến"
                            name="ChucVuDen"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyenDetails.ChucVuDen}
                                onChange={handleOnchangeDetails}
                                name="ChucVuDen"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ngày đến nhận chức"
                            name="NgayDenNhanChuc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhDieuChuyenDetails.NgayDenNhanChuc}
                                onChange={handleOnchangeDetails}
                                name="NgayDenNhanChuc"
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

            <ModalComponent title="Xóa quá trình điều chuyển" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQuaTrinhDieuChuyen}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quá trình điều chuyển này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt quá trình điều chuyển" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt quá trình điều chuyển này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin quá trình điều chuyển" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  quá trình điều chuyển này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default QuaTrinhDieuChuyen;
