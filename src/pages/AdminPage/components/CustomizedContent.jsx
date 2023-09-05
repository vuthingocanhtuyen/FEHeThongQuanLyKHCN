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
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState({});
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const user = useSelector((state) => state?.user);
    const fetchGetDetailsQuanNhan = async () => {
    try {
      console.log('User _id:', user.QuanNhanId);
      const resQuanNhan = await QuanNhanService.getQuanNhanByQuanNhanId(user.QuanNhanId, user.access_token);
      console.log('resQuanNhan:', resQuanNhan);
      if (resQuanNhan?.data) {
        const quanNhanId = resQuanNhan.data._id;
        console.log('tesst:', quanNhanId);
        // const res = await QuanNhanService.getDetailsQuanNhan(quanNhanId, user.access_token);
        if (resQuanNhan?.data) {
          setStateQuanNhanDetails({
            QuanNhanId: resQuanNhan?.data?.QuanNhanId,
            HoTen: resQuanNhan?.data?.HoTen,
            NgaySinh: resQuanNhan?.data?.NgaySinh,
            GioiTinh: resQuanNhan?.data?.GioiTinh,
            QueQuan: resQuanNhan?.data?.QueQuan,
            DiaChi: resQuanNhan?.data?.DiaChi,
            SoDienThoai: resQuanNhan?.data?.SoDienThoai,
            Email: resQuanNhan?.data?.Email,
            HoatDong: resQuanNhan?.data?.HoatDong,
            QuanHam: resQuanNhan?.data?.QuanHam,
            DonVi: resQuanNhan?.data?.DonVi,
            LoaiQN: resQuanNhan?.data?.LoaiQN,
          });
          setData([resQuanNhan.data]);
        }
        console.log('Dữ liệu từ API:', resQuanNhan);
        setIsLoadingUpdate(false);
      }
    } catch (error) {
      console.log('Error while fetching quan nhan details:', error);
      setIsLoadingUpdate(false);
    }
  };

  useEffect(() => {
    if (user && user.QuanNhanId) {
      setIsLoadingUpdate(true);
      fetchGetDetailsQuanNhan();
    }
  }, [user]);

    return (

        <div style={{ width: '1200px', margin: '0 auto', height: '700px', padding: '10px' }}>

            <div style={{ width: '650px', margin: '0 auto', height: '700px', float: 'left', padding: '10px', background: '#fff', borderRadius: "8px" }}>

          <WrapperHeader>Thông tin cán bộ</WrapperHeader>
                <Loading isLoading={isLoading}>
                <div style={{ marginTop: '20px' }}> 
          <WrapperContentProfile>
            <WrapperInput>
              <WrapperLabel htmlFor="id">Mã cán bộ:</WrapperLabel>
              <InputForm style={{ width: '300px' }} id="id" value={stateQuanNhanDetails.QuanNhanId || ''} readOnly />
            </WrapperInput>
            <WrapperInput>
              <WrapperLabel htmlFor="name">Tên cán bộ:</WrapperLabel>
              <InputForm style={{ width: '300px' }} id="hoten" value={stateQuanNhanDetails.HoTen || ''} readOnly />
            </WrapperInput>
            <WrapperInput>
              <WrapperLabel htmlFor="gender">Giới tính:</WrapperLabel>
              <InputForm style={{ width: '300px' }} id="gender" value={stateQuanNhanDetails.GioiTinh || ''} readOnly />
            </WrapperInput>
            <WrapperInput>
              <WrapperLabel htmlFor="quequan">Quê quán:</WrapperLabel>
              <InputForm style={{ width: '300px' }} id="quequan" value={stateQuanNhanDetails.QueQuan || ''} readOnly />
            </WrapperInput>
            <WrapperInput>
              <WrapperLabel htmlFor="quanham">Quân hàm:</WrapperLabel>
              <InputForm style={{ width: '300px' }} id="quanham" value={stateQuanNhanDetails.QuanHam || ''} readOnly />
            </WrapperInput>
          
          </WrapperContentProfile>
          </div>

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