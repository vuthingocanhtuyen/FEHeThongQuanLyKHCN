
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions, getBase64 } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import CheckboxComponent from '../../../../components/CheckBox/CheckBox'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as HoatDongKhacService from '../../../../services/HoatDongNCKhacService';
import * as HinhThucHuongdanService from '../../../../services/HinhThucHuongDanService';
import * as PriorityByUserService from '../../../../services/PriorityByUserService'
import * as QuanNhanService from '../../../../services/QuanNhanService'
import * as HTCVService from '../../../../services/HTCVHoatDongNCKhacService';

import * as NhomHoatDongNCService from '../../../../services/NhomHoatDongNCService';
import * as LoaiHoatDongService from '../../../../services/LoaiHoatDongService';
import * as VaiTroService from '../../../../services/VaiTroService';
import { WrapperHeader, WrapperUploadFile } from '../style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'
import moment from 'moment';
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const HoatDongKhac = ({ quannhanId }) => {
    const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
    const [currentUserDonViCode, setCurrentUserDonViCode] = useState(null);
    const [htcvId, sethtcvId] = useState('')
    const [hoatdongkhacId, sethoatdongkhacId] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [rowSelected2, setRowSelected2] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isOpenDrawer2, setIsOpenDrawer2] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isModalOpenDelete2, setIsModalOpenDelete2] = useState(false)
    const [NgayQD, setNgayQD] = useState('');
    const [Nam, setNam] = useState('');
    const [Quy, setQuy] = useState('');
    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)

    const [stateNhomNghienCuu, setStateNhomNghienCuu] = useState({
        NhomNghienCuu: ' ',
        LoaiHoatDong: '  '
        // replace defaultValue with your desired default value
    });
    const [stateNhomNghienCuuDetails, setStateNhomNghienCuuDetails] = useState({});
    const [selectedName, setSelectedName] = useState('');
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    // const quannhanId = user.QuanNhanId;
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
        HoatDongKhacId: '',

        NhomNghienCuu: '',
        LoaiHoatDong: '',
        NoiDungThucHien: '',
        MoTaThem: '',
        ThoiDiemThucHien: moment(),
        Quy: '',
        Nam: '',
        SoLuongTacGia: '',
        FileCM: '',
        Tai: '',
        TrangThai: '',
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
    const [stateHoatDongKhac, setStateHoatDongKhac] = useState(inittial())
    const [stateHoatDongKhacDetails, setStateHoatDongKhacDetails] = useState(inittial())
    const [stateHTCVDetails, setStateHTCVDetails] = useState(inittialHTCV())
    const [stateHTCV, setStateHTCV] = useState(inittialHTCV())
    const [form] = Form.useForm();

    const mutation = useMutationHooks(

        (data) => {
            const { QuanNhanId = quannhanId, HoatDongKhacId, NhomNghienCuu, LoaiHoatDong, NoiDungThucHien, MoTaThem, ThoiDiemThucHien, Quy, Nam, SoLuongTacGia, FileCM, Tai, TrangThai = 0, edituser, edittime, GhiChu } = data
            const res = HoatDongKhacService.createHoatDongKhac({
                HoatDongKhacId, QuanNhanId, NhomNghienCuu, LoaiHoatDong, NoiDungThucHien, MoTaThem, ThoiDiemThucHien, Quy, Nam, SoLuongTacGia, FileCM, Tai, TrangThai, edituser, edittime, GhiChu
            }).then(res => {
                try {
                    sethoatdongkhacId(res.data._id);
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

    useEffect(() => {
        setNgayQD(moment(stateHoatDongKhacDetails['ThoiDiemThucHien']));
        // setNgayQD(convertDateToString(stateHoatDongKhacDetails['NgayQuyetDinh']));
    }, [form, stateHoatDongKhacDetails, isOpenDrawer])

    const handleOnchangeDetailNgayQD = (date) => {
        try {
            setStateHoatDongKhacDetails({
                ...stateHoatDongKhacDetails,
                ThoiDiemThucHien: date.toISOString(),
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
    const handleOnchangeNgayQD = (date) => {
        try {
            setStateHoatDongKhac({
                ...stateHoatDongKhac,
                ThoiDiemThucHien: date.toISOString(),
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
    const mutationUpdate = useMutationHooks(
        (data) => {

            const { id,
                token,
                ...rests } = data
            const res = HoatDongKhacService.updateHoatDongKhac(
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
            const res = HoatDongKhacService.updateHoatDongKhac(id, token, updatedData);
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
            const res = HoatDongKhacService.updateHoatDongKhac(id, token, updatedData);
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
            const res = HoatDongKhacService.deleteHoatDongKhac(
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
            const res = HoatDongKhacService.deleteManyHoatDongKhac(
                ids,
                token)
            return res
        },
    )


    const getAllHoatDongKhacs = async () => {
        const res = await HoatDongKhacService.getAllHoatDongKhac()
        return res
    }

    // show


    const fetchGetHoatDongKhac = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]

        if (quannhanId) {

            const res = await HoatDongKhacService.getHoatDongKhacByQuanNhanId(quannhanId)

            if (res?.data) {
                setStateHoatDongKhacDetails({
                    HoatDongKhacId: res?.data.HoatDongKhacId,

                    NhomNghienCuu: res?.data.NhomNghienCuu,
                    LoaiHoatDong: res?.data.LoaiHoatDong,
                    NoiDungThucHien: res?.data.NoiDungThucHien,
                    MoTaThem: res?.data.MoTaThem,
                    ThoiDiemThucHien: res?.data.ThoiDiemThucHien,
                    Quy: res?.data.Quy,
                    Nam: res?.data.Nam,
                    SoLuongTacGia: res?.data.SoLuongTacGia,

                    Tai: res?.data.Tai,
                    FileCM: res?.data.FileCM,
                    TrangThai: res?.data.TrangThai,
                    CacHTCV: res?.data.CacHTCV,
                    GhiChu: res?.data.GhiChu,


                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateHoatDongKhacDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    const fetchGetHTCV = async () => {

        if (hoatdongkhacId) {
            const res = await HoatDongKhacService.getDetailsHoatDongKhac(hoatdongkhacId)


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
            // console.log("chi tiết qtct:", setStateHoatDongKhacDetails)

            return res.data.CacHTCV
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateHoatDongKhacDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateHoatDongKhacDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            sethoatdongkhacId(rowSelected);
            fetchGetDetailsHoatDongKhac(rowSelected);

        }
    }, [rowSelected, isOpenDrawer])
    useEffect(() => {
        if (rowSelected2 && isOpenDrawer2) {
            setIsLoadingUpdate(true);
            fetchGetDetailsHTCV(rowSelected2);
        }
    }, [rowSelected2, isOpenDrawer2])



    const handleDetailsHoatDongKhac = () => {
        setIsOpenDrawer(true)
    }
    const handleDetailsHTCV = () => {
        setIsOpenDrawer2(true)
    }


    const handleDelteManyHoatDongKhacs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                hoatdongkhacDetails.refetch()
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



    const queryHoatDongKhac = useQuery({ queryKey: ['hoatdongkhac'], queryFn: getAllHoatDongKhacs })
    const hoatdongkhacDetails = useQuery(['hosoquannhanhoatdongkhac', quannhanId], fetchGetHoatDongKhac, { enabled: !!quannhanId })
    const HTCVDetails = useQuery(['hinhthuccongviechoatdongkhac', hoatdongkhacId], fetchGetHTCV, { enabled: !!hoatdongkhacId })
    const { isLoading: isLoadingHoatDongKhac, data: quatrinhcongtacs } = queryHoatDongKhac
    const queryQuanNhan = useQuery({ queryKey: ['quannhans'], queryFn: getQuanNhanFromDonVi })
    const { isLoading: isLoadingQuanNhans, data: quannhans } = queryQuanNhan
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsHoatDongKhac} />
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
    const fetchGetDetailsHoatDongKhac = async (rowSelected) => {
        console.log("detail row");
        const res = await HoatDongKhacService.getDetailsHoatDongKhac(rowSelected)
        if (res?.data) {
            setStateHoatDongKhacDetails({
                HoatDongKhacId: res?.data.HoatDongKhacId,

                NhomNghienCuu: res?.data.NhomNghienCuu,
                LoaiHoatDong: res?.data.LoaiHoatDong,
                NoiDungThucHien: res?.data.NoiDungThucHien,
                MoTaThem: res?.data.MoTaThem,
                ThoiDiemThucHien: res?.data.ThoiDiemThucHien,
                Quy: res?.data.Quy,
                Nam: res?.data.Nam,
                SoLuongTacGia: res?.data.SoLuongTacGia,

                Tai: res?.data.Tai,
                FileCM: res?.data.FileCM,
                TrangThai: res?.data.TrangThai,
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
    //         fetchGetDetailsHoatDongKhac(rowSelected)
    //     }
    //     setIsLoadingUpdate(false)
    // }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateHoatDongKhacDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateHoatDongKhacDetails, isModalOpen])





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
            title: 'Loại',
            dataIndex: 'LoaiHoatDong',
            key: 'LoaiHoatDong',
            ...getColumnSearchProps('LoaiHoatDong')
        },
        {
            title: 'Nội dung công viêc',
            dataIndex: 'MoTaThem',
            key: 'MoTaThem',
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
            title: 'Vai trò',
            dataIndex: 'VaiTro',
            key: 'VaiTro',
        },
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
            dataIndex: 'MaQuanNhan',
            key: 'MaQuanNhan',
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
        setStateHoatDongKhacDetails({
            HoatDongKhacId: '',

            NhomNghienCuu: '',
            LoaiHoatDong: '',
            NoiDungThucHien: '',
            MoTaThem: '',
            ThoiDiemThucHien: '',
            Quy: '',
            Nam: '',
            SoLuongTacGia: '',
            FileCM: '',
            Tai: '',
            // TrangThai: '',
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


    const handleDeleteHoatDongKhac = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                hoatdongkhacDetails.refetch()
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
        hoatdongkhacDetails.refetch();
        sethoatdongkhacId(null);
        setIsModalOpen(false);
        setStateHoatDongKhac({
            HoatDongKhacId: '',

            NhomNghienCuu: '',
            LoaiHoatDong: '',
            NoiDungThucHien: '',
            MoTaThem: '',
            ThoiDiemThucHien: '',
            Quy: '',
            Nam: '',
            SoLuongTacGia: '',
            FileCM: '',
            Tai: '',
            //   TrangThai: '',
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

            HoatDongKhacId: stateHoatDongKhac.HoatDongKhacId,

            NhomNghienCuu: stateHoatDongKhac.NhomNghienCuu,
            LoaiHoatDong: stateHoatDongKhac.LoaiHoatDong,
            NoiDungThucHien: stateHoatDongKhac.NoiDungThucHien,
            MoTaThem: stateHoatDongKhac.MoTaThem,
            ThoiDiemThucHien: stateHoatDongKhac.ThoiDiemThucHien,
            Quy: stateHoatDongKhac.Quy,
            Nam: stateHoatDongKhac.Nam,
            SoLuongTacGia: stateHoatDongKhac.SoLuongTacGia,



            //  TrangThai: stateHoatDongKhac.TrangThai,


            Tai: stateHoatDongKhac.Tai,
            FileCM: stateHoatDongKhac.FileCM,
            CacHTCV: stateHoatDongKhac.CacHTCV,
            GhiChu: stateHoatDongKhac.GhiChu,
        }
        console.log("Finsh", stateHoatDongKhac)
        mutation.mutate(params, {
            onSettled: () => {
                // hoatdongkhacDetails.refetch()
            }
        })
    }

    const handleChangeCheckTHCSDT = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        console.log("e: ", e.target.name, e.target.value)
        setStateHoatDongKhac({
            ...stateHoatDongKhac,
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
            const result = await HoatDongKhacService.updateHTCVLists(hoatdongkhacId, data, user?.access_token);

            if (result.status === 'OK') {
                message.success(result.message);
                HTCVDetails.refetch();
                // handleCancel();
                //nho them hoatdongkhacDetails.refetch()
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
        setStateHoatDongKhac({
            ...stateHoatDongKhac,
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

        setStateHoatDongKhacDetails({
            ...stateHoatDongKhacDetails,
            [e.target.name]: e.target.value
        })


    }
    const handleOnchangeDetails2 = (e) => {

        setStateHTCVDetails({
            ...stateHTCVDetails,
            [e.target.name]: e.target.value
        })


    }


    const onUpdateHoatDongKhac = () => {
        console.log("bat dau update");
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateHoatDongKhacDetails }, {
            onSettled: () => {
                hoatdongkhacDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateHoatDongKhacDetails }, {
            onSettled: () => {
                hoatdongkhacDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateHoatDongKhacDetails }, {
            onSettled: () => {
                hoatdongkhacDetails.refetch()
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



    const dataTable = hoatdongkhacDetails?.data?.length && hoatdongkhacDetails?.data?.map((hoatdongkhacDetails) => {
        return {
            ...hoatdongkhacDetails,
            key: hoatdongkhacDetails._id,
            TrangThai: getTrangThaiText(hoatdongkhacDetails.TrangThai)
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
        setStateHoatDongKhac({
            ...stateHoatDongKhac,
            HinhThucHuongDan: value
        })
        // console.log(stateQuanNhan)
    }

    const handleOnchangeFileCM = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateHoatDongKhac({
            ...stateHoatDongKhac,
            FileCM: file.preview
        })
    }


    const handleOnchangeFileCMDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateHoatDongKhacDetails({
            ...stateHoatDongKhacDetails,
            FileCM: file.preview
        })
    }
    const filterOptions = (options) => {
        const uniqueOptions = [];
        const optionValues = new Set();

        if (options) { // Add a check for undefined or null options
            options.forEach((option) => {
                if (!optionValues.has(option)) {
                    uniqueOptions.push(option);
                    optionValues.add(option);
                }
            });
        }

        return uniqueOptions;
    };



    const handleChangeCheckTHCSDTDeTail = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        setStateHoatDongKhacDetails({
            ...stateHoatDongKhacDetails,
            THCSDT: checkedValue,
        });
    };
    // vai trò
    const fetchAllVaiTro = async () => {
        const res = await VaiTroService.getAllType()
        return res
    }

    const allVaiTro = useQuery({ queryKey: ['all-vaitronck'], queryFn: fetchAllVaiTro })
    const handleChangeSelectVaiTro = (value) => {
        setStateHTCV({
            ...stateHTCV,
            VaiTro: value
        })

    }


    const handleChangeSelectVaiTroDetails = (value) => {
        setStateHTCVDetails({
            ...stateHTCVDetails,
            VaiTro: value
        })

    }
    // loại hoạt động
    const fetchAllLoaiHoatDong = async () => {
        const res = await NhomHoatDongNCService.getAllTypeLoaiHoatDong()
        return res
    }

    const allLoaiHoatDong = useQuery({ queryKey: ['all-loaihoatdong'], queryFn: fetchAllLoaiHoatDong })
    const handleChangeSelectLoaiHoatDong = (value) => {
        setStateHoatDongKhac({
            ...stateHoatDongKhac,
            LoaiHoatDong: value
        })

    }


    const handleChangeSelectLoaiHoatDongDetails = (value) => {
        setStateHoatDongKhacDetails({
            ...stateHoatDongKhacDetails,
            LoaiHoatDong: value
        })

    }
    // nhos óốạt động nc
    const fetchAllNhomHoatDongNC = async () => {
        const res = await NhomHoatDongNCService.getAllTypeNhomHoatDong()
        console.log(" e nhóm nc: ", res)
        return res
    }
    const fetchAllCapHoiDong = async () => {
        const res = await NhomHoatDongNCService.getAllNhomHoatDongNC()
        console.log(" nhóm hội đồng: ", res)
        return res
    }

    const queryNhom = useQuery({ queryKey: ['nhomhd'], queryFn: fetchAllNhomHoatDongNC })
    const queryDeTailCapHoiDong = useQuery({ queryKey: ['detailnhomhoatdongs'], queryFn: fetchAllCapHoiDong })
    const { isLoading: isLoadingNhomHoatDongs, data: detailnhomhoatdongs } = queryDeTailCapHoiDong
    console.log("queryNhom nc:", queryNhom.data)
    console.log("query nc:", queryDeTailCapHoiDong.data)
    const dataTableNhom = detailnhomhoatdongs?.data?.length > 0 && detailnhomhoatdongs?.data?.map((detailnhomhoatdong) => {
        return {
            ...detailnhomhoatdong,
            key: detailnhomhoatdong._id,
        }
    })
    console.log("datableb nc:", dataTableNhom.data, dataTableNhom)

    const handleChangeSelectNhomHoatDongNC = (value) => {
        const selectedNhom = value;

        console.log("value nhóm hđ:", selectedNhom);

        const filteredDataTable = dataTableNhom.filter((item) => {
            console.log("item nhóm hđ:", item.TenNhomHoatDongNC, selectedNhom, item);
            console.log("tem ss:", item.TenNhomHoatDongNC, selectedNhom);
            return item.TenNhomHoatDongNC === selectedNhom;

        });
        console.log("Cấp hội đồng detail:", filteredDataTable);
        const tenLoaiHoatDongOptions = filteredDataTable.map((option) => option.LoaiHoatDong);

        setStateNhomNghienCuu((prevState) => ({
            ...prevState,
            TenNhomHoatDongNC: value,
            LoaiHoatDong: tenLoaiHoatDongOptions[0],
            tenTenLoaiHoatDongOptions: tenLoaiHoatDongOptions,
        }));

        setStateHoatDongKhac((prevState) => ({
            ...prevState,
            NhomNghienCuu: value,
        }));

        console.log("Loại detail hội đồng:", tenLoaiHoatDongOptions);

    }


    const handleChangeSelectNhomHoatDongNCDetails = (value) => {
        const selectedNhom = value;

        console.log("detail nhóm hđ:", selectedNhom);

        const filteredDataTable = dataTableNhom.filter((item) => {
            // console.log("item detailnhóm hđ:", item.TenNhomHoatDongNC, item);
            return item.TenNhomHoatDongNC === selectedNhom;
        });
        console.log(" nhóm nc detail:", filteredDataTable);
        const tenLoaiHoatDongOptions = filteredDataTable.map((option) => option.LoaiHoatDong);

        setStateNhomNghienCuuDetails((prevState) => ({
            ...prevState,
            TenNhomHoatDongNC: value,
            LoaiHoatDong: tenLoaiHoatDongOptions[0],
            tenTenLoaiHoatDongOptions: tenLoaiHoatDongOptions,
        }));

        setStateHoatDongKhacDetails((prevState) => ({
            ...prevState,
            NhomNghienCuu: value,
        }));

        console.log("Loại detail :", tenLoaiHoatDongOptions);


    }
    return (
        <div>
            <div>
                <WrapperHeader>Hoạt động nghiên cứu khác</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={hoatdongkhacDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingHoatDongKhac} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm chi tiết hoạt động nghiên cứu khác" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
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
                            label="Nhóm nghiên cứu"
                            name="NhomNghienCuu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHoatDongKhac.NhomNghienCuu} onChange={handleOnchange} name="NhomNghienCuu" /> */}
                            <Select
                                name="NhomNghienCuu"

                                onChange={handleChangeSelectNhomHoatDongNC}
                                options={renderOptions(queryNhom?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Loại hoạt động"
                            name="LoaiHoatDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHoatDongKhac.LoaiHoatDong} onChange={handleOnchange} name="LoaiHoatDong" /> */}
                            <Select
                                name="LoaiHoatDong"
                                value={stateNhomNghienCuu.LoaiHoatDong}
                                onChange={handleChangeSelectLoaiHoatDong}
                                options={renderOptions(allLoaiHoatDong?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nội dung thực hiện"
                            name="NoiDungThucHien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHoatDongKhac.NoiDungThucHien} onChange={handleOnchange} name="NoiDungThucHien" />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả thêm"
                            name="MoTaThem"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHoatDongKhac.MoTaThem} onChange={handleOnchange} name="MoTaThem" />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng tác giả"
                            name="SoLuongTacGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHoatDongKhac.SoLuongTacGia} onChange={handleOnchange} name="SoLuongTacGia" />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm thực hiện"
                            // name="ThoiDiemThucHien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayQD} name="ThoiDiemThucHien"
                                format="DD/MM/YYYY"
                            />
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
                            label="Tải"
                            name="Tai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHoatDongKhac.Tai} onChange={handleOnchange} name="Tai" />
                        </Form.Item>

                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCM} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateHoatDongKhac?.FileCM && (
                                    <img src={stateHoatDongKhac?.FileCM} style={{
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
                        <TableComponent columns={columns3} isLoading={isLoadingHoatDongKhac} data={dataTable2} onRow={(record, rowSelected) => {
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



                        <TableComponent columns={columns2} isLoading={isLoadingHoatDongKhac} data={dataTable3} onRow={(record, rowSelected) => {
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

            <DrawerComponent title='Cập nhật chi tiết hoạt động nghiên cứu khác' isOpen={isOpenDrawer} onClose={() => { setIsOpenDrawer(false); sethoatdongkhacId(null) }} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        // onFinish={onUpdateHoatDongKhac}
                        autoComplete="on"
                        form={form}
                    >

                        <Form.Item
                            label="Nhóm nghiên cứu"
                            name="NhomNghienCuu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHoatDongKhacDetails.NhomNghienCuu} onChange={handleOnchangeDetails} name="NhomNghienCuu" /> */}
                            <Select
                                name="NhomNghienCuu"

                                onChange={handleChangeSelectNhomHoatDongNCDetails}
                                options={renderOptions(queryNhom?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Loại hoạt động"
                            name="LoaiHoatDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHoatDongKhacDetails.LoaiHoatDong} onChange={handleOnchangeDetails} name="LoaiHoatDong" /> */}
                            <Select
                                name="LoaiHoatDong"
                                value={stateNhomNghienCuuDetails.LoaiHoatDong}
                                onChange={handleChangeSelectLoaiHoatDongDetails}
                                options={filterOptions(stateNhomNghienCuuDetails.tenTenLoaiHoatDongOptions).map((option) => ({
                                    label: option,
                                    value: option,
                                }))}
                            />

                        </Form.Item>
                        <Form.Item
                            label="Nội dung thực hiện"
                            name="NoiDungThucHien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHoatDongKhacDetails.NoiDungThucHien} onChange={handleOnchangeDetails} name="NoiDungThucHien" />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả thêm"
                            name="MoTaThem"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHoatDongKhacDetails.MoTaThem} onChange={handleOnchangeDetails} name="MoTaThem" />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng tác giả"
                            name="SoLuongTacGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHoatDongKhacDetails.SoLuongTacGia} onChange={handleOnchangeDetails} name="SoLuongTacGia" />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm thực hiện"
                            //  name="ThoiDiemThucHien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayQD}
                                onChange={handleOnchangeDetailNgayQD} name="ThoiDiemThucHien"
                                format="DD/MM/YYYY"
                            />
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
                            label="Tải"
                            name="Tai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHoatDongKhacDetails.Tai} onChange={handleOnchangeDetails} name="Tai" />
                        </Form.Item>
                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!'}]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCMDetails} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateHoatDongKhacDetails?.FileCM && (
                                    <img src={stateHoatDongKhacDetails?.FileCM} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <TableComponent columns={columns3} isLoading={isLoadingHoatDongKhac} data={dataTable2} onRow={(record, rowSelected) => {
                            return {
                                onClick: event => {
                                    setRowSelected2(record._id);
                                }

                            };
                        }} />

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={onUpdateHoatDongKhac}>
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
                            {false && <InputComponent value={stateHTCVDetails.VaiTro} />}
                            {/* <InputComponent value={stateHTCVDetails.VaiTro} onChange={handleOnchangeDetails2} name="VaiTro" /> */}
                            <Select
                                name="VaiTro"

                                onChange={handleChangeSelectVaiTroDetails}
                                options={renderOptions(allVaiTro?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ"
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
            <ModalComponent title="Xóa hoạt động nghiên cứu khác" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteHoatDongKhac}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa hoạt động nghiên cứu khác này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Xóa công việc này" open={isModalOpenDelete2} onCancel={handleCancelDelete2} onOk={handleDeleteHTCV}>
                <Loading isLoading={isLoadingDeleted2}>
                    <div>Bạn có chắc xóa hình thức công việc này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt hoạt động nghiên cứu khác" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt hoạt động nghiên cứu khác này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin hoạt động nghiên cứu khác" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  hoạt động nghiên cứu khác này không?</div>
                </Loading>
            </ModalComponent>


        </div>

    );
};

export default HoatDongKhac;
