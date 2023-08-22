import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.min.css';
import LyLich from './LyLich';
import QuaTrinh from './QuaTrinh';
import CTDaoTao from './CTDaoTao';
import CongTacNCKH from './CongTacNCKH';
import ThanNhan from '../../QuanLyQuanNhan/HoSoCanBo/ThanNhan';
import TaiSan from '../../QuanLyQuanNhan/HoSoCanBo/TaiSan';



const { TabPane } = Tabs;

function ChiTietQuanNhan() {
    return (
        <>
            <h2>Tên cán bộ, giáo viên: </h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Lý lịch" key="1">
                    <LyLich />
                </TabPane>
                <TabPane tab="Các quá trình" key="2">
                    <QuaTrinh />
                </TabPane>
                <TabPane tab="Công tác Đào tạo" key="3">
                    <CTDaoTao />
                </TabPane>
                <TabPane tab="Công tác NCKH" key="4">
                    <CongTacNCKH />
                </TabPane>
                <TabPane tab="Thân nhân" key="5">
                    <ThanNhan />
                </TabPane>
                <TabPane tab="Tài sản" key="6">
                    <TaiSan />
                </TabPane>

            </Tabs>
        </>
    );
}

export default ChiTietQuanNhan;
