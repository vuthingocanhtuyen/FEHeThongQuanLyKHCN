import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import BaiBaoKH from './TaiNghienCuu/BaiBaoKH';
import DeTaiNCKH from './TaiNghienCuu/DeTaiNCKH';
import HuongDanNCKH from './TaiNghienCuu/HuongDanNCKH';
import GiaiThuongNCKH from './TaiNghienCuu/GiaiThuongNCKH';
import SangChe from './TaiNghienCuu/SangChe';
import HoatDongKhac from './TaiNghienCuu/HoatDongKhac';
const { TabPane } = Tabs;

function TabNghienCuu() {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Bài báo khoa học" key="1">
                <BaiBaoKH />
            </TabPane>
            <TabPane tab="Đề tài NCKH" key="2">
                <DeTaiNCKH />
            </TabPane>
            <TabPane tab="Hướng dẫn NCKH" key="3">
                <HuongDanNCKH />
            </TabPane>
            <TabPane tab="Giải thưởng NCKH" key="4">
                <GiaiThuongNCKH />
            </TabPane>
            <TabPane tab="Sáng chế" key="6">
                <SangChe />
            </TabPane>
            <TabPane tab="Hoạt động khác" key="7">
                <HoatDongKhac />
            </TabPane>
        </Tabs>
    );
}

export default TabNghienCuu;
