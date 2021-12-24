import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../../pages/Header/Header';
import LoadindComponent from './../../components/globalSetting/LoadindComponent/LoadingComponent';

export const HomeTemplate = (props) => {
    const {Component, ...restParam} = props;
    return <Route {...restParam} render = {(propsRoute) => {
        return <>
            <Header/>
            <LoadindComponent/>
            <Component {...propsRoute}/>
        </>
    }}
    
    />
}