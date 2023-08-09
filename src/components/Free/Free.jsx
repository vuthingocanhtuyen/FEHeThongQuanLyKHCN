import React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

function Free() {
    const handleSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    return (
        <Tree showLine onSelect={handleSelect}>
            <TreeNode title="Level 1" key="0-0">
                <TreeNode title="Level 2" key="0-0-0">
                    <TreeNode title="Level 3" key="0-0-0-0" />
                    <TreeNode title="Level 3" key="0-0-0-1" />
                </TreeNode>
                <TreeNode title="Level 2" key="0-0-1">
                    <TreeNode title="Level 3" key="0-0-1-0" />
                    <TreeNode title="Level 3" key="0-0-1-1" />
                </TreeNode>
            </TreeNode>
            <TreeNode title="Level 1" key="0-0">
                <TreeNode title="Level 2" key="0-0-0">
                    <TreeNode title="Level 3" key="0-0-0-0" />
                    <TreeNode title="Level 3" key="0-0-0-1" />
                </TreeNode>
                <TreeNode title="Level 2" key="0-0-1">
                    <TreeNode title="Level 3" key="0-0-1-0" />
                    <TreeNode title="Level 3" key="0-0-1-1" />
                </TreeNode>
            </TreeNode>
        </Tree>
    );
}

export default Free;
