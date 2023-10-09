import { Button, Form, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import TableComponent from '../../components/TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../../components/InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
// import * as QuanNhanService from '../../services/QuanNhanService'
import * as QuanNhanService from '../../services/QuanNhanService'
import * as DonViService from '../../services/DonViService'
import * as ChucVuService from '../../services/ChucVuDonViService'
import * as QuanHamService from '../../services/QuanHamService'
import * as LoaiQuanNhanService from '../../services/LoaiQuanNhanService'
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
import SearchBar from './Components/SearchBar';
import FreeDonVi from '../../pages/QuanLyDonVi/DanhMucDonVi/FreeDonVi'
import { WrapperContentProfile, WrapperInput, WrapperLabel, WrapperContentProfileFree, WrapperContentProfileText } from './Components/style'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
const HoSoCanBo = () => {
  const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
  const [currentUserDonViCode, setCurrentUserDonViCode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [searchTermHoTen, setSearchTermHoTen] = useState('');
  const [searchTermQuanNhanId, setSearchTermQuanNhanId] = useState('');
  const [prevDonViCode, setPrevDonViCode] = useState(null);
  const navigate = useNavigate()
  const searchInput = useRef(null);
  const [treeNodeClickedId, setTreeNodeClickedId] = useState(null);
  const handleTreeNodeClick = (item) => {
    setTreeNodeClickedId(item);
    getDonViCode(item);
  }
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
          setCurrentUserDonViCode(donViValue);
        }

      } catch (error) {
        console.error('Error fetching ChucVuDonVi:', error);
      }
    };

    fetchGetChucVuDonVi();
  }, [user.QuanNhanId, user.access_token]);
  const getDonViCode = async (item) => {
    console.log(item);
    if (item) {
      try {
        const res = await DonViService.getDetailsDonVi(item);
        console.log(res.data.code);
        setCurrentUserDonVi(res.data.code);
        return res
      }
      catch { }
    }
  }
  const handleSearchHoTen = (searchText) => {
    setSearchTermHoTen(searchText);
  };

  const handleSearchQuanNhanId = (searchText) => {
    setSearchTermQuanNhanId(searchText);
  };
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
      form.setFieldsValue(stateQuanNhanDetails);
      setCurrentUserDonViCode(currentUserDonVi);
      console.log("dong");
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
  const fetchAllChucVu = async () => {
    const res = await ChucVuService.getChucVuFromDonVi(currentUserDonViCode)
    return res
  }
  const fetchAllChucVu2 = async () => {
    const res = await ChucVuService.getDataChucVuByDonVi(currentUserDonViCode)
    return res
  }
  const fetchAllQuanHam = async () => {
    const res = await QuanHamService.getAllType()
    return res
  }
  const fetchAllLoaiQuanNhan = async () => {
    const res = await LoaiQuanNhanService.getAllType()
    return res
  }
  const fetchAllDonVi = async () => {
    const res = await DonViService.getDonViConByTen(currentUserDonViCode)
    return res
  }
  const fetchAllDonVi2 = async () => {
    const res = await DonViService.getDonViConOnly(currentUserDonViCode)
    return res
  }
  const { data, isLoading, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryQuanNhan = useQuery({ queryKey: ['quannhans'], queryFn: getQuanNhanFromDonVi })
  const typeQuanHam = useQuery({ queryKey: ['type-quanham'], queryFn: fetchAllQuanHam })
  const typeLoaiQuanNhan = useQuery({ queryKey: ['type-loaiquannhan'], queryFn: fetchAllLoaiQuanNhan })
  const allDonVi = useQuery({ queryKey: ['all-donvi'], queryFn: fetchAllDonVi })
  const allDonVi2 = useQuery({ queryKey: ['all-donvi2'], queryFn: fetchAllDonVi2 })
  const allChucVu = useQuery({ queryKey: ['all-chucvu'], queryFn: fetchAllChucVu })
  const allChucVu2 = useQuery({ queryKey: ['all-chucvu2'], queryFn: fetchAllChucVu2 })
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
  function convertDateToString(date) {
    // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
    return moment(date).format('DD/MM/YYYY');
  }
  const dataTable = quannhans?.data?.length && quannhans?.data?.map((quannhan) => {
    return { ...quannhan, key: quannhan._id, NgaySinh: convertDateToString(quannhan.NgaySinh) }
  }).filter(item => {
    const matchesHoTen = item.HoTen.toLowerCase().includes(searchTermHoTen.toLowerCase());
    const matchesQuanNhanId = item.QuanNhanId.includes(searchTermQuanNhanId.toLowerCase());
    return matchesHoTen && matchesQuanNhanId;
  });

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
  useEffect(() => {
    if (currentUserDonViCode) {
      allDonVi.refetch();
    }
  }, [currentUserDonViCode, allDonVi]);
  useEffect(() => {
    if (currentUserDonViCode) {
      allChucVu.refetch();
    }
  }, [currentUserDonViCode, allChucVu]);
  useEffect(() => {
    if (currentUserDonViCode) {
      allDonVi2.refetch();
    }
  }, [currentUserDonViCode, allDonVi2]);
  useEffect(() => {
    if (currentUserDonViCode) {
      allChucVu2.refetch();
    }
  }, [currentUserDonViCode, allChucVu2]);
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
    console.log(stateQuanNhan);
  }
  const handleOnchange2 = (date, dateString) => {
    setStateQuanNhan({
      ...stateQuanNhan,
      NgaySinh: dateString
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
    // console.log("bat dau");
    // console.log(allDonVi2?.data?.data);
    try {
      const selectedDonVi = allDonVi2?.data?.data.find(DonVi => DonVi.name === value);
      if (selectedDonVi) {
        setCurrentUserDonViCode(selectedDonVi.code);
        // console.log(selectedDonVi.code);
      }
      setStateQuanNhan({
        ...stateQuanNhan,
        DonVi: selectedDonVi.code
      })
    }
    catch { }
  }
  const handleChangeSelect2 = (value) => {
    setStateQuanNhan({
      ...stateQuanNhan,
      QuanHam: value
    })
    // console.log(stateQuanNhan)
  }
  const handleChangeSelect4 = (value) => {
    setStateQuanNhan({
      ...stateQuanNhan,
      LoaiQN: value
    })
    // console.log(stateQuanNhan)
  }
  // const handleChangeSelect3 = (value) => {
  //   setStateQuanNhan({
  //     ...stateQuanNhan,
  //     HoatDong: value
  //   })
  //   console.log(stateQuanNhan)
  // }
  const handleChangeSelect3 = (value) => {
    try {
      const selectedChucVu = allChucVu2?.data?.data.find(ChucVuDonVi => ChucVuDonVi.name === value);
      if (selectedChucVu) {
        setCurrentUserDonViCode(selectedChucVu.chucvucode);
        // console.log(selectedChucVu.chucvucode);
      }
      setStateQuanNhan({
        ...stateQuanNhan,
        HoatDong: selectedChucVu.chucvucode
      })
    }
    catch { }

    // setStateQuanNhan({
    //   ...stateQuanNhan,
    //   HoatDong: value
    // })
    // console.log(stateQuanNhan)
  }

  return (
    <div>
      <WrapperHeader>Quản lý quân nhân</WrapperHeader>
      {/* <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '50px', width: '50px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '20px' }} /></Button>
      </div> */}
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', marginTop: '15px' }}>
        <div style={{ margin: '0 auto', float: 'left', padding: '5px' }}>
          <FreeDonVi handleTreeNodeClick={handleTreeNodeClick} treeNodeClickedId={treeNodeClickedId} />
        </div>
        <div style={{ margin: '0 auto', height: '115px', float: 'left' }}>

          <WrapperContentProfile>
            <Form.Item
              label="Mã quân nhân: "
              name="QuanNhanId"
            >
              <SearchBar onSearch={handleSearchQuanNhanId} />
            </Form.Item>
          </WrapperContentProfile>
        </div>
        <div style={{ margin: '0 auto', height: '115px', float: 'left' }}>
          <WrapperContentProfile>
            <Form.Item
              label="Họ tên: "
              name="HoTen"
            >
              <SearchBar onSearch={handleSearchHoTen} />
            </Form.Item>
          </WrapperContentProfile>
        </div>

        {/* <Button type="primary" htmlType="submit" style={{ marginTop: '40px', marginLeft: '10px' }} >
                    Lấy dữ liệu
                </Button> */}
      </div>

      <div style={{ clear: 'both' }}></div>
      <br />
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
              label="Mã quân nhân"
              name="QuanNhanId"
              rules={[{ required: true, message: 'Please input your QuanNhanId!' }]}
            >
              <InputComponent value={stateQuanNhan['QuanNhanId']} onChange={handleOnchange} name="QuanNhanId" />
            </Form.Item>
            <Form.Item
              label="Họ tên"
              name="HoTen"
              rules={[{ required: true, message: 'Please input your HoTen!' }]}
            >
              <InputComponent value={stateQuanNhan['HoTen']} onChange={handleOnchange} name="HoTen" />
            </Form.Item>
            {/* <Form.Item
              label="Ngày sinh"
              name="NgaySinh"
              rules={[{ required: true, message: 'Please input your NgaySinh!' }]}
            >
              <InputComponent value={stateQuanNhan['NgaySinh']} onChange={handleOnchange} name="NgaySinh" />
            </Form.Item> */}
            <Form.Item
              label="Ngày sinh"
              name="NgaySinh"
              rules={[{ required: true, message: 'Please input your NgaySinh!' }]}
            >
              <DatePicker
                value={stateQuanNhan['NgaySinh']}
                onChange={handleOnchange2} name="NgaySinh"
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name="GioiTinh"
              rules={[{ required: true, message: 'Please input your GioiTinh!' }]}
            >
              <InputComponent value={stateQuanNhan['GioiTinh']} onChange={handleOnchange} name="GioiTinh" />
            </Form.Item>
            <Form.Item
              label="Quê quán"
              name="QueQuan"
              rules={[{ required: true, message: 'Please input your QueQuan!' }]}
            >
              <InputComponent value={stateQuanNhan['QueQuan']} onChange={handleOnchange} name="QueQuan" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="DiaChi"
              rules={[{ required: true, message: 'Please input your DiaChi!' }]}
            >
              <InputComponent value={stateQuanNhan['DiaChi']} onChange={handleOnchange} name="DiaChi" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="SoDienThoai"
              rules={[{ required: true, message: 'Please input your SoDienThoai!' }]}
            >
              <InputComponent value={stateQuanNhan['SoDienThoai']} onChange={handleOnchange} name="SoDienThoai" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <InputComponent value={stateQuanNhan['Email']} onChange={handleOnchange} name="Email" />
            </Form.Item>
            <Form.Item
              label="Quân hàm"
              name="QuanHam"
              rules={[{ required: true, message: 'Please input your QuanHam!' }]}
            >
              <Select
                name="quanham"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                // value={stateQuanNhan.QuanHam}
                onChange={handleChangeSelect2}
                options={renderOptions(typeQuanHam?.data?.data)}
              />
            </Form.Item>
            <Form.Item
              label="Loại quân nhân"
              name="LoaiQN"
              rules={[{ required: true, message: 'Please input your LoaiQN!' }]}
            >
              <Select
                name="LoaiQN"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                // value={stateQuanNhan.LoaiQN}
                onChange={handleChangeSelect4}
                options={renderOptions(typeLoaiQuanNhan?.data?.data)}
              />
            </Form.Item>
            <Form.Item
              label="Đơn vị"
              name="DonVi"
              rules={[{ required: true, message: 'Please input your DonVi!' }]}
            >
              <Select
                name="donvi"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                // value={stateQuanNhan.DonVi}
                onChange={handleChangeSelect}
                options={renderOptions(allDonVi?.data?.data)}
              />
            </Form.Item>
            <Form.Item
              label="Chức vụ"
              name="HoatDong"
              rules={[{ required: true, message: 'Please input your ChucVu!' }]}
            >
              <Select
                name="HoatDong"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                // value={stateQuanNhan.HoatDong}
                onChange={handleChangeSelect3}
                options={renderOptions(allChucVu?.data?.data)}
              />
            </Form.Item>
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
