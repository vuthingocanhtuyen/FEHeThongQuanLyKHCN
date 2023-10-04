
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions, getBase64 } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import CheckboxComponent from '../../../../components/CheckBox/CheckBox'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as BienSoanService from '../../../../services/BienSoanService';
import * as LoaiTaiLieuService from '../../../../services/LoaiTaiLieuService';
import * as NgonNguService from '../../../../services/NgonNguService';
import * as VaiTroService from '../../../../services/VaiTroService';
import * as PriorityByUserService from '../../../../services/PriorityByUserService'
import * as QuanNhanService from '../../../../services/QuanNhanService'
import * as HTCVService from '../../../../services/HTCVBienSoanService';
import { WrapperHeader, WrapperUploadFile } from '../style'
import moment from 'moment';
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const BienSoan = ({ quannhanId }) => {
    const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
    const [currentUserDonViCode, setCurrentUserDonViCode] = useState(null);
    const [htcvId, sethtcvId] = useState('')
    const [biensoanId, setbiensoanId] = useState('')
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

    const [selectedName, setSelectedName] = useState('');
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    //   const quannhanId = user.QuanNhanId;
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


        BienSoanId: '',

        Ten: '',
        LoaiTaiLieu: '',
        SoTrang: '',
        MaXuatBan: '',
        TenNhaXuatBan: '',
        NgayXuatBan: moment(),
        SoTacGia: '',
        CacTacGia: '',
        Quy: '',
        Nam: '',
        NgonNguSach: '',
        NhomNghienCuu: '',
        Tai: '',
        FileCM: '',
        CacHTCV: '',
        TrangThai: '',
        GhiChu: '',
    })
    const inittialHTCV = () => ({
        HinhThucCV: '',
        QuanNhanId: '',
        HoTen: '',
        DonVi: '',
        VaiTro: '',
        SoGioQuyDoi: '',
        Trang: '',
        GhiChu: '',
    })
    const [stateBienSoan, setStateBienSoan] = useState(inittial())
    const [stateBienSoanDetails, setStateBienSoanDetails] = useState(inittial())
    const [stateHTCVDetails, setStateHTCVDetails] = useState(inittialHTCV())
    const [stateHTCV, setStateHTCV] = useState(inittialHTCV())
    const [form] = Form.useForm();

    const mutation = useMutationHooks(

        (data) => {
            const { QuanNhanId = quannhanId, BienSoanId, Ten, LoaiTaiLieu, SoTrang, MaXuatBan, TenNhaXuatBan, NgayXuatBan, SoTacGia, CacTacGia, Quy, Nam, NgonNguSach, NhomNghienCuu, Tai, FileCM, TrangThai = 0, edituser, edittime, GhiChu } = data
            const res = BienSoanService.createBienSoan({
                BienSoanId, QuanNhanId, Ten, LoaiTaiLieu, SoTrang, MaXuatBan, TenNhaXuatBan, NgayXuatBan, SoTacGia, CacTacGia, Quy, Nam, NgonNguSach, NhomNghienCuu, Tai, FileCM, TrangThai, edituser, edittime, GhiChu
            }).then(res => {
                try {
                    setbiensoanId(res.data._id);
                    return res;
                } catch { };
            });
        }
    )
    const mutation2 = useMutationHooks(

        (data) => {
            try {
                const { HinhThucCV, QuanNhanId, HoTen, DonVi, VaiTro, Trang, SoGioQuyDoi, GhiChu } = data
                const res = HTCVService.createHTCV({
                    HinhThucCV, QuanNhanId, HoTen, DonVi, VaiTro, Trang, SoGioQuyDoi, GhiChu
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
            const res = BienSoanService.updateBienSoan(
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
            const res = BienSoanService.updateBienSoan(id, token, updatedData);
            return res;

        },

    )

    useEffect(() => {
        setNgayQD(moment(stateBienSoanDetails['NgayXuatBan']));
        // setNgayQD(convertDateToString(stateBienSoanDetails['NgayQuyetDinh']));
    }, [form, stateBienSoanDetails, isOpenDrawer])

    const handleOnchangeDetailNgayQD = (date) => {
        setStateBienSoanDetails({
            ...stateBienSoanDetails,
            NgayXuatBan: date
        })
    }
    const handleOnchangeNgayQD = (date) => {
        setStateBienSoan({
            ...stateBienSoan,
            NgayXuatBan: date
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
            const res = BienSoanService.updateBienSoan(id, token, updatedData);
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
            const res = BienSoanService.deleteBienSoan(
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
            const res = BienSoanService.deleteManyBienSoan(
                ids,
                token)
            return res
        },
    )


    const getAllBienSoans = async () => {
        const res = await BienSoanService.getAllBienSoan()
        return res
    }

    // show


    const fetchGetBienSoan = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]

        if (quannhanId) {

            const res = await BienSoanService.getBienSoanByQuanNhanId(quannhanId)

            if (res?.data) {
                setStateBienSoanDetails({
                    BienSoanId: res?.data.BienSoanId,
                    Ten: res?.data.Ten,
                    LoaiTaiLieu: res?.data.LoaiTaiLieu,
                    SoTrang: res?.data.SoTrang,
                    MaXuatBan: res?.data.MaXuatBan,
                    TenNhaXuatBan: res?.data.TenNhaXuatBan,
                    NgayXuatBan: res?.data.NgayXuatBan,
                    SoTacGia: res?.data.SoTacGia,
                    CacTacGia: res?.data.CacTacGia,
                    Quy: res?.data.Quy,
                    Nam: res?.data.Nam,
                    NgonNguSach: res?.data.NgonNguSach,
                    NhomNghienCuu: res?.data.NhomNghienCuu,
                    Tai: res?.data.Tai,
                    FileCM: res?.data.FileCM,
                    CacHTCV: res?.data.CacHTCV,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateBienSoanDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    const fetchGetHTCV = async () => {

        if (biensoanId) {
            const res = await BienSoanService.getDetailsBienSoan(biensoanId)


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
            // console.log("chi tiết qtct:", setStateBienSoanDetails)

            return res.data.CacHTCV
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateBienSoanDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateBienSoanDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            setbiensoanId(rowSelected);
            fetchGetDetailsBienSoan(rowSelected);

        }
    }, [rowSelected, isOpenDrawer])
    useEffect(() => {
        if (rowSelected2 && isOpenDrawer2) {
            setIsLoadingUpdate(true);
            fetchGetDetailsHTCV(rowSelected2);
        }
    }, [rowSelected2, isOpenDrawer2])



    const handleDetailsBienSoan = () => {
        setIsOpenDrawer(true)
    }
    const handleDetailsHTCV = () => {
        setIsOpenDrawer2(true)
    }


    const handleDelteManyBienSoans = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                biensoanDetails.refetch()
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



    const queryBienSoan = useQuery({ queryKey: ['biensoan'], queryFn: getAllBienSoans })
    const biensoanDetails = useQuery(['hosoquannhanbiensoan', quannhanId], fetchGetBienSoan, { enabled: !!quannhanId })
    const HTCVDetails = useQuery(['hinhthuccongviecbiensoan', biensoanId], fetchGetHTCV, { enabled: !!biensoanId })
    const { isLoading: isLoadingBienSoan, data: quatrinhcongtacs } = queryBienSoan
    const queryQuanNhan = useQuery({ queryKey: ['quannhans'], queryFn: getQuanNhanFromDonVi })
    const { isLoading: isLoadingQuanNhans, data: quannhans } = queryQuanNhan
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsBienSoan} />
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
    const fetchGetDetailsBienSoan = async (rowSelected) => {
        console.log("detail row");
        const res = await BienSoanService.getDetailsBienSoan(rowSelected)
        if (res?.data) {
            setStateBienSoanDetails({
                BienSoanId: res?.data.BienSoanId,
                Ten: res?.data.Ten,
                LoaiTaiLieu: res?.data.LoaiTaiLieu,
                SoTrang: res?.data.SoTrang,
                MaXuatBan: res?.data.MaXuatBan,
                TenNhaXuatBan: res?.data.TenNhaXuatBan,
                NgayXuatBan: res?.data.NgayXuatBan,
                SoTacGia: res?.data.SoTacGia,
                CacTacGia: res?.data.CacTacGia,
                Quy: res?.data.Quy,
                Nam: res?.data.Nam,
                NgonNguSach: res?.data.NgonNguSach,
                NhomNghienCuu: res?.data.NhomNghienCuu,
                Tai: res?.data.Tai,
                FileCM: res?.data.FileCM,
                CacHTCV: res?.data.CacHTCV,
                TrangThai: res?.data.TrangThai,
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
                Trang: res?.data.Trang,
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
    //         fetchGetDetailsBienSoan(rowSelected)
    //     }
    //     setIsLoadingUpdate(false)
    // }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateBienSoanDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateBienSoanDetails, isModalOpen])





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
            dataIndex: 'Ten',
            key: 'Ten',
            ...getColumnSearchProps('Ten')
        },
        {
            title: 'Tác giả',
            dataIndex: 'CacTacGia',
            key: 'CacTacGia',
        },

        {
            title: 'Loai',
            dataIndex: 'LoaiDeTai',
            key: 'LoaiDeTai',
        },
        {
            title: 'Vai trò',
            dataIndex: 'CacThanhVien',
            key: 'CacThanhVien',
        },
        {
            title: 'Số tác giả',
            dataIndex: 'SoTacGia',
            key: 'SoTacGia',
        },
        {
            title: 'Giờ chuẩn',
            dataIndex: 'SoTiet',
            key: 'SoTiet',
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
            title: 'Vai Trò',
            dataIndex: 'VaiTro',
            key: 'VaiTro',
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
        setStateBienSoanDetails({


            BienSoanId: '',

            Ten: '',
            LoaiTaiLieu: '',
            SoTrang: '',
            MaXuatBan: '',
            TenNhaXuatBan: '',
            NgayXuatBan: '',
            SoTacGia: '',
            CacTacGia: '',
            Quy: '',
            Nam: '',
            NgonNguSach: '',
            NhomNghienCuu: '',
            Tai: '',
            FileCM: '',
            CacHTCV: '',
            //TrangThai: '',
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
            Trang: '',
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


    const handleDeleteBienSoan = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                biensoanDetails.refetch()
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
        biensoanDetails.refetch();
        setbiensoanId(null);
        setIsModalOpen(false);
        setStateBienSoan({


            BienSoanId: '',

            Ten: '',
            LoaiTaiLieu: '',
            SoTrang: '',
            MaXuatBan: '',
            TenNhaXuatBan: '',
            NgayXuatBan: '',
            SoTacGia: '',
            CacTacGia: '',
            Quy: '',
            Nam: '',
            NgonNguSach: '',
            NhomNghienCuu: '',
            Tai: '',
            FileCM: '',
            CacHTCV: '',
            // TrangThai: '',
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
            Trang: '',
            DonVi: '',
            VaiTro: '',
            SoGioQuyDoi: '',
            GhiChu: '',
        });
        // form.resetFields()
    };

    const onFinish = () => {
        const params = {
            BienSoanId: stateBienSoan.BienSoanId,
            Ten: stateBienSoan.Ten,
            LoaiTaiLieu: stateBienSoan.LoaiTaiLieu,
            SoTrang: stateBienSoan.SoTrang,
            MaXuatBan: stateBienSoan.MaXuatBan,
            TenNhaXuatBan: stateBienSoan.TenNhaXuatBan,
            NgayXuatBan: stateBienSoan.NgayXuatBan,
            SoTacGia: stateBienSoan.SoTacGia,
            CacTacGia: stateBienSoan.CacTacGia,
            Quy: stateBienSoan.Quy,
            Nam: stateBienSoan.Nam,
            NgonNguSach: stateBienSoan.NgonNguSach,
            NhomNghienCuu: stateBienSoan.NhomNghienCuu,
            Tai: stateBienSoan.Tai,
            FileCM: stateBienSoan.FileCM,
            CacHTCV: stateBienSoan.CacHTCV,

            GhiChu: stateBienSoan.GhiChu,
        }
        console.log("Finsh", stateBienSoan)
        mutation.mutate(params, {
            onSettled: () => {
                // biensoanDetails.refetch()
            }
        })
    }

    const handleChangeCheckTHCSDT = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        console.log("e: ", e.target.name, e.target.value)
        setStateBienSoan({
            ...stateBienSoan,
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
            Trang: stateHTCV.Trang,
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
            const result = await BienSoanService.updateHTCVLists(biensoanId, data, user?.access_token);

            if (result.status === 'OK') {
                message.success(result.message);
                HTCVDetails.refetch();
                // handleCancel();
                //nho them biensoanDetails.refetch()
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
        setStateBienSoan({
            ...stateBienSoan,
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

        setStateBienSoanDetails({
            ...stateBienSoanDetails,
            [e.target.name]: e.target.value
        })


    }
    const handleOnchangeDetails2 = (e) => {

        setStateHTCVDetails({
            ...stateHTCVDetails,
            [e.target.name]: e.target.value
        })


    }


    const onUpdateBienSoan = () => {
        console.log("bat dau update");
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateBienSoanDetails }, {
            onSettled: () => {
                biensoanDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateBienSoanDetails }, {
            onSettled: () => {
                biensoanDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateBienSoanDetails }, {
            onSettled: () => {
                biensoanDetails.refetch()
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



    const dataTable = biensoanDetails?.data?.length && biensoanDetails?.data?.map((biensoanDetails) => {
        return {
            ...biensoanDetails,
            key: biensoanDetails._id,
            TrangThai: getTrangThaiText(biensoanDetails.TrangThai)
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
        setStateBienSoan({
            ...stateBienSoan,
            FileCM: file.preview
        })
    }


    const handleOnchangeFileCMDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateBienSoanDetails({
            ...stateBienSoanDetails,
            FileCM: file.preview
        })
    }

    const handleChangeCheckTHCSDTDeTail = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        setStateBienSoanDetails({
            ...stateBienSoanDetails,
            THCSDT: checkedValue,
        });
    };

    // vai trò
    const fetchAllVaiTro = async () => {
        const res = await VaiTroService.getAllType()
        return res
    }

    const allVaiTro = useQuery({ queryKey: ['all-vaitrobs'], queryFn: fetchAllVaiTro })
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
    //ngôn ngữ
    const fetchAllNgonNgu = async () => {
        const res = await NgonNguService.getAllType()
        return res
    }

    const allNgonNgu = useQuery({ queryKey: ['all-ngonngu'], queryFn: fetchAllNgonNgu })
    const handleChangeSelectNgonNgu = (value) => {
        setStateBienSoan({
            ...stateBienSoan,
            NgonNguSach: value
        })

    }


    const handleChangeSelectNgonNguDetails = (value) => {
        setStateBienSoanDetails({
            ...stateBienSoanDetails,
            NgonNguSach: value
        })

    }
    // loại tài liệu
    const fetchAllLoaiTaiLieu = async () => {
        const res = await LoaiTaiLieuService.getAllType()
        return res
    }

    const allLoaiTaiLieu = useQuery({ queryKey: ['all-loaitailieu'], queryFn: fetchAllLoaiTaiLieu })
    const handleChangeSelectLoaiTaiLieu = (value) => {
        setStateBienSoan({
            ...stateBienSoan,
            LoaiTaiLieu: value
        })

    }


    const handleChangeSelectLoaiTaiLieuDetails = (value) => {
        setStateBienSoanDetails({
            ...stateBienSoanDetails,
            LoaiTaiLieu: value
        })

    }


    return (
        <div>
            <div>
                <WrapperHeader>Biên soạn</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={biensoanDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingBienSoan} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm chi tiết biên soạn" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
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
                            label="Tên"
                            name="Ten"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoan.Ten} onChange={handleOnchange} name="Ten" />
                        </Form.Item>

                        <Form.Item
                            label="Loại tài liệu"
                            name="LoaiTaiLieu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateBienSoan.LoaiTaiLieu} onChange={handleOnchange} name="LoaiTaiLieu" /> */}
                            <Select
                                name="LoaiTaiLieu"

                                onChange={handleChangeSelectLoaiTaiLieu}
                                options={renderOptions(allLoaiTaiLieu?.data?.data)}
                            />

                        </Form.Item>
                        <Form.Item
                            label="Số trang"
                            name="SoTrang"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoan.SoTrang} onChange={handleOnchange} name="SoTrang" />
                        </Form.Item>
                        <Form.Item
                            label="Mã xuất bản"
                            name="MaXuatBan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoan.MaXuatBan} onChange={handleOnchange} name="MaXuatBan" />
                        </Form.Item>
                        <Form.Item
                            label="Tên nhà xuất bản"
                            name="TenNhaXuatBan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoan.TenNhaXuatBan} onChange={handleOnchange} name="TenNhaXuatBan" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày xuất bản"
                            // name="NgayXuatBan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateBienSoan.NgayXuatBan} onChange={handleOnchange} name="NgayXuatBan" /> */}
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayQD} name="NgayXuatBan"
                                format="DD/MM/YYYY"
                            />

                        </Form.Item>
                        <Form.Item
                            label="Số tác giả"
                            name="SoTacGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoan.SoTacGia} onChange={handleOnchange} name="SoTacGia" />
                        </Form.Item>
                        <Form.Item
                            label="Các tác giả"
                            name="CacTacGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoan.CacTacGia} onChange={handleOnchange} name="CacTacGia" />
                        </Form.Item>
                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoan.Quy} onChange={handleOnchange} name="Quy" />
                        </Form.Item>
                        <Form.Item
                            label="Năm"
                            name="Nam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoan.Nam} onChange={handleOnchange} name="Nam" />
                        </Form.Item>
                        <Form.Item
                            label="Ngôn ngữ sách"
                            name="NgonNguSach"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateBienSoan.NgonNguSach} onChange={handleOnchange} name="NgonNguSach" /> */}
                            <Select
                                name="NgonNguSach"

                                onChange={handleChangeSelectNgonNgu}
                                options={renderOptions(allNgonNgu?.data?.data)}
                            />

                        </Form.Item>
                        <Form.Item
                            label="Nhóm nghiên cứu"
                            name="NhomNghienCuu"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoan.NhomNghienCuu} onChange={handleOnchange} name="NhomNghienCuu" />
                        </Form.Item>





                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCM} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateBienSoan?.FileCM && (
                                    <img src={stateBienSoan?.FileCM} style={{
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
                        <TableComponent columns={columns3} isLoading={isLoadingBienSoan} data={dataTable2} onRow={(record, rowSelected) => {
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
                        <Form.Item
                            label="Số trang"
                            name="Trang"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHTCV.Trang} onChange={handleOnchange2} name="Trang" />
                        </Form.Item>




                        <TableComponent columns={columns2} isLoading={isLoadingBienSoan} data={dataTable3} onRow={(record, rowSelected) => {
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

            <DrawerComponent title='Cập nhật chi tiết biên soạn' isOpen={isOpenDrawer} onClose={() => { setIsOpenDrawer(false); setbiensoanId(null) }} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        // onFinish={onUpdateBienSoan}
                        autoComplete="on"
                        form={form}
                    >



                        <Form.Item
                            label="Tên"
                            name="Ten"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoanDetails.Ten} onChange={handleOnchangeDetails} name="Ten" />
                        </Form.Item>

                        <Form.Item
                            label="Loại tài liệu"
                            name="LoaiTaiLieu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateBienSoanDetails.LoaiTaiLieu} onChange={handleOnchangeDetails} name="LoaiTaiLieu" /> */}
                            <Select
                                name="LoaiTaiLieu"

                                onChange={handleChangeSelectLoaiTaiLieuDetails}
                                options={renderOptions(allLoaiTaiLieu?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số trang"
                            name="SoTrang"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoanDetails.SoTrang} onChange={handleOnchangeDetails} name="SoTrang" />
                        </Form.Item>
                        <Form.Item
                            label="Mã xuất bản"
                            name="MaXuatBan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoanDetails.MaXuatBan} onChange={handleOnchangeDetails} name="MaXuatBan" />
                        </Form.Item>
                        <Form.Item
                            label="Tên nhà xuất bản"
                            name="TenNhaXuatBan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoanDetails.TenNhaXuatBan} onChange={handleOnchangeDetails} name="TenNhaXuatBan" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày xuất bản"
                            // name="NgayXuatBan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateBienSoanDetails.NgayXuatBan} onChange={handleOnchangeDetails} name="NgayXuatBan" /> */}
                            <DatePicker
                                value={NgayQD}
                                onChange={handleOnchangeDetailNgayQD} name="NgayXuatBan"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số tác giả"
                            name="SoTacGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoanDetails.SoTacGia} onChange={handleOnchangeDetails} name="SoTacGia" />
                        </Form.Item>
                        <Form.Item
                            label="Các tác giả"
                            name="CacTacGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoanDetails.CacTacGia} onChange={handleOnchangeDetails} name="CacTacGia" />
                        </Form.Item>
                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoanDetails.Quy} onChange={handleOnchangeDetails} name="Quy" />
                        </Form.Item>
                        <Form.Item
                            label="Năm"
                            name="Nam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoanDetails.Nam} onChange={handleOnchangeDetails} name="Nam" />
                        </Form.Item>
                        <Form.Item
                            label="Ngôn ngữ sách"
                            name="NgonNguSach"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateBienSoanDetails.NgonNguSach} onChange={handleOnchangeDetails} name="NgonNguSach" /> */}
                            <Select
                                name="NgonNguSach"

                                onChange={handleChangeSelectNgonNguDetails}
                                options={renderOptions(allNgonNgu?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nhóm nghiên cứu"
                            name="NhomNghienCuu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateBienSoanDetails.NhomNghienCuu} onChange={handleOnchangeDetails} name="NhomNghienCuu" />
                        </Form.Item>





                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!'}]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCMDetails} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateBienSoanDetails?.FileCM && (
                                    <img src={stateBienSoanDetails?.FileCM} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <TableComponent columns={columns3} isLoading={isLoadingBienSoan} data={dataTable2} onRow={(record, rowSelected) => {
                            return {
                                onClick: event => {
                                    setRowSelected2(record._id);
                                }

                            };
                        }} />

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={onUpdateBienSoan}>
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
                            label="Trang"
                            name="Trang"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <InputComponent value={stateHTCVDetails.Trang} />}
                            <InputComponent value={stateHTCVDetails.Trang} onChange={handleOnchangeDetails2} name="Trang" />
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
            <ModalComponent title="Xóa biên soạn" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteBienSoan}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa biên soạn này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Xóa công việc này" open={isModalOpenDelete2} onCancel={handleCancelDelete2} onOk={handleDeleteHTCV}>
                <Loading isLoading={isLoadingDeleted2}>
                    <div>Bạn có chắc xóa hình thức công việc này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt biên soạn" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt biên soạn này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin biên soạn" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  biên soạn này không?</div>
                </Loading>
            </ModalComponent>


        </div>

    );
};

export default BienSoan;
