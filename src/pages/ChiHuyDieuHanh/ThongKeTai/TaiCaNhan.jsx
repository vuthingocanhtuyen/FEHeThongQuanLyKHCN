
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
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const [rowSelected, setRowSelected] = useState('')

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
    const getAllThongKeTais = async () => {
        console.log("bat dau");
        const res = await TaiGiangDayService.getTongTaiFromId(quannhanId)
        return res
    }

    const queryQuanNhan = useQuery({ queryKey: ['tonghoptais'], queryFn: getAllThongKeTais })
    const { isLoading: isLoadingQuanNhans, data: tonghoptais } = queryQuanNhan

    const dataTable = tonghoptais?.data?.length && tonghoptais?.data?.map((tonghoptai) => {
        return { ...tonghoptai, key: tonghoptai._id }
    })
    return (
        <div>
            <div>

                <WrapperHeader>Tổng hợp tải</WrapperHeader>
                <TableComponent columns={columns} isLoading={isLoadingQuanNhans} data={dataTable} onRow={(record, rowSelected) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id);
                        }
                    };
                }} />

            </div>
        </div>

    );
};



export default TaiCaNhan;
