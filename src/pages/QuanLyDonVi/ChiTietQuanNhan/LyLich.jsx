import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as QuanNhanService from '../../../services/QuanNhanService'
import * as UserService from '../../../services/UserService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'
//import { updateUser } from '../../../redux/slides/userSlide'
import { getBase64 } from '../../../utils'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'

import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../../components/InputForm/InputForm'
import Loading from '../../../components/LoadingComponent/Loading'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { updateUser } from '../../../redux/slides/userSlide'
import { useQuery } from '@tanstack/react-query'

import CheckboxComponent from '../../../components/CheckBox/CheckBox'

const LyLich = ({ idQuanNhan }) => {
    //update chưa đc
    console.log("ly lich" + idQuanNhan)
    const [quannhann, setQuannhan] = useState([]);
    const user = useSelector((state) => state.user)
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
    const [DonVi, setDonvi] = useState('')

    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            QuanNhanService.updateQuanNhan(id, rests, access_token);
        }
    )
    const dispatch = useDispatch()
    const { data, isSuccess, isError } = mutation


    useEffect(() => {

        console.log(quannhann);
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

    }, [quannhann])


    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleUpdate()
            //  handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

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

    // show dữ liệu

    const fetchGetDetailsQuanNhan = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await QuanNhanService.getDetailsQuanNhan(id)
            setQuannhan(res);
            console.log("bat dau 3");
            return res.data
        }


    }

    // const { isLoading: isLoadingquannhan, data: quannhanDetails } = useQuery(['hosoquannhan', idQuanNhan], fetchGetDetailsQuanNhan, { enabled: !!idQuanNhan })
    const { isLoading, data: quannhanDetails } = useQuery(['hsquannhan', idQuanNhan], fetchGetDetailsQuanNhan, { enabled: !!idQuanNhan })




    //Giới tính

    const handleChangeCheckGioiTinh = (e) => {
        console.log(`checked: ${e.target.checked}`);
    };

    useEffect(() => {
        console.log("Bat dau");
        console.log(id)
    }, [id])
    const handleUpdate = () => {
        mutation.mutate({ id: quannhanDetails?._id, Email, HoTen, NgaySinh, HoatDong, LoaiQN, SoDienThoai, GioiTinh, DiaChi, QueQuan, DonVi, access_token: user?.access_token }, {
            onSettled: () => {
                quannhanDetails.refetch()
            }
        }
        )


    }
    return (

        <div style={{ width: '1200px', margin: '0 auto', height: '500px', padding: '30px', marginBottom: '50px' }}>
            <WrapperHeader>HỒ SƠ CÁ NHÂN CỦA CÁN BỘ:&nbsp; {HoTen}</WrapperHeader>

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
                        <InputForm style={{ width: '500px' }} id="DonVi" value={DonVi} onChange={handleOnchangeDonVi} />
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
        </div>
    )
}

export default LyLich