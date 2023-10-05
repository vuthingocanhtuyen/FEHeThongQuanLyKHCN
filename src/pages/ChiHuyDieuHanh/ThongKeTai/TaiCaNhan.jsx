
import React, { useEffect, useState, useRef } from 'react';
import { Form, Table, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { getBase64 } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as ThongKeTaiService from '../../../services/ThongKeTaiService';


import * as TaiGiangDayService from '../../../services/TaiGiangDayService';
import * as TaiKhaoThiService from '../../../services/TaiKhaoThiService';
import * as TaiHoiDongService from '../../../services/TaiHoiDongService';
import * as TaiHuongDanService from '../../../services/TaiHuongDanService';

import * as BaiBaiKhoaHocService from '../../../services/BaiBaoKhoaHocService';
import * as SangCheService from '../../../services/SangCheService';
import * as BienSoanService from '../../../services/BienSoanService';
import * as GiaiThuongService from '../../../services/GiaiThuongService';
import * as HoatDongNCKhacService from '../../../services/HoatDongNCKhacService';
import * as HopDongService from '../../../services/HopDongService';
import * as DeTaiNCKHService from '../../../services/DeTaiNCKHService';
import * as HuongDanNCKHService from '../../../services/HuongDanNCKHService';
import { WrapperHeader } from '../style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
import moment from 'moment';
const TaiCaNhan = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)


    const [TongTaiGD, setTongTaiGD] = useState('');


    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const inittial = () => ({
        TaiDaoTaoYeuCau: '',
        TaiNCKHYeuCau: '',
        TongTaiYeuCau: '',
        TaiThucDaoTaoYeuCau: '',
        TaiThucNCKHYeuCau: '',
        TongThucTai: '',
        GhiChu: '',
    })
    const [stateTaiGiangDay, setStateTaiGiangDay] = useState(inittial())
    const [stateTaiGiangDayDetails, setStateTaiGiangDayDetails] = useState(inittial())
    const getAllThongKeTais = async () => {
        const res = await ThongKeTaiService.getAllThongKeTai()
        return res
    }

    // show
    // Tải giảng dạy
    const getTaiGiangDayQuanNhan = async () => {
        const res = await TaiGiangDayService.getTaiGiangDayByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.SoTiet, 0);
        console.log("Sum of SoTiet GD:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanGD = useQuery({ queryKey: ['taigiangdayquannhans'], queryFn: getTaiGiangDayQuanNhan })

    console.log("tai giangday:", queryQuanNhanGD.data)

    // tải hội đồng
    const getTaiHoiDongQuanNhan = async () => {
        const res = await TaiHoiDongService.getTaiHoiDongByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.SoGioQuyDoi, 0);
        console.log("Sum of SoTiet HD:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanHD = useQuery({ queryKey: ['taihoidongquannhans'], queryFn: getTaiHoiDongQuanNhan })

    console.log("tai hoidong:", queryQuanNhanHD.data)
    // tải  khảo thí
    const getTaiKhaoThiQuanNhan = async () => {
        const res = await TaiKhaoThiService.getTaiKhaoThiByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.SoGioQuyDoi, 0);
        console.log("Sum of SoTiet KT:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanKT = useQuery({ queryKey: ['taikhaothiquannhans'], queryFn: getTaiKhaoThiQuanNhan })

    console.log("tai khaothi:", queryQuanNhanKT.data)
    // tải hướng dẫn
    const getTaiHuongDanQuanNhan = async () => {
        const res = await TaiHuongDanService.getTaiHuongDanByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.SoGioChuan, 0);
        console.log("Sum of SoTiet HướNg dẫn:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanHuongDan = useQuery({ queryKey: ['taihuongdanquannhans'], queryFn: getTaiHuongDanQuanNhan })

    console.log("tai hdân:", queryQuanNhanHuongDan.data)

    // bài báo
    const getTaiBaiBaoQuanNhan = async () => {
        const res = await BaiBaiKhoaHocService.getBaiBaoKHByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.DiemToiDa, 0);
        console.log("Sum of baibao:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanBaiBao = useQuery({ queryKey: ['baibaoquannhans'], queryFn: getTaiBaiBaoQuanNhan })

    console.log("baibao:", queryQuanNhanBaiBao.data)
    // biên soạn
    const getTaiBienSoanQuanNhan = async () => {
        const res = await BienSoanService.getBienSoanByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.Tai, 0);
        console.log("Sum of biensoan:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanBienSoan = useQuery({ queryKey: ['biensoanquannhans'], queryFn: getTaiBienSoanQuanNhan })

    console.log("biensoan:", queryQuanNhanBienSoan.data)
    // hưỚng dẫn nckh
    const getTaiHuongDanNCKHQuanNhan = async () => {
        const res = await HuongDanNCKHService.getHuongDanNCKHByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.Tai, 0);
        console.log("Sum of hdnckh:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanHuongDanNCKH = useQuery({ queryKey: ['hdnckhquannhans'], queryFn: getTaiHuongDanNCKHQuanNhan })


    // đề tài NCKH
    const getDeTaiNCKHQuanNhan = async () => {
        const res = await DeTaiNCKHService.getDeTaiNCKHByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.Tai, 0);
        console.log("Sum of detai:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanDeTai = useQuery({ queryKey: ['dtnckhquannhans'], queryFn: getDeTaiNCKHQuanNhan })
    // sáng chế
    const getSangCheQuanNhan = async () => {
        const res = await SangCheService.getSangCheByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.Tai, 0);
        console.log("Sum of sangche:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanSC = useQuery({ queryKey: ['scquannhans'], queryFn: getSangCheQuanNhan })
    // hợp đồng
    const getHopDongQuanNhan = async () => {
        const res = await HopDongService.getHopDongByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.Tai, 0);
        console.log("Sum of hopdong:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanHopDong = useQuery({ queryKey: ['hdquannhans'], queryFn: getHopDongQuanNhan })
    // hoạt động khác
    const getHoatDongNCKhacQuanNhan = async () => {
        const res = await HoatDongNCKhacService.getHoatDongKhacByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.Tai, 0);
        console.log("Sum of hdnckhac:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanNCKhac = useQuery({ queryKey: ['nckhacquannhans'], queryFn: getHoatDongNCKhacQuanNhan })
    //giait thưởng nckh

    const getGiaiThuongQuanNhan = async () => {
        const res = await GiaiThuongService.getGiaiThuongNCKHByQuanNhanId(quannhanId)
        const sumSoTiet = res?.data?.reduce((total, item) => total + item.Tai, 0);
        console.log("Sum of giaithuong:", sumSoTiet);
        return sumSoTiet
    }
    const queryQuanNhanGiaiThuong = useQuery({ queryKey: ['giaithuongquannhans'], queryFn: getGiaiThuongQuanNhan })


    const [stateThongKeTai, setStateThongKeTai] = useState(inittial())
    const [stateThongKeTaiDetails, setStateThongKeTaiDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId
                , TaiDaoTaoYeuCau,
                TaiNCKHYeuCau,
                TongTaiYeuCau
                , TaiThucDaoTaoYeuCau, TaiThucNCKHYeuCau, TongThucTai,

                edituser, edittime, GhiChu } = data
            const res = ThongKeTaiService.createThongKeTai({
                QuanNhanId, TaiDaoTaoYeuCau,
                TaiNCKHYeuCau, TongTaiYeuCau, TaiThucDaoTaoYeuCau, TaiThucNCKHYeuCau, TongThucTai,

                edituser, edittime, GhiChu
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
            const res = ThongKeTaiService.updateThongKeTai(
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
            const res = ThongKeTaiService.deleteThongKeTai(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = ThongKeTaiService.deleteManyThongKeTai(
                ids,
                token)
            return res
        },
    )



    // show


    const fetchGetThongKeTai = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await ThongKeTaiService.getThongKeTaiByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateThongKeTaiDetails({
                    TaiDaoTaoYeuCau: res?.data.TaiDaoTaoYeuCau,
                    TaiNCKHYeuCau: res?.data.TaiNCKHYeuCau,
                    TongTaiYeuCau: res?.data.TongTaiYeuCau,
                    TaiThucDaoTaoYeuCau: res?.data.TaiThucDaoTaoYeuCau,
                    TaiThucNCKHYeuCau: res?.data.TaiThucNCKHYeuCau,
                    TongThucTai: res?.data.TongThucTai,

                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateThongKeTaiDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateThongKeTaiDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateThongKeTaiDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsThongKeTai(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])


    const handleDetailsThongKeTai = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyThongKeTais = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                thongketaiDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany



    const queryThongKeTai = useQuery({ queryKey: ['thongketais'], queryFn: getAllThongKeTais })
    const thongketaiDetails = useQuery(['hosoquannhantktai', quannhanId], fetchGetThongKeTai, { enabled: !!quannhanId })
    console.log("tk tải:", thongketaiDetails.data, queryThongKeTai.data)
    const { isLoading: isLoadingThongKeTai, data: thongketais } = queryThongKeTai
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsThongKeTai} />
                {/* <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
             */}
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsThongKeTai = async (rowSelected) => {
        const res = await ThongKeTaiService.getDetailsThongKeTai(rowSelected)
        if (res?.data) {
            setStateThongKeTaiDetails({
                TaiDaoTaoYeuCau: res?.data.TaiDaoTaoYeuCau,
                TaiNCKHYeuCau: res?.data.TaiNCKHYeuCau,
                TongTaiYeuCau: res?.data.TongTaiYeuCau,
                TaiThucDaoTaoYeuCau: res?.data.TaiThucDaoTaoYeuCau,
                TaiThucNCKHYeuCau: res?.data.TaiThucNCKHYeuCau,
                TongThucTai: res?.data.TongThucTai,

                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsThongKeTai(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateThongKeTaiDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateThongKeTaiDetails, isModalOpen])





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

    //const { data: thongketaiDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetThongKeTai, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", thongketaiDetails)
    console.log("idquannhancongtac:", quannhanId)



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Tải đào tạo yêu cầu',
            dataIndex: 'TaiDaoTaoYeuCau',
            key: 'TaiDaoTaoYeuCau',

        },
        {
            title: 'Tải NCKH yêu cầu',
            dataIndex: 'TaiNCKHYeuCau',
            key: 'TaiNCKHYeuCau',
        },
        {
            title: 'Tổng tải yêu cầu',
            dataIndex: 'TongTaiYeuCau',
            key: 'TongTaiYeuCau',
        },


        {
            title: 'Tải thực đào tạo',
            dataIndex: 'TaiThucDaoTaoYeuCau',
            key: 'TaiThucDaoTaoYeuCau',
        },
        {
            title: 'Tải thực NCKH',
            dataIndex: 'TaiThucNCKHYeuCau',
            key: 'TaiThucNCKHYeuCau',
        },
        {
            title: 'Tổng tải thực',
            dataIndex: 'TongThucTai',
            key: 'TongThucTai',
        },
        //   {
        //     title: 'Trạng thái',
        //     dataIndex: 'TrangThai',
        //     key: 'TrangThai',
        //   },
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
        setStateThongKeTaiDetails({
            TaiDaoTaoYeuCau: '',
            TaiNCKHYeuCau: '',
            TongTaiYeuCau: '',
            TaiThucDaoTaoYeuCau: '',
            TaiThucNCKHYeuCau: '',
            TongThucTai: '',

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


    const handleDeleteThongKeTai = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                thongketaiDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateThongKeTai({
            TaiDaoTaoYeuCau: '',
            TaiNCKHYeuCau: '',
            TongTaiYeuCau: '',
            TaiThucDaoTaoYeuCau: '',
            TaiThucNCKHYeuCau: '',
            TongThucTai: '',

            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            TaiDaoTaoYeuCau: stateThongKeTai.TaiDaoTaoYeuCau,
            TaiNCKHYeuCau: stateThongKeTai.TaiNCKHYeuCau,
            TongTaiYeuCau: stateThongKeTai.TongTaiYeuCau,
            TaiThucDaoTaoYeuCau: stateThongKeTai.TaiThucDaoTaoYeuCau,
            TaiThucNCKHYeuCau: stateThongKeTai.TaiThucNCKHYeuCau,
            TongThucTai: stateThongKeTai.TongThucTai,

            GhiChu: stateThongKeTai.GhiChu,
        }
        console.log("Finsh", stateThongKeTai)
        mutation.mutate(params, {
            onSettled: () => {
                thongketaiDetails.refetch()
            }
        })
    }



    const handleOnchange = async (e) => {
        console.log("e: ", e.target.name, e.target.value, stateThongKeTai.TaiDaoTaoYeuCau, stateThongKeTai.TaiNCKHYeuCau)
        const tgiangday = getTaiGiangDayQuanNhan();
        const thoidong = getTaiHoiDongQuanNhan();
        const thuongdan = getTaiHuongDanNCKHQuanNhan();
        const tkhaothi = getTaiKhaoThiQuanNhan();

        const baibao = getTaiBaiBaoQuanNhan();
        const detai = getDeTaiNCKHQuanNhan();
        const huongdan = getTaiHuongDanNCKHQuanNhan();
        const sangche = getSangCheQuanNhan();
        const biensoan = getTaiBienSoanQuanNhan();
        const hopdong = getHopDongQuanNhan();
        const hdkhac = getHoatDongNCKhacQuanNhan();
        const giaithuong = getGiaiThuongQuanNhan();


        setStateThongKeTai({
            ...stateThongKeTai,
            [e.target.name]: e.target.value,
            TongTaiYeuCau: parseInt(stateThongKeTai.TaiDaoTaoYeuCau) + parseInt(stateThongKeTai.TaiNCKHYeuCau),

            TaiThucDaoTaoYeuCau: parseInt(tgiangday) + parseInt(thoidong)
                + parseInt(thuongdan) + parseInt(tkhaothi),

            TaiThucNCKHYeuCau: parseInt(baibao) + parseInt(detai) + parseInt(huongdan) + parseInt(sangche)
                + parseInt(biensoan) + parseInt(hopdong) + parseInt(hdkhac) + parseInt(giaithuong),

            TongThucTai: parseInt(stateThongKeTai.TaiThucDaoTaoYeuCau) + parseInt(stateThongKeTai.TaiThucNCKHYeuCau)
        })
    }


    const handleOnchangeDetails = async (e) => {
        console.log('check', e.target.name, e.target.value)
        const tgiangday = await getTaiGiangDayQuanNhan();
        const thoidong = await getTaiHoiDongQuanNhan();
        const thuongdan = await getTaiHuongDanNCKHQuanNhan();
        const tkhaothi = await getTaiKhaoThiQuanNhan();

        const baibao = await getTaiBaiBaoQuanNhan();
        const detai = await getDeTaiNCKHQuanNhan();
        const huongdan = await getTaiHuongDanNCKHQuanNhan();
        const sangche = await getSangCheQuanNhan();
        const biensoan = await getTaiBienSoanQuanNhan();
        const hopdong = await getHopDongQuanNhan();
        const hdkhac = await getHoatDongNCKhacQuanNhan();
        const giaithuong = await getGiaiThuongQuanNhan();
        setStateThongKeTaiDetails({
            ...stateThongKeTaiDetails,
            [e.target.name]: e.target.value,

            TongTaiYeuCau: parseInt(stateThongKeTaiDetails.TaiDaoTaoYeuCau) + parseInt(stateThongKeTaiDetails.TaiNCKHYeuCau),

            TaiThucDaoTaoYeuCau: parseInt(tgiangday) + parseInt(thoidong) + parseInt(thuongdan) + parseInt(tkhaothi),

            TaiThucNCKHYeuCau: parseInt(baibao) + parseInt(detai) + parseInt(huongdan) +
                parseInt(sangche) + parseInt(biensoan) + parseInt(hopdong) + parseInt(hdkhac) + parseInt(giaithuong),
            TongThucTai: parseInt(stateThongKeTaiDetails.TaiThucDaoTaoYeuCau) + parseInt(stateThongKeTaiDetails.TaiThucNCKHYeuCau)

        })
    }


    const onUpdateThongKeTai = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateThongKeTaiDetails }, {
            onSettled: () => {
                thongketaiDetails.refetch()
            }
        })
    }




    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }
    const dataTable = thongketaiDetails?.data?.length && thongketaiDetails?.data?.map((thongketaiDetails) => {
        const tgiangday = getTaiGiangDayQuanNhan();
        const thoidong = getTaiHoiDongQuanNhan();
        const thuongdan = getTaiHuongDanNCKHQuanNhan();
        const tkhaothi = getTaiKhaoThiQuanNhan();

        const baibao = getTaiBaiBaoQuanNhan();
        const detai = getDeTaiNCKHQuanNhan();
        const huongdan = getTaiHuongDanNCKHQuanNhan();
        const sangche = getSangCheQuanNhan();
        const biensoan = getTaiBienSoanQuanNhan();
        const hopdong = getHopDongQuanNhan();
        const hdkhac = getHoatDongNCKhacQuanNhan();
        const giaithuong = getGiaiThuongQuanNhan();
        return {
            ...thongketaiDetails,
            key: thongketaiDetails._id,
            TaiDaoTaoYeuCau: thongketaiDetails.TaiDaoTaoYeuCau,
            TaiNCKHYeuCau: thongketaiDetails.TaiNCKHYeuCau,
            TongTaiYeuCau: parseInt(thongketaiDetails.TaiDaoTaoYeuCau) + parseInt(thongketaiDetails.TaiNCKHYeuCau),


            TongThucTai: parseInt(thongketaiDetails.TaiThucDaoTaoYeuCau) + parseInt(thongketaiDetails.TaiThucNCKHYeuCau)

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

                <WrapperHeader>Tổng hợp tải</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={thongketaiDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingThongKeTai} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới thông kê tải" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            label="Tải đào tạo yêu cầu"
                            name="TaiDaoTaoYeuCau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThongKeTai['TaiDaoTaoYeuCau']}
                                onChange={handleOnchange}
                                name="TaiDaoTaoYeuCau"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tải NCKH yêu cầu"
                            name="TaiNCKHYeuCau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThongKeTai['TaiNCKHYeuCau']}
                                onChange={handleOnchange}
                                name="TaiNCKHYeuCau"
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


            <DrawerComponent title='Chi tiết thông kê tải' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateThongKeTai}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Tải đào tạo yêu cầu"
                            name="TaiDaoTaoYeuCau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThongKeTaiDetails['TaiDaoTaoYeuCau']}
                                onChange={handleOnchangeDetails}
                                name="TaiDaoTaoYeuCau"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tải NCKH yêu cầu"
                            name="TaiNCKHYeuCau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThongKeTaiDetails['TaiNCKHYeuCau']}
                                onChange={handleOnchangeDetails}
                                name="TaiNCKHYeuCau"
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

            <ModalComponent title="Xóa thông kê tả" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteThongKeTai}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa thông kê tả này không?</div>
                </Loading>
            </ModalComponent>


        </div>

    );
};



export default TaiCaNhan;
