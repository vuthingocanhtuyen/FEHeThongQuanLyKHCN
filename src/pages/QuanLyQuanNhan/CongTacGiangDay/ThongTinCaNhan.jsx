
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../../services/UserService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'
import { updateUser } from '../../../redux/slides/userSlide'
import { getBase64 } from '../../../utils'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from '../HoSoCanBo/style'




import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../../components/InputForm/InputForm'
import Loading from '../../../components/LoadingComponent/Loading'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'




const ThongTinCaNhan = () => {
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
            <div style={{ width: '1270px', margin: '0 auto', height: '500px', padding: '30px' }}>
                <WrapperHeader>Thông tin cá nhân</WrapperHeader>

                <Loading isLoading={isLoading}>
                    <WrapperContentProfile>
                        <WrapperInput>
                            <WrapperLabel htmlFor="avatar">Ảnh</WrapperLabel>
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
                            {/* <InputForm style={{ width: '500px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
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
                            <WrapperLabel htmlFor="name">Họ và Tên</WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="name" value={name} onChange={handleOnchangeName} />
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
                            <WrapperLabel htmlFor="phone">Ngày sinh</WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="email" value={phone} onChange={handleOnchangePhone} />
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
                            <WrapperLabel htmlFor="address">Giới tính</WrapperLabel>
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
                            <WrapperLabel htmlFor="address">Quê quán</WrapperLabel>
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



                    </WrapperContentProfile>
                </Loading>


                <Loading isLoading={isLoading}>
                    <WrapperContentProfile>
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
                            <WrapperLabel htmlFor="address">Đơn vị theo biên chế</WrapperLabel>
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
                            <WrapperLabel htmlFor="email">Đơn vị đăng ký sinh hoạt học thuật</WrapperLabel>
                            <InputForm style={{ width: '500px' }} id="email" value={email} onChange={handleOnchangeEmail} />
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
                            <WrapperLabel htmlFor="address">Ngành/Chuyên ngành</WrapperLabel>
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
                            <WrapperLabel htmlFor="address">Hướng nghiên cứu chuyên sâu</WrapperLabel>
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
                            <WrapperLabel htmlFor="address">Trình độ (Học vị)</WrapperLabel>
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
                            <WrapperLabel htmlFor="address">Học hàm</WrapperLabel>
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
                            <WrapperLabel htmlFor="address">Chức danh</WrapperLabel>
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
                            <WrapperLabel htmlFor="address">Trạng thái thực hiện công việc</WrapperLabel>
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

                    </WrapperContentProfile>
                </Loading>


            </div></div>


    )
}

export default ThongTinCaNhan