import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.min.css';
import ThanNhan from './ThanNhan';
import TaiSan from './TaiSan';

const { TabPane } = Tabs;

function TabThanhNhanTaiSan() {
    return (
        <Tabs defaultActiveKey="1">
            {/* <TabPane tab="Thân nhân" key="1">
                <ThanNhan />
            </TabPane>
            <TabPane tab="Tài sản" key="2">
                <TaiSan />
            </TabPane> */}

        </Tabs>
    );
}

export default TabThanhNhanTaiSan;
