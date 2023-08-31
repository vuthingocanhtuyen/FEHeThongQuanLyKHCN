import React from 'react'
import * as QuanNhanService from '../../../services/QuanNhanService'


import { useQuery } from '@tanstack/react-query'


import QTCongTac from '../../QuanLyQuanNhan/HoSoCanBo/QTCongTac'
import QTDang from '../../QuanLyQuanNhan/HoSoCanBo/QTDang'
import QTQuanHam from '../../QuanLyQuanNhan/HoSoCanBo/QTQuanHam'
import QTCDCMKT from '../../QuanLyQuanNhan/HoSoCanBo/QTCDCMKT'
import QTHocTapKhac from '../../QuanLyQuanNhan/HoSoCanBo/QTHocTapKhac'
import QTNgoaiNgu from '../../QuanLyQuanNhan/HoSoCanBo/QTNgoaiNgu'
import DaiHoc from '../../QuanLyQuanNhan/HoSoCanBo/DaiHoc'
import SauDaiHoc from '../../QuanLyQuanNhan/HoSoCanBo/SauDaiHoc'
import TinhTrangCT from '../../QuanLyQuanNhan/HoSoCanBo/TinhTrangCT'


const QuaTrinh = ({ idQuanNhan }) => {
    const onChange = () => { }

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
                <QTCongTac quannhanId={quannhanDetails?.QuanNhanId} />
            </div><br />

            <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTNgoaiNgu quannhanId={quannhanDetails?.QuanNhanId} />
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