
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'


import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { getBase64 } from '../../utils'
import { WrapperContentProfile, WrapperTable } from './style'
import 'react-calendar/dist/Calendar.css';

import Loading from '../../components/LoadingComponent/Loading'
import FreeDonVi from './DanhMucDonVi/FreeDonVi'
import TableDonVi from './DanhMucDonVi/TableDonVi'

const DMDonVi = () => {  
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    ) 
    const {isLoading} = mutation;
    const [treeNodeClickedId, setTreeNodeClickedId] = useState(null);
    const handleTreeNodeClick = (item) => {
        setTreeNodeClickedId(item); // Cập nhật ID node từ FreeDonVi
    }
    return (

        <div style={{ width: '1270px', margin: '0 auto', height: '700px', padding: '20px' }}>

            <div style={{ width: '400px', margin: '0 auto', height: '700px', float: 'left', padding: '5px', background: '#fff' }}>

                <Loading isLoading={isLoading}>
                    <WrapperContentProfile>
                        <FreeDonVi handleTreeNodeClick={handleTreeNodeClick} treeNodeClickedId={treeNodeClickedId}/>
                    </WrapperContentProfile>
                </Loading>

            </div>
            <div style={{ width: '800px', margin: '0 auto', height: '700px', float: 'right', textAlign: 'left', padding: '5px', background: 'back' }}>
                <WrapperTable>
                    <TableDonVi handleTreeNodeClick={handleTreeNodeClick} treeNodeClickedId={treeNodeClickedId}/>
                </WrapperTable>
            </div>
        </div>
    )
}

export default DMDonVi