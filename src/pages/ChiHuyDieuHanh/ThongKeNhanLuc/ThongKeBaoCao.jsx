import { Button, Form, Space } from 'antd'
import React from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { convertPrice } from '../../../utils'
import * as OrderService from '../../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import ComboBoxComponent from '../../../components/ComboBoxComponent/ComboBoxComponent'
import { orderContant } from '../../../contant'
import { useState } from 'react'
import FreeDonVi from '../../QuanLyDonVi/DanhMucDonVi/FreeDonVi'
import ThongKeHocVi from './ThongKeHocVi'
import ThongKeHocHam from './ThongKeHocHam'
import ThongKeCDCMKT from './ThongKeCDCMKT'
import ThongKeQuanHam from './ThongKeQuanHam'
import { WrapperContentProfileFree } from '../style'






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
    const [treeNodeClickedId, setTreeNodeClickedId] = useState(null);
    const handleTreeNodeClick = (item) => {
        setTreeNodeClickedId(item); // Cập nhật ID node từ FreeDonVi
    }
    return (
        <div style={{ width: '1200px', margin: '0 auto', height: '700px', padding: '5px' }}>

            <div style={{ width: '200px', margin: '0 auto', height: '700px', float: 'left', background: '#fff' }}>
                <WrapperContentProfileFree>
                    <FreeDonVi handleTreeNodeClick={handleTreeNodeClick} treeNodeClickedId={treeNodeClickedId}/>
                </WrapperContentProfileFree>
            </div>
            <div style={{ width: '750px', margin: '0 auto', height: '700px', float: 'right', textAlign: 'left', padding: '5px', background: 'back' }}>

                
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    autoComplete="on"
                >

                    <h2>Học vị</h2>
                    <ThongKeHocVi handleTreeNodeClick={handleTreeNodeClick} treeNodeClickedId={treeNodeClickedId}/>
                    <br />
                    <h2>Học hàm</h2>
                    <ThongKeHocHam handleTreeNodeClick={handleTreeNodeClick} treeNodeClickedId={treeNodeClickedId}/>
                    <br />
                    <h2>Chức danh chuyên môn kỹ thuật</h2>
                    <ThongKeCDCMKT handleTreeNodeClick={handleTreeNodeClick} treeNodeClickedId={treeNodeClickedId}/>
                    <br />
                    <h2>Quân hàm</h2>
                    <ThongKeQuanHam handleTreeNodeClick={handleTreeNodeClick} treeNodeClickedId={treeNodeClickedId}/>

                </Form>
            </div>
        </div>
    )
}

export default ThongKeBaoCao