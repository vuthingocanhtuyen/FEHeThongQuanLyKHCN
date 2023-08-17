
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'


import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { getBase64 } from '../../utils'
import { WrapperContentProfile, WrapperTable } from './style'
import 'react-calendar/dist/Calendar.css';

import Loading from '../../components/LoadingComponent/Loading'
import FreeDonVi from './DanhMucDonVi/FreeDonVi'
import TableDonVi from './DanhMucDonVi/TableDonVi'




const DMDonVi = () => {
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

        <div style={{ width: '1270px', margin: '0 auto', height: '700px', padding: '20px' }}>

            <div style={{ width: '400px', margin: '0 auto', height: '700px', float: 'left', padding: '5px', background: '#fff' }}>


                <Loading isLoading={isLoading}>
                    <WrapperContentProfile>

                        <FreeDonVi />
                    </WrapperContentProfile>
                </Loading>

            </div>




            <div style={{ width: '800px', margin: '0 auto', height: '700px', float: 'right', textAlign: 'left', padding: '5px', background: 'back' }}>
                <WrapperTable>
                    <TableDonVi />
                </WrapperTable>
            </div>
        </div>
    )
}

export default DMDonVi