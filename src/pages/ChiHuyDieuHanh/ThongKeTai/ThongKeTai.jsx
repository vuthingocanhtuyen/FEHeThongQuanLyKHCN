import { Button, Form, Space } from 'antd'
import React from 'react'


import InputComponent from '../../../components/InputComponent/InputComponent'

import { convertPrice, getBase64 } from '../../../utils'


import * as OrderService from '../../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { orderContant } from '../../../contant'
import FreeDonVi from '../../QuanLyDonVi/DanhMucDonVi/FreeDonVi'
import { WrapperContentProfile, WrapperInput, WrapperLabel, WrapperContentProfileFree, WrapperContentProfileText } from '../style'
import CheckboxComponent from '../../../components/CheckBox/CheckBox'
import InputForm from '../../../components/InputForm/InputForm'
import TaiCaNhan from './TaiCaNhan'
import TaiDonVi from './TaiDonVi'



const ThongKeTai = () => {
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

    });



    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        console.log('usewr', order)
        return { ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod], isPaid: order?.isPaid ? 'TRUE' : 'FALSE', isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', totalPrice: convertPrice(order?.totalPrice) }
    })

    return (
        <div style={{ margin: '0 auto', height: '700px', padding: '5px' }}>

            <div style={{ margin: '0 auto', height: '700px', float: 'left', padding: '0px 30px 0px 0px' }}>
                <WrapperContentProfileFree>
                    <FreeDonVi />
                </WrapperContentProfileFree>
            </div>

            <div style={{ margin: '0 auto', height: '125px', float: 'left', border: '1px solid #ccc', padding: '5px' }}>

                <div style={{ margin: '0 auto', height: '115px', float: 'left' }}>

                    <WrapperContentProfile>
                        <Form.Item
                            label="Cấp báo cáo: "
                            name="name"

                        >
                            <InputComponent />
                        </Form.Item>



                    </WrapperContentProfile>
                </div>
                <div style={{ margin: '0 auto', height: '115px', float: 'left', padding: '0px 0px 0px 10px' }}>

                    <WrapperContentProfile>


                        <Form.Item
                            label="Năm báo cáo: "
                            name="name"

                        >
                            <InputComponent />
                        </Form.Item>


                    </WrapperContentProfile>
                </div>
                <div style={{ margin: '0 auto', height: '115px', float: 'left', padding: '0px 0px 0px 10px' }}>

                    <WrapperContentProfile>


                        <Form.Item
                            label="Sắp xếp theo: "
                            name="name"

                        >
                            <InputComponent />
                        </Form.Item>


                    </WrapperContentProfile>
                </div>
                <div style={{ margin: '0 auto', height: '115px', float: 'left', padding: '0px 30px 0px 10px' }}>

                    <WrapperContentProfile>

                        <CheckboxComponent >
                            Hiển thị bảng
                        </CheckboxComponent>
                        <br />
                        <br />
                        <CheckboxComponent >
                            Hiển thị theo biểu đồ
                        </CheckboxComponent>


                    </WrapperContentProfile>
                </div>


                <Button type="primary" htmlType="submit">
                    Lấy dữ liệu
                </Button>
                <br />
                <br />
                <Button type="primary" htmlType="submit">
                    Xuất Excel
                </Button>

                <br />

                <div style={{ margin: '0 auto', height: '1500px', float: 'none', padding: '50px 0px 0px 0px' }}>
                    <TaiCaNhan />
                    {/* <TaiDonVi /> */}
                </div>

            </div>




        </div>

    )
}

export default ThongKeTai