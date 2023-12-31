import React, { useState } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.min.css'
import 'antd/dist/antd.css'
import DanhSachNhom from './DanhSachNhom';
import PhamViNhom from './PhamViNhom';
import ChucNangNhom from './ChucNangNhom';
import PhamViDuLieu from './PhamViDuLieu';
const { TabPane } = Tabs;

function TabQuyen() {
    const [selectedRowId, setSelectedRowId] = useState(null); 
    const handleselectedrow = (item)=>{
        setSelectedRowId(item._id);

    } 
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Danh sách nhóm" key="1">
                <DanhSachNhom handleselectedrow={handleselectedrow} selectedRowId={selectedRowId}/>
            </TabPane>
            <TabPane tab="Phạm vi nhóm" key="2">
                <PhamViNhom handleselectedrow={handleselectedrow} selectedRowId={selectedRowId}/>
            </TabPane>
            <TabPane tab="Chức năng nhóm" key="3">
                <ChucNangNhom handleselectedrow={handleselectedrow} selectedRowId={selectedRowId}/>
            </TabPane>
            <TabPane tab="Phạm vi dữ liệu của chức năng" key="4">
                <PhamViDuLieu />
            </TabPane>

        </Tabs>
    );
}

export default TabQuyen;
