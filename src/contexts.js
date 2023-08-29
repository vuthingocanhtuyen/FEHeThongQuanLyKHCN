import React, { createContext, useContext, useState } from 'react';

// Tạo Context
const SelectedRowContext = createContext();

// Provider Component
export const SelectedRowProvider = ({ children }) => {
  const [selectedRowData, setSelectedRowData] = useState(null);

  return (
    <SelectedRowContext.Provider value={{ selectedRowData, setSelectedRowData }}>
      {children}
    </SelectedRowContext.Provider>
  );
};

// Hook để sử dụng Context
export const useSelectedRowContext = () => {
  return useContext(SelectedRowContext);
};
