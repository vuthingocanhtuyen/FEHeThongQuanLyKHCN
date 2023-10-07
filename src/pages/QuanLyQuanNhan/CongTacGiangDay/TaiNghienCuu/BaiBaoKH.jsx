
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions, getBase64 } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import CheckboxComponent from '../../../../components/CheckBox/CheckBox'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as BaiBaoKHService from '../../../../services/BaiBaoKhoaHocService';
import * as NganhXetChucDanhService from '../../../../services/NganhXetChucDanhService';
import * as NgonNguService from '../../../../services/NgonNguService';
import * as LoaiTapChiService from '../../../../services/LoaiTapChiService';
import * as PriorityByUserService from '../../../../services/PriorityByUserService'
import * as QuanNhanService from '../../../../services/QuanNhanService'
import * as HTCVService from '../../../../services/HTCTBaiBaoService';
import { WrapperHeader, WrapperUploadFile } from '../style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'
import moment from 'moment';
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';

const BaiBaoKH = ({ }) => {
    const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
    const [currentUserDonViCode, setCurrentUserDonViCode] = useState(null);
    const [htcvId, sethtcvId] = useState('')
    const [baibaokhId, setbaibaokhId] = useState('')
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

    const [NgayQD, setNgayQD] = useState('');

    const [Nam, setNam] = useState('');
    const [Quy, setQuy] = useState('');
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
        BaiBaoKhoaHocId: '',
        TenBai: '',
        LoaiTapChiHoiThao: '',
        TenTapChiHoiThao: '',
        SoTapChi: '',
        DiemToiDa: '',
        KinhPhiHoTro: '',
        NganhXetChucDanh: '',
        TapSo: '',
        NgonNguBao: '',
        TrangBaiViet: '',
        ThoiDiemXuatBan: moment(),
        SoTacGia: '',
        CacTacGia: '',
        LienKet: '',
        Quy: '',
        Nam: '',
        Tai: '',
        ThuocDeTai: '',
        FileCM: '',
        NhomNghienCuu: '',
        TrangThai: '',
        CacHTCV: '',
        GhiChu: '',
    })
    const inittialHTCV = () => ({
        HinhThucCV: '',
        QuanNhanId: '',
        HoTen: '',
        DonVi: '',
        SoGioQuyDoi: '',
        GhiChu: '',
    })
    const [stateBaiBaoKH, setStateBaiBaoKH] = useState(inittial())
    const [stateBaiBaoKHDetails, setStateBaiBaoKHDetails] = useState(inittial())
    const [stateHTCVDetails, setStateHTCVDetails] = useState(inittialHTCV())
    const [stateHTCV, setStateHTCV] = useState(inittialHTCV())
    const [form] = Form.useForm();

    const mutation = useMutationHooks(

        (data) => {
            const { BaiBaoKhoaHocId, QuanNhanId = quannhanId, TenBai, LoaiTapChiHoiThao, TenTapChiHoiThao, SoTapChi, DiemToiDa, KinhPhiHoTro, NganhXetChucDanh, TapSo, NgonNguBao, TrangBaiViet, ThoiDiemXuatBan, SoTacGia, CacTacGia, LienKet, Quy, Nam, Tai, ThuocDeTai, FileCM, NhomNghienCuu, TrangThai = 0, edituser, edittime, GhiChu } = data
            const res = BaiBaoKHService.createBaiBaoKH({
                BaiBaoKhoaHocId, QuanNhanId, TenBai, LoaiTapChiHoiThao, TenTapChiHoiThao, SoTapChi, DiemToiDa, KinhPhiHoTro, NganhXetChucDanh, TapSo, NgonNguBao, TrangBaiViet, ThoiDiemXuatBan, SoTacGia, CacTacGia, LienKet, Quy, Nam, Tai, ThuocDeTai, FileCM, NhomNghienCuu, TrangThai, edituser, edittime, GhiChu
            }).then(res => {
                try {
                    setbaibaokhId(res.data._id);
                    return res;
                } catch { };
            });
        }
    )
    const mutation2 = useMutationHooks(

        (data) => {
            try {
                const { HinhThucCV = "123", QuanNhanId, HoTen, DonVi, SoGioQuyDoi, GhiChu } = data
                const res = HTCVService.createHTCV({
                    HinhThucCV, QuanNhanId, HoTen, DonVi, SoGioQuyDoi, GhiChu
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
            const res = BaiBaoKHService.updateBaiBaoKH(
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
            const res = BaiBaoKHService.updateBaiBaoKH(id, token, updatedData);
            return res;

        },

    )
    useEffect(() => {
        setNgayQD(moment(stateBaiBaoKHDetails['ThoiDiemXuatBan']));
        // setNgayQD(convertDateToString(stateBaiBaoKHDetails['NgayQuyetDinh']));
    }, [form, stateBaiBaoKHDetails, isOpenDrawer])

    const handleOnchangeDetailNgayQD = (date) => {
        try {
            setStateBaiBaoKHDetails({
                ...stateBaiBaoKHDetails,
                ThoiDiemXuatBan: date.toISOString(),
                Quy: xacDinhQuyISO(date),
                Nam: xacDinhNamISO(date),

            })
            const nam = xacDinhNamISO(date);

            const quy = xacDinhQuyISO(date);
            setQuy(quy);
            setNam(nam);

        }
        catch { }
    }
    function xacDinhQuyISO(date) {
        const ngay = new Date(date);

        if (!isNaN(ngay.getTime())) {
            const thang = ngay.getMonth() + 1;
            console.log(thang);
            let quy;
            if (thang >= 1 && thang <= 3) {
                quy = 1;
            } else if (thang >= 4 && thang <= 6) {
                quy = 2;
            } else if (thang >= 7 && thang <= 9) {
                quy = 3;
            } else if (thang >= 10 && thang <= 12) {
                quy = 4;
            }

            return quy;
        }

        return null;
    }

    function xacDinhNamISO(date) {
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
            const nam = dateObj.getFullYear();
            console.log(nam);
            return nam;
        }
        return null;
    }
    function xacDinhHocKyISO(date) {
        const ngay = new Date(date);

        if (!isNaN(ngay.getTime())) {
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
    const handleOnchangeNgayQD = (date) => {
        try {
            setStateBaiBaoKH({
                ...stateBaiBaoKH,
                ThoiDiemXuatBan: date.toISOString(),
                Quy: xacDinhQuyISO(date),
                Nam: xacDinhNamISO(date),

            })
            const nam = xacDinhNamISO(date);

            const quy = xacDinhQuyISO(date);
            setQuy(quy);
            setNam(nam);

        }
        catch { }
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
            const res = BaiBaoKHService.updateBaiBaoKH(id, token, updatedData);
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
            const res = BaiBaoKHService.deleteBaiBaoKH(
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
            const res = BaiBaoKHService.deleteManyBaiBaoKH(
                ids,
                token)
            return res
        },
    )


    const getAllBaiBaoKHs = async () => {
        const res = await BaiBaoKHService.getAllBaiBaoKH()
        return res
    }

    // show


    const fetchGetBaiBaoKH = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]

        if (quannhanId) {

            const res = await BaiBaoKHService.getBaiBaoKHByQuanNhanId(quannhanId)

            if (res?.data) {
                setStateBaiBaoKHDetails({

                    // QuanNhanId: res?.data.QuanNhanId,
                    BaiBaoKhoaHocId: res?.data.BaiBaoKhoaHocId,

                    TenBai: res?.data.TenBai,
                    LoaiTapChiHoiThao: res?.data.LoaiTapChiHoiThao,
                    TenTapChiHoiThao: res?.data.TenTapChiHoiThao,
                    SoTapChi: res?.data.SoTapChi,
                    DiemToiDa: res?.data.DiemToiDa,
                    KinhPhiHoTro: res?.data.KinhPhiHoTro,
                    NganhXetChucDanh: res?.data.NganhXetChucDanh,
                    TapSo: res?.data.TapSo,
                    NgonNguBao: res?.data.NgonNguBao,
                    TrangBaiViet: res?.data.TrangBaiViet,
                    ThoiDiemXuatBan: res?.data.ThoiDiemXuatBan,
                    SoTacGia: res?.data.SoTacGia,
                    CacTacGia: res?.data.CacTacGia,
                    LienKet: res?.data.LienKet,
                    Quy: res?.data.Quy,
                    Nam: res?.data.Nam,
                    Tai: res?.data.Tai,
                    ThuocDeTai: res?.data.ThuocDeTai,
                    FileCM: res?.data.FileCM,
                    NhomNghienCuu: res?.data.NhomNghienCuu,
                    TrangThai: res?.data.TrangThai,
                    CacHTCV: res?.data.CacHTCV,
                    GhiChu: res?.data.GhiChu


                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateBaiBaoKHDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    const fetchGetHTCV = async () => {

        if (baibaokhId) {
            const res = await BaiBaoKHService.getDetailsBaiBaoKH(baibaokhId)


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
            // console.log("chi tiết qtct:", setStateBaiBaoKHDetails)

            return res.data.CacHTCV
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateBaiBaoKHDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateBaiBaoKHDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            setbaibaokhId(rowSelected);
            fetchGetDetailsBaiBaoKH(rowSelected);

        }
    }, [rowSelected, isOpenDrawer])
    useEffect(() => {
        if (rowSelected2 && isOpenDrawer2) {
            setIsLoadingUpdate(true);
            fetchGetDetailsHTCV(rowSelected2);
        }
    }, [rowSelected2, isOpenDrawer2])



    const handleDetailsBaiBaoKH = () => {
        setIsOpenDrawer(true)
    }
    const handleDetailsHTCV = () => {
        setIsOpenDrawer2(true)
    }


    const handleDelteManyBaiBaoKHs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                baibaokhDetails.refetch()
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



    const queryBaiBaoKH = useQuery({ queryKey: ['baibaokh'], queryFn: getAllBaiBaoKHs })
    const baibaokhDetails = useQuery(['hosoquannhanbaibaokh', quannhanId], fetchGetBaiBaoKH, { enabled: !!quannhanId })
    const HTCVDetails = useQuery(['hinhthuccongviecbaibao', baibaokhId], fetchGetHTCV, { enabled: !!baibaokhId })
    const { isLoading: isLoadingBaiBaoKH, data: quatrinhcongtacs } = queryBaiBaoKH
    const queryQuanNhan = useQuery({ queryKey: ['quannhans'], queryFn: getQuanNhanFromDonVi })
    const { isLoading: isLoadingQuanNhans, data: quannhans } = queryQuanNhan
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsBaiBaoKH} />
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
    const fetchGetDetailsBaiBaoKH = async (rowSelected) => {
        console.log("detail row");
        const res = await BaiBaoKHService.getDetailsBaiBaoKH(rowSelected)
        if (res?.data) {
            setStateBaiBaoKHDetails({
                BaiBaoKhoaHocId: res?.data.BaiBaoKhoaHocId,

                TenBai: res?.data.TenBai,
                LoaiTapChiHoiThao: res?.data.LoaiTapChiHoiThao,
                TenTapChiHoiThao: res?.data.TenTapChiHoiThao,
                SoTapChi: res?.data.SoTapChi,
                DiemToiDa: res?.data.DiemToiDa,
                KinhPhiHoTro: res?.data.KinhPhiHoTro,
                NganhXetChucDanh: res?.data.NganhXetChucDanh,
                TapSo: res?.data.TapSo,
                NgonNguBao: res?.data.NgonNguBao,
                TrangBaiViet: res?.data.TrangBaiViet,
                ThoiDiemXuatBan: res?.data.ThoiDiemXuatBan,
                SoTacGia: res?.data.SoTacGia,
                CacTacGia: res?.data.CacTacGia,
                LienKet: res?.data.LienKet,
                Quy: res?.data.Quy,
                Nam: res?.data.Nam,
                Tai: res?.data.Tai,
                ThuocDeTai: res?.data.ThuocDeTai,
                FileCM: res?.data.FileCM,
                NhomNghienCuu: res?.data.NhomNghienCuu,
                TrangThai: res?.data.TrangThai,
                CacHTCV: res?.data.CacHTCV,
                GhiChu: res?.data.GhiChu


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
    //         fetchGetDetailsBaiBaoKH(rowSelected)
    //     }
    //     setIsLoadingUpdate(false)
    // }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateBaiBaoKHDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateBaiBaoKHDetails, isModalOpen])





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
            title: 'Tiêu đề bài toán',
            dataIndex: 'TenBai',
            key: 'TenBai',
            ...getColumnSearchProps('TenBai')
        },
        {
            title: 'Tác giả',
            dataIndex: 'CacTacGia',
            key: 'CacTacGia',
        },

        {
            title: 'Tạp chí',
            dataIndex: 'TenTapChiHoiThao',
            key: 'TenTapChiHoiThao',
        },
        {
            title: 'Loại',
            dataIndex: 'LoaiTapChiHoiThao',
            key: 'LoaiTapChiHoiThao',
        },
        {
            title: 'Số tác giả',
            dataIndex: 'SoTacGia',
            key: 'SoTacGia',
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
        // {
        //     title: 'Đơn vị',
        //     dataIndex: 'DonVi',
        //     key: 'DonVi',
        // },
        {
            title: 'Điểm nghiên cứu',
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
        setStateBaiBaoKHDetails({
            BaiBaoKhoaHocId: '',
            //  QuanNhanId: '',
            TenBai: '',
            LoaiTapChiHoiThao: '',
            TenTapChiHoiThao: '',

            SoTapChi: '',
            DiemToiDa: '',
            KinhPhiHoTro: '',
            NganhXetChucDanh: '',
            TapSo: '',
            NgonNguBao: '',
            TrangBaiViet: '',
            ThoiDiemXuatBan: '',
            SoTacGia: '',
            CacTacGia: '',
            LienKet: '',
            Quy: '',
            Nam: '',
            Tai: '',
            ThuocDeTai: '',
            FileCM: '',
            NhomNghienCuu: '',
            //    TrangThai: '',
            CacHTCV: '',
            GhiChu: '',
        })
        form.resetFields()
    };
    const handleCloseDrawer2 = () => {
        setIsOpenDrawer2(false);
        setStateHTCVDetails({
            //   HinhThucCV: '',
            QuanNhanId: '',
            HoTen: '',

            DonVi: '',

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


    const handleDeleteBaiBaoKH = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                baibaokhDetails.refetch()
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
        baibaokhDetails.refetch();
        setbaibaokhId(null);
        setIsModalOpen(false);
        setStateBaiBaoKH({
            BaiBaoKhoaHocId: '',
            //  QuanNhanId: '',
            TenBai: '',
            LoaiTapChiHoiThao: '',
            TenTapChiHoiThao: '',

            SoTapChi: '',
            DiemToiDa: '',
            KinhPhiHoTro: '',
            NganhXetChucDanh: '',
            TapSo: '',
            NgonNguBao: '',
            TrangBaiViet: '',
            ThoiDiemXuatBan: '',
            SoTacGia: '',
            CacTacGia: '',
            LienKet: '',
            Quy: '',
            Nam: '',
            Tai: '',
            ThuocDeTai: '',
            FileCM: '',
            NhomNghienCuu: '',
            //    TrangThai: '',
            CacHTCV: '',
            GhiChu: '',

        })
        form.resetFields()
    };
    const handleCancel2 = () => {

        setIsModalOpen2(false);
        setStateHTCV({
            //   HinhThucCV: '',
            QuanNhanId: '',
            HoTen: '',

            DonVi: '',

            SoGioQuyDoi: '',
            GhiChu: '',
        });
        // form.resetFields()
    };

    const onFinish = () => {
        const params = {
            BaiBaoKhoaHocId: stateBaiBaoKH.BaiBaoKhoaHocId,

            TenBai: stateBaiBaoKH.TenBai,
            LoaiTapChiHoiThao: stateBaiBaoKH.LoaiTapChiHoiThao,
            TenTapChiHoiThao: stateBaiBaoKH.TenTapChiHoiThao,

            SoTapChi: stateBaiBaoKH.SoTapChi,
            DiemToiDa: stateBaiBaoKH.DiemToiDa,
            KinhPhiHoTro: stateBaiBaoKH.KinhPhiHoTro,
            NganhXetChucDanh: stateBaiBaoKH.NganhXetChucDanh,
            TapSo: stateBaiBaoKH.TapSo,
            NgonNguBao: stateBaiBaoKH.NgonNguBao,
            TrangBaiViet: stateBaiBaoKH.TrangBaiViet,
            ThoiDiemXuatBan: stateBaiBaoKH.ThoiDiemXuatBan,
            SoTacGia: stateBaiBaoKH.SoTacGia,
            CacTacGia: stateBaiBaoKH.CacTacGia,
            LienKet: stateBaiBaoKH.LienKet,
            Quy: stateBaiBaoKH.Quy,
            Nam: stateBaiBaoKH.Nam,
            Tai: stateBaiBaoKH.Tai,
            ThuocDeTai: stateBaiBaoKH.ThuocDeTai,

            CacHTCV: stateBaiBaoKH.CacHTCV,
            GhiChu: stateBaiBaoKH.GhiChu,
        }
        console.log("Finsh", stateBaiBaoKH)
        mutation.mutate(params, {
            onSettled: () => {
                // baibaokhDetails.refetch()
            }
        })
    }

    const handleChangeCheckTHCSDT = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        console.log("e: ", e.target.name, e.target.value)
        setStateBaiBaoKH({
            ...stateBaiBaoKH,
            THCSDT: checkedValue,
            [e.target.name]: e.target.value
        });
    };
    const onFinish2 = async () => {
        console.log("HTCV");
        const params = {
            //  HinhThucCV: stateHTCV.HinhThucCV,
            HoTen: stateHTCV.HoTen,
            QuanNhanId: stateHTCV.QuanNhanId,

            DonVi: stateHTCV.DonVi,

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
            const result = await BaiBaoKHService.updateHTCVLists(baibaokhId, data, user?.access_token);

            if (result.status === 'OK') {
                message.success(result.message);
                HTCVDetails.refetch();
                // handleCancel();
                //nho them baibaokhDetails.refetch()
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
        setStateBaiBaoKH({
            ...stateBaiBaoKH,
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

        setStateBaiBaoKHDetails({
            ...stateBaiBaoKHDetails,
            [e.target.name]: e.target.value
        })


    }
    const handleOnchangeDetails2 = (e) => {

        setStateHTCVDetails({
            ...stateHTCVDetails,
            [e.target.name]: e.target.value
        })


    }


    const onUpdateBaiBaoKH = () => {
        console.log("bat dau update");
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateBaiBaoKHDetails }, {
            onSettled: () => {
                baibaokhDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateBaiBaoKHDetails }, {
            onSettled: () => {
                baibaokhDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateBaiBaoKHDetails }, {
            onSettled: () => {
                baibaokhDetails.refetch()
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




    const dataTable = baibaokhDetails?.data?.length && baibaokhDetails?.data?.map((baibaokhDetails) => {
        return {
            ...baibaokhDetails,
            key: baibaokhDetails._id,
            TrangThai: getTrangThaiText(baibaokhDetails.TrangThai)
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


    // const fetchAllHinhThucHuongDan = async () => {
    //     const res = await HinhThucHuongdanService.getAllType()
    //     return res
    // }

    // const allHinhThucHuongdan = useQuery({ queryKey: ['all-hinhthuchuongdan'], queryFn: fetchAllHinhThucHuongDan })
    // const handleChangeSelect1 = (value) => {
    //     setStateBaiBaoKH({
    //         ...stateBaiBaoKH,
    //         HinhThucHuongDan: value
    //     })
    //     // console.log(stateQuanNhan)
    // }

    const handleOnchangeFileCM = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateBaiBaoKH({
            ...stateBaiBaoKH,
            FileCM: file.preview
        })
    }


    const handleOnchangeFileCMDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateBaiBaoKHDetails({
            ...stateBaiBaoKHDetails,
            FileCM: file.preview
        })
    }

    const handleChangeCheckTHCSDTDeTail = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        setStateBaiBaoKHDetails({
            ...stateBaiBaoKHDetails,
            THCSDT: checkedValue,
        });
    };
    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        //  return moment(date).format('DD/MM/YYYY');
        // Parse the ISO 8601 date string into a Date object
        const parsedDate = new Date(date);

        // Extract the day, month, and year components from the Date object
        const day = parsedDate.getDate();
        const month = parsedDate.getMonth() + 1; // Months are zero-based, so add 1
        const year = parsedDate.getFullYear();

        // Format the date components into the desired format
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }
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
    // ngon ngu

    const fetchAllNgonNgu = async () => {
        const res = await NgonNguService.getAllType()
        return res
    }

    const allNgonNgu = useQuery({ queryKey: ['all-ngonngu'], queryFn: fetchAllNgonNgu })
    const handleChangeSelectNgonNgu = (value) => {
        setStateBaiBaoKH({
            ...stateBaiBaoKH,
            NgonNguBao: value
        })

    }


    const handleChangeSelectNgonNguDetails = (value) => {
        setStateBaiBaoKHDetails({
            ...stateBaiBaoKHDetails,
            NgonNgu: value
        })

    }

    // loai tap chi
    const fetchAllLoaiTapChi = async () => {
        const res = await LoaiTapChiService.getAllType()
        return res
    }

    const allLoaiTapChi = useQuery({ queryKey: ['all-loaitapchi'], queryFn: fetchAllLoaiTapChi })
    const handleChangeSelectLoaiTapChi = (value) => {
        setStateBaiBaoKH({
            ...stateBaiBaoKH,
            LoaiTapChiHoiThao: value
        })

    }


    const handleChangeSelectLoaiTapChiDetails = (value) => {
        setStateBaiBaoKHDetails({
            ...stateBaiBaoKHDetails,
            LoaiTapChiHoiThao: value
        })

    }
    // nganhxetchucdanh
    const fetchAllNganhXetChucDanh = async () => {
        const res = await NganhXetChucDanhService.getAllType()
        return res
    }

    const allNganhXetChucDanh = useQuery({ queryKey: ['all-nxchucdanh'], queryFn: fetchAllNganhXetChucDanh })
    const handleChangeSelectNganhXetChucDanh = (value) => {
        setStateBaiBaoKH({
            ...stateBaiBaoKH,
            NganhXetChucDanh: value
        })

    }


    const handleChangeSelectNganhXetChucDanhDetails = (value) => {
        setStateBaiBaoKHDetails({
            ...stateBaiBaoKHDetails,
            NganhXetChucDanh: value
        })

    }


    return (
        <div>
            <div>
                <WrapperHeader>Bài báo khoa học</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={baibaokhDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingBaiBaoKH} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm chi tiết bài báo khoa học" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
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
                            label="Tên bài"
                            name="TenBai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.TenBai} onChange={handleOnchange} name="TenBai" />
                        </Form.Item>

                        <Form.Item
                            label="Loại tạp chí, hội thảo"
                            name="LoaiTapChiHoiThao"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateBaiBaoKH.LoaiTapChiHoiThao} onChange={handleOnchange} name="LoaiTapChiHoiThao" /> */}
                            <Select
                                name="LoaiTapChiHoiThao"

                                onChange={handleChangeSelectLoaiTapChi}
                                options={renderOptions(allLoaiTapChi?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tên loại tạp chí hội thảo"
                            name="TenTapChiHoiThao"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.TenTapChiHoiThao} onChange={handleOnchange} name="TenTapChiHoiThao" />
                        </Form.Item>
                        <Form.Item
                            label="Số tạp chí"
                            name="SoTapChi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.SoTapChi} onChange={handleOnchange} name="SoTapChi" />
                        </Form.Item>
                        <Form.Item
                            label="Điểm tối đa"
                            name="DiemToiDa"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.DiemToiDa} onChange={handleOnchange} name="DiemToiDa" />
                        </Form.Item>
                        <Form.Item
                            label="Kinh phí hỗ trợ"
                            name="KinhPhiHoTro"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.KinhPhiHoTro} onChange={handleOnchange} name="KinhPhiHoTro" />
                        </Form.Item>
                        <Form.Item
                            label="Ngành xét chức danh"
                            name="NganhXetChucDanh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="NganhXetChucDanh"

                                onChange={handleChangeSelectNganhXetChucDanh}
                                options={renderOptions(allNganhXetChucDanh?.data?.data)}
                            />
                            {/* <InputComponent value={stateBaiBaoKH.NganhXetChucDanh} onChange={handleOnchange} name="NganhXetChucDanh" /> */}
                        </Form.Item>
                        <Form.Item
                            label="Tập số"
                            name="TapSo"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.TapSo} onChange={handleOnchange} name="TapSo" />
                        </Form.Item>

                        <Form.Item
                            label="Trang bài viết"
                            name="TrangBaiViet"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.TrangBaiViet} onChange={handleOnchange} name="TrangBaiViet" />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm xuất bản"
                            // name="ThoiDiemXuatBan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateBaiBaoKH.ThoiDiemXuatBan} onChange={handleOnchange} name="ThoiDiemXuatBan" /> */}
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayQD} name="ThoiDiemXuatBan"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số tác giả"
                            name="SoTacGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.SoTacGia} onChange={handleOnchange} name="SoTacGia" />
                        </Form.Item>
                        <Form.Item
                            label="Các tác giả"
                            name="CacTacGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.CacTacGia} onChange={handleOnchange} name="CacTacGia" />
                        </Form.Item>

                        <Form.Item
                            label="Liên kết"
                            name="LienKet"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.LienKet} onChange={handleOnchange} name="LienKet" />
                        </Form.Item>
                        <Form.Item
                            label="Quý"

                        >
                            <InputComponent value={Quy} />
                        </Form.Item>
                        <Form.Item
                            label="Năm"

                        >
                            <InputComponent value={Nam} />
                        </Form.Item>

                        <Form.Item
                            label="Ngôn ngữ báo"
                            name="NgonNguBao"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="NgonNguBao"

                                onChange={handleChangeSelectNgonNgu}
                                options={renderOptions(allNgonNgu?.data?.data)}
                            />
                            {/* <InputComponent value={stateBaiBaoKH.NgonNguBao} onChange={handleOnchange} name="NgonNguBao" /> */}
                        </Form.Item>

                        <Form.Item
                            label="Thuộc đề tài"
                            name="ThuocDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.ThuocDeTai} onChange={handleOnchange} name="ThuocDeTai" />
                        </Form.Item>
                        <Form.Item
                            label="Tải"
                            name="Tai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.Tai} onChange={handleOnchange} name="Tai" />
                        </Form.Item>
                        <Form.Item
                            label="Nhóm nghiên cứu"
                            name="NhomNghienCuu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKH.NhomNghienCuu} onChange={handleOnchange} name="NhomNghienCuu" />
                        </Form.Item>



                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCM} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateBaiBaoKH?.FileCM && (
                                    <img src={stateBaiBaoKH?.FileCM} style={{
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
                        <TableComponent columns={columns3} isLoading={isLoadingBaiBaoKH} data={dataTable2} onRow={(record, rowSelected) => {
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
                            label="Số giờ"
                            name="SoGioQuyDoi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHTCV.SoGioQuyDoi} onChange={handleOnchange2} name="SoGioQuyDoi" />
                        </Form.Item>



                        <TableComponent columns={columns2} isLoading={isLoadingBaiBaoKH} data={dataTable3} onRow={(record, rowSelected) => {
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

            <DrawerComponent title='Cập nhật chi tiết bài báo khoa học' isOpen={isOpenDrawer} onClose={() => { setIsOpenDrawer(false); setbaibaokhId(null) }} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        // onFinish={onUpdateBaiBaoKH}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Tên bài"
                            name="TenBai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.TenBai} onChange={handleOnchangeDetails} name="TenBai" />
                        </Form.Item>

                        <Form.Item
                            label="Loại tạp chí, hội thảo"
                            name="LoaiTapChiHoiThao"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="LoaiTapChiHoiThao"

                                onChange={handleChangeSelectLoaiTapChiDetails}
                                options={renderOptions(allLoaiTapChi?.data?.data)}
                            />
                            {/* <InputComponent value={stateBaiBaoKHDetails.LoaiTapChiHoiThao} onChange={handleOnchangeDetails} name="LoaiTapChiHoiThao" /> */}
                        </Form.Item>
                        <Form.Item
                            label="Tên loại tạp chí hội thảo"
                            name="TenTapChiHoiThao"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.TenTapChiHoiThao} onChange={handleOnchangeDetails} name="TenTapChiHoiThao" />
                        </Form.Item>
                        <Form.Item
                            label="Số tạp chí"
                            name="SoTapChi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.SoTapChi} onChange={handleOnchangeDetails} name="SoTapChi" />
                        </Form.Item>
                        <Form.Item
                            label="Điểm tối đa"
                            name="DiemToiDa"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.DiemToiDa} onChange={handleOnchangeDetails} name="DiemToiDa" />
                        </Form.Item>
                        <Form.Item
                            label="Kinh phí hỗ trợ"
                            name="KinhPhiHoTro"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.KinhPhiHoTro} onChange={handleOnchangeDetails} name="KinhPhiHoTro" />
                        </Form.Item>
                        <Form.Item
                            label="Ngành xét chức danh"
                            name="NganhXetChucDanh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="NganhXetChucDanh"

                                onChange={handleChangeSelectNganhXetChucDanhDetails}
                                options={renderOptions(allNganhXetChucDanh?.data?.data)}
                            />
                            {/* <InputComponent value={stateBaiBaoKHDetails.NganhXetChucDanh} onChange={handleOnchangeDetails} name="NganhXetChucDanh" /> */}
                        </Form.Item>
                        <Form.Item
                            label="Tập số"
                            name="TapSo"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.TapSo} onChange={handleOnchangeDetails} name="TapSo" />
                        </Form.Item>

                        <Form.Item
                            label="Trang bài viết"
                            name="TrangBaiViet"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.TrangBaiViet} onChange={handleOnchangeDetails} name="TrangBaiViet" />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm xuất bản"
                            // name="ThoiDiemXuatBan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateBaiBaoKHDetails.ThoiDiemXuatBan} onChange={handleOnchangeDetails} name="ThoiDiemXuatBan" /> */}
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeDetailNgayQD} name="ThoiDiemXuatBan"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số tác giả"
                            name="SoTacGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.SoTacGia} onChange={handleOnchangeDetails} name="SoTacGia" />
                        </Form.Item>
                        <Form.Item
                            label="Các tác giả"
                            name="CacTacGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.CacTacGia} onChange={handleOnchangeDetails} name="CacTacGia" />
                        </Form.Item>

                        <Form.Item
                            label="Liên kết"
                            name="LienKet"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.LienKet} onChange={handleOnchangeDetails} name="LienKet" />
                        </Form.Item>
                        <Form.Item
                            label="Quý"

                        >
                            <InputComponent value={Quy} />
                        </Form.Item>
                        <Form.Item
                            label="Năm"

                        >
                            <InputComponent value={Nam} />
                        </Form.Item>

                        <Form.Item
                            label="Ngôn ngữ báo"
                            name="NgonNguBao"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="NgonNguBao"

                                onChange={handleChangeSelectNgonNguDetails}
                                options={renderOptions(allNgonNgu?.data?.data)}
                            />
                            {/* <InputComponent value={stateBaiBaoKHDetails.NgonNguBao} onChange={handleOnchangeDetails} name="NgonNguBao" /> */}
                        </Form.Item>

                        <Form.Item
                            label="Thuộc đề tài"
                            name="ThuocDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.ThuocDeTai} onChange={handleOnchangeDetails} name="ThuocDeTai" />
                        </Form.Item>
                        <Form.Item
                            label="Tải"
                            name="Tai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.Tai} onChange={handleOnchangeDetails} name="Tai" />
                        </Form.Item>
                        <Form.Item
                            label="Nhóm nghiên cứu"
                            name="NhomNghienCuu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.NhomNghienCuu} onChange={handleOnchangeDetails} name="NhomNghienCuu" />
                        </Form.Item>





                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!'}]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCMDetails} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateBaiBaoKHDetails?.FileCM && (
                                    <img src={stateBaiBaoKHDetails?.FileCM} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <TableComponent columns={columns3} isLoading={isLoadingBaiBaoKH} data={dataTable2} onRow={(record, rowSelected) => {
                            return {
                                onClick: event => {
                                    setRowSelected2(record._id);
                                }

                            };
                        }} />

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={onUpdateBaiBaoKH}>
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


                        {/* <Form.Item
                            label="MaLop"
                            name="MaLop"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails['MaLop']} onChange={handleOnchangeDetails} name="MaLop" />
                        </Form.Item>
                        <Form.Item
                            label="MaMonHoc"
                            name="MaMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.MaMonHoc} onChange={handleOnchangeDetails} name="MaMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="TenMonHoc"
                            name="TenMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.TenMonHoc} onChange={handleOnchangeDetails} name="TenMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="SoTinChi"
                            name="SoTinChi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.SoTinChi} onChange={handleOnchangeDetails} name="SoTinChi" />
                        </Form.Item>
                        <Form.Item
                            label="GioChuan"
                            name="GioChuan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.GioChuan} onChange={handleOnchangeDetails} name="GioChuan" />
                        </Form.Item>
                        <Form.Item
                            label="SiSo"
                            name="SiSo"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBaiBaoKHDetails.SiSo} onChange={handleOnchangeDetails} name="SiSo" />
                        </Form.Item> */}

                        <Form.Item
                            label="Họ và tên"
                            name="HoTen"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <InputComponent value={stateHTCVDetails.HoTen} />}
                            <InputComponent value={stateHTCVDetails.HoTen} onChange={handleOnchangeDetails2} name="HoTen" />
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
            <ModalComponent title="Xóa bài báo khoa học" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteBaiBaoKH}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa bài báo khoa học này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Xóa công việc này" open={isModalOpenDelete2} onCancel={handleCancelDelete2} onOk={handleDeleteHTCV}>
                <Loading isLoading={isLoadingDeleted2}>
                    <div>Bạn có chắc xóa hình thức công việc này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt bài báo khoa học" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt bài báo khoa học này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin bài báo khoa học" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  bài báo khoa học này không?</div>
                </Loading>
            </ModalComponent>


        </div>

    );
};

export default BaiBaoKH;
