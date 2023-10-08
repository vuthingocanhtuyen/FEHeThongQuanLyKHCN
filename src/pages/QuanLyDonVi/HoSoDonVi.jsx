import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as DonViService from '../../services/DonViService'
import * as UserService from '../../services/UserService'

import * as PriorityByUserService from '../../services/PriorityByUserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
//import { updateUser } from '../../redux/slides/userSlide'
import { getBase64 } from '../../utils'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import Loading from '../../components/LoadingComponent/Loading'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { updateUser } from '../../redux/slides/userSlide'
import { useQuery } from '@tanstack/react-query'
import CheckboxComponent from '../../components/CheckBox/CheckBox'

const LyLich = () => {
    const [donvi, setDonVi] = useState([]);
    const user = useSelector((state) => state.user)
    
    const [name, setName] = useState('')
    const [managestaff, setManagestaff] = useState('')
    const [bienche, setBienChe] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    
    
    const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            DonViService.updateDonVi(id, rests, access_token);
        }
    )
    const dispatch = useDispatch()
    const { data,  isSuccess, isError } = mutation
    useEffect(() => {
        const fetchGetChucVuDonVi = async () => {
    
          try {
            // Gọi API để lấy thông tin đơn vị hiện tại của người dùng
            const response = await PriorityByUserService.getChucVuDonViFromUser(user.QuanNhanId, user.access_token);
            console.log(response.data);
    
            if (response.data && response.data.length > 0) {
              const firstData = response.data[0];
              console.log(response.data[0]);
              const donViValue = firstData.DonVi[0];
              setCurrentUserDonVi(donViValue);
              
            }
    
          } catch (error) {
            console.error('Error fetching ChucVuDonVi:', error);
          }
        };
    
        fetchGetChucVuDonVi();
      }, [user.QuanNhanId, user.access_token]);

    useEffect(() => {
        
        setName(donviDetails?.name);
        setManagestaff(donviDetails?.managestaff);
        setBienChe(donviDetails?.bienche);
        setEmail(donviDetails?.email);
        setPhone(donviDetails?.phone);

    }, [donvi])


    useEffect(() => {
        if (isSuccess) {
            console.log("ok");
            message.success("Thành công");
            handleGetDetailsUser(user?.id, user?.access_token);
            fetchGetDetailsDonVi();
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangeBienChe = (value) => {
        setBienChe(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeManageStaff = (value) => {
        setManagestaff(value)
    }
    
    // show dữ liệu

    const fetchGetDetailsDonVi = async () => {
            const res = await DonViService.getDonVifromcode(currentUserDonVi);
            setDonVi(res); 
            return res.data[0]
    }

    
    const { isLoading, data: donviDetails } = useQuery(['hsquannhan', currentUserDonVi], fetchGetDetailsDonVi, { enabled : !!currentUserDonVi})




    //Giới tính

    const handleChangeCheckGioiTinh = (e) => {
        console.log(`checked: ${e.target.checked}`);
    };


    const handleUpdate = () => {
        mutation.mutate({ id: donviDetails?._id, name, managestaff,bienche,email,phone, access_token: user?.access_token }, {
            onSettled: () => {
                fetchGetDetailsDonVi();
            }
        }
        )
    }
    return (

        <div style={{ width: '1200px', margin: '0 auto', height: '500px', padding: '30px', marginBottom: '50px' }}>
            <WrapperHeader style={{ marginLeft: '500px'}}>HỒ SƠ ĐƠN VỊ</WrapperHeader>

            <Loading isLoading={isLoading}>
            <WrapperContentProfile style={{  width: '900px',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <WrapperInput style={{marginTop: '10px'}}>
                        <WrapperLabel htmlFor="name">Đơn vị</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="name" value={name} onChange={handleOnchangeName} readOnly />
                        
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="managestaff">Cấp trưởng</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="managestaff" value={managestaff} onChange={handleOnchangeManageStaff} />
                        
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Số điện thoại liên hệ</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
                        
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="bienche">Số lượng biên chế</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="bienche" value={bienche} onChange={handleOnchangeBienChe} />
                        
                    </WrapperInput>

                    
                    <WrapperInput>
                        <WrapperLabel htmlFor="Email">Email</WrapperLabel>
                        <InputForm style={{ width: '500px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                       
                    </WrapperInput>
                     <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',
                                marginLeft: '650px', 
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                </WrapperContentProfile>
            </Loading>
        </div>
    )
}

export default LyLich