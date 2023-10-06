import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.min.css';
import LyLich from '../QuanLyDonVi/ChiTietQuanNhan/LyLich';

import { useNavigate, useParams } from 'react-router-dom'
import QuaTrinhDieuChuyen from './DanhMucDonVi/QuaTrinhDieuChuyen';

const { TabPane } = Tabs;

function DieuChuyenCanBoId() {
    const { id } = useParams()

    return (
        <>

            <Tabs defaultActiveKey="1">
                <TabPane >



                </TabPane>
                <TabPane tab="Điều chuyển cán bộ" key="1">

                    <QuaTrinhDieuChuyen idQuanNhan={id} />

                </TabPane>

            </Tabs>
        </>
    );
}

export default DieuChuyenCanBoId;
