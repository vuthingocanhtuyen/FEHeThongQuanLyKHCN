import React from 'react'
import * as QuanNhanService from '../../../services/QuanNhanService'


import { useQuery } from '@tanstack/react-query'

import QTCongTac from '../ChiTietQuanNhan/HoSoCanBo/QTCongTac'
import QTDang from '../ChiTietQuanNhan/HoSoCanBo/QTDang'
import QTQuanHam from '../ChiTietQuanNhan/HoSoCanBo/QTQuanHam'
import QTCDCMKT from '../ChiTietQuanNhan/HoSoCanBo/QTCDCMKT'
import QTHocTapKhac from '../ChiTietQuanNhan/HoSoCanBo/QTHocTapKhac'
import QTNgoaiNgu from '../ChiTietQuanNhan/HoSoCanBo/QTNgoaiNgu'
import DaiHoc from '../ChiTietQuanNhan/HoSoCanBo/DaiHoc'
import SauDaiHoc from '../ChiTietQuanNhan/HoSoCanBo/SauDaiHoc'
import TinhTrangCT from '../ChiTietQuanNhan/HoSoCanBo/TinhTrangCT'
import QuaTrinhHocHam from './HoSoCanBo/QuaTrinhHocHam'
import QuaTrinhHocVi from './HoSoCanBo/QuaTrinhHocVi'
//import QTCongTac from '../../QuanLyQuanNhan/HoSoCanBo/QTCongTac'
// import QTDang from '../ChiTietQuanNhan/HoSoCanBo/QTDang'
// import QTQuanHam from '../ChiTietQuanNhan/HoSoCanBo/QTQuanHam'
// import QTCDCMKT from '../ChiTietQuanNhan/HoSoCanBo/QTCDCMKT'
// import QTHocTapKhac from '../ChiTietQuanNhan/HoSoCanBo/QTHocTapKhac'
// import QTNgoaiNgu from '../ChiTietQuanNhan/HoSoCanBo/QTNgoaiNgu'
// import DaiHoc from '../ChiTietQuanNhan/HoSoCanBo/DaiHoc'
// import SauDaiHoc from '../ChiTietQuanNhan/HoSoCanBo/SauDaiHoc'
// import TinhTrangCT from '../ChiTietQuanNhan/HoSoCanBo/TinhTrangCT'

const QuaTrinh = ({ idQuanNhan }) => {


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
                <QTCongTac quannhanId={quannhanDetails?.QuanNhanId} />
            </div><br />

            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTNgoaiNgu quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <DaiHoc quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <SauDaiHoc quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />


            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <TinhTrangCT quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTDang quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTQuanHam quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QuaTrinhHocHam quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QuaTrinhHocVi quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCDCMKT quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            <div style={{ width: '1270px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTHocTapKhac quannhanId={quannhanDetails?.QuanNhanId} />
            </div>
            <br />
            {/* <div style={{ width: '1270px', margin: '0 auto', height: '400px', padding: '10px', background: '#fff', borderRadius: "8px", border: "1px solid #ccc" }}>
                <QTCapBac />
            </div> */}
        </div>
    )
}

export default QuaTrinh