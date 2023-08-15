
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../../services/UserService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'
import { updateUser } from '../../../redux/slides/userSlide'
import { getBase64 } from '../../../utils'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'

import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../../components/InputForm/InputForm'
import Loading from '../../../components/LoadingComponent/Loading'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import TaiGiangDay from './TaiDaoTao/TaiGiangDay'
import TaiHuongDan from './TaiDaoTao/TaiHuongDan'
import TaiKhaoThi from './TaiDaoTao/TaiKhaoThi'
import TaiHoiDong from './TaiDaoTao/TaiHoiDong'
import BaiBaoKH from './TaiNghienCuu/BaiBaoKH'
import BienSoan from './TaiNghienCuu/BienSoan'
import DeTaiNCKH from './TaiNghienCuu/DeTaiNCKH'
import GiaiThuongNCKH from './TaiNghienCuu/GiaiThuongNCKH'
import HuongDanNCKH from './TaiNghienCuu/HuongDanNCKH'
import SangChe from './TaiNghienCuu/SangChe'
import HoatDongKhac from './TaiNghienCuu/HoatDongKhac'




const TaiChiTiet = () => {
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
        <>
            <h2>I. Tải đào tạo</h2>

            <h3>1. Tải giảng dạy</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <TaiGiangDay />
            </div>
            <br />
            <h3>2. Tải hướng dẫn</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <TaiHuongDan />
            </div>
            <br />
            <h3>3. Tải khảo thí</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <TaiKhaoThi />
            </div>
            <br />
            <h3>4. Tải hội đồng</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <TaiHoiDong />
            </div>
            <br />


            <h2>II. Tải nghiên cứu</h2>

            <h3>1. Bài báo khoa học</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <BaiBaoKH />
            </div>
            <br />
            <h3>2. Biên soạn</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <BienSoan />
            </div>
            <br />
            <h3>3. Đề tài NCKH</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <DeTaiNCKH />
            </div>
            <br />
            <h3>4. Giải thưởng NCKH</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <GiaiThuongNCKH />
            </div>
            <h3>5. Hướng dẫn NCKH</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <HuongDanNCKH />
            </div>
            <h3>6. Sáng chế</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <SangChe />
            </div>
            <h3>4. Hoạt động khác</h3>
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <HoatDongKhac />
            </div>
            <br />
            <br />



        </>
    )
}

export default TaiChiTiet