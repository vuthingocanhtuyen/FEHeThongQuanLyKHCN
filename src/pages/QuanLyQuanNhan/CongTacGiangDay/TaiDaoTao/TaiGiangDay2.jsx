
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as TaiGiangDayService from '../../../../services/TaiGiangDayService';
import * as HinhThucHuongdanService from '../../../../services/HinhThucHuongDanService';
import * as PriorityByUserService from '../../../../services/PriorityByUserService'
import * as QuanNhanService from '../../../../services/QuanNhanService'
import * as HTCVService from '../../../../services/HTCVService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
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
        SoTiet: '',
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
            const { code, QuanNhanId = quannhanId, MaLop, MaMonHoc, TenMonHoc, SoTinChi, GioChuan, SiSo, HTDT, KetThuc,Quy, Nam,HocKy,HTThi,SoTiet,FileCM,TrangThai, edituser, edittime, GhiChu  } = data
            const res = TaiGiangDayService.createTaiGiangDay({
                code, QuanNhanId, MaLop, MaMonHoc, TenMonHoc, SoTinChi, GioChuan, SiSo, HTDT, KetThuc,Quy, Nam,HocKy,HTThi,SoTiet,FileCM,TrangThai, edituser, edittime, GhiChu 
            }).then(res => {
                try{
                settaigiangdayId(res.data._id);
                return res;
            }catch{};
            });
        }
    )
    const mutation2 = useMutationHooks(
        
        (data) => {
            try{
            const { HinhThucCV, QuanNhanId,HoTen,KhoiLuongCV,DonVi,SoTiet,SoGioQuyDoi, GhiChu } = data
            const res = HTCVService.createHTCV({
                HinhThucCV, QuanNhanId,HoTen,KhoiLuongCV,DonVi,SoTiet,SoGioQuyDoi, GhiChu
            }).then(res => {
                sethtcvId(res.data._id);
                return res;
            });}
            catch{}
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
                SoTiet: res?.data.SoTiet,
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
            title: 'TenMonHoc',
            dataIndex: 'TenMonHoc',
            key: 'TenMonHoc',
            ...getColumnSearchProps('TenMonHoc')
        },
        {
            title: 'SiSo',
            dataIndex: 'SiSo',
            key: 'SiSo',
        },

        {
            title: 'MaLop',
            dataIndex: 'MaLop',
            key: 'MaLop',
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
            title: 'HinhThucCV',
            dataIndex: 'HinhThucCV',
            key: 'HinhThucCV',
        },
        {
            title: 'HoTen',
            dataIndex: 'HoTen',
            key: 'HoTen',
        },

        {
            title: 'KhoiLuongCV',
            dataIndex: 'KhoiLuongCV',
            key: 'KhoiLuongCV',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'TrangThai',
            key: 'TrangThai',
        },
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
            title: 'MaQuanNhan',
            dataIndex: 'MaQuanNhan',
            key: 'MaQuanNhan',
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
            HoTen:name,
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
        SoTiet: '',
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
            SoTiet: '',
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
            KetThuc: stateTaiGiangDay.KetThuc,
            Quy: stateTaiGiangDay.Quy,
            Nam: stateTaiGiangDay.Nam,
            HocKy: stateTaiGiangDay.HocKy,
            HTThi: stateTaiGiangDay.HTThi,
            SoTiet: stateTaiGiangDay.SoTiet,
            FileCM: stateTaiGiangDay.FileCM,
            THCSDT: stateTaiGiangDay.THCSDT,
            TrangThai: stateTaiGiangDay.TrangThai,
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
    const onFinish2 = async () => {
        console.log("HTCV");
        const params = {
            HinhThucCV: stateHTCV.HinhThucCV,
            HoTen: stateHTCV.HoTen,
            QuanNhanId:stateHTCV.QuanNhanId,
            KhoiLuongCV:stateHTCV.KhoiLuongCV,
            DonVi:stateHTCV.DonVi,
            SoTiet:stateHTCV.SoTiet,
            SoGioQuyDoi:stateHTCV.SoGioQuyDoi,
            GhiChu:stateHTCV.GhiChu,
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
        setStateTaiGiangDay({
            ...stateTaiGiangDay,
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
       
        setStateTaiGiangDayDetails({
            ...stateTaiGiangDayDetails,
            [e.target.name]: e.target.value
        })

        
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
    const onUpdateHTCV = () => {
        console.log("bat dau update");
        mutationUpdate2.mutate({ id: rowSelected2, token: user?.access_token, ...stateHTCVDetails }, {
            onSettled: () => {
                HTCVDetails.refetch()
            }
        })
    }
    

    const dataTable = taigiangdayDetails?.data?.length && taigiangdayDetails?.data?.map((taigiangdayDetails) => {
        return { ...taigiangdayDetails, key: taigiangdayDetails._id }
    })
    const dataTable2 = HTCVDetails?.data?.length && HTCVDetails?.data?.map((HTCVDetails) => {
        return { ...HTCVDetails, key: HTCVDetails._id }
    })
    const dataTable3 = quannhans?.data?.length && quannhans?.data?.map((quannhan) => {
        return { ...quannhan, key: quannhan._id }
      })
    
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
        setStateTaiGiangDay({
            ...stateTaiGiangDay,
            HinhThucHuongDan: value
        })
        // console.log(stateQuanNhan)
    }

    return (
        <div>
            <div>
                <WrapperHeader>Tải hướng dẫn</WrapperHeader>
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
            <ModalComponent forceRender title="Thêm chi tiết tải hướng dẫn" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
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
                            label="MaLop"
                            name="MaLop"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay['MaLop']} onChange={handleOnchange} name="MaLop" />
                        </Form.Item>

                        <Form.Item
                            label="MaMonHoc"
                            name="MaMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.MaMonHoc} onChange={handleOnchange} name="MaMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="TenMonHoc"
                            name="TenMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.TenMonHoc} onChange={handleOnchange} name="TenMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="SoTinChi"
                            name="SoTinChi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.SoTinChi} onChange={handleOnchange} name="SoTinChi" />
                        </Form.Item>
                        <Form.Item
                            label="GioChuan"
                            name="GioChuan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.GioChuan} onChange={handleOnchange} name="GioChuan" />
                        </Form.Item>
                        <Form.Item
                            label="SiSo"
                            name="SiSo"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.SiSo} onChange={handleOnchange} name="SiSo" />
                        </Form.Item>
                
                        <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.TrangThai} onChange={handleOnchange} name="TrangThai" />
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

            <ModalComponent forceRender title="Thêm hình thức công việc" open={isModalOpen2} onCancel={handleCancel2} footer={null} width="80%">
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        // onFinish={onFinish2}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="HinhThucCV"
                            name="HinhThucCV"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHTCV.HinhThucCV} onChange={handleOnchange2} name="HinhThucCV" />
                        </Form.Item>
                        <Form.Item label="Name" name="HoTen">
                            {selectedName}
                    
                        </Form.Item>
                        
                        
                        <TableComponent columns={columns2} isLoading={isLoadingTaiGiangDay} data={dataTable3} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                // setRowSelected(record._id);
                            }

                        };
                        }} />
                        
                        
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={() => {onFinish2();}}>
                                Ghi
                            </Button>
                        </Form.Item>

                    </Form>
                </Loading>
            </ModalComponent>        
            
            <DrawerComponent title='Cập nhật chi tiết tải hướng dẫn' isOpen={isOpenDrawer}  onClose={() => {setIsOpenDrawer(false);settaigiangdayId(null)}} width="70%">
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
                            label="MaLop"
                            name="MaLop"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails['MaLop']} onChange={handleOnchangeDetails} name="MaLop" />
                        </Form.Item>
                        <Form.Item
                            label="MaMonHoc"
                            name="MaMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.MaMonHoc} onChange={handleOnchangeDetails} name="MaMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="TenMonHoc"
                            name="TenMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.TenMonHoc} onChange={handleOnchangeDetails} name="TenMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="SoTinChi"
                            name="SoTinChi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.SoTinChi} onChange={handleOnchangeDetails} name="SoTinChi" />
                        </Form.Item>
                        <Form.Item
                            label="GioChuan"
                            name="GioChuan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.GioChuan} onChange={handleOnchangeDetails} name="GioChuan" />
                        </Form.Item>
                        <Form.Item
                            label="SiSo"
                            name="SiSo"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.SiSo} onChange={handleOnchangeDetails} name="SiSo" />
                        </Form.Item>
                        
                        <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.TrangThai} onChange={handleOnchangeDetails} name="TrangThai" />
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
            <DrawerComponent title='Cập nhật chi tiết hình thức công việc' isOpen={isOpenDrawer2}  onClose={() => setIsOpenDrawer2(false)} width="70%">
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
                            <InputComponent value={stateTaiGiangDayDetails['MaLop']} onChange={handleOnchangeDetails} name="MaLop" />
                        </Form.Item>
                        <Form.Item
                            label="MaMonHoc"
                            name="MaMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.MaMonHoc} onChange={handleOnchangeDetails} name="MaMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="TenMonHoc"
                            name="TenMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.TenMonHoc} onChange={handleOnchangeDetails} name="TenMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="SoTinChi"
                            name="SoTinChi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.SoTinChi} onChange={handleOnchangeDetails} name="SoTinChi" />
                        </Form.Item>
                        <Form.Item
                            label="GioChuan"
                            name="GioChuan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.GioChuan} onChange={handleOnchangeDetails} name="GioChuan" />
                        </Form.Item>
                        <Form.Item
                            label="SiSo"
                            name="SiSo"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.SiSo} onChange={handleOnchangeDetails} name="SiSo" />
                        </Form.Item> */}
                        
                        <Form.Item
                            label="HoTen"
                            name="HoTen"
                            // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <InputComponent value={stateHTCVDetails.HoTen} />}
                            <InputComponent value={stateHTCVDetails.HoTen} onChange={handleOnchangeDetails2} name="HoTen" />
                        </Form.Item>
                        <Form.Item
                            label="HinhThucCV"
                            name="HinhThucCV"
                            // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <InputComponent value={stateHTCVDetails.HinhThucCV} />}
                            <InputComponent value={stateHTCVDetails.HinhThucCV} onChange={handleOnchangeDetails2} name="HinhThucCV" />
                        </Form.Item>
                    

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={onUpdateHTCV}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa tải hướng dẫn" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteTaiGiangDay}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa tải hướng dẫn này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Xóa tải hướng dẫn" open={isModalOpenDelete2} onCancel={handleCancelDelete2} onOk={handleDeleteHTCV}>
                <Loading isLoading={isLoadingDeleted2}>
                    <div>Bạn có chắc xóa hình thức công việc này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default TaiGiangDay;
