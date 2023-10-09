
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as QuanNhanService from '../../../services/QuanNhanService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'
import * as UserService from '../../../services/UserService'
import { getBase64 } from '../../../utils'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../../components/InputForm/InputForm'
import Loading from '../../../components/LoadingComponent/Loading'
import { Button, Col, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { updateUser } from '../../../redux/slides/userSlide'
import CheckboxComponent from '../../../components/CheckBox/CheckBox'
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
import QuaTrinhHocHam from './QuaTrinhHocHam'
import QuaTrinhHocVi from './QuaTrinhHocVi'
import moment from 'moment';
import QuaTrinhKhenThuong from './QuaTrinhKhenThuong'
import QuaTrinhKyLuat from './QuaTrinhKyLuat'
const CapNhatHSCB = () => {
    // const [quannhanObjectId, setQuannhanObjectId] = useState([]);
    const [quannhann, setQuannhan] = useState([]);
    const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState({});
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const user = useSelector((state) => state?.user);
    useEffect(() => {
        if (user && user.QuanNhanId) {
            setIsLoadingUpdate(true);
        }
    }, [user]);

    const quannhanObjectId = user.QuanNhanId;
    console.log(quannhanObjectId);
    const [id, setId] = useState('')
    const [HoTen, setHoten] = useState('')
    const [NgaySinh, setNgaysinh] = useState('')
    const [GioiTinh, setGioitinh] = useState('')
    const [QueQuan, setQueQuan] = useState('')
    const [DiaChi, setDiachi] = useState('')
    const [SoDienThoai, setSdt] = useState('')
    const [Email, setEmail] = useState('')
    const [HoatDong, setHoatDong] = useState('')
    const [LoaiQN, setLoaiqn] = useState('')
    const [DonVi, setDonvi] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            QuanNhanService.updateQuanNhan(id, rests, access_token);
        }
    )
    const dispatch = useDispatch()

    useEffect(() => {

        console.log(quannhann);
        console.log("bat dau");
        setId(quannhanDetails?.QuanNhanId)
        setHoten(quannhanDetails?.HoTen)
        setNgaysinh(quannhanDetails?.NgaySinh)
        setGioitinh(quannhanDetails?.GioiTinh)
        setQueQuan(quannhanDetails?.QueQuan)
        setDiachi(quannhanDetails?.DiaChi)
        setSdt(quannhanDetails?.SoDienThoai)
        setEmail(quannhanDetails?.Email)
        setHoatDong(quannhanDetails?.HoatDong)
        setLoaiqn(quannhanDetails?.LoaiQN)
        setDonvi(quannhanDetails?.DonVi)

    }, [quannhann])

    const { data, isSuccess, isError } = mutation

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



    const handleOnchangeHoatDong = (value) => {
        setHoatDong(value)
    }
    const handleOnchangeLoaiqn = (value) => {
        setLoaiqn(value)
    }

    const handleOnchangeId = (value) => {
        setId(value)
    }
    const handleOnchangeHoTen = (value) => {
        setHoten(value)
    }
    const handleOnchangeNgaySinh = (value) => {
        setNgaysinh(value)
    }
    const handleOnchangeGioiTinh = (value) => {
        setGioitinh(value)
    }

    const handleOnchangeQueQuan = (value) => {
        setQueQuan(value)
    }
    const handleOnchangeDiaChi = (value) => {
        setDiachi(value)
    }
    const handleOnchangeDonVi = (value) => {
        setDonvi(value)
    }
    const handleOnchangeSdt = (value) => {
        setSdt(value)
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }


    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }

    const fetchGetDetailsQuanNhan = async () => {
        console.log("bat dau 2");
        console.log(quannhanObjectId);
        const res = await QuanNhanService.getQuanNhanByQuanNhanId(quannhanObjectId);

        setQuannhan(res);
        console.log("bat dau 3");
        return res.data

    }

    // useEffect(() => {
    //     fetchGetDetailsQuanNhan();
    //   }, [quannhanObjectId]);
    const { isLoading, data: quannhanDetails } = useQuery(['hsquannhan', quannhanObjectId], fetchGetDetailsQuanNhan, { enabled: !!quannhanObjectId })

    const handleChangeCheckGioiTinh = (e) => {
        console.log(`checked: ${e.target.checked}`);
    };
    const handleUpdate = () => {
        mutation.mutate({ id: quannhanDetails?._id, Email, HoTen, NgaySinh, HoatDong, LoaiQN, SoDienThoai, GioiTinh, DiaChi, QueQuan, access_token: user?.access_token })
    }

    return (
        <div>
            <div style={{ width: '1270px', margin: '0 auto', height: '700px', padding: '30px' }}>
                <WrapperHeader>Cập nhật thông tin cá nhân: {HoTen}</WrapperHeader>


                <div style={{ width: '500px', margin: '0 auto', float: 'left', padding: '10px', background: '#fff', borderRadius: "8px" }}>

                    <Loading isLoading={isLoading}>
                        <WrapperContentProfile>

                            <WrapperInput>
                                <WrapperLabel htmlFor="id">Mã cán bộ</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="id" value={id} onChange={handleOnchangeId} readOnly />

                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel htmlFor="HoatDong">Trạng thái</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="HoatDong" value={HoatDong} readOnly />

                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel htmlFor="HoTen">Họ và Tên</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="HoTen" value={HoTen} readOnly />

                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel htmlFor="NgaySinh">Ngày sinh</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="NgaySinh" value={convertDateToString(NgaySinh)} readOnly />

                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="GioiTinh">Giới tính</WrapperLabel>
                                <CheckboxComponent style={{ width: '25px' }}
                                    id="GioiTinh" value={GioiTinh}
                                    checked={GioiTinh === 'Nu'}
                                    onChange={handleChangeCheckGioiTinh} readOnly />

                            </WrapperInput>


                            <WrapperInput>
                                <WrapperLabel htmlFor="DonVi">Đơn vị</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="DonVi" value={DonVi} readOnly />

                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="DiaChi">Địa chỉ</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="DiaChi" value={DiaChi} readOnly />

                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="QueQuan">Quê quán</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="QueQuan" value={QueQuan} readOnly />

                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel htmlFor="SoDienThoai">Số điện thoại</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="SoDienThoai" value={SoDienThoai} readOnly />

                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="Email">Email</WrapperLabel>
                                <InputForm style={{ width: '500px' }} id="Email" value={Email} readOnly />

                            </WrapperInput>
                            {/* <ButtonComponent
                                onClick={handleUpdate}
                                size={40}
                                styleButton={{
                                    height: '30px',
                                    width: 'fit-content',
                                    borderRadius: '4px',
                                    padding: '2px 6px 6px',
                                    marginLeft: '660px',
                                }}
                                textbutton={'Cập nhật'}
                                styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent> */}
                        </WrapperContentProfile>
                    </Loading>


                    <Loading isLoading={isLoading}>
                        <WrapperContentProfile>

                        </WrapperContentProfile>
                    </Loading>

                </div>






            </div>

            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTNgoaiNgu />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <DaiHoc />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <SauDaiHoc />
            </div>
            <br />

            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCongTac />

            </div><br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <TinhTrangCT />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTDang />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTQuanHam />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QuaTrinhHocHam />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QuaTrinhHocVi />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCDCMKT />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTHocTapKhac />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QuaTrinhKhenThuong />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QuaTrinhKyLuat />
            </div>
            <br />
        </div>
    )
}

export default CapNhatHSCB