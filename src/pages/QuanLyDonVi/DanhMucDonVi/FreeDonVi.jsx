// import React, { useState, useEffect } from 'react';
// import { Tree } from 'antd';
// import { useSelector } from 'react-redux';
// import * as PriorityByUserService from '../../../services/PriorityByUserService';
// import * as DonViService from '../../../services/DonViService';
// const { TreeNode } = Tree;
// const FreeDonVi = () => {
//     const [data, setData] = useState([]);
//     const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
//     const [treeNodes, setTreeNodes] = useState([]);
//     const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
//     const user = useSelector((state) => state.user)
//     useEffect(() => {
//         const fetchGetChucVuDonVi = async () => {
            
//             try {
//                 // Gọi API để lấy thông tin đơn vị hiện tại của người dùng
//                 const response = await PriorityByUserService.getChucVuDonViFromUser(user.QuanNhanId, user.access_token);
//                 console.log(response.data);
                
//                 if (response.data && response.data.length > 0) {
//                     const firstData = response.data[0];
//                     const donViValue = firstData.DonVi[0];
//                     console.log(donViValue);
//                     setCurrentUserDonVi(donViValue);
//                 }
                
//             } catch (error) {
//                 console.error('Error fetching ChucVuDonVi:', error);
//             }
//         };

//         fetchGetChucVuDonVi();
//     }, [user.QuanNhanId, user.access_token]);
   
//     useEffect(() => {
//         if (currentUserDonVi) {
//             console.log("hi",currentUserDonVi)
//     const fetchDonViCon = async () => {
//         try {
            
            
//             // Sử dụng thông tin đơn vị hiện tại của người dùng để gọi API và lấy đơn vị con
//             console.log("dang chay 2"+currentUserDonVi);
//             const response = await DonViService.getDonViCon(currentUserDonVi); 
//             console.log(response);
            
            
//             setData(response);
            
            
//         } catch (error) {
//             console.error('Error fetching DonViCon:', error);
//         }
//     };
//     fetchDonViCon();
// }
// },[currentUserDonVi]);
    
// const generateTreeNodes = (data) => {
//     if (!data) {
//         return null; 
//     }
       
//       return data.map(item => (
//         <TreeNode key={item._id} title={item.name}>
//           {item.children && item.children.length > 0 && generateTreeNodes(item.children)}
//         </TreeNode>
//       ));
//     };
//     useEffect(() => {
        
//         if (data.length > 0) {
            
//             const newTreeNodes = generateTreeNodes(data);
//             setTreeNodes(newTreeNodes); 
//         }
//     }, [data]);
//     return (
//       <Tree defaultExpandAll>
//         {treeNodes}
//       </Tree>
//     );
//   };
  
// export default FreeDonVi;

import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import { useSelector } from 'react-redux';
import * as PriorityByUserService from '../../../services/PriorityByUserService';
import * as DonViService from '../../../services/DonViService';
const { TreeNode } = Tree;
const FreeDonVi = ({treeNodeClickedId ,handleTreeNodeClick} ) => {
    const [data, setData] = useState([]);
    const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
    const [currentUserDonViid, setCurrentUserDonViid] = useState(null);
    const [treeNodes, setTreeNodes] = useState([]);
    const [selectedNodeIds, setSelectedNodeIds] = useState([]);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const user = useSelector((state) => state.user);
    const handleNodeClick = (nodeData) => {
        console.log("bat dau");
        console.log(nodeData);
        handleTreeNodeClick(nodeData);
    };
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
                }
                
            } catch (error) {
                console.error('Error fetching ChucVuDonVi:', error);
            }
        };

        fetchGetChucVuDonVi();
    }, [user.QuanNhanId, user.access_token]);
   
    useEffect(() => {
        if (currentUserDonVi) {
            console.log("hi",currentUserDonVi)
    const fetchDonViCon = async () => {
        try {
            
            
            // Sử dụng thông tin đơn vị hiện tại của người dùng để gọi API và lấy đơn vị con
            console.log("dang chay 2"+currentUserDonVi);
            const response = await DonViService.getDonViCon(currentUserDonVi);  
            setData(response);
            const response2 = await DonViService.getDonVifromcode(currentUserDonVi);
            const firstData = response2.data[0];
            const DonViId = firstData._id;
            console.log("hi"+DonViId);
            handleTreeNodeClick(DonViId);
            
        } catch (error) {
            console.error('Error fetching DonViCon:', error);
        }
    };
    fetchDonViCon();
}
},[currentUserDonVi]);
    
const generateTreeNodes = (data) => {
    if (!data) {
        return null; 
    }
       
      return data.map(item => (
        <TreeNode key={item._id} title={item.name} >
          {item.children && item.children.length > 0 && generateTreeNodes(item.children)}
        </TreeNode>
      ));
    };
    useEffect(() => {
        
        if (data.length > 0) {
            
            const newTreeNodes = generateTreeNodes(data);
            setTreeNodes(newTreeNodes); 
        }
    }, [data]);
    return (
      <Tree defaultExpandAll  onSelect={(selectedKeys, info) =>{ 
      console.log(selectedKeys);
      setSelectedNodeIds(selectedKeys);
      handleNodeClick(selectedKeys);
      }}>
       
        {treeNodes}
      </Tree>
      
    );
  };
  
export default FreeDonVi;
