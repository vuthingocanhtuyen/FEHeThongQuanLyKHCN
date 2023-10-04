
import React, { useEffect, useState, useRef } from 'react';
import { Form, Table, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { getBase64 } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as QuyTrinhHocTapKhacService from '../../../../services/QTHocTapKhacService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const QTHoaTapKhac = ({ quannhanId}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  
  const inittial = () => ({
    Ten: '',
    Loai: '',
    Truong: '',
    NamNhan: '',
    GhiChu: '',

  })


  const [stateQuyTrinhHocTapKhac, setStateQuyTrinhHocTapKhac] = useState(inittial())
  const [stateQuyTrinhHocTapKhacDetails, setStateQuyTrinhHocTapKhacDetails] = useState(inittial())


  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { QuanNhanId = quannhanId,
        code = 123,
        Ten,
        Loai,
        Truong,
        NamNhan,
        GhiChu } = data
      const res = QuyTrinhHocTapKhacService.createQuaTrinhHocTapKhac({
        QuanNhanId, code, Ten,
        Loai,
        Truong,
        NamNhan,
        GhiChu
      })
      console.log("data create htk:", res.data)
      return res

    }
  )

  const mutationUpdate = useMutationHooks(
    (data) => {
      console.log("data update htk:", data)
      const { id,
        token,
        ...rests } = data
      const res = QuyTrinhHocTapKhacService.updateQuaTrinhHocTapKhac(
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
      const res = QuyTrinhHocTapKhacService.deleteQuaTrinhHocTapKhac(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = QuyTrinhHocTapKhacService.deleteManyQuaTrinhHocTapKhac(
        ids,
        token)
      return res
    },
  )


  const getAllQuyTrinhHocTapKhacs = async () => {
    const res = await QuyTrinhHocTapKhacService.getAllQuaTrinhHocTapKhac()
    return res
  }

  // show


  const fetchGetQuyTrinhHocTapKhac = async (context) => {
    
    if (quannhanId) {
      const res = await QuyTrinhHocTapKhacService.getQuaTrinhHocTapKhacByQuanNhanId(quannhanId)
      console.log("qthtk res: ", res)
      if (res?.data) {
        setStateQuyTrinhHocTapKhacDetails({
          Ten: res?.data.Ten,
          Loai: res?.data.Loai,
          Truong: res?.data.Truong,
          NamNhan: res?.data.NamNhan,
          GhiChu: res?.data.GhiChu,
        })
      }

      return res.data
    }
    setIsLoadingUpdate(false)
  }
  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateQuyTrinhHocTapKhacDetails)
    } else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateQuyTrinhHocTapKhacDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsQuyTrinhHocTapKhac(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsQuyTrinhHocTapKhac = () => {
    setIsOpenDrawer(true)
  }


  const handleDelteManyQuyTrinhHocTapKhacs = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        qthoctapkhacDetails.refetch()
      }
    })
  }


  const { data, isLoading, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryQuyTrinhHocTapKhac = useQuery({ queryKey: ['quatrinhhoctapkhacs'], queryFn: getAllQuyTrinhHocTapKhacs })
  const qthoctapkhacDetails = useQuery(['hosoquannhanhtk', quannhanId], fetchGetQuyTrinhHocTapKhac, { enabled: !!quannhanId })

  console.log('detal htk:', qthoctapkhacDetails.data, queryQuyTrinhHocTapKhac.data)

  const { isLoading: isLoadingQuyTrinhHocTapKhac, data: quatrinhcongtacs } = queryQuyTrinhHocTapKhac
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsQuyTrinhHocTapKhac} />
      </div>
    )
  }

  const onChange = () => { }

  const fetchGetDetailsQuyTrinhHocTapKhac = async (rowSelected) => {
    const res = await QuyTrinhHocTapKhacService.getDetailsQuaTrinhHocTapKhac(rowSelected)
    if (res?.data) {
      setStateQuyTrinhHocTapKhacDetails({
        Ten: res?.data.Ten,
        Loai: res?.data.Loai,
        Truong: res?.data.Truong,
        NamNhan: res?.data.NamNhan,
        GhiChu: res?.data.GhiChu,
      })
    }
    setIsLoadingUpdate(false)
  }



  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsQuyTrinhHocTapKhac(rowSelected)
    }
    setIsLoadingUpdate(false)
  }, [rowSelected])


  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateQuyTrinhHocTapKhacDetails)
    } else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateQuyTrinhHocTapKhacDetails, isModalOpen])





  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

  };
  const handleReset = (clearFilters) => {
    clearFilters();

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


  //Show dữ liệu

  //const { data: qthoctapkhacDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetQuyTrinhHocTapKhac, { enabled: !!quannhanId })
  //console.log("qtrinhcongtac:", qthoctapkhacDetails)
  console.log("idquannhancongtac:", quannhanId)






  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text, record, index) => index + 1,

    },

    {
      title: 'Tên',
      dataIndex: 'Ten',
      key: 'Ten',
    },
    {
      title: 'Loại',
      dataIndex: 'Loai',
      key: 'Loai',
    },
    {
      title: 'Trường',
      dataIndex: 'Truong',
      key: 'Truong',
    },
    {
      title: 'Năm nhận',
      dataIndex: 'NamNhan',
      key: 'NamNhan',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'GhiChu',
      key: 'GhiChu',
    },
    {
      title: 'Chức năng',
      dataIndex: 'action',
      render: renderAction
    },
  ];

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])

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
    setStateQuyTrinhHocTapKhacDetails({
      Ten: '',
      Loai: '',
      Truong: '',
      NamNhan: '',
      GhiChu: '',
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


  const handleDeleteQuyTrinhHocTapKhac = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        qthoctapkhacDetails.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateQuyTrinhHocTapKhac({
      Ten: '',
      Loai: '',
      Truong: '',
      NamNhan: '',
      GhiChu: '',
    })
    form.resetFields()
  };


  const onFinish = () => {
    const params = {
      Ten: stateQuyTrinhHocTapKhac.Ten,
      Loai: stateQuyTrinhHocTapKhac.Loai,
      Truong: stateQuyTrinhHocTapKhac.Truong,
      NamNhan: stateQuyTrinhHocTapKhac.NamNhan,
      GhiChu: stateQuyTrinhHocTapKhac.GhiChu,
    }
    console.log("Finsh", stateQuyTrinhHocTapKhac)
    mutation.mutate(params, {
      onSettled: () => {
        qthoctapkhacDetails.refetch()
      }
    })
  }



  const handleOnchange = (e) => {
    console.log("e: ", e.target.name, e.target.value)
    setStateQuyTrinhHocTapKhac({
      ...stateQuyTrinhHocTapKhac,
      [e.target.name]: e.target.value
    })
  }


  const handleOnchangeDetails = (e) => {
    console.log('check', e.target.name, e.target.value)
    setStateQuyTrinhHocTapKhacDetails({
      ...stateQuyTrinhHocTapKhacDetails,
      [e.target.name]: e.target.value
    })
  }


  const onUpdateQuyTrinhHocTapKhac = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQuyTrinhHocTapKhacDetails }, {
      onSettled: () => {
        qthoctapkhacDetails.refetch()
      }
    })
  }

  const dataTable = qthoctapkhacDetails?.data?.length && qthoctapkhacDetails?.data?.map((qthoctapkhacDetails) => {
    return { ...qthoctapkhacDetails, key: qthoctapkhacDetails._id }
  })
  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  return (
    <div>
      <div>
        <WrapperHeader>Quá trình học tập khác</WrapperHeader>
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
        </div>
        {isLoading ? ( // Hiển thị thông báo đang tải
          <div>Loading...</div>
        ) : (
          // <Table dataSource={qthoctapkhacDetails} columns={columns} />
          <TableComponent columns={columns} isLoading={isLoadingQuyTrinhHocTapKhac} data={dataTable} onRow={(record, rowSelected) => {
            return {
              onClick: event => {
                setRowSelected(record._id);


              }

            };
          }} />
        )}

      </div>

      <ModalComponent forceRender title="Thêm quá trình học tập khác" open={isModalOpen} onCancel={handleCancel} footer={null} width="70%">
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
              label="Tên"
              name="Ten"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent
                value={stateQuyTrinhHocTapKhac['Ten']}
                onChange={handleOnchange}
                name="Ten" />
            </Form.Item>

            <Form.Item
              label="Loại"
              name="Loai"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuyTrinhHocTapKhac['Loai']} onChange={handleOnchange} name="Loai" />
            </Form.Item>

            <Form.Item
              label="Trường"
              name="Truong"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuyTrinhHocTapKhac['Truong']} onChange={handleOnchange} name="Truong" />
            </Form.Item>
            <Form.Item
              label="Năm nhận"
              name="NamNhan"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuyTrinhHocTapKhac['NamNhan']} onChange={handleOnchange} name="NamNhan" />
            </Form.Item>
            <Form.Item
              label="Ghi chú"
              name="GhiChu"
            //  rules={[{ required: true, message:  'Nhập vào chỗ trống!'  }]}
            >
              <InputComponent value={stateQuyTrinhHocTapKhac['GhiChu']} onChange={handleOnchange} name="GhiChu" />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>


      <DrawerComponent title='Cập nhật quá trình  học tập khác' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateQuyTrinhHocTapKhac}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên "
              name="Ten"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuyTrinhHocTapKhacDetails['Ten']} onChange={handleOnchangeDetails} name="Ten" />
            </Form.Item>

            <Form.Item
              label="Loại"
              name="Loai"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuyTrinhHocTapKhacDetails['Loai']} onChange={handleOnchangeDetails} name="Loai" />
            </Form.Item>
            <Form.Item
              label="Trường"
              name="Truong"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuyTrinhHocTapKhacDetails['Truong']} onChange={handleOnchangeDetails} name="Truong" />
            </Form.Item>
            <Form.Item
              label="Năm nhận"
              name="NamNhan"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuyTrinhHocTapKhacDetails['NamNhan']} onChange={handleOnchangeDetails} name="NamNhan" />
            </Form.Item>

            <Form.Item
              label="Ghi chú"
              name="GhiChu"
            //  rules={[{ required: true, message:  'Nhập vào chỗ trống!'  }]}
            >
              <InputComponent value={stateQuyTrinhHocTapKhac['GhiChu']} onChange={handleOnchange} name="GhiChu" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa quá trình  học tập khác" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQuyTrinhHocTapKhac}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa quá trình  học tập khác này không?</div>
        </Loading>
      </ModalComponent>

    </div>

  );
};

export default QTHoaTapKhac;
