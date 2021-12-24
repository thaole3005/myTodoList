import React from 'react';
import styleLoading from './LoadingComponent.module.css';
import loading from '../../../assets/loading/loading.gif';
import { useSelector } from 'react-redux';


//component LoadingComponent quản lí về nghiệp vụ hiển thị/ ẩn icon loading
export default function LoadingComponent() {

    const {isLoading} = useSelector(rootReducer => rootReducer.LoadingReducer)
    console.log("isLoading", isLoading);

    if(isLoading) {
        //nếu isLoading lấy từ reduxStore về là true thì hiển thị loading
            return (
                    <div className = {styleLoading.bgLoading}>
                        <img src = {loading} alt = "loading"/>
                    </div>
            )
    } else {
        return '';
    }
    
}