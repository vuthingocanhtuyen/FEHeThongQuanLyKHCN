import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.min.css';
import TaiGiangDay2 from './TaiDaoTao/TaiGiangDay2';
import TaiHuongDan from './TaiDaoTao/TaiHuongDan';
import TaiKhaoThi from './TaiDaoTao/TaiKhaoThi';
import TaiHoiDong from './TaiDaoTao/TaiHoiDong';
const { TabPane } = Tabs;

function TabDaoTao() {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Tải giảng dạy" key="1">
                <TaiGiangDay2 />
            </TabPane>
            <TabPane tab="Tải hướng dẫn" key="2">
                <TaiHuongDan />
            </TabPane>
            <TabPane tab="Tải khảo thí" key="3">
                <TaiKhaoThi />
            </TabPane>
            <TabPane tab="Tải hội đồng" key="4">
                <TaiHoiDong />
            </TabPane>

        </Tabs>
    );
}

export default TabDaoTao;
