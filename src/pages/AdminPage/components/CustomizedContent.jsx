import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as QuanNhanService from '../../../services/QuanNhanService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import './Calendar.css'
import InputForm from '../../../components/InputForm/InputForm'
import Loading from '../../../components/LoadingComponent/Loading'




const CustomizedContent = () => {
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



    // const handleGetDetailsQuanNhan = async (id, token) => {
    //     const res = await QuanNhanService.getDetailsQuanNhan(id, token)
    //     dispatch(updateQuanNhan({ ...res?.data, access_token: token }))
    // }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    // const handleOnchangeName = (value) => {
    //     setName(value)
    // }
    // const handleOnchangePhone = (value) => {
    //     setPhone(value)
    // }
    // const handleOnchangeAddress = (value) => {
    //     setAddress(value)
    // }



    const handleUpdate = () => {
        mutation.mutate({ id: quannhan?.id, email, hoten, ngaysinh, hoatdong, loaiqn, sdt, gioitinh, diachi, quequan, access_token: quannhan?.access_token })

    }
    const [date, setDate] = useState(new Date());

    return (

        <div style={{ width: '1200px', margin: '0 auto', height: '700px', padding: '10px' }}>

            <div style={{ width: '650px', margin: '0 auto', height: '700px', float: 'left', padding: '10px', background: '#fff', borderRadius: "8px" }}>

                <WrapperHeader>Thông tin cán bộ</WrapperHeader>
                <Loading isLoading={isLoading}>
                    <WrapperContentProfile>
                        <WrapperInput>
                            <WrapperLabel htmlFor="id">Mã cán bộ: </WrapperLabel>
                            <InputForm style={{ width: '300px' }} id="id" value={id} />

                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="name">Tên cán bộ: </WrapperLabel>
                            <InputForm style={{ width: '300px' }} id="hoten" value={hoten} />

                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor="email">Giới tính: </WrapperLabel>
                            <InputForm style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />

                        </WrapperInput>
                        {/*
                        <WrapperInput>
                            <WrapperLabel htmlFor="phone">Chuyên môn nghiệp vụ: </WrapperLabel>
                            <InputForm style={{ width: '300px' }} id="email" value={phone} onChange={handleOnchangePhone} />

                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="phone">Đơn vị: </WrapperLabel>
                            <InputForm style={{ width: '300px' }} id="email" value={phone} onChange={handleOnchangePhone} />

                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor="address">Cấp bậc: </WrapperLabel>
                            <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="address">Tình trạng công tác:  </WrapperLabel>
                            <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor="address">Chức vụ: </WrapperLabel>
                            <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                        </WrapperInput> */}

                        {/* <WrapperInput>
                            <WrapperLabel htmlFor="address">Tham số làm việc: </WrapperLabel>
                            <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                        </WrapperInput> */}
                    </WrapperContentProfile>
                </Loading>

            </div>




            <div style={{ width: '450px', margin: '0 auto', height: '700px', float: 'right', textAlign: 'left', padding: '50px', background: 'back' }}>

                <WrapperHeader>Lịch</WrapperHeader>
                <div className='calendar-container' >
                    <Calendar
                        onChange={setDate}
                        value={date}
                        selectRange={true}
                    />
                </div>

                {date.length > 0 ? (
                    <p className='text-center'>
                        <span className='bold'>Start:</span>{' '}
                        {date[0].toDateString()}
                        &nbsp;|&nbsp;
                        <span className='bold'>End:</span> {date[1].toDateString()}
                    </p>
                ) : (
                    <p className='text-center'>
                        {/* <span className='bold'>Hôm nay là:</span>{' '}
                    {date.toDateString()} */}
                    </p>
                )}
            </div>
        </div>
    )
}

export default CustomizedContent