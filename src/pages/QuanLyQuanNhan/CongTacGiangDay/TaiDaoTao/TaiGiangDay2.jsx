
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions, getBase64 } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import CheckboxComponent from '../../../../components/CheckBox/CheckBox'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as TaiGiangDayService from '../../../../services/TaiGiangDayService';
import * as HTCVService from '../../../../services/HTCVService';
import * as PriorityByUserService from '../../../../services/PriorityByUserService'
import * as QuanNhanService from '../../../../services/QuanNhanService'
import * as LoaiHinhDaoTaoService from '../../../../services/LoaiHinhDaoTaoService';
import * as HinhThucDaoTaoService from '../../../../services/HinhThucDaoTaoService';
import * as HinhThucGiangDayService from '../../../../services/HinhThucGiangDayService';
import * as HinhThucKhaoThiService from '../../../../services/HinhThucKhaoThiService';
import { WrapperHeader, WrapperUploadFile } from './style'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment';
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const TaiGiangDay = ({ }) => {
    const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
    const [currentUserDonViCode, setCurrentUserDonViCode] = useState(null);
    const [htcvId, sethtcvId] = useState('')
    const [taigiangdayId, settaigiangdayId] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [rowSelected2, setRowSelected2] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isOpenDrawer2, setIsOpenDrawer2] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isModalOpenDelete2, setIsModalOpenDelete2] = useState(false)

    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)


    const [selectedName, setSelectedName] = useState('');
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    useEffect(() => {
        const fetchGetChucVuDonVi = async () => {

            try {
                // Gọi API để lấy thông tin đơn vị hiện tại của người dùng
                const response = await PriorityByUserService.getChucVuDonViFromUser(user.QuanNhanId, user.access_token);


                if (response.data && response.data.length > 0) {
                    const firstData = response.data[0];

                    const donViValue = firstData.DonVi[0];
                    setCurrentUserDonVi(donViValue);
                    setCurrentUserDonViCode(donViValue);
                }

            } catch (error) {
                console.error('Error fetching ChucVuDonVi:', error);
            }
        };

        fetchGetChucVuDonVi();
    }, [user.QuanNhanId, user.access_token]);
    const inittial = () => ({
        code: '',

        MaLop: '',
        MaMonHoc: '',
        TenMonHoc: '',
        SoTinChi: '',
        GioChuan: '',
        SiSo: '',
        HTDT: '',
        LoaiHinhDT: '',
        KetThuc: '',
        Quy: '',
        Nam: '',
        HocKy: '',
        HTThi: '',
        SoTiet: '',
        FileCM: '',
        THCSDT: '',
        CacHTCV: '',
        TrangThai: '',
        GhiChu: '',
    })
    const inittialHTCV = () => ({
        HinhThucCV: '',
        QuanNhanId: '',
        HoTen: '',
        KhoiLuongCV: '',
        DonVi: '',
        SoTietCV: '',
        SoGioQuyDoi: '',
        GhiChu: '',
    })
    const [stateTaiGiangDay, setStateTaiGiangDay] = useState(inittial())
    const [stateTaiGiangDayDetails, setStateTaiGiangDayDetails] = useState(inittial())
    const [stateHTCVDetails, setStateHTCVDetails] = useState(inittialHTCV())
    const [stateHTCV, setStateHTCV] = useState(inittialHTCV())
    const [form] = Form.useForm();

    const mutation = useMutationHooks(

        (data) => {
            const { code, QuanNhanId = quannhanId, MaLop, MaMonHoc, TenMonHoc, SoTinChi, GioChuan, SiSo, HTDT, LoaiHinhDT, KetThuc, Quy, Nam, HocKy, THCSDT, HTThi, SoTiet, FileCM, TrangThai = 0, edituser, edittime, GhiChu } = data
            const res = TaiGiangDayService.createTaiGiangDay({
                code, QuanNhanId, MaLop, MaMonHoc, TenMonHoc, SoTinChi, GioChuan, SiSo, HTDT, LoaiHinhDT, KetThuc, Quy, Nam, HocKy, HTThi, SoTiet, FileCM, THCSDT, TrangThai, edituser, edittime, GhiChu
            }).then(res => {
                try {
                    settaigiangdayId(res.data._id);
                    return res;
                } catch { };
            });
        }
    )
    const mutation2 = useMutationHooks(

        (data) => {
            try {
                const { HinhThucCV, QuanNhanId, HoTen, KhoiLuongCV, DonVi, SoTietCV, SoGioQuyDoi, GhiChu } = data
                const res = HTCVService.createHTCV({
                    HinhThucCV, QuanNhanId, HoTen, KhoiLuongCV, DonVi, SoTietCV, SoGioQuyDoi, GhiChu
                }).then(res => {
                    sethtcvId(res.data._id);
                    return res;
                });
            }
            catch { }
        }
    )


    const mutationUpdate = useMutationHooks(
        (data) => {

            const { id,
                token,
                ...rests } = data
            const res = TaiGiangDayService.updateTaiGiangDay(
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
            const res = TaiGiangDayService.updateTaiGiangDay(id, token, updatedData);
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
            const res = TaiGiangDayService.updateTaiGiangDay(id, token, updatedData);
            return res;

        },

    )
    const mutationUpdate2 = useMutationHooks(
        (data) => {

            const { id,
                token,
                ...rests } = data
            const res = HTCVService.updateHTCV(
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
            const res = TaiGiangDayService.deleteTaiGiangDay(
                id,
                token)
            return res
        },
    )
    const mutationDeleted2 = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = HTCVService.deleteHTCV(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = TaiGiangDayService.deleteManyTaiGiangDay(
                ids,
                token)
            return res
        },
    )


    const getAllTaiGiangDays = async () => {
        const res = await TaiGiangDayService.getAllTaiGiangDay()
        return res
    }

    // show


    const fetchGetTaiGiangDay = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]

        if (quannhanId) {

            const res = await TaiGiangDayService.getTaiGiangDayByQuanNhanId(quannhanId)

            if (res?.data) {
                setStateTaiGiangDayDetails({
                    code: res?.data.code,
                    // QuanNhanId: res?.data.QuanNhanId,
                    MaLop: res?.data.MaLop,
                    MaMonHoc: res?.data.MaMonHoc,
                    TenMonHoc: res?.data.TenMonHoc,
                    SoTinChi: res?.data.SoTinChi,
                    GioChuan: res?.data.GioChuan,
                    SiSo: res?.data.SiSo,
                    HTDT: res?.data.HTDT,
                    LoaiHinhDT: res?.data.LoaiHinhDT,
                    KetThuc: res?.data.KetThuc,
                    Quy: res?.data.Quy,
                    Nam: res?.data.Nam,
                    HocKy: res?.data.HocKy,
                    HTThi: res?.data.HTThi,
                    SoTiet: res?.data.SoTiet,
                    FileCM: res?.data.FileCM,
                    THCSDT: res?.data.THCSDT,
                    TrangThai: res?.data.TrangThai,
                    CacHTCV: res?.data.CacHTCV
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateTaiGiangDayDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    const fetchGetHTCV = async () => {

        if (taigiangdayId) {
            const res = await TaiGiangDayService.getDetailsTaiGiangDay(taigiangdayId)


            // if (res?.data) {
            //     setStateHTCVDetails({
            //         // HinhThucCV: res?.data?.CacHTCV[0].HinhThucCV,
            //         // QuanNhanId: res?.data?.CacHTCV[0].QuanNhanId,
            //         // HoTen: res?.data?.CacHTCV[0].HoTen,
            //         // KhoiLuongCV: res?.data?.CacHTCV[0].KhoiLuongCV,
            //         // DonVi: res?.data?.CacHTCV[0].DonVi,
            //         // SoTiet: res?.data?.CacHTCV[0].SoTiet,
            //         // SoGioQuyDoi: res?.data?.CacHTCV[0].SoGioQuyDoi,
            //         // GhiChu: res?.data?.CacHTCV[0].GhiChu,
            //     })
            // }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateTaiGiangDayDetails)

            return res.data.CacHTCV
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiGiangDayDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiGiangDayDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            settaigiangdayId(rowSelected);
            fetchGetDetailsTaiGiangDay(rowSelected);

        }
    }, [rowSelected, isOpenDrawer])
    useEffect(() => {
        if (rowSelected2 && isOpenDrawer2) {
            setIsLoadingUpdate(true);
            fetchGetDetailsHTCV(rowSelected2);
        }
    }, [rowSelected2, isOpenDrawer2])



    const handleDetailsTaiGiangDay = () => {
        setIsOpenDrawer(true)
    }
    const handleDetailsHTCV = () => {
        setIsOpenDrawer2(true)
    }


    const handleDelteManyTaiGiangDays = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                taigiangdayDetails.refetch()
            }
        })
    }
    const getQuanNhanFromDonVi = async () => {
        const res = await QuanNhanService.getQuanNhanFromDonVi(currentUserDonVi)
        return res
    }

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataUpdated2, isLoading: isLoadingUpdated2, isSuccess: isSuccessUpdated2, isError: isErrorUpdated2 } = mutationUpdate2
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeleted2, isLoading: isLoadingDeleted2, isSuccess: isSuccessDelected2, isError: isErrorDeleted2 } = mutationDeleted2
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai



    const queryTaiGiangDay = useQuery({ queryKey: ['taigiangday'], queryFn: getAllTaiGiangDays })
    const taigiangdayDetails = useQuery(['hosoquannhantaigiangday', quannhanId], fetchGetTaiGiangDay, { enabled: !!quannhanId })
    const HTCVDetails = useQuery(['hinhthuccongviec', taigiangdayId], fetchGetHTCV, { enabled: !!taigiangdayId })
    const { isLoading: isLoadingTaiGiangDay, data: quatrinhcongtacs } = queryTaiGiangDay
    const queryQuanNhan = useQuery({ queryKey: ['quannhans'], queryFn: getQuanNhanFromDonVi })
    const { isLoading: isLoadingQuanNhans, data: quannhans } = queryQuanNhan
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsTaiGiangDay} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }
    const renderAction2 = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete2(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsHTCV} />
            </div>
        )
    }

    const onChange = () => { }
    useEffect(() => {
        if (isModalOpen2) {
            queryQuanNhan.refetch(); // Gọi queryQuanNhan khi isModalOpen2 thay đổi và isModalOpen2 = true
        }
    }, [isModalOpen2, queryQuanNhan.refetch]);
    const fetchGetDetailsTaiGiangDay = async (rowSelected) => {
        console.log("detail row");
        const res = await TaiGiangDayService.getDetailsTaiGiangDay(rowSelected)
        if (res?.data) {
            setStateTaiGiangDayDetails({
                code: res?.data.code,
                QuanNhanId: res?.data.QuanNhanId,
                MaLop: res?.data.MaLop,
                MaMonHoc: res?.data.MaMonHoc,
                TenMonHoc: res?.data.TenMonHoc,
                SoTinChi: res?.data.SoTinChi,
                GioChuan: res?.data.GioChuan,
                SiSo: res?.data.SiSo,
                HTDT: res?.data.HTDT,
                LoaiHinhDT: res?.data.LoaiHinhDT,
                KetThuc: res?.data.KetThuc,
                Quy: res?.data.Quy,
                Nam: res?.data.Nam,
                HocKy: res?.data.HocKy,
                HTThi: res?.data.HTThi,
                SoTiet: res?.data.SoTiet,
                FileCM: res?.data.FileCM,
                THCSDT: res?.data.THCSDT,
                TrangThai: res?.data.TrangThai,
                CacHTCV: res?.data.CacHTCV
            })
        }

        console.log(res);
        console.log("xong detail row");
        setIsLoadingUpdate(false)
    }
    const fetchGetDetailsHTCV = async (rowSelected2) => {
        console.log("detail row");
        const res = await HTCVService.getDetailsHTCV(rowSelected2)
        if (res?.data) {
            setStateHTCVDetails({
                HinhThucCV: res?.data.HinhThucCV,
                QuanNhanId: res?.data.QuanNhanId,
                HoTen: res?.data.HoTen,
                KhoiLuongCV: res?.data.KhoiLuongCV,
                DonVi: res?.data.DonVi,
                SoTietCV: res?.data.SoTietCV,
                SoGioQuyDoi: res?.data.SoGioQuyDoi,
                GhiChu: res?.data.GhiChu,
            })
        }
        console.log("abc");
        console.log(stateHTCVDetails);
        console.log("xong detail htcv");
        setIsLoadingUpdate(false)
    }



    // useEffect(() => {
    //     if (rowSelected) {
    //         fetchGetDetailsTaiGiangDay(rowSelected)
    //     }
    //     setIsLoadingUpdate(false)
    // }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiGiangDayDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiGiangDayDetails, isModalOpen])





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
            title: 'Tên môn học',
            dataIndex: 'TenMonHoc',
            key: 'TenMonHoc',
            ...getColumnSearchProps('TenMonHoc')
        },
        {
            title: 'Sĩ số',
            dataIndex: 'SiSo',
            key: 'SiSo',
        },

        {
            title: 'Mã lớp',
            dataIndex: 'MaLop',
            key: 'MaLop',
        },
        {
            title: 'Số TC',
            dataIndex: 'SoTinChi',
            key: 'SoTinChi',
        },
        {
            title: 'Khối lượng công việc',
            dataIndex: 'SoTiet',
            key: 'SoTiet',
        },
        {
            title: 'Giờ chuẩn',
            dataIndex: 'SoTiet',
            key: 'SoTiet',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'TrangThai',
            key: 'TrangThai',
        },
        {
            title: 'Học kỳ',
            dataIndex: 'HocKy',
            key: 'HocKy',
        },
        {
            title: 'Cấp học',
            dataIndex: 'LoaiHinhDT',
            key: 'LoaiHinhDT',
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
    const columns3 = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },

        {
            title: 'Giáo viên',
            dataIndex: 'HoTen',
            key: 'HoTen',
        },
        {
            title: 'Hình thức CV',
            dataIndex: 'HinhThucCV',
            key: 'HinhThucCV',
        },
        {
            title: 'Khối lượng công việc',
            dataIndex: 'KhoiLuongCV',
            key: 'KhoiLuongCV',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'DonVi',
            key: 'DonVi',
        },
        {
            title: 'Số giờ QĐ',
            dataIndex: 'SoGioQD',
            key: 'SoGioQD',
        },
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'TrangThai',
        //     key: 'TrangThai',
        // },
        {
            title: 'Chức năng',
            dataIndex: 'action',
            render: renderAction2
        },


    ];
    const columns2 = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Mã quân nhân',
            dataIndex: 'QuanNhanId',
            key: 'QuanNhanId',
            render: (text, record) => (
                <span onClick={() => handleNameClick(record.QuanNhanId, record._id)}>{text}</span>
            ),
        },
        {
            title: 'Tên quân nhân',
            dataIndex: 'HoTen',
            key: 'HoTen',
            render: (text, record) => (
                <span onClick={() => handleNameClick(record.HoTen, record._id)}>{text}</span>
            ),
            ...getColumnSearchProps('HoTen')
        },





    ];
    const handleNameClick = (name, objectId) => {
        setSelectedName(name); // Cập nhật giá trị của "Name"
        setStateHTCV(prevState => ({
            ...prevState,
            QuanNhanId: objectId,
            HoTen: name,
        }));
        console.log(stateHTCV);
    };
    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected])
    useEffect(() => {
        if (isSuccessDelected2 && dataDeleted2?.status === 'OK') {
            message.success()
            handleCancelDelete2()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected2])

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
        setStateTaiGiangDayDetails({
            code: '',
            // QuanNhanId: '',
            MaLop: '',
            MaMonHoc: '',
            TenMonHoc: '',
            SoTinChi: '',
            GioChuan: '',
            SiSo: '',
            HTDT: '',
            LoaiHinhDT: '',
            KetThuc: '',
            Quy: '',
            Nam: '',
            HocKy: '',
            HTThi: '',
            SoTiet: '',
            FileCM: '',
            THCSDT: '',
            CacHTCV: '',
            //   TrangThai: '',
            GhiChu: '',
        })
        form.resetFields()
    };
    const handleCloseDrawer2 = () => {
        setIsOpenDrawer2(false);
        setStateHTCVDetails({
            HinhThucCV: '',
            QuanNhanId: '',
            HoTen: '',
            KhoiLuongCV: '',
            DonVi: '',
            SoTietCV: '',
            SoGioQuyDoi: '',
            GhiChu: '',
        })
        form.resetFields()
    };
    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])
    useEffect(() => {
        if (isSuccessUpdated2 && dataUpdated2?.status === 'OK') {
            message.success()
            handleCloseDrawer2()
        } else if (isErrorUpdated2) {
            message.error()
        }
    }, [isSuccessUpdated])
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleCancelDelete2 = () => {
        setIsModalOpenDelete2(false)
    }


    const handleDeleteTaiGiangDay = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                taigiangdayDetails.refetch()
            }
        })
    }
    const handleDeleteHTCV = () => {
        mutationDeleted2.mutate({ id: rowSelected2, token: user?.access_token }, {
            onSettled: () => {
                HTCVDetails.refetch()
            }
        })
    }
    const handleCancel = () => {
        taigiangdayDetails.refetch();
        settaigiangdayId(null);
        setIsModalOpen(false);
        setStateTaiGiangDay({
            code: '',
            // QuanNhanId: '',
            MaLop: '',
            MaMonHoc: '',
            TenMonHoc: '',
            SoTinChi: '',
            GioChuan: '',
            SiSo: '',
            HTDT: '',
            LoaiHinhDT: '',
            KetThuc: '',
            Quy: '',
            Nam: '',
            HocKy: '',
            HTThi: '',
            SoTiet: '',
            FileCM: '',
            THCSDT: '',
            CacHTCV: '',
            //   TrangThai: '',
            GhiChu: '',

        })
        form.resetFields()
    };
    const handleCancel2 = () => {

        setIsModalOpen2(false);
        setStateHTCV({
            HinhThucCV: '',
            QuanNhanId: '',
            HoTen: '',
            KhoiLuongCV: '',
            DonVi: '',
            SoTietCV: '',
            SoGioQuyDoi: '',
            GhiChu: '',
        });
        // form.resetFields()
    };

    const onFinish = () => {
        const params = {
            code: stateTaiGiangDay.code,
            // QuanNhanId: stateTaiGiangDay.QuanNhanId,
            MaLop: stateTaiGiangDay.MaLop,
            MaMonHoc: stateTaiGiangDay.MaMonHoc,
            TenMonHoc: stateTaiGiangDay.TenMonHoc,
            SoTinChi: stateTaiGiangDay.SoTinChi,
            GioChuan: stateTaiGiangDay.GioChuan,
            SiSo: stateTaiGiangDay.SiSo,
            HTDT: stateTaiGiangDay.HTDT,
            LoaiHinhDT: stateTaiGiangDay.LoaiHinhDT,
            KetThuc: stateTaiGiangDay.KetThuc,
            Quy: stateTaiGiangDay.Quy,
            Nam: stateTaiGiangDay.Nam,
            HocKy: stateTaiGiangDay.HocKy,
            HTThi: stateTaiGiangDay.HTThi,
            SoTiet: stateTaiGiangDay.SoTiet,
            FileCM: stateTaiGiangDay.FileCM,
            THCSDT: stateTaiGiangDay.THCSDT,
            // TrangThai: stateTaiGiangDay.TrangThai,
            CacHTCV: stateTaiGiangDay.CacHTCV,
            GhiChu: stateTaiGiangDay.GhiChu,
        }
        console.log("Finsh", stateTaiGiangDay)
        mutation.mutate(params, {
            onSettled: () => {
                // taigiangdayDetails.refetch()
            }
        })
    }

    const handleChangeCheckTHCSDT = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        console.log("e: ", e.target.name, e.target.value)
        setStateTaiGiangDay({
            ...stateTaiGiangDay,
            THCSDT: checkedValue,
            [e.target.name]: e.target.value
        });
    };
    const onFinish2 = async () => {
        console.log("HTCV");
        const params = {
            HinhThucCV: stateHTCV.HinhThucCV,
            HoTen: stateHTCV.HoTen,
            QuanNhanId: stateHTCV.QuanNhanId,
            KhoiLuongCV: stateHTCV.KhoiLuongCV,
            DonVi: stateHTCV.DonVi,
            SoTietCV: stateHTCV.SoTietCV,
            SoGioQuyDoi: stateHTCV.SoGioQuyDoi,
            GhiChu: stateHTCV.GhiChu,
        }

        mutation2.mutate(params, {
            onSettled: () => {
                console.log("bat dau cv");
                console.log(htcvId);
                // onFinish3();
            }
        })
    }

    const onFinish3 = async () => {
        const data = {
            HTCVList: htcvId
        };

        try {
            const result = await TaiGiangDayService.updateHTCVLists(taigiangdayId, data, user?.access_token);

            if (result.status === 'OK') {
                message.success(result.message);
                HTCVDetails.refetch();
                // handleCancel();
                //nho them taigiangdayDetails.refetch()
            } else {
                message.error(result.message);
            }
        } catch (error) {
            console.error(error);
            message.error('An error occurred');
        }

    };
    useEffect(() => {
        if (htcvId) {
            onFinish3();

        }
    }, [htcvId]);
    const handleAddButtonClick = () => {
        onFinish();
        setIsModalOpen2(true);
    }

    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)

        const { name, value } = e.target;

        if (name === "KetThuc") {
            const quy = xacDinhQuy(value);
            const nam = xacDinhNam(value);
            const hocky = xacDinhHocKy(value)
            // Cập nhật giá trị của ô Quy
            setStateTaiGiangDay((prevState) => ({
                ...prevState,
                Quy: quy,
                Nam: nam,
                HocKy: hocky
            }));
            console.log("Quý:", stateTaiGiangDay)
        }

        // Cập nhật giá trị của ô KetThuc
        setStateTaiGiangDay((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleOnchange2 = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateHTCV({
            ...stateHTCV,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        const { name, value } = e.target;

        if (name === "KetThuc") {
            const quy = xacDinhQuy(value);
            const nam = xacDinhNam(value);
            const hocky = xacDinhHocKy(value)
            // Cập nhật giá trị của ô Quy
            setStateTaiGiangDayDetails((prevState) => ({
                ...prevState,
                Quy: quy,
                Nam: nam,
                HocKy: hocky
            }));
            console.log("Quý:", stateTaiGiangDay)
        }


        // Cập nhật giá trị của ô KetThuc
        setStateTaiGiangDayDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));


    }
    const handleOnchangeDetails2 = (e) => {

        setStateHTCVDetails({
            ...stateHTCVDetails,
            [e.target.name]: e.target.value
        })


    }


    const onUpdateTaiGiangDay = () => {
        console.log("bat dau update");
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiGiangDayDetails }, {
            onSettled: () => {
                taigiangdayDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiGiangDayDetails }, {
            onSettled: () => {
                taigiangdayDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiGiangDayDetails }, {
            onSettled: () => {
                taigiangdayDetails.refetch()
            }
        })
    }

    const onUpdateHTCV = () => {
        console.log("bat dau update");
        mutationUpdate2.mutate({ id: rowSelected2, token: user?.access_token, ...stateHTCVDetails }, {
            onSettled: () => {
                HTCVDetails.refetch()
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



    const dataTable = taigiangdayDetails?.data?.length && taigiangdayDetails?.data?.map((taigiangdayDetails) => {
        return {
            ...taigiangdayDetails,
            key: taigiangdayDetails._id,
            TrangThai: getTrangThaiText(taigiangdayDetails.TrangThai)
        }
    })
    const dataTable2 = HTCVDetails?.data?.length && HTCVDetails?.data?.map((HTCVDetails) => {
        return { ...HTCVDetails, key: HTCVDetails._id }
    })
    const dataTable3 = quannhans?.data?.length && quannhans?.data?.map((quannhan) => {
        return { ...quannhan, key: quannhan._id }
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
            // handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])



    const handleOnchangeFileCM = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateTaiGiangDay({
            ...stateTaiGiangDay,
            FileCM: file.preview
        })
    }


    const handleOnchangeFileCMDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateTaiGiangDayDetails({
            ...stateTaiGiangDayDetails,
            FileCM: file.preview
        })
    }

    const handleChangeCheckTHCSDTDeTail = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        setStateTaiGiangDayDetails({
            ...stateTaiGiangDayDetails,
            THCSDT: checkedValue,
        });
    };

    //Loại hình đào tạo
    const fetchAllLoaiHinhDaoTao = async () => {
        const res = await LoaiHinhDaoTaoService.getAllType()
        return res
    }

    const allLoaiHinhDaoTao = useQuery({ queryKey: ['all-loaihinhdaotao'], queryFn: fetchAllLoaiHinhDaoTao })
    const handleChangeSelectLHDaoTao = (value) => {
        setStateTaiGiangDay({
            ...stateTaiGiangDay,
            LoaiHinhDT: value
        })

    }


    const handleChangeSelectLHDaoTaoDetails = (value) => {
        setStateTaiGiangDayDetails({
            ...stateTaiGiangDayDetails,
            LoaiHinhDT: value
        })

    }
    //Hình thức đào tạo
    const fetchAllHinhThucDaoTao = async () => {
        const res = await HinhThucDaoTaoService.getAllType()
        return res
    }

    const allHinhThucDaoTao = useQuery({ queryKey: ['all-hinhthucdaotao'], queryFn: fetchAllHinhThucDaoTao })
    const handleChangeSelectHTDaoTao = (value) => {
        setStateTaiGiangDay({
            ...stateTaiGiangDay,
            HTDT: value
        })

    }


    const handleChangeSelectHTDaoTaoDetails = (value) => {
        setStateTaiGiangDayDetails({
            ...stateTaiGiangDayDetails,
            HTDT: value
        })

    }
    //Hình thức giảng dạy
    const fetchAllHinhThucGiangDay = async () => {
        const res = await HinhThucGiangDayService.getAllType()
        return res
    }

    const allHinhThucGiangDay = useQuery({ queryKey: ['all-hinhthucgiangday'], queryFn: fetchAllHinhThucGiangDay })
    const handleChangeSelectHTGiangDay = (value) => {
        setStateHTCV({
            ...stateHTCV,
            HinhThucCV: value
        })

    }


    const handleChangeSelectHinhThucGiangDayDetails = (value) => {
        setStateHTCVDetails({
            ...stateHTCVDetails,
            HinhThucCV: value
        })

    }
    // Hình thức thi
    const fetchAllHinhThucThi = async () => {
        const res = await HinhThucKhaoThiService.getAllType()
        return res
    }

    const allHTThi = useQuery({ queryKey: ['all-hinhthucthi'], queryFn: fetchAllHinhThucThi })
    const handleChangeSelectHTThi = (value) => {
        setStateTaiGiangDay({
            ...stateTaiGiangDay,
            HTThi: value
        })

    }


    const handleChangeSelectHTTHIDetails = (value) => {
        setStateTaiGiangDayDetails({
            ...stateTaiGiangDayDetails,
            HTThi: value
        })

    }
    // Xác định Quý, năm, học kỳ
    // function xacDinhQuyNamHocKy(date) {
    //     const parts = date.split("/");
    //     const ngay = new Date(parts[2], parts[1] - 1, parts[0]);

    //     const quy = Math.floor((ngay.getMonth() + 3) / 3);
    //     const nam = ngay.getFullYear();

    //     let hocKy;
    //     if (quy <= 2) {
    //         hocKy = "Học kỳ 1";
    //     } else if (quy <= 4) {
    //         hocKy = "Học kỳ 2";
    //     } else {
    //         hocKy = "Học kỳ hè";
    //     }

    //     return {
    //         quy: quy,
    //         nam: nam,
    //         hocKy: hocKy,
    //     };
    // }
    //Quý
    function xacDinhQuy(date) {
        // Chuyển đổi ngày thành đối tượng Date
        if (typeof date === "string" && date.length > 0) {
            const parts = date.split("/");
            const ngay = new Date(parts[2], parts[1] - 1, parts[0]);

            const quy = Math.floor((ngay.getMonth() + 3) / 3);

            return quy
        }
        return null


    }
    //Năm
    function xacDinhNam(date) {
        // Chuyển đổi ngày thành đối tượng Date
        if (typeof date === "string" && date.length > 0) {
            const parts = date.split("/");
            const ngay = new Date(parts[2], parts[1] - 1, parts[0]);
            const nam = ngay.getFullYear();
            return nam
        }

        return null;
    }
    //học kỳ
    function xacDinhHocKy(date) {
        // Chuyển đổi ngày thành đối tượng Date
        if (typeof date === "string" && date.length > 0) {
            const parts = date.split("/");
            const ngay = new Date(parts[2], parts[1] - 1, parts[0]);

            const quy = Math.floor((ngay.getMonth() + 3) / 3);


            let hocKy;
            if (quy <= 2) {
                hocKy = "Học kỳ 1";
            } else if (quy <= 4) {
                hocKy = "Học kỳ 2";
            } else {
                hocKy = "Học kỳ hè";
            }

            return hocKy;
        }

        return null;
    }


    return (
        <div>
            <div>
                <WrapperHeader>Tải giảng dạy</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={taigiangdayDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingTaiGiangDay} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm chi tiết tải giảng dạy" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        // onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >


                        <Form.Item
                            label="Mã lớp"
                            name="MaLop"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay['MaLop']} onChange={handleOnchange} name="MaLop" />
                        </Form.Item>

                        <Form.Item
                            label="Mã môn học"
                            name="MaMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.MaMonHoc} onChange={handleOnchange} name="MaMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="Tên môn học"
                            name="TenMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.TenMonHoc} onChange={handleOnchange} name="TenMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="Số tín chỉ"
                            name="SoTinChi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.SoTinChi} onChange={handleOnchange} name="SoTinChi" />
                        </Form.Item>
                        <Form.Item
                            label="Giờ chuẩn"
                            name="GioChuan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.GioChuan} onChange={handleOnchange} name="GioChuan" />
                        </Form.Item>
                        <Form.Item
                            label="Sỉ số"
                            name="SiSo"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.SiSo} onChange={handleOnchange} name="SiSo" />
                        </Form.Item>
                        <Form.Item
                            label="Hình thức đào tạo"
                            name="HTDT"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDay.HTDT} onChange={handleOnchange} name="HTDT" /> */}
                            <Select
                                name="HTDT"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectHTDaoTao}
                                options={renderOptions(allHinhThucDaoTao?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Loại hình đào tạo"
                            name="LoaiHinhDT"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDay.LoaiHinhDT} onChange={handleOnchange} name="LoaiHinhDT" /> */}
                            <Select
                                name="LoaiHinhDT"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectLHDaoTao}
                                options={renderOptions(allLoaiHinhDaoTao?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Kết thúc"
                            name="KetThuc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.KetThuc} onChange={handleOnchange} name="KetThuc" />
                        </Form.Item>
                        {/* <Form.Item label="Tên giáo viên" name="HoTen">
                            {selectedName} 
                            const ketQua = xacDinhQuyNamHocKy(ngayNhap);

console.log(ketQua);
                            */}

                        <Form.Item
                            label="Quý"
                            name="Quy"
                        //      rules={[{ required: true, message: 'Nhập ngày kết thúc chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDay.Quy} onChange={handleOnchange} name="Quy" /> */}
                            {xacDinhQuy(stateTaiGiangDay.KetThuc)}
                        </Form.Item>
                        <Form.Item
                            label="Năm"
                            name="Nam"
                        //    rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDay.Nam} onChange={handleOnchange} name="Nam" /> */}
                            {xacDinhNam(stateTaiGiangDay.KetThuc)}
                        </Form.Item>
                        <Form.Item
                            label="Học kỳ"
                            name="HocKy"
                        //    rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDay.HocKy} onChange={handleOnchange} name="HocKy" /> */}
                            {xacDinhHocKy(stateTaiGiangDay.KetThuc)}
                        </Form.Item>
                        <Form.Item
                            label="HT thi"
                            name="HTThi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDay.HTThi} onChange={handleOnchange} name="HTThi" /> */}
                            <Select
                                name="HTThi"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectHTThi}
                                options={renderOptions(allHTThi?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số tiết"
                            name="SoTiet"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.SoTiet} onChange={handleOnchange} name="SoTiet" />
                        </Form.Item>

                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        //     rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.GhiChu} onChange={handleOnchange} name="GhiChu" />
                        </Form.Item>


                        <Form.Item
                            label="Thực hiện trong CSDT"
                            name="THCSDT"
                        >
                            <CheckboxComponent
                                style={{ width: '25px' }}
                                value={stateTaiGiangDay['THCSDT']}
                                checked={stateTaiGiangDay['THCSDT'] === 1}
                                onChange={handleChangeCheckTHCSDT}

                            />
                        </Form.Item>

                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCM} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateTaiGiangDay?.FileCM && (
                                    <img src={stateTaiGiangDay?.FileCM} style={{
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
                            <Button type="primary" htmlType="submit" onClick={handleAddButtonClick}>
                                Thêm HTCV
                            </Button>
                        </Form.Item>
                        <TableComponent columns={columns3} isLoading={isLoadingTaiGiangDay} data={dataTable2} onRow={(record, rowSelected) => {
                            return {
                                onClick: event => {
                                    setRowSelected(record._id);
                                }

                            };
                        }} />
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" onClick={handleCancel}>
                                Xong
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>

            <ModalComponent forceRender title="Thêm hình thức công việc" open={isModalOpen2} onCancel={handleCancel2} footer={null} width="70%">
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        // onFinish={onFinish2}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item label="Tên giáo viên" name="HoTen">
                            {selectedName}

                        </Form.Item>
                        <Form.Item
                            label="Hình thức công việc"
                            name="HinhThucCV"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHTCV.HinhThucCV} onChange={handleOnchange2} name="HinhThucCV" /> */}
                            <Select
                                name="HinhThucCV"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectHTGiangDay}
                                options={renderOptions(allHinhThucGiangDay?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số tiết"
                            name="SoTietCV"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHTCV.SoTietCV} onChange={handleOnchange2} name="SoTietCV" />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ"
                            name="SoGioQuyDoi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHTCV.SoGioQuyDoi} onChange={handleOnchange2} name="SoGioQuyDoi" />
                        </Form.Item>



                        <TableComponent columns={columns2} isLoading={isLoadingTaiGiangDay} data={dataTable3} onRow={(record, rowSelected) => {
                            return {
                                onClick: event => {
                                    // setRowSelected(record._id);
                                }

                            };
                        }} />


                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={() => { onFinish2(); }}>
                                Ghi
                            </Button>
                        </Form.Item>

                    </Form>
                </Loading>
            </ModalComponent>

            <DrawerComponent title='Cập nhật chi tiết tải giảng dạy' isOpen={isOpenDrawer} onClose={() => { setIsOpenDrawer(false); settaigiangdayId(null) }} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        // onFinish={onUpdateTaiGiangDay}
                        autoComplete="on"
                        form={form}
                    >


                        <Form.Item
                            label="Mã lớp"
                            name="MaLop"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails['MaLop']} onChange={handleOnchangeDetails} name="MaLop" />
                        </Form.Item>
                        <Form.Item
                            label="Mã môn học"
                            name="MaMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.MaMonHoc} onChange={handleOnchangeDetails} name="MaMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="Tên môn học"
                            name="TenMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.TenMonHoc} onChange={handleOnchangeDetails} name="TenMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="Số tín chỉ"
                            name="SoTinChi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.SoTinChi} onChange={handleOnchangeDetails} name="SoTinChi" />
                        </Form.Item>
                        <Form.Item
                            label="Giờ chuẩn"
                            name="GioChuan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.GioChuan} onChange={handleOnchangeDetails} name="GioChuan" />
                        </Form.Item>
                        <Form.Item
                            label="Sỉ số"
                            name="SiSo"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.SiSo} onChange={handleOnchangeDetails} name="SiSo" />
                        </Form.Item>
                        <Form.Item
                            label="Hình thức đào tạo"
                            name="HTDT"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDayDetails.HTDT} onChange={handleOnchangeDetails} name="HTDT" /> */}
                            <Select
                                name="HTDT"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectHTDaoTaoDetails}
                                options={renderOptions(allHinhThucDaoTao?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Loại hình đào tạo"
                            name="LoaiHinhDT"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDayDetails.LoaiHinhDT} onChange={handleOnchangeDetails} name="LoaiHinhDT" /> */}

                            <Select
                                name="LoaiHinhDT"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectLHDaoTaoDetails}
                                options={renderOptions(allLoaiHinhDaoTao?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Kết thúc"
                            name="KetThuc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={convertDateToString(stateTaiGiangDayDetails.KetThuc)} onChange={handleOnchangeDetails} name="KetThuc" />
                        </Form.Item>
                        <Form.Item
                            label="Quý"
                            name="Quy"
                        //      rules={[{ required: true, message: 'Nhập ngày kết thúc chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDay.Quy} onChange={handleOnchange} name="Quy" /> */}
                            {xacDinhQuy(stateTaiGiangDayDetails.KetThuc)}
                        </Form.Item>
                        <Form.Item
                            label="Năm"
                            name="Nam"
                        //    rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDay.Nam} onChange={handleOnchange} name="Nam" /> */}
                            {xacDinhNam(stateTaiGiangDayDetails.KetThuc)}
                        </Form.Item>
                        <Form.Item
                            label="Học kỳ"
                            name="HocKy"
                        //    rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDay.HocKy} onChange={handleOnchange} name="HocKy" /> */}
                            {xacDinhHocKy(stateTaiGiangDayDetails.KetThuc)}
                        </Form.Item>
                        <Form.Item
                            label="HT thi"
                            name="HTThi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDayDetails.HTThi} onChange={handleOnchangeDetails} name="HTThi" /> */}
                            <Select
                                name="HTThi"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectHTTHIDetails}
                                options={renderOptions(allHTThi?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số tiết"
                            name="SoTiet"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.SoTiet} onChange={handleOnchangeDetails} name="SoTiet" />
                        </Form.Item>

                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.GhiChu} onChange={handleOnchangeDetails} name="GhiChu" />
                        </Form.Item>


                        <Form.Item
                            label="Thực hiện trong CSDT"
                            name="THCSDT"
                        >
                            <CheckboxComponent
                                style={{ width: '25px' }}
                                value={stateTaiGiangDayDetails['THCSDT']}
                                checked={stateTaiGiangDayDetails['THCSDT'] === 1}
                                onChange={handleChangeCheckTHCSDTDeTail}

                            />
                        </Form.Item>


                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!'}]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCMDetails} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateTaiGiangDayDetails?.FileCM && (
                                    <img src={stateTaiGiangDayDetails?.FileCM} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <TableComponent columns={columns3} isLoading={isLoadingTaiGiangDay} data={dataTable2} onRow={(record, rowSelected) => {
                            return {
                                onClick: event => {
                                    setRowSelected2(record._id);
                                }

                            };
                        }} />

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={onUpdateTaiGiangDay}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <DrawerComponent title='Cập nhật chi tiết hình thức công việc' isOpen={isOpenDrawer2} onClose={() => setIsOpenDrawer2(false)} width="60%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated2}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        autoComplete="on"
                        form={form}
                    >



                        <Form.Item
                            label="Họ và tên"
                            name="HoTen"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <InputComponent value={stateHTCVDetails.HoTen} />}
                            <InputComponent value={stateHTCVDetails.HoTen} onChange={handleOnchangeDetails2} name="HoTen" />
                        </Form.Item>
                        <Form.Item
                            label="Hình thức công việc"
                            name="HinhThucCV"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <Select value={stateHTCVDetails.HinhThucCV} />}
                            {/* <InputComponent value={stateHTCVDetails.HinhThucCV} onChange={handleOnchangeDetails2} name="HinhThucCV" /> */}
                            <Select
                                name="HinhThucCV"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectHinhThucGiangDayDetails}
                                options={renderOptions(allHinhThucGiangDay?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số tiết"
                            name="SoTietCV"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <InputComponent value={stateHTCVDetails.SoTietCV} />}
                            <InputComponent value={stateHTCVDetails.SoTietCV} onChange={handleOnchangeDetails2} name="SoTietCV" />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ quy đổi"
                            name="SoGioQuyDoi"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <InputComponent value={stateHTCVDetails.SoGioQuyDoi} />}
                            <InputComponent value={stateHTCVDetails.SoGioQuyDoi} onChange={handleOnchangeDetails2} name="SoGioQuyDoi" />
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={onUpdateHTCV}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa tải giảng dạy" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteTaiGiangDay}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa tải giảng dạy này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Xóa công việc này" open={isModalOpenDelete2} onCancel={handleCancelDelete2} onOk={handleDeleteHTCV}>
                <Loading isLoading={isLoadingDeleted2}>
                    <div>Bạn có chắc xóa hình thức công việc này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt tải giảng dạy" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt tải giảng dạy này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin tải giảng dạy" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  tải giảng dạy này không?</div>
                </Loading>
            </ModalComponent>


        </div>

    );
};

export default TaiGiangDay;
