import React, { useEffect, useState, useRef } from 'react';
import { Form, Table, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as TaiGiangDayService from '../../../services/TaiGiangDayService';
import { WrapperHeader } from '../style'
import TableComponent from '../../../components/TableComponent/TableComponent';

const TaiCaNhan = () => {
    const user = useSelector((state) => state?.user)
    const [isLoading, setIsLoading] = useState(true);
    const quannhanId = user.QuanNhanId;
    const [rowSelected, setRowSelected] = useState('')
    const [data, setData] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Tổng tải đào tạo',
            children: [
                {
                    title: 'Tải giảng dạy',
                    dataIndex: 'GioChuanGiangDay',
                },
                {
                    title: 'Tải hướng dẫn',
                    dataIndex: 'SoGioChuanHuongDan',
                },
                {
                    title: 'Tải khảo thí',
                    dataIndex: 'SoGioQuyDoiKhaoThi',
                },
                {
                    title: 'Tải hội đồng',
                    dataIndex: 'SoGioQuyDoiHoiDong',
                },
            ]

        },
        {
            title: 'Định mức chuẩn',
            dataIndex: '',


        },
        {
            title: 'Đối tượng miễn giảm',
            dataIndex: '',


        },
        {
            title: 'Tải yêu cầu',
            dataIndex: 'TaiDaoTaoYeuCau',

        },



        {
            title: 'Tải thực đào tạo',
            dataIndex: 'TaiThucDaoTaoYeuCau',

        },
        {
            title: 'Kết quả (%)',
            dataIndex: 'KetQuaDaoTao',

        },



    ];
    const columns1 = [
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

    const columns2 = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Tổng tải NCKH',
            children: [
                {
                    title: 'Bài báo khoa học',
                    dataIndex: 'SoGioChuanBaiBao',
                },
                {
                    title: 'Biên soạn',
                    dataIndex: 'SoGioChuanBienSoan',
                },
                {
                    title: 'Sáng chế',
                    dataIndex: 'SoGioQuyDoiSangChe',
                },
                {
                    title: 'Hợp đồng',
                    dataIndex: 'SoGioQuyDoiHopDong',
                },
                {
                    title: 'Đề tài NCKH',
                    dataIndex: 'GioChuanDeTai',
                },
                {
                    title: 'Giải thưởng',
                    dataIndex: 'SoGioQuyDoiGiaiThuong',
                },
                {
                    title: 'Hoạt động NC khác',
                    dataIndex: 'SoGioQuyDoiHoatDongKhac',
                },

            ]

        },

        {
            title: 'Tải yêu cầu',
            dataIndex: 'TaiNCKHYeuCau',

        },





        {
            title: 'Tải thực nghiên cứu',
            dataIndex: 'TaiThucNCKHYeuCau',

        },
        {
            title: 'Kết quả (%)',
            dataIndex: 'KetQuaNCKH',

        },



    ];
    const fetchTaiData = async () => {
        try {
            setIsLoading(true);
            const taiData = await TaiGiangDayService.getTongTaiFromId(quannhanId);
            setIsLoading(false);
            setData(taiData);
            console.log('e: ', taiData);
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    useEffect(() => {
        fetchTaiData();
    }, [quannhanId]);
    useEffect(() => {

        setDataTable([
            {
                key: 1,
                stt: 1,
                TaiDaoTaoYeuCau: data.TaiDaoTaoYeuCau,
                TaiThucDaoTaoYeuCau: data.TaiThucDaoTaoYeuCau,
                GioChuanGiangDay: data.GioChuanGiangDay,
                SoGioQuyDoiKhaoThi: data.SoGioQuyDoiKhaoThi,
                SoGioQuyDoiHoiDong: data.SoGioQuyDoiHoiDong,
                SoGioChuanHuongDan: data.SoGioChuanHuongDan,
                KetQuaDaoTao: data.KetQuaDaoTao,

                TaiNCKHYeuCau: data.TaiNCKHYeuCau,
                TaiThucNCKHYeuCau: data.TaiThucNCKHYeuCau,
                SoGioChuanBaiBao: data.SoGioChuanBaiBao,
                SoGioChuanBienSoan: data.SoGioChuanBienSoan,
                SoGioQuyDoiSangChe: data.SoGioQuyDoiSangChe,
                SoGioQuyDoiHopDong: data.SoGioQuyDoiHopDong,
                GioChuanDeTai: data.GioChuanDeTai,
                SoGioChuanHuongDanNCKH: data.SoGioChuanHuongDanNCKH,
                SoGioQuyDoiGiaiThuong: data.SoGioQuyDoiGiaiThuong,
                SoGioQuyDoiHoatDongKhac: data.SoGioQuyDoiHoatDongKhac,
                KetQuaNCKH: data.KetQuaNCKH,

                TongTaiYeuCau: data.TongTaiYeuCau,
                TongThucTai: data.TongThucTai,


            }
        ]);
    }, [data]);


    return (
        <div>
            <div>

                <WrapperHeader>Tổng hợp tải</WrapperHeader>
                <h3>Tổng tải đào tạo</h3>
                <TableComponent columns={columns} isLoading={isLoading} data={dataTable} />

            </div>

            <div>


                <h3>Tổng tải NCKH</h3>
                <TableComponent columns={columns2} isLoading={isLoading} data={dataTable} />

            </div>

            <div>


                <h3>Tổng hợp</h3>
                <TableComponent columns={columns1} isLoading={isLoading} data={dataTable} />

            </div>







        </div>

    );
};



export default TaiCaNhan;
