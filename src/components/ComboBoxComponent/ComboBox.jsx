import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

const ComboBoxComponent = ({ children, options, ...rest }) => {
    return (
        <Select {...rest}>
            {options.map((option, index) => (
                <Option key={index} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default ComboBoxComponent;
