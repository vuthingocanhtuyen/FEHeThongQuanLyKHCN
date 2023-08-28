
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../../services/UserService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'
import { updateUser } from '../../../redux/slides/userSlide'
import { getBase64 } from '../../../utils'

import QTCongTac from '../../QuanLyQuanNhan/HoSoCanBo/QTCongTac'
import QTDang from '../../QuanLyQuanNhan/HoSoCanBo/QTDang'
import QTQuanHam from '../../QuanLyQuanNhan/HoSoCanBo/QTQuanHam'
import QTCDCMKT from '../../QuanLyQuanNhan/HoSoCanBo/QTCDCMKT'
import QTHocTapKhac from '../../QuanLyQuanNhan/HoSoCanBo/QTHocTapKhac'
import QTNgoaiNgu from '../../QuanLyQuanNhan/HoSoCanBo/QTNgoaiNgu'
import DaiHoc from '../../QuanLyQuanNhan/HoSoCanBo/DaiHoc'
import SauDaiHoc from '../../QuanLyQuanNhan/HoSoCanBo/SauDaiHoc'
import TinhTrangCT from '../../QuanLyQuanNhan/HoSoCanBo/TinhTrangCT'



const QuaTrinh = () => {
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

export default QuaTrinh