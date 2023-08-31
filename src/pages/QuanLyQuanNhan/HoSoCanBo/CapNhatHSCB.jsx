
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as QuanNhanService from '../../../services/QuanNhanService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'

import { getBase64 } from '../../../utils'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../../components/InputForm/InputForm'
import Loading from '../../../components/LoadingComponent/Loading'
import { Button, Col, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
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

    const quannhan = useSelector((state) => state.quannhan)
    const [id, setId] = useState('')
    const [hoten, setHoten] = useState('')
    const [ngaysinh, setNgaysinh] = useState('')
    const [gioitinh, setGioitinh] = useState('')
    const [quequan, setQueQuan] = useState('')
    const [diachi, setDiachi] = useState('')
    const [sdt, setSdt] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [hoatdong, setHoatDong] = useState('')
    const [loaiqn, setLoaiqn] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            QuanNhanService.updateQuanNhan(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        setId(quannhan?.id)
        setHoten(quannhan?.hoten)
        setNgaysinh(quannhan?.ngaysinh)
        setGioitinh(quannhan?.gioitinh)
        setQueQuan(quannhan?.quequan)
        setDiachi(quannhan?.diachi)
        setSdt(quannhan?.sdt)
        setEmail(quannhan?.email)
        setHoatDong(quannhan?.hoatdong)
        setLoaiqn(quannhan?.loaiqn)
    }, [quannhan])

    // useEffect(() => {
    //     if (isSuccess) {
    //         message.success()
    //         handleGetDetailsQuanNhan(quannhan?.id, quannhan?.access_token)
    //     } else if (isError) {
    //         message.error()
    //     }
    // }, [isSuccess, isError])

    // const handleGetDetailsQuanNhan = async (id, token) => {
    //     const res = await QuanNhanService.getDetailsQuanNhan(id, token)
    //     dispatch(updateQuanNhan({ ...res?.data, access_token: token }))
    // }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setHoten(value)
    }
    const handleOnchangePhone = (value) => {
        setSdt(value)
    }
    const handleOnchangeAddress = (value) => {
        setDiachi(value)
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }

    const handleUpdate = () => {
        mutation.mutate({ id: quannhan?.id, email, hoten, ngaysinh, hoatdong, loaiqn, sdt, gioitinh, diachi, quequan, access_token: quannhan?.access_token })

    }
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <div style={{ width: '1270px', margin: '0 auto', height: '500px', padding: '30px' }}>
                <WrapperHeader>Cập nhật thông tin cá nhân</WrapperHeader>


                <div style={{ width: '500px', margin: '0 auto', float: 'left', padding: '10px', background: '#fff', borderRadius: "8px" }}>


                    <Loading isLoading={isLoading}>
                        <WrapperContentProfile>
                            <WrapperInput>
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
                                {/* <InputForm style={{ width: '250px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
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

                            {/* <WrapperInput>
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
                    <Loading isLoading={isLoading}>
                        <WrapperContentProfile>
                            {/* <WrapperInput>
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
                            </WrapperInput> */}


                        </WrapperContentProfile>
                    </Loading>


                </div>

            </div>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <NgoaiNgu />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTNgoaiNgu />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <DaiHoc />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <SauDaiHoc />
            </div>
            <br />

            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCongTac />
            </div><br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <TinhTrangCT />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTDang />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTQuanHam />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCDCMKT />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTHocTapKhac />
            </div>
            <br />
            {/* <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCapBac />
            </div> */}
        </div>
    )
}

export default CapNhatHSCB