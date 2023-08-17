import React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

function FreeDonVi() {
    const handleSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    return (
        <Tree showLine onSelect={handleSelect}>
            <TreeNode title="Đơn vị cấp trên" key="0-0">

                <TreeNode title="Khoa CNTT" key="0-0-0">
                    <TreeNode title="Bộ môn KHMT" key="0-0-0-0" />
                    <TreeNode title="Bộ môn Hệ thống thông tin" key="0-0-0-1" >
                        <TreeNode title="GV Nguyễn Mậu Uyên" key="0-0-0-1-0" />
                        <TreeNode title="GV Nguyễn Mậu Uyên" key="0-0-0-1-1" />
                    </TreeNode>
                </TreeNode>

                <TreeNode title="Khoa Mac-LeNin" key="0-0-1">
                    <TreeNode title="Level 3" key="0-0-1-0" />
                    <TreeNode title="Level 3" key="0-0-1-1" />
                </TreeNode>
            </TreeNode>

        </Tree>
    );
}

export default FreeDonVi;
