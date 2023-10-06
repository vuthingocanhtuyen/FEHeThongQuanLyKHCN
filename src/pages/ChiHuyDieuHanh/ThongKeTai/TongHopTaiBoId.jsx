import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.min.css';


import { useNavigate, useParams } from 'react-router-dom'

import TongHopTai from './TongHopTai';

const { TabPane } = Tabs;

function TongHopTaiBoId() {
    const { id } = useParams()

    return (
        <>

            <Tabs defaultActiveKey="1">
                <TabPane >



                </TabPane>
                <TabPane tab="Tổng hợp tải" key="1">

                    <TongHopTai idQuanNhan={id} />

                </TabPane>

            </Tabs>
        </>
    );
}

export default TongHopTaiBoId;
