import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.min.css';
import LyLich from './LyLich';
import QuaTrinh from './QuaTrinh';
import CTDaoTao from './CTDaoTao';
import CongTacNCKH from './CongTacNCKH';
import ThanNhan from '../../QuanLyQuanNhan/HoSoCanBo/ThanNhan';
import TaiSan from '../../QuanLyQuanNhan/HoSoCanBo/TaiSan';

import { useNavigate, useParams } from 'react-router-dom'
import NgoaiNgu from '../../QuanLyQuanNhan/HoSoCanBo/NgoaiNgu';

const { TabPane } = Tabs;

function ChiTietQuanNhan() {
    const { id } = useParams()

    return (
        <>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Lý lịch" key="1">

                    <LyLich idQuanNhan={id} />
                    {/* 
                    <NgoaiNgu idQuanNhan={id} /> */}
                </TabPane>
                <TabPane tab="Các quá trình" key="2">
                    <QuaTrinh idQuanNhan={id} />
                </TabPane>
                <TabPane tab="Công tác Đào tạo" key="3">
                    <CTDaoTao idQuanNhan={id} />
                </TabPane>
                <TabPane tab="Công tác NCKH" key="4">
                    <CongTacNCKH idQuanNhan={id} />
                </TabPane>
                <TabPane tab="Thân nhân" key="5">
                    <ThanNhan idQuanNhan={id} />
                </TabPane>
                <TabPane tab="Tài sản" key="6">
                    <TaiSan idQuanNhan={id} />
                </TabPane>

            </Tabs>
        </>
    );
}

export default ChiTietQuanNhan;
