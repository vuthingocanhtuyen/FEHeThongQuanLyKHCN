import { Button, Form, Space } from 'antd'
import React from 'react'


import InputComponent from '../../../components/InputComponent/InputComponent'

import { convertPrice } from '../../../utils'


import * as OrderService from '../../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import ComboBoxComponent from '../../../components/ComboBoxComponent/ComboBox'
import { orderContant } from '../../../contant'
import FreeDonVi from '../../QuanLyDonVi/DanhMucDonVi/FreeDonVi'


import ThongKeHocVi from './ThongKeHocVi'
import ThongKeHocHam from './ThongKeHocHam'
import ThongKeCDCMKT from './ThongKeCDCMKT'
import ThongKeQuanHam from './ThongKeQuanHam'
import { WrapperContentProfile, WrapperContentProfileButton, WrapperContentProfileFree } from '../style'






const ThongKeBaoCao = () => {
    const user = useSelector((state) => state?.user)


    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }


    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
    const { isLoading: isLoadingOrders, data: orders } = queryOrder

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    // ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        // onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                // setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{
        //     //     backgroundColor: '#ffc069',
        //     //     padding: 0,
        //     //   }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
    });


    const optionCapBaoCao = [
        { value: '1', label: 'Khoa' },
        { value: '2', label: 'Bộ môn' },
        { value: '3', label: 'Phòng/Ban' },
    ];
    const optionloc = [
        { value1: '5', label: 'Học Hàm' },
        { value1: '6', label: 'Học vị' },
        { value1: '7', label: 'CDCMKT' },
        { value1: '8', label: 'Quân hàm' },
    ];

    const handleChangeCapBaoCao = (value) => {
        console.log(`selected value: ${value}`);
    };
    const handleChangeLoc = (value1) => {
        console.log(`selected value: ${value1}`);
    };




    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        console.log('usewr', order)
        return { ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod], isPaid: order?.isPaid ? 'TRUE' : 'FALSE', isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', totalPrice: convertPrice(order?.totalPrice) }
    })

    return (
        <div style={{ width: '1200px', margin: '0 auto', height: '700px', padding: '5px' }}>

            <div style={{ width: '200px', margin: '0 auto', height: '700px', float: 'left', background: '#fff' }}>
                <WrapperContentProfileFree>
                    <FreeDonVi />

                </WrapperContentProfileFree>


            </div>

            <div style={{ width: '750px', margin: '0 auto', height: '700px', float: 'right', textAlign: 'left', padding: '5px', background: 'back' }}>


                {/* <TableComponent columns={columns} isLoading={isLoadingOrders} data={dataTable} /> */}
                <h4>Đơn vị: </h4>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    autoComplete="on"
                >

                    <Form.Item
                        label="Cấp báo cáo: "
                        name="name"

                    >
                        <ComboBoxComponent
                            style={{ width: '500px' }}
                            options={optionCapBaoCao}
                            onChange={handleChangeCapBaoCao}

                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Báo cáo: "
                        name="name"

                    >
                        <ComboBoxComponent
                            style={{ width: '500px' }}
                            options={optionloc}
                            onChange={handleChangeLoc}

                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Lấy dữ liệu
                        </Button>
                    </Form.Item>

                    <h5>Học vị</h5>
                    <ThongKeHocVi />
                    <br />
                    <h5>Học hàm</h5>
                    <ThongKeHocHam />
                    <br />
                    <h5>Chức danh chuyên môn kỹ thuật</h5>
                    <ThongKeCDCMKT />
                    <br />
                    <h5>Quân hàm</h5>
                    <ThongKeQuanHam />

                </Form>
            </div>
        </div>
    )
}

export default ThongKeBaoCao