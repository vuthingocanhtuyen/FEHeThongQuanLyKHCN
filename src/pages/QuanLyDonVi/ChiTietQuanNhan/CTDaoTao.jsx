
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../../services/UserService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as message from '../../../components/Message/Message'
import { updateUser } from '../../../redux/slides/userSlide'
import { getBase64 } from '../../../utils'
import TaiGiangDay from '../../QuanLyQuanNhan/CongTacGiangDay/TaiDaoTao/TaiGiangDay'
import TaiHoiDong from '../../QuanLyQuanNhan/CongTacGiangDay/TaiDaoTao/TaiHoiDong'
import TaiHuongDan from '../../QuanLyQuanNhan/CongTacGiangDay/TaiDaoTao/TaiHuongDan'
import TaiKhaoThi from '../../QuanLyQuanNhan/CongTacGiangDay/TaiDaoTao/TaiKhaoThi'

import * as QuanNhanService from '../../../services/QuanNhanService'


import { useQuery } from '@tanstack/react-query'



const CTDaoTao = ({ idQuanNhan }) => {
    const fetchGetDetailsQuanNhan = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        console.log("idquannhan:", id)
        if (id) {
            const res = await QuanNhanService.getDetailsQuanNhan(id)
            console.log("qn:", res.data)
            return res.data
        }
    }

    const { isLoading, data: quannhanDetails } = useQuery(['hosoquannhan', idQuanNhan], fetchGetDetailsQuanNhan, { enabled: !!idQuanNhan })
    console.log("chi tiet quan nhan:", quannhanDetails)



    return (
        <div>


            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3>Tải giảng dạy</h3>
                <TaiGiangDay quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3>Tải hội đồng</h3>
                <TaiHoiDong quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3>Tải hướng dẫn</h3>
                <TaiHuongDan quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />

            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <h3>Tải khảo thí</h3>
                <TaiKhaoThi quannhanId={quannhanDetails?.QuanNhanId} />
            </div><br />

        </div>
    )
}

export default CTDaoTao