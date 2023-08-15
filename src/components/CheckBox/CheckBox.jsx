import { Checkbox } from 'antd';
import React from 'react';

const CheckboxComponent = ({ children, ...rest }) => {
    return (
        <Checkbox {...rest}>{children}</Checkbox>
    );
};

export default CheckboxComponent;
