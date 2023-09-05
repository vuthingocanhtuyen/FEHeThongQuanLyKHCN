
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import * as QuanNhanService from '../../../services/QuanNhanService';

const NgoaiNgu = () => {
  // const [data, setData] = useState([]);
  const [quannhanObjectId, setQuannhanObjectId] = useState([]);
  const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState({});
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user);
  const fetchGetObjectId = async () => {
    try {
      console.log('User _id:', user.QuanNhanId);
      const resQuanNhan = await QuanNhanService.getObjectIdByQuanNhanId(user.QuanNhanId, user.access_token);
      setQuannhanObjectId(resQuanNhan.data);   
    } catch (error) {
      console.log('Error while fetching quan nhan details:', error);
      setIsLoadingUpdate(false);
    }
  };
  useEffect(() => {
    console.log("Quan nhan _id:", quannhanObjectId);
  }, [quannhanObjectId]);
  useEffect(() => {
    if (user && user.QuanNhanId) {
      setIsLoadingUpdate(true);
      fetchGetObjectId();
    }
  }, [user]);
};

export default NgoaiNgu;
