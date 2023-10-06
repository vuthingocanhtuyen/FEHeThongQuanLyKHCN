import React, { useState } from 'react';
import InputComponent from '../../../components/InputComponent/InputComponent'
import { Button, Form, Select, Space } from 'antd'
const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <InputComponent 
        type="text" 
        value={searchText} 
        onChange={(e) => setSearchText(e.target.value)}
        style={{
        //   marginBottom: 8,
          display: 'block',
          width: '80%',
        }} 
      />
      <Button 
        onClick={handleSearch} 
        type="primary" 
        htmlType="submit"
        style={{
        //   width: '100%',
          marginLeft: '8px', // Khoảng cách giữa InputComponent và Button
        }}
      >
        Lấy dữ liệu
      </Button>
    </div>
  );
  
};

export default SearchBar;
