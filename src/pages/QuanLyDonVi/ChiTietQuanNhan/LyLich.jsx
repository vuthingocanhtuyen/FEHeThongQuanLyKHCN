import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as QuanNhanService from '../../../services/QuanNhanService'
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

import { useQuery } from '@tanstack/react-query'
import CheckboxComponent from '../../../components/CheckBox/CheckBox'

const LyLich = ({ idQuanNhan }) => {
    //update chưa đc
    const quannhan = useSelector((state) => state.quannhan)
    const [id, setId] = useState('')
    const [hoten, setHoten] = useState('')
    const [ngaysinh, setNgaysinh] = useState('')
    const [gioitinh, setGioitinh] = useState('')
    const [quequan, setQueQuan] = useState('')
    const [diachi, setDiachi] = useState('')
    const [sdt, setSdt] = useState('')
    const [email, setEmail] = useState('')
    const [hoatdong, setHoatDong] = useState('')
    const [loaiqn, setLoaiqn] = useState('')

    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            QuanNhanService.updateQuanNhan(id, rests, access_token)
        }
    )

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

    const handleUpdate = () => {
        mutation.mutate({ id: quannhan?.id, email, hoten, ngaysinh, hoatdong, loaiqn, sdt, gioitinh, diachi, quequan, access_token: quannhan?.access_token })

    }

    // show dữ liệu
    const onChange = () => { }

    const fetchGetDetailsQuanNhan = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        console.log("idquannhan:", id)
        if (id) {
            const res = await QuanNhanService.getDetailsQuanNhan(id)
            console.log("qn:", res.data)
            return res.data
        }

    }

    const { isLoading, data: quannhanDetails } = useQuery(['hosoquannhan', idQuanNhan], fetchGetDetailsQuanNhan, { enabled: !!idQuanNhan })
    console.log("chi tiet quan nhan:", quannhanDetails)

    const handleOnchangeHoTen = (value) => {
        setHoten(hoten)
    }

    //Giới tính

    const handleChangeCheckGioiTinh = (e) => {
        console.log(`checked: ${e.target.checked}`);
    };

    //Dân tộc

    const optionDanToc = [
        { value: '1', label: 'Kinh' },
        { value: '2', label: 'Thái' },
        { value: '3', label: 'Tày' },
    ];

    const handleChangeDanToc = (value) => {
        console.log(`selected value: ${value}`);
    };

    return (

        <div style={{ width: '1200px', margin: '0 auto', height: '500px', padding: '30px', marginBottom: '50px' }}>
            <WrapperHeader>HỒ SƠ CÁ NHÂN CỦA CÁN BỘ:&nbsp; {quannhanDetails?.HoTen}</WrapperHeader>

            <Loading isLoading={isLoading}>
                <WrapperContentProfile>
                    {/* <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Ảnh cá nhân</WrapperLabel>
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '150px',
                                width: '150px',
                                //borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar" />
                        )}
                      
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
                    <WrapperInput>
                        <WrapperLabel htmlFor="QuanNhanId">Mã cán bộ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="QuanNhanId" value={quannhanDetails?.QuanNhanId} />
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
                        <WrapperLabel htmlFor="HoatDong">Trạng thái</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="HoatDong" value={quannhanDetails?.HoatDong} />
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
                        <InputForm style={{ width: '500px' }} id="HoTen" value={quannhanDetails?.HoTen} onChange={handleOnchangeHoTen} />
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
                        <WrapperLabel htmlFor="NgaySinh">Ngày sinh</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="NgaySinh" value={quannhanDetails?.NgaySinh} />
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
                        <WrapperLabel htmlFor="GioiTinh">Giới tính</WrapperLabel>
                        <CheckboxComponent style={{ width: '25px' }} id="GioiTinh" value={quannhanDetails?.GioiTinh} onChange={handleChangeCheckGioiTinh} />
                        <ButtonComponent
                            //onClick={handleUpdate}
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
                        <InputForm style={{ width: '500px' }} id="DonVi" value={quannhanDetails?.DonVi} />
                        <ButtonComponent
                            //     onClick={handleUpdate}
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


                    {/* 
                        <WrapperInput>
                            <WrapperLabel htmlFor="address">Dân tộc</WrapperLabel>
                            <ComboBoxComponent
                                style={{ width: '500px' }}
                                id="DanToc"
                                value={quannhanDetails?.DanToc}
                                options={optionDanToc}
                                onChange={handleChangeDanToc}
                            //    onClick={handleUpdate}
                                size={40}
                                styleButton={{
                                    height: '30px',
                                    width: 'fit-content',
                                    borderRadius: '4px',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'Cập nhật'}
                                styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                            />
                        
                    </WrapperInput> */}
                    <WrapperInput>
                        <WrapperLabel htmlFor="DiaChi">Địa chỉ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="DiaChi" value={quannhanDetails?.DiaChi} />
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
                        <WrapperLabel htmlFor="QueQuan">Quê quán</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="QueQuan" value={quannhanDetails?.QueQuan} />
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
                        <WrapperLabel htmlFor="SoDienThoai">Số điện thoại</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="SoDienThoai" value={quannhanDetails?.SoDienThoai} />
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
                        <WrapperLabel htmlFor="Email">Email</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="Email" value={quannhanDetails?.Email} />
                        <ButtonComponent
                            //  onClick={handleUpdate}
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
                    {/* 
                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Địa chỉ liên lạc</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Điện thoại</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Email</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address"> Nhập ngũ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Chức vụ Đảng</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Ngày vào Đảng(Đoàn)</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Loại cán bộ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Cấp bậc</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Số hiệu sĩ quan</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Chức vụ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Đơn vị</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Qua chiến đấu</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Chiến trường</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Qua đào tạo nước ngoài</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Nguồn nhân sự</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Sức khoẻ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Thương binh</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Bệnh binh</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Văn hoá phổ thông</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Năm tốt nghiệp</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Nơi học</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Trình độ học vấn(Học vị)</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Chức danh(Giáo viên, GV, GVC,...)</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Chuyên ngành</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Năng lực sở trưỜng(Hướng NC)</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Qua ĐT,BD theo chức vụ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Kinh nghiệm thực tế LĐ chỉ huy</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Qua đào tạo, bồi dưỡng giáo viên</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Danh hiệu</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Văn bằng chứng chỉ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Trình độ tin học</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Trình độ ngoại ngữ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Ngoại ngữ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Cấp giảng dạy</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                        <WrapperLabel htmlFor="address">Thâm niên giảng dạy</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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


    )
}

export default LyLich