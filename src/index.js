import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Tool, { ApiProess } from 'befunc';

import './i18n';
import Unit from './modules/Unit';
import { Get, Del, Clipboard } from './modules/Function';
import { global } from './config/content.config';
import { api_logout } from './config/api.config';

import App from './App';

// 整体变量框架
const Root = () => {
    const { t } = useTranslation();
    // 常用控件状态
    const initialize = {
        mask: { state: false },
        load: { state: false },
        toast: { state: false, text: '', icon: '', error: false, key: 0 }
    }
    const [ maskState, setMaskState ] = useState( initialize.mask );
    const [ loadState, setLoadState ] = useState( initialize.load );
    const [ toastState, setToastState ] = useState( initialize.toast );
    const time = useRef( null );
    // 加载控件
    const load = ( type = false, hide = false ) => {
        setMaskState({ state: type });
        setLoadState({ state: type });
        clearTimeout( time.load );
        if ( typeof hide === 'number' && type ) {
            time.load = setTimeout(() => {
                setMaskState( initialize.mask );
                setLoadState( initialize.load );
            }, hide );
        }
    }
    // 通知控件
    const toast = ( text, icon = false, error = false, hide = 5000 ) => {
        setToastState({ state: true, text: text, icon: icon, error: error, key: toastState.key === 1 ? 0 : 1 });
        clearTimeout( time.toast );
        time.toast = setTimeout(() => {
            setToastState({ ...initialize.toast, text: text });
        }, hide );
    }
    // 点击复制
    const copy = ( text ) => {
        Clipboard(
            text,
            () => toast( t( 'true', { type: t('copy') } ), 'i-back' ),
            () => toast( t( 'false', { type: t('copy') } ), 'i-back', true )
        );
    };
    // 用户登录状态
    const getUser = () => {
        let user = Get( 'info' );
        if ( !Tool.isArray( user ) ) { user = {}; }
        return user;
    }
    const [ user, setUser ] = useState( Get( 'token' ) ? getUser() : false );
    const delUser = () => {
        if ( Tool.empty( Get( 'token' ) ) && Tool.empty( Get( 'info' ) ) ) {
            return toast( t( 'error.unknown' ), 'i-emoji-frown', true );
        }
        setUser( false );
        Del( 'token' ); Del( 'info' );
        toast( t( 'error.login' ), 'i-emoji-frown', true );
        setTimeout(() => window.location.reload(), 400 );
    }
    // API 请求
    const api = new ApiProess({ logout: delUser, toast: toast, load: load, error: t( 'error.network' ) });
    const server = {};
    useEffect(() => {
        // server['test'] = new ServerProess({ link: 'ws://192.168.10.101:4001', toast: toast });
    // eslint-disable-next-line
    }, []);
    // 注销登录状态
    const logout = () => {
        api.send({
            link: api_logout,
            check: true,
            run: function() { delUser(); }
        });
        delUser();
    }
    return (
        <global.Provider value={{ load, toast, user, setUser, logout, api, server, copy }}>
            <App>
                <Unit mask={maskState} load={loadState} toast={toastState}></Unit>
            </App>
        </global.Provider>
    );
};
// 根组件渲染
ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
//	<React.StrictMode>
        <React.Suspense fallback=''>
            <Router>
                <Root></Root>
            </Router>
        </React.Suspense>
//	</React.StrictMode>
);
reportWebVitals();
