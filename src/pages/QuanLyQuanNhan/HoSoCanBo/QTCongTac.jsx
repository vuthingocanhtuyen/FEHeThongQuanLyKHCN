
import React, { useEffect, useState, useRef } from 'react';
import { Form, Table, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { getBase64 } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as QuaTrinhCongTacService from '../../../services/QuaTrinhCongTacService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
const QTCongTac = ({ quannhanId }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);

  const inittial = () => ({
    SoQuyetDinh: '',
    NgayQuyetDinh: '',
    ChucVu: '',
    DonVi: '',
    KetThuc: '',
    DonViSinhHoatHocThuat: '',
    TrangThai: '',
    GhiChu: '',
  })
  const [stateQuaTrinhCongTac, setStateQuaTrinhCongTac] = useState(inittial())
  const [stateQuaTrinhCongTacDetails, setStateQuaTrinhCongTacDetails] = useState(inittial())


  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { SoQuyetDinh,
        NgayQuyetDinh, ChucVu, DonVi, KetThuc, DonViSinhHoatHocThuat,
        TrangThai,
        GhiChu } = data
      const res = QuaTrinhCongTacService.createQuaTrinhCongTac({
        SoQuyetDinh,
        NgayQuyetDinh, ChucVu, DonVi, KetThuc, DonViSinhHoatHocThuat,
        TrangThai,
        GhiChu
      })
      return res
    }
  )

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = QuaTrinhCongTacService.updateQuaTrinhCongTac(
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
      const res = QuaTrinhCongTacService.deleteQuaTrinhCongTac(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = QuaTrinhCongTacService.deleteManyQuaTrinhCongTac(
        ids,
        token)
      return res
    },
  )


  const getAllQuaTrinhCongTacs = async () => {
    const res = await QuaTrinhCongTacService.getAllQuaTrinhCongTac()
    return res
  }

  // show


  const fetchGetQuaTrinhCongTac = async (context) => {
    const quannhanId = context?.queryKey && context?.queryKey[1]
    console.log("idquannhancongtacfe:", quannhanId)
    if (quannhanId) {

      const res = await QuaTrinhCongTacService.getQuaTrinhCongTacByQuanNhanId(quannhanId)
      console.log("qtct res: ", res)
      if (res?.data) {
        setStateQuaTrinhCongTacDetails({
          SoQuyetDinh: res?.data.SoQuyetDinh,
          NgayQuyetDinh: res?.data.NgayQuyetDinh,
          ChucVu: res?.data.ChucVu,
          DonVi: res?.data.DonVi,
          KetThuc: res?.data.KetThuc,
          DonViSinhHoatHocThuat: res?.data.DonViSinhHoatHocThuat,
          TrangThai: res?.data.TrangThai,
          GhiChu: res?.data.GhiChu,
        })
      }
      setIsLoadingUpdate(false)
      console.log("qn:", res.data)
      console.log("chi tiết qtct:", setStateQuaTrinhCongTacDetails)
      return res.data
    }
  }
  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateQuaTrinhCongTacDetails)
    } else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateQuaTrinhCongTacDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsQuaTrinhCongTac(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const onChange = () => { }

  const fetchGetDetailsQuaTrinhCongTac = async (rowSelected) => {
    const res = await QuaTrinhCongTacService.getDetailsQuaTrinhCongTac(rowSelected)
    if (res?.data) {
      setStateQuaTrinhCongTacDetails({
        SoQuyetDinh: res?.data.SoQuyetDinh,
        NgayQuyetDinh: res?.data.NgayQuyetDinh,
        ChucVu: res?.data.ChucVu,
        DonVi: res?.data.DonVi,
        KetThuc: res?.data.KetThuc,
        DonViSinhHoatHocThuat: res?.data.DonViSinhHoatHocThuat,
        TrangThai: res?.data.TrangThai,
        GhiChu: res?.data.GhiChu,
      })
    }
  }



  console.log('StateQuaTrrinh', stateQuaTrinhCongTacDetails)

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsQuaTrinhCongTac(rowSelected)
    }
  }, [rowSelected])


  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateQuaTrinhCongTacDetails)
    } else {
      form.setStateQuaTrinhCongTacDetails(inittial())
    }
  }, [form, stateQuaTrinhCongTacDetails, isModalOpen])

  const handleDetailsQuaTrinhCongTac = () => {
    if (rowSelected) {
      fetchGetDetailsQuaTrinhCongTac()
    }
    setIsOpenDrawer(true)
    console.log('rowSelected', rowSelected)

  }

  const handleDelteManyQuaTrinhCongTacs = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryQuaTrinhCongTac.refetch()
      }
    })
  }




  const queryQuaTrinhCongTac = useQuery({ queryKey: ['quatrinhcongtacs'], queryFn: getAllQuaTrinhCongTacs })
  const { isLoading: isLoadingQuaTrinhCongTac, data: quatrinhcongtacs } = queryQuaTrinhCongTac
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsQuaTrinhCongTac} />
      </div>
    )
  }


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
  // const { dataMuta, isLoading, isSuccess, isError } = mutation

  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany



  const { isLoading, data: qtcongtacDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetQuaTrinhCongTac, { enabled: !!quannhanId })
  console.log("qtrinhcongtac:", qtcongtacDetails)
  console.log("idquannhancongtac:", quannhanId)



  const columns = [

    {
      title: 'Số quyết định',
      dataIndex: 'SoQuyetDinh',
      key: 'SoQuyetDinh',
    },
    {
      title: 'Ngày quyết định',
      dataIndex: 'NgayQuyetDinh',
      key: 'NgayQuyetDinh',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'ChucVu',
      key: 'ChucVu',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'DonVi',
      key: 'DonVi',
    },
    {
      title: 'Kết thúc',
      dataIndex: 'KetThuc',
      key: 'KetThuc',
    },
    {
      title: 'Đơn vị sinh hoạt học thuật',
      dataIndex: 'DonViSinhHoatHocThuat',
      key: 'DonViSinhHoatHocThuat',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TrangThai',
      key: 'TrangThai',
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
    setStateQuaTrinhCongTacDetails({
      SoQuyetDinh: '',
      NgayQuyetDinh: '',
      ChucVu: '',
      DonVi: '',
      KetThuc: '',
      DonViSinhHoatHocThuat: '',
      TrangThai: '',
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


  const handleDeleteQuaTrinhCongTac = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryQuaTrinhCongTac.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateQuaTrinhCongTac({
      SoQuyetDinh: '',
      NgayQuyetDinh: '',
      ChucVu: '',
      DonVi: '',
      KetThuc: '',
      DonViSinhHoatHocThuat: '',
      TrangThai: '',
      GhiChu: '',
    })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      SoQuyetDinh: stateQuaTrinhCongTac.SoQuyetDinh,
      NgayQuyetDinh: stateQuaTrinhCongTac.NgayQuyetDinh,
      ChucVu: stateQuaTrinhCongTac.ChucVu,
      DonVi: stateQuaTrinhCongTac.DonVi,
      KetThuc: stateQuaTrinhCongTac.KetThuc,
      DonViSinhHoatHocThuat: stateQuaTrinhCongTac.DonViSinhHoatHocThuat,
      TrangThai: stateQuaTrinhCongTac.TrangThai,
      GhiChu: stateQuaTrinhCongTac.GhiChu,
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryQuaTrinhCongTac.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateQuaTrinhCongTac({
      ...stateQuaTrinhCongTac,
      [e.target.name]: e.target.value
    })
  }


  const handleOnchangeDetails = (e) => {
    console.log('check', e.target.name, e.target.value)
    setStateQuaTrinhCongTacDetails({
      ...stateQuaTrinhCongTacDetails,
      [e.target.name]: e.target.value
    })
  }


  const onUpdateQuaTrinhCongTac = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhCongTacDetails }, {
      onSettled: () => {
        queryQuaTrinhCongTac.refetch()
      }
    })
  }




  return (
    <div>
      <div>
        <WrapperHeader>Quá trình công tác</WrapperHeader>
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
        </div>
        {isLoading ? ( // Hiển thị thông báo đang tải
          <div>Loading...</div>
        ) : (
          // <Table dataSource={qtcongtacDetails} columns={columns} />
          <TableComponent columns={columns} isLoading={isLoadingQuaTrinhCongTac} data={qtcongtacDetails} onRow={(record, rowSelected) => {
            return {
              onClick: event => {
                setRowSelected(record._id);


              }

            };
          }} />
        )}

      </div>
      <ModalComponent forceRender title="Thêm mới quá trình công tác" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>

          <Form
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >

            <Form.Item
              label="Mã quyết định"
              name="SoQuyetDinh"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent
                style={{ width: '100%' }}

                value={stateQuaTrinhCongTac['SoQuyetDinh']}
                onChange={handleOnchange}
                name="SoQuyetDinh"
              />
            </Form.Item>

            <Form.Item
              label="Ngày quyết định"
              name="NgayQuyetDinh"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent
                style={{ width: '100%' }}

                value={stateQuaTrinhCongTac['NgayQuyetDinh']}
                onChange={handleOnchange}
                name="NgayQuyetDinh"
              />
            </Form.Item>

            <Form.Item
              label="Chức vụ"
              name="ChucVu"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent
                style={{ width: '100%' }}

                value={stateQuaTrinhCongTac['ChucVu']}
                onChange={handleOnchange}
                name="ChucVu"
              />
            </Form.Item>

            <Form.Item
              label="Đơn vị"
              name="DonVi"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent
                style={{ width: '100%' }}

                value={stateQuaTrinhCongTac['DonVi']}
                onChange={handleOnchange}
                name="DonVi"
              />
            </Form.Item>

            <Form.Item
              label="Kết thúc"
              name="KetThuc"
            //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent
                style={{ width: '100%' }}

                value={stateQuaTrinhCongTac['KetThuc']}
                onChange={handleOnchange}
                name="KetThuc"
              />
            </Form.Item>

            <Form.Item
              label="Đơn vị sinh hoạt học thuật"
              name="DonViSinhHoatHocThuat"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent
                style={{ width: '100%' }}

                value={stateQuaTrinhCongTac['DonViSinhHoatHocThuat']}
                onChange={handleOnchange}
                name="DonViSinhHoatHocThuat"
              />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="TrangThai"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent
                style={{ width: '100%' }}

                value={stateQuaTrinhCongTac['TrangThai']}
                onChange={handleOnchange}
                name="TrangThai"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>


      <DrawerComponent title='Chi tiết quá trình công tác' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 22 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Mã quyết định"
              name="SoQuyetDinh"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuaTrinhCongTacDetails['SoQuyetDinh']} onChange={handleOnchangeDetails} name="SoQuyetDinh" />
            </Form.Item>

            <Form.Item
              label="Ngày quyết định"
              name="NgayQuyetDinh"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuaTrinhCongTacDetails['NgayQuyetDinh']} onChange={handleOnchangeDetails} name="NgayQuyetDinh" />
            </Form.Item>

            <Form.Item
              label="Chức vụ"
              name="ChucVu"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuaTrinhCongTacDetails['ChucVu']} onChange={handleOnchangeDetails} name="ChucVu" />
            </Form.Item>

            <Form.Item
              label="Đơn vị"
              name="DonVi"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuaTrinhCongTacDetails['DonVi']} onChange={handleOnchangeDetails} name="DonVi" />
            </Form.Item>

            <Form.Item
              label="Kết thúc"
              name="KetThuc"
            // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuaTrinhCongTacDetails['KetThuc']} onChange={handleOnchangeDetails} name="KetThuc" />
            </Form.Item>

            <Form.Item
              label="Đơn vị sinh hoạt học thuật"
              name="DonViSinhHoatHocThuat"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuaTrinhCongTacDetails['DonViSinhHoatHocThuat']} onChange={handleOnchangeDetails} name="DonViSinhHoatHocThuat" />
            </Form.Item>

            <Form.Item
              label="Trạng thái"
              name="TrangThai"
              rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
            >
              <InputComponent value={stateQuaTrinhCongTacDetails['TrangThai']} onChange={handleOnchangeDetails} name="TrangThai" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent title="Xóa quá trình công tác" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQuaTrinhCongTac}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa quá trình công tác này không?</div>
        </Loading>
      </ModalComponent>

    </div>

  );
};

export default QTCongTac;
