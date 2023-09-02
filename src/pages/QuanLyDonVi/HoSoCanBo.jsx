import { Button, Form, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'

import TableComponent from '../../components/TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../../components/InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
// import * as QuanNhanService from '../../services/QuanNhanService'
import * as QuanNhanService from '../../services/QuanNhanService'
import * as PriorityByUserService from '../../services/PriorityByUserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../../components/DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'
const HoSoCanBo = () => {
  const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)

  const navigate = useNavigate()
  const searchInput = useRef(null);
  useEffect(() => {
    const fetchGetChucVuDonVi = async () => {

      try {
        // Gọi API để lấy thông tin đơn vị hiện tại của người dùng
        const response = await PriorityByUserService.getChucVuDonViFromUser(user.QuanNhanId, user.access_token);
        console.log(response.data);

        if (response.data && response.data.length > 0) {
          const firstData = response.data[0];
          console.log(response.data[0]);
          const donViValue = firstData.DonVi[0];
          setCurrentUserDonVi(donViValue);
        }

      } catch (error) {
        console.error('Error fetching ChucVuDonVi:', error);
      }
    };

    fetchGetChucVuDonVi();
  }, [user.QuanNhanId, user.access_token]);
  const inittial = () => ({
    QuanNhanId: '',
    HoTen: '',
    NgaySinh: '',
    GioiTinh: '',
    QueQuan: '',
    DiaChi: '',
    SoDienThoai: '',
    Email: '',
    HoatDong: '',
    QuanHam: '',
    DonVi: '',
    LoaiQN: ''
  })
  const [stateQuanNhan, setStateQuanNhan] = useState(inittial())
  const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { QuanNhanId,
        HoTen,
        NgaySinh,
        GioiTinh,
        QueQuan,
        DiaChi,
        SoDienThoai,
        Email,
        HoatDong,
        QuanHam,
        DonVi,
        LoaiQN
      } = data
      const res = QuanNhanService.createQuanNhan({
        QuanNhanId,
        HoTen,
        NgaySinh,
        GioiTinh,
        QueQuan,
        DiaChi,
        SoDienThoai,
        Email,
        HoatDong,
        QuanHam,
        DonVi,
        LoaiQN
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = QuanNhanService.updateQuanNhan(
        id,
        token,
        { ...rests })
      return res
    },
  )

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id,
        token,
      } = data
      const res = QuanNhanService.deleteQuanNhan(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = QuanNhanService.deleteManyQuanNhan(
        ids,
        token)
      return res
    },
  )

  const getQuanNhanFromDonVi = async () => {
    const res = await QuanNhanService.getQuanNhanFromDonVi(currentUserDonVi)
    return res
  }


  const fetchGetDetailsQuanNhan = async (rowSelected) => {
    const res = await QuanNhanService.getDetailsQuanNhan(rowSelected)
    if (res?.data) {
      setStateQuanNhanDetails({
        QuanNhanId: res?.data?.QuanNhanId,
        HoTen: res?.data?.HoTen,
        NgaySinh: res?.data?.NgaySinh,
        GioiTinh: res?.data?.GioiTinh,
        QueQuan: res?.data?.QueQuan,
        DiaChi: res?.data?.DiaChi,
        SoDienThoai: res?.data?.SoDienThoai,
        Email: res?.data?.Email,
        HoatDong: res?.data?.HoatDong,
        QuanHam: res?.data?.QuanHam,
        DonVi: res?.data?.DonVi,
        LoaiQN: res?.data?.LoaiQN
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateQuanNhanDetails)
    } else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateQuanNhanDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsQuanNhan(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsQuanNhan = () => {
    setIsOpenDrawer(true)
  }

  const handleDelteManyQuanNhans = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryQuanNhan.refetch()
      }
    })
  }

  const handleDetailsHoSoCanBo = (ids) => {
    navigate(`/hosocanbo/${ids}`)
  }
  const fetchAllTypeQuanNhan = async () => {
    const res = await QuanNhanService.getAllType()
    return res
  }

  const { data, isLoading, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryQuanNhan = useQuery({ queryKey: ['quannhans'], queryFn: getQuanNhanFromDonVi })
  const typeQuanNhan = useQuery({ queryKey: ['type-quannhan'], queryFn: fetchAllTypeQuanNhan })
  const { isLoading: isLoadingQuanNhans, data: quannhans } = queryQuanNhan
  const renderAction = () => {
    return (
      <div>
        {/* <Button style={{ fontSize: '15px' }} onClick={() => handleDetailsHoSoCanBo(record._id)} > Chi tiết</Button> */}
        &nbsp;
        <Button style={{ fontSize: '15px' }} onClick={handleDetailsQuanNhan} >Tải xuống</Button>
      </div>
    )
  }


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

  });


  const columns = [
    {
      title: 'Mã quân nhân',
      dataIndex: 'QuanNhanId',
      sorter: (a, b) => a.QuanNhanId.length - b.QuanNhanId.length,
      ...getColumnSearchProps('QuanNhanId')
    },
    {
      title: 'Họ và tên',
      dataIndex: 'HoTen',
      sorter: (a, b) => a.HoTen.length - b.HoTen.length,
      ...getColumnSearchProps('HoTen')
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'NgaySinh',
      sorter: (a, b) => a.NgaySinh.length - b.NgaySinh.length,
      ...getColumnSearchProps('NgaySinh')
    },
    {
      title: 'Giới tính',
      dataIndex: 'GioiTinh',
      sorter: (a, b) => a.GioiTinh.length - b.GioiTinh.length,
      ...getColumnSearchProps('GioiTinh')
    },
    {
      title: 'Quê quán',
      dataIndex: 'QueQuan',
      sorter: (a, b) => a.QueQuan.length - b.QueQuan.length,
      ...getColumnSearchProps('QueQuan')
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'DiaChi',
      sorter: (a, b) => a.DiaChi.length - b.DiaChi.length,
      ...getColumnSearchProps('DiaChi')
    },
    {
      title: 'Đơn vị',
      dataIndex: 'DonVi',
      sorter: (a, b) => a.DonVi.length - b.DonVi.length,
      ...getColumnSearchProps('DonVi')
    },
    {
      title: 'Chức vụ',
      dataIndex: 'HoatDong',
      sorter: (a, b) => a.HoatDong.length - b.HoatDong.length,
      ...getColumnSearchProps('HoatDong')
    },


  ];
  const dataTable = quannhans?.data?.length && quannhans?.data?.map((quannhan) => {
    return { ...quannhan, key: quannhan._id }
  })

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
      message.success()
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDelectedMany])

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateQuanNhanDetails({
      QuanNhanId: '',
      HoTen: '',
      NgaySinh: '',
      GioiTinh: '',
      QueQuan: '',
      DiaChi: '',
      SoDienThoai: '',
      Email: '',
      HoatDong: '',
      QuanHam: '',
      DonVi: '',
      LoaiQN: ''
    })
    form.resetFields()
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }


  const handleDeleteQuanNhan = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryQuanNhan.refetch()
      }
    })
  }
  useEffect(() => {
    if (currentUserDonVi) {
      queryQuanNhan.refetch();
    }
  }, [currentUserDonVi, queryQuanNhan]);
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateQuanNhan({
      QuanNhanId: '',
      HoTen: '',
      NgaySinh: '',
      GioiTinh: '',
      QueQuan: '',
      DiaChi: '',
      SoDienThoai: '',
      Email: '',
      HoatDong: '',
      QuanHam: '',
      DonVi: '',
      LoaiQN: ''
    })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      QuanNhanId: stateQuanNhan.QuanNhanId,
      HoTen: stateQuanNhan.HoTen,
      NgaySinh: stateQuanNhan.NgaySinh,
      GioiTinh: stateQuanNhan.GioiTinh,
      QueQuan: stateQuanNhan.QueQuan,
      DiaChi: stateQuanNhan.DiaChi,
      SoDienThoai: stateQuanNhan.SoDienThoai,
      Email: stateQuanNhan.Email,
      HoatDong: stateQuanNhan.HoatDong,
      QuanHam: stateQuanNhan.QuanHam,
      DonVi: stateQuanNhan.DonVi,
      LoaiQN: stateQuanNhan.LoaiQN,
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryQuanNhan.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateQuanNhan({
      ...stateQuanNhan,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateQuanNhanDetails({
      ...stateQuanNhanDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateQuanNhan({
      ...stateQuanNhan,
      image: file.preview
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateQuanNhanDetails({
      ...stateQuanNhanDetails,
      image: file.preview
    })
  }
  const onUpdateQuanNhan = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQuanNhanDetails }, {
      onSettled: () => {
        queryQuanNhan.refetch()
      }
    })
  }

  const handleChangeSelect = (value) => {
    setStateQuanNhan({
      ...stateQuanNhan,
      type: value
    })
  }

  return (
    <div>
      <WrapperHeader>Quản lý quân nhân</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDelteMany={handleDelteManyQuanNhans} columns={columns} isLoading={isLoadingQuanNhans} data={dataTable} onRow={(record, rowIndex) => {
          return {

            onClick: event => {
              setRowSelected(record._id);
              handleDetailsHoSoCanBo(record._id);
            },

          };
        }} />
      </div>
      <ModalComponent forceRender title="Thêm quân nhân" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>

          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="QuanNhanId"
              name="QuanNhanId"
              rules={[{ required: true, message: 'Please input your QuanNhanId!' }]}
            >
              <InputComponent value={stateQuanNhan['QuanNhanId']} onChange={handleOnchange} name="QuanNhanId" />
            </Form.Item>

            {/* <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <Select
                name="type"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                value={stateQuanNhan.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeQuanNhan?.data?.data)}
                />
            </Form.Item>
            {stateQuanNhan.type === 'add_type' && (
              <Form.Item
                label='New type'
                name="newType"
                rules={[{ required: true, message: 'Please input your type!' }]}
              >
                <InputComponent value={stateQuanNhan.newType} onChange={handleOnchange} name="newType" />
              </Form.Item>
            )}
            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[{ required: true, message: 'Please input your count inStock!' }]}
            >
              <InputComponent value={stateQuanNhan.countInStock} onChange={handleOnchange} name="countInStock" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input your count price!' }]}
            >
              <InputComponent value={stateQuanNhan.price} onChange={handleOnchange} name="price" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your count description!' }]}
            >
              <InputComponent value={stateQuanNhan.description} onChange={handleOnchange} name="description" />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: 'Please input your count rating!' }]}
            >
              <InputComponent value={stateQuanNhan.rating} onChange={handleOnchange} name="rating" />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[{ required: true, message: 'Please input your discount of quannhan!' }]}
            >
              <InputComponent value={stateQuanNhan.discount} onChange={handleOnchange} name="discount" />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Please input your count image!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button >Select File</Button>
                {stateQuanNhan?.image && (
                  <img src={stateQuanNhan?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="avatar" />
                )}
              </WrapperUploadFile>
            </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>


      <DrawerComponent title='Danh sách quân nhân' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateQuanNhan}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="QuanNhanId"
              name="QuanNhanId"
              rules={[{ required: true, message: 'Please input your QuanNhanId!' }]}
            >
              <InputComponent value={stateQuanNhanDetails['QuanNhanId']} onChange={handleOnchangeDetails} name="QuanNhanId" />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa quân nhân" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQuanNhan}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa quân nhân này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default HoSoCanBo