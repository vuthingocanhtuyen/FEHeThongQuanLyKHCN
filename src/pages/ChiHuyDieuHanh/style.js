import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 18px;
    margin: 4px 0;
`
export const WrapperContentProfileFree = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #ccc;
    width: 300px;
    margin: 0 auto;
    padding: 5px;
   
   // border-radius: 10px;
    gap: 10px;
`
export const WrapperContentProfileText = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #ccc;
    width: 910px;
    margin: 0 auto;
    padding: 5px;
   
   // border-radius: 10px;
    gap: 10px;
`
export const WrapperContentProfile = styled.div`
    //display: flex;
    flex-direction: column;
    border: 2px solid #009933;
    width: 170px;
    margin: 0 auto;
    padding: 10px;
   
   // border-radius: 10px;
    gap: 30px;
`

export const WrapperContentProfileButton = styled.div`
    //display: flex;
    flex-direction: column;
    border: 2px solid #009933;
    width: 150px;
    margin: 0 auto;
    padding: 10px;
   
   // border-radius: 10px;
    gap: 30px;
`
export const WrapperTable = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 800px;
    margin: 0 auto;
    padding: 10px;
   // border-radius: 10px;
    gap: 30px;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 15px;
    line-height: 30px;
    font-weight: 600;
    width: 120px;
    text-align: left;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: cemter;
    height: 35px;
    gap: 20px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
`
