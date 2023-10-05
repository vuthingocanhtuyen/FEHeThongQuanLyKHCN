
import React, { useEffect, useState, useRef } from 'react';
import { Form, Table, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { getBase64 } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as ThongKeTaiService from '../../../services/ThongKeTaiService';


import * as TaiGiangDayService from '../../../services/TaiGiangDayService';

import { WrapperHeader } from '../style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
import moment from 'moment';
const TaiCaNhan = () => {
    const user = useSelector((state) => state?.user)
    const [isLoading, setIsLoading] = useState(true);
    const quannhanId = user.QuanNhanId;
    const [rowSelected, setRowSelected] = useState('')
    const [data, setData] = useState([]);
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Tải đào tạo yêu cầu',
            dataIndex: 'TaiDaoTaoYeuCau',


        },
        {
            title: 'Tải NCKH yêu cầu',
            dataIndex: 'TaiNCKHYeuCau',

        },
        {
            title: 'Tổng tải yêu cầu',
            dataIndex: 'TongTaiYeuCau',

        },


        {
            title: 'Tải thực đào tạo',
            dataIndex: 'TaiThucDaoTaoYeuCau',

        },
        {
            title: 'Tải thực NCKH',
            dataIndex: 'TaiThucNCKHYeuCau',

        },
        {
            title: 'Tổng tải thực',
            dataIndex: 'TongThucTai',

        },


    ];
    const fetchTaiData = async () => {
        try {
            setIsLoading(true);
            const taiData = await TaiGiangDayService.getTongTaiFromId(quannhanId);
            setIsLoading(false);
            setData(taiData);
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    useEffect(() => {
        fetchTaiData();
    }, [quannhanId]);

    const dataTable = Array.isArray(data) ? data.map((item, index) => ({
        key: index,
        stt: index + 1,
        TaiDaoTaoYeuCau: item.TaiDaoTaoYeuCau,
        TaiNCKHYeuCau: item.TaiNCKHYeuCau,
        TongTaiYeuCau: item.TongTaiYeuCau,
        TaiThucDaoTaoYeuCau: item.TaiThucDaoTaoYeuCau,
        TaiThucNCKHYeuCau: item.TaiThucNCKHYeuCau,
        TongThucTai: item.TongThucTai,
    })) : [];
    return (
        <div>
            <div>

                <WrapperHeader>Tổng hợp tải</WrapperHeader>
                <TableComponent columns={columns} isLoading={isLoading} data={dataTable} />
            </div>
        </div>

    );
};



export default TaiCaNhan;
