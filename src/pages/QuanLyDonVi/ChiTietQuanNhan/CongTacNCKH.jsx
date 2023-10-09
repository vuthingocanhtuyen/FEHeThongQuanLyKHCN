
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../../services/UserService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'
import { updateUser } from '../../../redux/slides/userSlide'
import { getBase64 } from '../../../utils'

import HoatDongKhac from '../ChiTietQuanNhan/TaiNCKH/HoatDongKhac'
import SangChe from '../ChiTietQuanNhan/TaiNCKH/SangChe'
import GiaiThuongNCKH from '../ChiTietQuanNhan/TaiNCKH/GiaiThuongNCKH'
import HuongDanNCKH from '../ChiTietQuanNhan/TaiNCKH/HuongDanNCKH'
import BienSoan from '../ChiTietQuanNhan/TaiNCKH/BienSoan'
import DeTaiNCKH from '../ChiTietQuanNhan/TaiNCKH/DeTaiNCKH'
import BaiBaoKH from '../ChiTietQuanNhan/TaiNCKH/BaiBaoKH'

import * as QuanNhanService from '../../../services/QuanNhanService'


import { useQuery } from '@tanstack/react-query'



const CongTacNCKH = ({ idQuanNhan }) => {

    const fetchGetDetailsQuanNhan = async () => {
        if (idQuanNhan) {
            const res = await QuanNhanService.getDetailsQuanNhan(idQuanNhan)
            console.log("qn:", res.data)
            return res.data
        }
    }

    const { isLoading, data: quannhanDetails } = useQuery(['hosoquannhan', idQuanNhan], fetchGetDetailsQuanNhan, { enabled: !!idQuanNhan })


    return (
        <div>


            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3>Bài báo khoa học</h3>
                <BaiBaoKH quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3>Đề tài NCKH</h3>
                <DeTaiNCKH quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3>Biên soạn</h3>
                <BienSoan quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />

            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3> Hướng dẫn NCKH</h3>
                <HuongDanNCKH quannhanId={quannhanDetails?.QuanNhanId} />
            </div><br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3> Giải thưởng NCKH</h3>
                <GiaiThuongNCKH quannhanId={quannhanDetails?.QuanNhanId} />
            </div><br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3> Sáng chế</h3>
                <SangChe quannhanId={quannhanDetails?.QuanNhanId} />
            </div><br />
            {/* <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3> Hoạt động khác</h3>
                <HoatDongKhac quannhanId={quannhanDetails?.QuanNhanId} />
            </div><br /> */}

        </div>
    )
}

export default CongTacNCKH