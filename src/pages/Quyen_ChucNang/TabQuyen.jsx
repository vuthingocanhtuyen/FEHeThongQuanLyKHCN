import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.min.css'

import DanhSachNhom from './DanhSachNhom';
import PhamViNhom from './PhamViNhom';
import ChucNangNhom from './ChucNangNhom';
import PhamViDuLieu from './PhamViDuLieu';
const { TabPane } = Tabs;

function TabQuyen() {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Danh sách nhóm" key="1">
                <DanhSachNhom />
            </TabPane>
            <TabPane tab="Phạm vi nhóm" key="2">
                <PhamViNhom />
            </TabPane>
            <TabPane tab="Chức năng nhóm" key="3">
                <ChucNangNhom />
            </TabPane>
            <TabPane tab="Phạm vi dữ liệu của chức năng" key="4">
                <PhamViDuLieu />
            </TabPane>

        </Tabs>
    );
}

export default TabQuyen;
