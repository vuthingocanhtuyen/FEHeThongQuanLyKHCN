
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../../services/UserService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'
import { updateUser } from '../../../redux/slides/userSlide'
import { getBase64 } from '../../../utils'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from '../style'





import InputForm from '../../../components/InputForm/InputForm'


import TaiGiangDay from './TaiDaoTao/TaiGiangDay'
import TaiHuongDan from './TaiDaoTao/TaiHuongDan'
import TaiKhaoThi from './TaiDaoTao/TaiKhaoThi'
import TaiHoiDong from './TaiDaoTao/TaiHoiDong'
import TongHopTai from './TongHopTai'

import BaiBaoKH from './TaiNCKH/BaiBaoKH'
import BienSoan from './TaiNCKH/BienSoan'
import DeTaiNCKH from './TaiNCKH/DeTaiNCKH'
import GiaiThuongNCKH from './TaiNCKH/GiaiThuongNCKH'
import HoatDongKhac from './TaiNCKH/HoatDongKhac'
import HuongDanNCKH from './TaiNCKH/HuongDanNCKH'
import SangChe from './TaiNCKH/SangChe'

const TaiCaNhan = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })

    }
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <div style={{ width: '910px', margin: '0 auto' }}>



                <div style={{ margin: '0 auto', float: 'left', padding: '10px 70px 10px 10px', background: '#fff', borderRadius: "8px" }}>

                    <WrapperInput>
                        <WrapperLabel style={{ width: '100px' }} htmlFor="email">Họ và tên </WrapperLabel>
                        <InputForm style={{ width: '250px' }} id="email" value={email} onChange={handleOnchangeEmail} />

                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel style={{ width: '100px' }} htmlFor="name">Đơn vị</WrapperLabel>
                        <InputForm style={{ width: '250px' }} id="name" value={name} onChange={handleOnchangeName} />

                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel style={{ width: '100px' }} htmlFor="phone">Giới tính</WrapperLabel>
                        <InputForm style={{ width: '250px' }} id="email" value={phone} onChange={handleOnchangePhone} />

                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel style={{ width: '100px' }} htmlFor="address">Ngày sinh</WrapperLabel>
                        <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel style={{ width: '100px' }} htmlFor="address">Quê quán</WrapperLabel>
                        <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                    </WrapperInput>
                </div>

                <div style={{ margin: '0 auto', float: 'left', padding: '10px 10px 10px 10px', background: '#fff', borderRadius: "8px" }}>

                    <WrapperInput>
                        <WrapperLabel style={{ width: '100px' }} htmlFor="address">Chức vụ</WrapperLabel>
                        <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel style={{ width: '100px' }} htmlFor="address">Chức vụ Đảng</WrapperLabel>
                        <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel style={{ width: '100px' }} htmlFor="address">Học vị</WrapperLabel>
                        <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel style={{ width: '100px' }} htmlFor="address">Học hàm</WrapperLabel>
                        <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel style={{ width: '100px' }} htmlFor="address">Chức danh</WrapperLabel>
                        <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />

                    </WrapperInput>

                </div>

                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '200px 10px 10px 10px', }}>
                    <h2>KẾT QUẢ ĐÀO TẠO VÀ NCKH</h2>
                    <TongHopTai />
                </div>

                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>
                    <h2>CHI TIẾT CÔNG TÁC ĐÀO TẠO VÀ NCKH</h2>
                    <h3>TẢI ĐÀO TẠO</h3>
                    <h4>Tải giảng dạy</h4>
                    <TaiGiangDay />
                </div>

                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>

                    <h4>Tải hướng dẫn</h4>
                    <TaiHuongDan />
                </div>
                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>

                    <h4>Tải khảo thí</h4>
                    <TaiKhaoThi />
                </div>
                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>

                    <h4>Tải hội đồng</h4>
                    <TaiHoiDong />
                </div>



                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>

                    <h3>TẢI NGHIÊN CỨU KHOA HỌC</h3>
                    <h4>Bài báo khoa học</h4>
                    <BaiBaoKH />
                </div>

                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>

                    <h4>Đề tài NCKH</h4>
                    <DeTaiNCKH />
                </div>
                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>

                    <h4>Biên soạn</h4>
                    <BienSoan />
                </div>
                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>

                    <h4>Hướng dẫn NCKH</h4>
                    <HuongDanNCKH />
                </div>
                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>

                    <h4>Giải thưởng NCKH</h4>
                    <GiaiThuongNCKH />
                </div>
                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>

                    <h4>Sáng chế</h4>
                    <SangChe />
                </div>
                <div style={{ margin: '0 auto', background: '#fff', borderRadius: "8px", padding: '50px 10px 10px 10px', }}>

                    <h4>Hoạt động khác</h4>
                    <HoatDongKhac />
                </div>

            </div>


        </div>




    )
}

export default TaiCaNhan