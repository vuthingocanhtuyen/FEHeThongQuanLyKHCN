
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as QuanNhanService from '../../../services/QuanNhanService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'
import * as UserService from '../../../services/UserService'
import { getBase64 } from '../../../utils'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../../components/InputForm/InputForm'
import Loading from '../../../components/LoadingComponent/Loading'
import { Button, Col, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { updateUser } from '../../../redux/slides/userSlide'
import CheckboxComponent from '../../../components/CheckBox/CheckBox'
import NgoaiNgu from './NgoaiNgu'
import QTCongTac from './QTCongTac'
import QTDang from './QTDang'
import QTQuanHam from './QTQuanHam'
import QTCDCMKT from './QTCDCMKT'
import QTHocTapKhac from './QTHocTapKhac'
import QTNgoaiNgu from './QTNgoaiNgu'
import DaiHoc from './DaiHoc'
import SauDaiHoc from './SauDaiHoc'
import TinhTrangCT from './TinhTrangCT'

const CapNhatHSCB = () => {
    const [quannhanObjectId, setQuannhanObjectId] = useState([]);
    const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState({});
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const user = useSelector((state) => state?.user);
    console.log('ctqn123 capnhatcb:', user);
    const fetchGetObjectId = async () => {
        try {
            console.log('User _id capnhatcb:', user.id);
            const resQuanNhan = await QuanNhanService.getObjectIdByQuanNhanId(user.id, user.access_token);

            console.log('ctqn capnhatcb:', resQuanNhan.data);
            setQuannhanObjectId(resQuanNhan.data);
        } catch (error) {
            console.log('Error while fetching quan nhan details:', error);
            setIsLoadingUpdate(false);
        }
    };
    useEffect(() => {
        console.log("Quan nhan _id capnhatcb:", quannhanObjectId);
    }, [quannhanObjectId]);
    useEffect(() => {
        if (user && user.QuanNhanId) {
            setIsLoadingUpdate(true);
            fetchGetObjectId();
        }
    }, [user]);


    const [id, setId] = useState('')
    const [HoTen, setHoten] = useState('')
    const [NgaySinh, setNgaysinh] = useState('')
    const [GioiTinh, setGioitinh] = useState('')
    const [QueQuan, setQueQuan] = useState('')
    const [DiaChi, setDiachi] = useState('')
    const [SoDienThoai, setSdt] = useState('')
    const [Email, setEmail] = useState('')
    const [HoatDong, setHoatDong] = useState('')
    const [LoaiQN, setLoaiqn] = useState('')
    const [donvi, setDonvi] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            QuanNhanService.updateQuanNhan(id, rests, access_token);
        }
    )
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("bat dau");
        setId(quannhanDetails?.QuanNhanId)
        setHoten(quannhanDetails?.HoTen)
        setNgaysinh(quannhanDetails?.NgaySinh)
        setGioitinh(quannhanDetails?.GioiTinh)
        setQueQuan(quannhanDetails?.QueQuan)
        setDiachi(quannhanDetails?.DiaChi)
        setSdt(quannhanDetails?.SoDienThoai)
        setEmail(quannhanDetails?.Email)
        setHoatDong(quannhanDetails?.HoatDong)
        setLoaiqn(quannhanDetails?.LoaiQN)
        setDonvi(quannhanDetails?.DonVi)
    }, [user])


    // const { data, isLoading, isSuccess, isError } = mutation

    // useEffect(() => {
    //     if (isSuccess) {
    //         message.success()
    //         handleGetDetailsUser(user?.id, user?.access_token)
    //     } else if (isError) {
    //         message.error()
    //     }
    // }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }



    const handleOnchangeHoatDong = (value) => {
        setHoatDong(value)
    }
    const handleOnchangeLoaiqn = (value) => {
        setLoaiqn(value)
    }

    const handleOnchangeId = (value) => {
        setId(value)
    }
    const handleOnchangeHoTen = (value) => {
        setHoten(value)
    }
    const handleOnchangeNgaySinh = (value) => {
        setNgaysinh(value)
    }
    const handleOnchangeGioiTinh = (value) => {
        setGioitinh(value)
    }

    const handleOnchangeQueQuan = (value) => {
        setQueQuan(value)
    }
    const handleOnchangeDiaChi = (value) => {
        setDiachi(value)
    }
    const handleOnchangeDonVi = (value) => {
        setDonvi(value)
    }
    const handleOnchangeSdt = (value) => {
        setSdt(value)
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }




    const fetchGetDetailsQuanNhan = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        console.log("idquannhan capnhatcb:", id)
        if (id) {
            const res = await QuanNhanService.getQuanNhanByQuanNhanId(id)
            console.log("qn capnhatcb:", res.data)
            return res.data
        }

    }


    const { isLoading, data: quannhanDetails } = useQuery(['hosoquannhan', user.QuanNhanId], fetchGetDetailsQuanNhan, { enabled: !!user.QuanNhanId })
    console.log("chi tiet quan nhan capnhatcb nv:", quannhanDetails, quannhanDetails?.QuanNhanId)

    const handleChangeCheckGioiTinh = (e) => {
        console.log(`checked: ${e.target.checked}`);
    };

    useEffect(() => {
        console.log("Bat dau");
        console.log(id)
    }, [id])
    const handleUpdate = () => {
        mutation.mutate({ id: quannhanDetails?._id, Email, HoTen, NgaySinh, HoatDong, LoaiQN, SoDienThoai, GioiTinh, DiaChi, QueQuan, access_token: user?.access_token }, {
            onSettled: () => {
                quannhanDetails.refetch()
            }
        })
    }

    return (
        <div>
            <div style={{ width: '1270px', margin: '0 auto', height: '800px', padding: '30px' }}>
                <WrapperHeader>Cập nhật thông tin cá nhân: {HoTen}</WrapperHeader>


                <div style={{ width: '500px', margin: '0 auto', float: 'left', padding: '10px', background: '#fff', borderRadius: "8px" }}>

                    <Loading isLoading={isLoading}>
                        <WrapperContentProfile>

                            <WrapperInput>
                                <WrapperLabel htmlFor="id">Mã cán bộ</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="id" value={id} onChange={handleOnchangeId} readOnly />
                                <ButtonComponent
                                    // onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel htmlFor="HoatDong">Trạng thái</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="HoatDong" value={HoatDong} readOnly />
                                <ButtonComponent
                                    //   onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel htmlFor="HoTen">Họ và Tên</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="HoTen" value={HoTen} onChange={handleOnchangeHoTen} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel htmlFor="NgaySinh">Ngày sinh</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="NgaySinh" value={NgaySinh} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="GioiTinh">Giới tính</WrapperLabel>
                                <CheckboxComponent style={{ width: '25px' }} id="GioiTinh" value={GioiTinh} checked={GioiTinh === 'Nu'} onChange={handleChangeCheckGioiTinh} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>


                            <WrapperInput>
                                <WrapperLabel htmlFor="DonVi">Đơn vị</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="DonVi" value={donvi} onChange={handleOnchangeDonVi} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="DiaChi">Địa chỉ</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="DiaChi" value={DiaChi} onChange={handleOnchangeDiaChi} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="QueQuan">Quê quán</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="QueQuan" value={QueQuan} onChange={handleOnchangeQueQuan} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel htmlFor="SoDienThoai">Số điện thoại</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="SoDienThoai" value={SoDienThoai} onChange={handleOnchangeSdt} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="Email">Email</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="Email" value={Email} onChange={handleOnchangeEmail} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>

                        </WrapperContentProfile>
                    </Loading>


                    <Loading isLoading={isLoading}>
                        <WrapperContentProfile>
                            {/* <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="avatar">Ảnh</WrapperLabel>
                                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </WrapperUploadFile>
                                {avatar && (
                                    <img src={avatar} style={{
                                        height: '90px',
                                        width: '90px',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }} alt="avatar" />
                                )}
                                <InputForm style={{ width: '250px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput> */}
                            {/* <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="email">Mã cán bộ</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="email" value={email} onChange={handleOnchangeEmail} />

                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="name">Họ và Tên</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="name" value={hoten} onChange={handleOnchangeName} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="phone">Ngày sinh</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="email" value={ngaysinh} onChange={handleOnchangePhone} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Giới tính</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Số điện thoại</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput> */}



                        </WrapperContentProfile>
                    </Loading>

                </div>




                <div style={{ width: '500px', margin: '0 auto', height: '400px', float: 'left', textAlign: 'left', padding: '10px', background: 'back' }}>
                    {/* <Loading isLoading={isLoading}>
                        <WrapperContentProfile>
                             <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Email</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Trạng thái</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Học vị</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Đơn vị công tác</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Chức danh CMKT</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Học hàm</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Đơn vị học thuật</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                                <ButtonComponent
                                    onClick={handleUpdate}
                                    size={40}
                                    styleButton={{
                                        height: '30px',
                                        width: 'fit-content',
                                        borderRadius: '4px',
                                        padding: '2px 6px 6px'
                                    }}
                                    textbutton={'Cập nhật'}
                                    styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            </WrapperInput> 


                        </WrapperContentProfile>
                    </Loading> */}


                </div>

            </div>

            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTNgoaiNgu quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <DaiHoc quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <SauDaiHoc quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />

            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCongTac quannhanId={quannhanDetails?.QuanNhanId} />

            </div><br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <TinhTrangCT quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTDang quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTQuanHam quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCDCMKT quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTHocTapKhac quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />

        </div>
    )
}

export default CapNhatHSCB