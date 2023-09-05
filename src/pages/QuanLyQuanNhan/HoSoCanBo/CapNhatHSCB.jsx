
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as QuanNhanService from '../../../services/QuanNhanService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'
import { useNavigate, useParams } from 'react-router-dom'
import { getBase64 } from '../../../utils'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../../components/InputForm/InputForm'
import Loading from '../../../components/LoadingComponent/Loading'
import { Button, Col, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import NgoaiNgu from './NgoaiNgu'
import QTCongTac from './QTCongTac'
import QTDang from './QTDang'
import QTQuanHam from './QTQuanHam'
import QTCDCMKT from './QTCDCMKT'
import QTHocTapKhac from './QTHocTapKhac'
import QTNgoaiNgu from './QTNgoaiNgu'
import DaiHoc from './DaiHoc'
import SauDaiHoc from './SauDaiHoc'
import TinhTrangCT from './TinhTrangCT'

const CapNhatHSCB = () => {
    const [quannhanObjectId, setQuannhanObjectId] = useState([]);
    const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState({});
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const user = useSelector((state) => state?.user);
    console.log('ctqn123 capnhatcb:', user);
    const fetchGetObjectId = async () => {
        try {
            console.log('User _id capnhatcb:', user.id);
            const resQuanNhan = await QuanNhanService.getObjectIdByQuanNhanId(user.id, user.access_token);

            console.log('ctqn capnhatcb:', resQuanNhan.data);
            setQuannhanObjectId(resQuanNhan.data);
        } catch (error) {
            console.log('Error while fetching quan nhan details:', error);
            setIsLoadingUpdate(false);
        }
    };
    useEffect(() => {
        console.log("Quan nhan _id capnhatcb:", quannhanObjectId);
    }, [quannhanObjectId]);
    useEffect(() => {
        if (user && user.QuanNhanId) {
            setIsLoadingUpdate(true);
            fetchGetObjectId();
        }
    }, [user]);



    const fetchGetDetailsQuanNhan = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        console.log("idquannhan capnhatcb:", id)
        if (id) {
            const res = await QuanNhanService.getQuanNhanByQuanNhanId(id)
            console.log("qn capnhatcb:", res.data)
            return res.data
        }

    }


    const { isLoading, data: quannhanDetails } = useQuery(['hosoquannhan', user.QuanNhanId], fetchGetDetailsQuanNhan, { enabled: !!user.QuanNhanId })
    console.log("chi tiet quan nhan capnhatcb:", quannhanDetails)



    return (
        <div>
            <div style={{ width: '1270px', margin: '0 auto', height: '500px', padding: '30px' }}>
                <WrapperHeader>Cập nhật thông tin cá nhân</WrapperHeader>


                <div style={{ width: '500px', margin: '0 auto', float: 'left', padding: '10px', background: '#fff', borderRadius: "8px" }}>

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


                    <Loading isLoading={isLoading}>
                        <WrapperContentProfile>
                            {/* <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="avatar">Ảnh</WrapperLabel>
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
                                <InputForm style={{ width: '250px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} />
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
                                <WrapperLabel style={{ width: '100px' }} htmlFor="email">Mã cán bộ</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="email" value={email} onChange={handleOnchangeEmail} />

                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="name">Họ và Tên</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="name" value={hoten} onChange={handleOnchangeName} />
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
                                <WrapperLabel style={{ width: '100px' }} htmlFor="phone">Ngày sinh</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="email" value={ngaysinh} onChange={handleOnchangePhone} />
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
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Giới tính</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Số điện thoại</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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




                <div style={{ width: '500px', margin: '0 auto', height: '400px', float: 'left', textAlign: 'left', padding: '10px', background: 'back' }}>
                    {/* <Loading isLoading={isLoading}>
                        <WrapperContentProfile>
                             <WrapperInput>
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Email</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Trạng thái</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Học vị</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Đơn vị công tác</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Chức danh CMKT</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Học hàm</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                                <WrapperLabel style={{ width: '100px' }} htmlFor="address">Đơn vị học thuật</WrapperLabel>
                                <InputForm style={{ width: '250px' }} id="address" value={address} onChange={handleOnchangeAddress} />
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
                    </Loading> */}


                </div>
                {/* {quannhanDetails?.QuanNhanId} */}
            </div>
            {/* <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <NgoaiNgu />
            </div> */}
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTNgoaiNgu quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <DaiHoc quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <SauDaiHoc quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />

            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCongTac quannhanId={quannhanDetails?.QuanNhanId} />
            </div><br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <TinhTrangCT quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTDang quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTQuanHam quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCDCMKT quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTHocTapKhac quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            {/* <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCapBac />
            </div> */}
        </div>
    )
}

export default CapNhatHSCB