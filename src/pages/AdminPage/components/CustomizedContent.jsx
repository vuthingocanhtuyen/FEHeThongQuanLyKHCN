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
import { useQuery } from '@tanstack/react-query'




const CustomizedContent = () => {


    const [quannhanObjectId, setQuannhanObjectId] = useState([]);
    const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState({});
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const user = useSelector((state) => state?.user);
    console.log('ctqn123 user:', user);
    const fetchGetObjectId = async () => {
        try {
            console.log('User _id custom:', user.id);
            const resQuanNhan = await QuanNhanService.getObjectIdByQuanNhanId(user.id, user.access_token);

            console.log('ctqn123:', resQuanNhan.data);
            setQuannhanObjectId(resQuanNhan.data);
        } catch (error) {
            console.log('Error while fetching quan nhan details:', error);
            setIsLoadingUpdate(false);
        }
    };
    useEffect(() => {
        console.log("Quan nhan _id cus:", quannhanObjectId);
    }, [quannhanObjectId]);
    useEffect(() => {
        if (user && user.QuanNhanId) {
            setIsLoadingUpdate(true);
            fetchGetObjectId();
        }
    }, [user]);



    const fetchGetDetailsQuanNhan = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        console.log("idquannhan1302:", id)
        if (id) {
            const res = await QuanNhanService.getQuanNhanByQuanNhanId(id)
            console.log("qn1302:", res.data)
            return res.data
        }

    }


    const { isLoading, data: quannhanDetails } = useQuery(['hosoquannhan', user.QuanNhanId], fetchGetDetailsQuanNhan, { enabled: !!user.QuanNhanId })
    console.log("chi tiet quan nhan cus:", quannhanDetails)



    const [date, setDate] = useState(new Date());

    return (

        <div style={{ width: '1200px', margin: '0 auto', height: '700px', padding: '10px' }}>

            <div style={{ width: '650px', margin: '0 auto', height: '700px', float: 'left', padding: '10px', background: '#fff', borderRadius: "8px" }}>

                <WrapperHeader>Thông tin cán bộ</WrapperHeader>
                <Loading isLoading={isLoading}>
                    <WrapperContentProfile>

                        <WrapperInput>
                            <WrapperLabel htmlFor="id">Mã cán bộ</WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="id" value={quannhanDetails?.QuanNhanId} />

                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="name">Tên cán bộ: </WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="hoten" value={quannhanDetails?.HoTen} />

                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor="email">Ngày sinh: </WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="email" value={quannhanDetails?.NgaySinh} />

                        </WrapperInput>


                        <WrapperInput>
                            <WrapperLabel htmlFor="id">Giới tính</WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="id" value={quannhanDetails?.GioiTinh} />

                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="name">Đơn vị công tác </WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="hoten" value={quannhanDetails?.DonVi} />

                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor="email">Địa chỉ </WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="email" value={quannhanDetails?.DiaChi} />

                        </WrapperInput>


                        <WrapperInput>
                            <WrapperLabel htmlFor="id">Quê quán</WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="id" value={quannhanDetails?.QueQuan} />

                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="name">Số điện thoại </WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="hoten" value={quannhanDetails?.SoDienThoai} />

                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor="email">Email </WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="email" value={quannhanDetails?.Email} />

                        </WrapperInput>

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