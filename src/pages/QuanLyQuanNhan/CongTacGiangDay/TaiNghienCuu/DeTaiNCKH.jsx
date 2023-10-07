
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions, getBase64 } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import CheckboxComponent from '../../../../components/CheckBox/CheckBox'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as DeTaiNCKHService from '../../../../services/DeTaiNCKHService';
import * as HinhThucHuongdanService from '../../../../services/HinhThucHuongDanService';
import * as PriorityByUserService from '../../../../services/PriorityByUserService'
import * as QuanNhanService from '../../../../services/QuanNhanService'
import * as HTCVService from '../../../../services/HTCVDeTaiService';

import * as DanhMucKhenThuongService from '../../../../services/DanhMucKhenThuongService';
import * as LoaiDeTaiService from '../../../../services/LoaiDeTaiService';
import * as PhanLoaiKetQuaNCKHService from '../../../../services/PhanLoaiKetQuaNCKHService'
import * as VaiTroService from '../../../../services/VaiTroService'
import * as HinhThucDeTaiService from '../../../../services/HinhThucDeTaiService';
import moment from 'moment';
import { WrapperHeader, WrapperUploadFile } from '../style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const DeTaiNCKH = ({ }) => {
    const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
    const [currentUserDonViCode, setCurrentUserDonViCode] = useState(null);
    const [htcvId, sethtcvId] = useState('')
    const [detainckhId, setdetainckhId] = useState('')
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
    const [NgayDKKT, setNgayDKKT] = useState('');
    const [NgayBD, setNgayBD] = useState('');
    const [NgayGH1, setNgayGH1] = useState('');
    const [NgayGH2, setNgayGH2] = useState('');
    const [NgayThu, setNgayThu] = useState('');
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


        DeTaiNCKHId: '',
        QuanNhanId: '',
        MaDeTai: '',
        LoaiDeTai: '',
        TenDeTai: '',
        HinhThucKhenThuong: '',
        KinhPhi: '',
        CNDeTai: '',
        DonViChuTri: '',
        ThoiGianDuKienKT: moment(),
        ThoiGianBatDau: moment(),
        GiaHanLan1: moment(),
        GiaHanLan2: moment(),
        SoThanhVien: '',
        CacThanhVien: '',
        HinhThucDeTai: '',
        ThuocCTDuAn: '',
        NgayNghiemThu: moment(),
        MoTaKetThuc: '',
        QLDVHV: '',
        FileCM: '',
        Tai: '',
        TrangThai: '',
        PhanLoaiKetQua: '',
        CacHTCV: '',
        GhiChu: '',
    })
    const inittialHTCV = () => ({
        HinhThucCV: '',
        QuanNhanId: '',
        HoTen: '',

        DonVi: '',
        VaiTro: '',
        SoGioQuyDoi: '',
        GhiChu: '',
    })
    const [stateDeTaiNCKH, setStateDeTaiNCKH] = useState(inittial())
    const [stateDeTaiNCKHDetails, setStateDeTaiNCKHDetails] = useState(inittial())
    const [stateHTCVDetails, setStateHTCVDetails] = useState(inittialHTCV())
    const [stateHTCV, setStateHTCV] = useState(inittialHTCV())
    const [form] = Form.useForm();

    const mutation = useMutationHooks(

        (data) => {
            const { QuanNhanId = quannhanId, DeTaiNCKHId, MaDeTai, LoaiDeTai, TenDeTai, HinhThucKhenThuong, KinhPhi, CNDeTai, DonViChuTri, ThoiGianDuKienKT, ThoiGianBatDau, GiaHanLan1, GiaHanLan2, SoThanhVien, CacThanhVien, HinhThucDeTai, ThuocCTDuAn, NgayNghiemThu, MoTaKetThuc, QLDVHV, FileCM, Tai, TrangThai = 0, PhanLoaiKetQua, edituser, edittime, GhiChu } = data
            const res = DeTaiNCKHService.createDeTaiNCKH({
                DeTaiNCKHId, QuanNhanId, MaDeTai, LoaiDeTai, TenDeTai, HinhThucKhenThuong, KinhPhi, CNDeTai, DonViChuTri, ThoiGianDuKienKT, ThoiGianBatDau, GiaHanLan1, GiaHanLan2, SoThanhVien, CacThanhVien, HinhThucDeTai, ThuocCTDuAn, NgayNghiemThu, MoTaKetThuc, QLDVHV, FileCM, Tai, TrangThai, PhanLoaiKetQua, edituser, edittime, GhiChu
            }).then(res => {
                try {
                    setdetainckhId(res.data._id);
                    return res;
                } catch { };
            });
        }
    )
    const mutation2 = useMutationHooks(

        (data) => {
            try {
                const { HinhThucCV, QuanNhanId, HoTen, DonVi, VaiTro, SoGioQuyDoi, GhiChu } = data
                const res = HTCVService.createHTCV({
                    HinhThucCV, QuanNhanId, HoTen, DonVi, VaiTro, SoGioQuyDoi, GhiChu
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
            const res = DeTaiNCKHService.updateDeTaiNCKH(
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
            const res = DeTaiNCKHService.updateDeTaiNCKH(id, token, updatedData);
            return res;

        },

    )
    // ngày dự kiến kết thúc
    useEffect(() => {
        setNgayDKKT(moment(stateDeTaiNCKHDetails['ThoiGianDuKienKT']));
        // setNgayQD(convertDateToString(stateDeTaiNCKHDetails['NgayQuyetDinh']));
    }, [form, stateDeTaiNCKHDetails, isOpenDrawer])

    const handleOnchangeDetailNgayDKKT = (date) => {
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            ThoiGianDuKienKT: date
        })
    }
    const handleOnchangeNgayDKKT = (date) => {
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            ThoiGianDuKienKT: date
        })
    }
    // ngày bắt đầu
    useEffect(() => {
        setNgayBD(moment(stateDeTaiNCKHDetails['ThoiGianBatDau ']));
        // setNgayQD(convertDateToString(stateDeTaiNCKHDetails['NgayQuyetDinh']));
    }, [form, stateDeTaiNCKHDetails, isOpenDrawer])

    const handleOnchangeDetailNgayBD = (date) => {
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            ThoiGianBatDau: date
        })
    }
    const handleOnchangeNgayBD = (date) => {
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            ThoiGianBatDau: date
        })
    }
    // gia hạn 1
    useEffect(() => {
        setNgayGH1(moment(stateDeTaiNCKHDetails[' GiaHanLan1']));
    }, [form, stateDeTaiNCKHDetails, isOpenDrawer])

    const handleOnchangeDetailNgayGH1 = (date) => {
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            GiaHanLan1: date
        })
    }
    const handleOnchangeNgayGH1 = (date) => {
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            GiaHanLan1: date
        })
    }
    // gia hạn 2
    useEffect(() => {
        setNgayGH2(moment(stateDeTaiNCKHDetails[' GiaHanLan2']));
        // setNgayQD(convertDateToString(stateDeTaiNCKHDetails['NgayQuyetDinh']));
    }, [form, stateDeTaiNCKHDetails, isOpenDrawer])

    const handleOnchangeDetailNgayGH2 = (date) => {
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            GiaHanLan2: date
        })
    }
    const handleOnchangeNgayGH2 = (date) => {
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            GiaHanLan2: date
        })
    }
    // ngày nghiệm thu
    useEffect(() => {
        setNgayThu(moment(stateDeTaiNCKHDetails[' NgayNghiemThu']));
        // setNgayQD(convertDateToString(stateDeTaiNCKHDetails['NgayQuyetDinh']));
    }, [form, stateDeTaiNCKHDetails, isOpenDrawer])

    const handleOnchangeDetailNgayThu = (date) => {
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            NgayNghiemThu: date
        })
    }
    const handleOnchangeNgayThu = (date) => {
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            NgayNghiemThu: date
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
            const res = DeTaiNCKHService.updateDeTaiNCKH(id, token, updatedData);
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
            const res = DeTaiNCKHService.deleteDeTaiNCKH(
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
            const res = DeTaiNCKHService.deleteManyDeTaiNCKH(
                ids,
                token)
            return res
        },
    )


    const getAllDeTaiNCKHs = async () => {
        const res = await DeTaiNCKHService.getAllDeTaiNCKH()
        return res
    }

    // show


    const fetchGetDeTaiNCKH = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]

        if (quannhanId) {

            const res = await DeTaiNCKHService.getDeTaiNCKHByQuanNhanId(quannhanId)

            if (res?.data) {
                setStateDeTaiNCKHDetails({

                    DeTaiNCKHId: res?.data.DeTaiNCKHId,
                    LoaiDeTai: res?.data.LoaiDeTai,
                    MaDeTai: res?.data.MaDeTai,
                    TenDeTai: res?.data.TenDeTai,
                    HinhThucKhenThuong: res?.data.HinhThucKhenThuong,
                    KinhPhi: res?.data.KinhPhi,
                    CNDeTai: res?.data.CNDeTai,
                    DonViChuTri: res?.data.DonViChuTri,
                    ThoiGianDuKienKT: res?.data.ThoiGianDuKienKT,
                    ThoiGianBatDau: res?.data.ThoiGianBatDau,
                    GiaHanLan1: res?.data.GiaHanLan1,
                    GiaHanLan2: res?.data.GiaHanLan2,
                    SoThanhVien: res?.data.SoThanhVien,
                    CacThanhVien: res?.data.CacThanhVien,
                    HinhThucDeTai: res?.data.HinhThucDeTai,
                    ThuocCTDuAn: res?.data.ThuocCTDuAn,
                    NgayNghiemThu: res?.data.NgayNghiemThu,
                    MoTaKetThuc: res?.data.MoTaKetThuc,
                    QLDVHV: res?.data.QLDVHV,
                    FileCM: res?.data.FileCM,
                    Tai: res?.data.Tai,
                    TrangThai: res?.data.TrangThai,
                    PhanLoaiKetQua: res?.data.PhanLoaiKetQua,
                    CacHTCV: res?.data.CacHTCV,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateDeTaiNCKHDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    const fetchGetHTCV = async () => {

        if (detainckhId) {
            const res = await DeTaiNCKHService.getDetailsDeTaiNCKH(detainckhId)


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
            // console.log("chi tiết qtct:", setStateDeTaiNCKHDetails)

            return res.data.CacHTCV
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDeTaiNCKHDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDeTaiNCKHDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            setdetainckhId(rowSelected);
            fetchGetDetailsDeTaiNCKH(rowSelected);

        }
    }, [rowSelected, isOpenDrawer])
    useEffect(() => {
        if (rowSelected2 && isOpenDrawer2) {
            setIsLoadingUpdate(true);
            fetchGetDetailsHTCV(rowSelected2);
        }
    }, [rowSelected2, isOpenDrawer2])



    const handleDetailsDeTaiNCKH = () => {
        setIsOpenDrawer(true)
    }
    const handleDetailsHTCV = () => {
        setIsOpenDrawer2(true)
    }


    const handleDelteManyDeTaiNCKHs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                detainckhDetails.refetch()
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



    const queryDeTaiNCKH = useQuery({ queryKey: ['detainckh'], queryFn: getAllDeTaiNCKHs })
    const detainckhDetails = useQuery(['hosoquannhandetainckh', quannhanId], fetchGetDeTaiNCKH, { enabled: !!quannhanId })
    const HTCVDetails = useQuery(['hinhthuccongviecdetai', detainckhId], fetchGetHTCV, { enabled: !!detainckhId })
    const { isLoading: isLoadingDeTaiNCKH, data: quatrinhcongtacs } = queryDeTaiNCKH
    const queryQuanNhan = useQuery({ queryKey: ['quannhans'], queryFn: getQuanNhanFromDonVi })
    const { isLoading: isLoadingQuanNhans, data: quannhans } = queryQuanNhan
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDeTaiNCKH} />
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
    const fetchGetDetailsDeTaiNCKH = async (rowSelected) => {
        console.log("detail row");
        const res = await DeTaiNCKHService.getDetailsDeTaiNCKH(rowSelected)
        if (res?.data) {
            setStateDeTaiNCKHDetails({

                QuanNhanId: res?.data.QuanNhanId,

                DeTaiNCKHId: res?.data.DeTaiNCKHId,
                LoaiDeTai: res?.data.LoaiDeTai,
                MaDeTai: res?.data.MaDeTai,
                TenDeTai: res?.data.TenDeTai,
                HinhThucKhenThuong: res?.data.HinhThucKhenThuong,
                KinhPhi: res?.data.KinhPhi,
                CNDeTai: res?.data.CNDeTai,
                DonViChuTri: res?.data.DonViChuTri,
                ThoiGianDuKienKT: res?.data.ThoiGianDuKienKT,
                ThoiGianBatDau: res?.data.ThoiGianBatDau,
                GiaHanLan1: res?.data.GiaHanLan1,
                GiaHanLan2: res?.data.GiaHanLan2,
                SoThanhVien: res?.data.SoThanhVien,
                CacThanhVien: res?.data.CacThanhVien,
                HinhThucDeTai: res?.data.HinhThucDeTai,
                ThuocCTDuAn: res?.data.ThuocCTDuAn,
                NgayNghiemThu: res?.data.NgayNghiemThu,
                MoTaKetThuc: res?.data.MoTaKetThuc,
                QLDVHV: res?.data.QLDVHV,
                FileCM: res?.data.FileCM,
                Tai: res?.data.Tai,
                TrangThai: res?.data.TrangThai,
                PhanLoaiKetQua: res?.data.PhanLoaiKetQua,
                CacHTCV: res?.data.CacHTCV,
                GhiChu: res?.data.GhiChu,
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

                DonVi: res?.data.DonVi,
                VaiTro: res?.data.VaiTro,
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
    //         fetchGetDetailsDeTaiNCKH(rowSelected)
    //     }
    //     setIsLoadingUpdate(false)
    // }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDeTaiNCKHDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDeTaiNCKHDetails, isModalOpen])





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
            title: 'Nội dung đề tài',
            dataIndex: 'TenDeTai',
            key: 'TenDeTai',
            ...getColumnSearchProps('TenDeTai')
        },
        {
            title: 'Tác giả',
            dataIndex: 'CNDeTai',
            key: 'CNDeTai',
        },

        {
            title: 'Loai',
            dataIndex: 'LoaiDeTai',
            key: 'LoaiDeTai',
        },
        {
            title: 'Vai trò',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Số tác giả',
            dataIndex: 'SoThanhVien',
            key: 'SoThanhVien',
        },
        {
            title: 'Tải',
            dataIndex: 'Tai',
            key: 'Tai',
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


        // {
        //     title: 'Đơn vị',
        //     dataIndex: 'DonVi',
        //     key: 'DonVi',
        // },
        {
            title: 'Điểm',
            dataIndex: 'SoGioQuyDoi',
            key: 'SoGioQuyDoi',
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
        setStateDeTaiNCKHDetails({
            DeTaiNCKHId: '',
            LoaiDeTai: '',
            MaDeTai: '',
            TenDeTai: '',
            HinhThucKhenThuong: '',
            KinhPhi: '',
            CNDeTai: '',
            DonViChuTri: '',
            ThoiGianDuKienKT: '',
            ThoiGianBatDau: '',
            GiaHanLan1: '',
            GiaHanLan2: '',
            SoThanhVien: '',
            CacThanhVien: '',
            HinhThucDeTai: '',
            ThuocCTDuAn: '',
            NgayNghiemThu: '',
            MoTaKetThuc: '',
            QLDVHV: '',
            FileCM: '',
            Tai: '',
            //   TrangThai: '', 
            PhanLoaiKetQua: '',
            CacHTCV: '',
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

            DonVi: '',
            VaiTro: '',
            SoGioQuyDoi: '',
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


    const handleDeleteDeTaiNCKH = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                detainckhDetails.refetch()
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
        detainckhDetails.refetch();
        setdetainckhId(null);
        setIsModalOpen(false);
        setStateDeTaiNCKH({
            DeTaiNCKHId: '',
            LoaiDeTai: '',
            MaDeTai: '',
            TenDeTai: '',
            HinhThucKhenThuong: '',
            KinhPhi: '',
            CNDeTai: '',
            DonViChuTri: '',
            ThoiGianDuKienKT: '',
            ThoiGianBatDau: '',
            GiaHanLan1: '',
            GiaHanLan2: '',
            SoThanhVien: '',
            CacThanhVien: '',
            HinhThucDeTai: '',
            ThuocCTDuAn: '',
            NgayNghiemThu: '',
            MoTaKetThuc: '',
            QLDVHV: '',
            FileCM: '',
            Tai: '',
            //      TrangThai: '', 
            PhanLoaiKetQua: '',
            CacHTCV: '',
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

            DonVi: '',
            VaiTro: '',
            SoGioQuyDoi: '',
            GhiChu: '',
        });
        // form.resetFields()
    };

    const onFinish = () => {
        const params = {

            DeTaiNCKHId: stateDeTaiNCKH.DeTaiNCKHId,
            // QuanNhanId: '',
            LoaiDeTai: stateDeTaiNCKH.LoaiDeTai,
            MaDeTai: stateDeTaiNCKH.MaDeTai,
            TenDeTai: stateDeTaiNCKH.TenDeTai,
            HinhThucKhenThuong: stateDeTaiNCKH.HinhThucKhenThuong,
            KinhPhi: stateDeTaiNCKH.KinhPhi,
            CNDeTai: stateDeTaiNCKH.CNDeTai,
            DonViChuTri: stateDeTaiNCKH.DonViChuTri,
            ThoiGianDuKienKT: stateDeTaiNCKH.ThoiGianDuKienKT,
            ThoiGianBatDau: stateDeTaiNCKH.ThoiGianBatDau,
            GiaHanLan1: stateDeTaiNCKH.GiaHanLan1,
            GiaHanLan2: stateDeTaiNCKH.GiaHanLan2,
            SoThanhVien: stateDeTaiNCKH.SoThanhVien,
            CacThanhVien: stateDeTaiNCKH.CacThanhVien,
            HinhThucDeTai: stateDeTaiNCKH.HinhThucDeTai,
            ThuocCTDuAn: stateDeTaiNCKH.ThuocCTDuAn,
            NgayNghiemThu: stateDeTaiNCKH.NgayNghiemThu,
            MoTaKetThuc: stateDeTaiNCKH.MoTaKetThuc,
            QLDVHV: stateDeTaiNCKH.QLDVHV,
            FileCM: stateDeTaiNCKH.FileCM,
            Tai: stateDeTaiNCKH.Tai,
            //      TrangThai: '', 
            PhanLoaiKetQua: stateDeTaiNCKH.PhanLoaiKetQua,
            CacHTCV: stateDeTaiNCKH.CacHTCV,
            GhiChu: stateDeTaiNCKH.GhiChu,
        }
        console.log("Finsh", stateDeTaiNCKH)
        mutation.mutate(params, {
            onSettled: () => {
                // detainckhDetails.refetch()
            }
        })
    }

    const handleChangeCheckTHCSDT = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        console.log("e: ", e.target.name, e.target.value)
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            QLDVHV: checkedValue,
            [e.target.name]: e.target.value
        });
    };
    const onFinish2 = async () => {
        console.log("HTCV");
        const params = {
            HinhThucCV: stateHTCV.HinhThucCV,
            HoTen: stateHTCV.HoTen,
            QuanNhanId: stateHTCV.QuanNhanId,

            DonVi: stateHTCV.DonVi,
            VaiTro: stateHTCV.VaiTro,
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
            const result = await DeTaiNCKHService.updateHTCVLists(detainckhId, data, user?.access_token);

            if (result.status === 'OK') {
                message.success(result.message);
                HTCVDetails.refetch();
                // handleCancel();
                //nho them detainckhDetails.refetch()
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
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            [e.target.name]: e.target.value
        })
    }
    const handleOnchange2 = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateHTCV({
            ...stateHTCV,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {

        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            [e.target.name]: e.target.value
        })


    }
    const handleOnchangeDetails2 = (e) => {

        setStateHTCVDetails({
            ...stateHTCVDetails,
            [e.target.name]: e.target.value
        })


    }


    const onUpdateDeTaiNCKH = () => {
        console.log("bat dau update");
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDeTaiNCKHDetails }, {
            onSettled: () => {
                detainckhDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateDeTaiNCKHDetails }, {
            onSettled: () => {
                detainckhDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateDeTaiNCKHDetails }, {
            onSettled: () => {
                detainckhDetails.refetch()
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



    const dataTable = detainckhDetails?.data?.length && detainckhDetails?.data?.map((detainckhDetails) => {
        return {
            ...detainckhDetails,
            key: detainckhDetails._id,
            TrangThai: getTrangThaiText(detainckhDetails.TrangThai)
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


    const fetchAllHinhThucHuongDan = async () => {
        const res = await HinhThucHuongdanService.getAllType()
        return res
    }

    const allHinhThucHuongdan = useQuery({ queryKey: ['all-hinhthuchuongdan'], queryFn: fetchAllHinhThucHuongDan })
    const handleChangeSelect1 = (value) => {
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            HinhThucHuongDan: value
        })
        // console.log(stateQuanNhan)
    }

    const handleOnchangeFileCM = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            FileCM: file.preview
        })
    }


    const handleOnchangeFileCMDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            FileCM: file.preview
        })
    }

    const handleChangeCheckTHCSDTDeTail = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            QLDVHV: checkedValue,
        });
    };
    // hình thức khen thưởng

    const fetchAllHTKhenThuong = async () => {
        const res = await DanhMucKhenThuongService.getAllType()
        return res
    }

    const allHTKT = useQuery({ queryKey: ['all-htkhenthuong'], queryFn: fetchAllHTKhenThuong })
    const handleChangeSelectHTKhenThuong = (value) => {
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            HinhThucKhenThuong: value
        })

    }


    const handleChangeSelectHTKhenThuongDetails = (value) => {
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            HinhThucKhenThuong: value
        })

    }

    // phân loại kết quả

    const fetchAllPhanLoaiKetQua = async () => {
        const res = await PhanLoaiKetQuaNCKHService.getAllType()
        return res
    }

    const allPhanLoaiKetQua = useQuery({ queryKey: ['all-plkq'], queryFn: fetchAllPhanLoaiKetQua })
    const handleChangeSelectPhanLoaiKetQua = (value) => {
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            PhanLoaiKetQua: value
        })

    }


    const handleChangeSelectPhanLoaiKetQuaDetails = (value) => {
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            PhanLoaiKetQua: value
        })

    }

    // vai trò
    const fetchAllVaiTro = async () => {
        const res = await VaiTroService.getAllType()
        return res
    }

    const allVaiTro = useQuery({ queryKey: ['all-vaitro'], queryFn: fetchAllVaiTro })
    const handleChangeSelectVaiTro = (value) => {
        setStateDeTaiNCKH({
            ...stateHTCV,
            VaiTro: value
        })

    }


    const handleChangeSelectVaiTroDetails = (value) => {
        setStateDeTaiNCKHDetails({
            ...stateHTCVDetails,
            VaiTro: value
        })

    }
    // loại đề tài
    const fetchAllLoaiDeTai = async () => {
        const res = await LoaiDeTaiService.getAllType()
        return res
    }

    const allLoaiDeTai = useQuery({ queryKey: ['all-loaidetai'], queryFn: fetchAllLoaiDeTai })
    const handleChangeSelectLoaiDeTai = (value) => {
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            LoaiDeTai: value
        })

    }


    const handleChangeSelectLoaiDeTaiDetails = (value) => {
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            LoaiDeTai: value
        })

    }
    // hình thức đề tài
    const fetchAllHinhThucDeTai = async () => {
        const res = await HinhThucDeTaiService.getAllType()
        return res
    }

    const allHinhThucDeTai = useQuery({ queryKey: ['all-hinhthucdetai'], queryFn: fetchAllHinhThucDeTai })
    const handleChangeSelectHinhThucDeTai = (value) => {
        setStateDeTaiNCKH({
            ...stateDeTaiNCKH,
            HinhThucDeTai: value
        })

    }


    const handleChangeSelectHinhThucDeTaiDetails = (value) => {
        setStateDeTaiNCKHDetails({
            ...stateDeTaiNCKHDetails,
            HinhThucDeTai: value
        })

    }
    return (
        <div>
            <div>
                <WrapperHeader>Đề tài NCKH</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={detainckhDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingDeTaiNCKH} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm chi tiết đề tài NCKH" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
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
                            label="Loại đề tài"
                            name="LoaiDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="LoaiDeTai"

                                onChange={handleChangeSelectLoaiDeTai}
                                options={renderOptions(allLoaiDeTai?.data?.data)}
                            />
                            {/* <InputComponent value={stateDeTaiNCKH.LoaiDeTai} onChange={handleOnchange} name="LoaiDeTai" /> */}
                        </Form.Item>

                        <Form.Item
                            label="Mã "
                            name="MaDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKH.MaDeTai} onChange={handleOnchange} name="MaDeTai" />
                        </Form.Item>
                        <Form.Item
                            label="Tên "
                            name="TenDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKH.TenDeTai} onChange={handleOnchange} name="TenDeTai" />
                        </Form.Item>
                        <Form.Item
                            label="Kinh phí"
                            name="KinhPhi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKH.KinhPhi} onChange={handleOnchange} name="KinhPhi" />
                        </Form.Item>
                        <Form.Item
                            label="CN đề tài"
                            name="CNDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKH.CNDeTai} onChange={handleOnchange} name="CNDeTai" />
                        </Form.Item>
                        <Form.Item
                            label="Đơn vị chủ trì"
                            name="DonViChuTri"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKH.DonViChuTri} onChange={handleOnchange} name="DonViChuTri" />
                        </Form.Item>
                        <Form.Item
                            label="TĐ bắt đầu"
                            //  name="ThoiGianBatDau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayBD} name="ThoiGianBatDau"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="TĐ dự kiến kết thúc"
                            //  name="ThoiGianDuKienKT"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayDKKT} name="ThoiGianDuKienKT"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Gia hạn lần 1"
                        //   name="GiaHanLan1"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayGH1} name="GiaHanLan1"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Gia hạn lần 2"
                        //  name="GiaHanLan2"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayGH2} name="GiaHanLan2"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số thành  viên"
                            name="SoThanhVien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKH.SoThanhVien} onChange={handleOnchange} name="SoThanhVien" />
                        </Form.Item>
                        <Form.Item
                            label="Các thành viên"
                            name="CacThanhVien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKH.CacThanhVien} onChange={handleOnchange} name="CacThanhVien" />
                        </Form.Item>

                        <Form.Item
                            label="Hình thức đề tài"
                            name="HinhThucDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="HinhThucDeTai"

                                onChange={handleChangeSelectHinhThucDeTai}
                                options={renderOptions(allHinhThucDeTai?.data?.data)}
                            />
                            {/* <InputComponent value={stateDeTaiNCKH.HinhThucDeTai} onChange={handleOnchange} name="HinhThucDeTai" /> */}

                        </Form.Item>
                        <Form.Item
                            label="Thuộc CT dự án"
                            name="ThuocCTDuAn"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKH.ThuocCTDuAn} onChange={handleOnchange} name="ThuocCTDuAn" />
                        </Form.Item>
                        <Form.Item
                            label="Phân loại kết quả"
                            name="PhanLoaiKetQua"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="PhanLoaiKetQua"

                                onChange={handleChangeSelectPhanLoaiKetQua}
                                options={renderOptions(allPhanLoaiKetQua?.data?.data)}
                            />
                            {/* <InputComponent value={stateDeTaiNCKH.PhanLoaiKetQua} onChange={handleOnchange} name="PhanLoaiKetQua" /> */}

                        </Form.Item>
                        <Form.Item
                            label="HT khen thưởng"
                            name="HinhThucKhenThuong"
                        //    rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateDeTaiNCKH.HinhThucKhenThuong} onChange={handleOnchange} name="HinhThucKhenThuong" /> */}
                            <Select
                                name="HinhThucKhenThuong"

                                onChange={handleChangeSelectHTKhenThuong}
                                options={renderOptions(allHTKT?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ngày nghiệm thu"
                        // name="NgayNghiemThu"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateDeTaiNCKH.NgayNghiemThu} onChange={handleOnchange} name="NgayNghiemThu" /> */}
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayThu} name="NgayNghiemThu"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả kết thúc"
                            name="MoTaKetThuc"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKH.MoTaKetThuc} onChange={handleOnchange} name="MoTaKetThuc" />
                        </Form.Item>
                        <Form.Item
                            label="Tải"
                            name="Tai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKH.Tai} onChange={handleOnchange} name="Tai" />
                        </Form.Item>

                        <Form.Item
                            label="Quản lý bởi đơn vị trong học viên"
                            name="QLDVHV"
                        >
                            <CheckboxComponent
                                style={{ width: '25px' }}
                                value={stateDeTaiNCKH['QLDVHV']}
                                checked={stateDeTaiNCKH['QLDVHV'] === 1}
                                onChange={handleChangeCheckTHCSDT}

                            />
                        </Form.Item>

                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCM} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateDeTaiNCKH?.FileCM && (
                                    <img src={stateDeTaiNCKH?.FileCM} style={{
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
                        <TableComponent columns={columns3} isLoading={isLoadingDeTaiNCKH} data={dataTable2} onRow={(record, rowSelected) => {
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
                        <Form.Item label="Name" name="HoTen">
                            {selectedName}

                        </Form.Item>

                        <Form.Item
                            label="Vai trò"
                            name="VaiTro"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHTCV.VaiTro} onChange={handleOnchange2} name="VaiTro" /> */}
                            <Select
                                name="VaiTro"

                                onChange={handleChangeSelectVaiTro}
                                options={renderOptions(allVaiTro?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ"
                            name="SoGioQuyDoi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHTCV.SoGioQuyDoi} onChange={handleOnchange2} name="SoGioQuyDoi" />
                        </Form.Item>



                        <TableComponent columns={columns2} isLoading={isLoadingDeTaiNCKH} data={dataTable3} onRow={(record, rowSelected) => {
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

            <DrawerComponent title='Cập nhật chi tiết đề tài NCKH' isOpen={isOpenDrawer} onClose={() => { setIsOpenDrawer(false); setdetainckhId(null) }} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        // onFinish={onUpdateDeTaiNCKH}
                        autoComplete="on"
                        form={form}
                    >



                        <Form.Item
                            label="Loại đề tài"
                            name="LoaiDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateDeTaiNCKHDetails.LoaiDeTai} onChange={handleOnchangeDetails} name="LoaiDeTai" /> */}
                            <Select
                                name="LoaiDeTai"

                                onChange={handleChangeSelectLoaiDeTaiDetails}
                                options={renderOptions(allLoaiDeTai?.data?.data)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Mã "
                            name="MaDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKHDetails.MaDeTai} onChange={handleOnchangeDetails} name="MaDeTai" />
                        </Form.Item>
                        <Form.Item
                            label="Tên "
                            name="TenDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKHDetails.TenDeTai} onChange={handleOnchangeDetails} name="TenDeTai" />
                        </Form.Item>
                        <Form.Item
                            label="Kinh phí"
                            name="KinhPhi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKHDetails.KinhPhi} onChange={handleOnchangeDetails} name="KinhPhi" />
                        </Form.Item>
                        <Form.Item
                            label="CN đề tài"
                            name="CNDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKHDetails.CNDeTai} onChange={handleOnchangeDetails} name="CNDeTai" />
                        </Form.Item>
                        <Form.Item
                            label="Đơn vị chủ trì"
                            name="DonViChuTri"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKHDetails.DonViChuTri} onChange={handleOnchangeDetails} name="DonViChuTri" />
                        </Form.Item>
                        <Form.Item
                            label="TĐ bắt đầu"
                            // name="ThoiGianBatDau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayBD}
                                onChange={handleOnchangeDetailNgayBD} name="ThoiGianBatDau"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="TĐ dự kiến kết thúc"
                            // name="ThoiGianDuKienKT"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayDKKT}
                                onChange={handleOnchangeDetailNgayDKKT} name="ThoiGianDuKienKT"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Gia hạn lần 1"
                        // name="GiaHanLan1"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayGH1}
                                onChange={handleOnchangeDetailNgayGH1} name="GiaHanLan1"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Gia hạn lần 2"
                        //  name="GiaHanLan2"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayGH2}
                                onChange={handleOnchangeDetailNgayGH2} name="GiaHanLan2"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số thành  viên"
                            name="SoThanhVien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKHDetails.SoThanhVien} onChange={handleOnchangeDetails} name="SoThanhVien" />
                        </Form.Item>
                        <Form.Item
                            label="Các thành viên"
                            name="CacThanhVien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKHDetails.CacThanhVien} onChange={handleOnchangeDetails} name="CacThanhVien" />
                        </Form.Item>

                        <Form.Item
                            label="Hình thức đề tài"
                            name="HinhThucDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateDeTaiNCKHDetails.HinhThucDeTai} onChange={handleOnchangeDetails} name="HinhThucDeTai" /> */}
                            <Select
                                name="HinhThucDeTai"

                                onChange={handleChangeSelectHinhThucDeTaiDetails}
                                options={renderOptions(allHinhThucDeTai?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Thuộc CT dự án"
                            name="ThuocCTDuAn"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKHDetails.ThuocCTDuAn} onChange={handleOnchangeDetails} name="ThuocCTDuAn" />
                        </Form.Item>
                        <Form.Item
                            label="Phân loại kết quả"
                            name="PhanLoaiKetQua"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateDeTaiNCKHDetails.PhanLoaiKetQua} onChange={handleOnchangeDetails} name="PhanLoaiKetQua" /> */}
                            <Select
                                name="PhanLoaiKetQua"

                                onChange={handleChangeSelectPhanLoaiKetQuaDetails}
                                options={renderOptions(allPhanLoaiKetQua?.data?.data)}
                            />

                        </Form.Item>
                        <Form.Item
                            label="HT khen thưởng"
                            name="HinhThucKhenThuong"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateDeTaiNCKHDetails.HinhThucKhenThuong} onChange={handleOnchangeDetails} name="HinhThucKhenThuong" /> */}
                            <Select
                                name="HinhThucKhenThuong"

                                onChange={handleChangeSelectHTKhenThuongDetails}
                                options={renderOptions(allHTKT?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ngày nghiệm thu"
                        // name="NgayNghiemThu"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayThu}
                                onChange={handleOnchangeDetailNgayThu} name="NgayNghiemThu"
                                format="DD/MM/YYYY"
                            />
                            {/* <InputComponent value={stateDeTaiNCKHDetails.NgayNghiemThu} onChange={handleOnchangeDetails} name="NgayNghiemThu" /> */}
                        </Form.Item>
                        <Form.Item
                            label="Mô tả kết thúc"
                            name="MoTaKetThuc"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKHDetails.MoTaKetThuc} onChange={handleOnchangeDetails} name="MoTaKetThuc" />
                        </Form.Item>
                        <Form.Item
                            label="Tải"
                            name="Tai"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateDeTaiNCKHDetails.Tai} onChange={handleOnchangeDetails} name="Tai" />
                        </Form.Item>

                        <Form.Item
                            label="Quản lý bởi đơn vị trong học viên"
                            name="QLDVHV"
                        >
                            <CheckboxComponent
                                style={{ width: '25px' }}
                                value={stateDeTaiNCKHDetails.QLDVHV}
                                checked={stateDeTaiNCKHDetails['QLDVHV'] === 1}
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
                                {stateDeTaiNCKHDetails?.FileCM && (
                                    <img src={stateDeTaiNCKHDetails?.FileCM} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <TableComponent columns={columns3} isLoading={isLoadingDeTaiNCKH} data={dataTable2} onRow={(record, rowSelected) => {
                            return {
                                onClick: event => {
                                    setRowSelected2(record._id);
                                }

                            };
                        }} />

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={onUpdateDeTaiNCKH}>
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
                            label="Vai trò"
                            name="VaiTro"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* {false && <InputComponent value={stateHTCVDetails.VaiTro} />}
                            <InputComponent value={stateHTCVDetails.VaiTro} onChange={handleOnchangeDetails2} name="VaiTro" /> */}
                            <Select
                                name="VaiTro"

                                onChange={handleChangeSelectVaiTroDetails}
                                options={renderOptions(allVaiTro?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ "
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
            <ModalComponent title="Xóa đề tài NCKH" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDeTaiNCKH}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa đề tài NCKH này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Xóa công việc này" open={isModalOpenDelete2} onCancel={handleCancelDelete2} onOk={handleDeleteHTCV}>
                <Loading isLoading={isLoadingDeleted2}>
                    <div>Bạn có chắc xóa hình thức công việc này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt đề tài NCKH" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt đề tài NCKH này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin đề tài NCKH" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  đề tài NCKH này không?</div>
                </Loading>
            </ModalComponent>


        </div>

    );
};

export default DeTaiNCKH;
