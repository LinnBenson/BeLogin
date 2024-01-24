import { lazy, useState, useEffect, useContext } from "react";
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import i18n from "./i18n";
import { Get, Set, Check, getData } from "./modules/Function";
import con, { PATH } from "./config/site.config";
import { global, info } from "./config/content.config";

import Frame from "./views/Frame";
const Login = lazy(() => import( './views/Login' ) );
const Register = lazy(() => import( './views/Register' ) );

export default function App({ children }) {
    const { t } = useTranslation();
    const { toast } = useContext( global );
    const URL = getData();
    // 初始化主题
    document.querySelector( 'html' ).setAttribute( 'lang', i18n.language );
    const [ theme, setTheme ] = useState( Check( con.theme, Get['theme'] ) ? Get['theme'] : con.theme );
    useEffect(() => {
        const metaColor = document.querySelector( 'meta[name="theme-color"]' );
        if ( metaColor ) { metaColor.setAttribute( 'content', `rgb( ${theme.color['--r0']} )` ); }
    }, [ theme ] );
    const saveTheme = ( data ) => {
        if ( Check( con.theme, data ) ) {
            setTheme( data );
            Set( 'theme', data );
            return toast( t( 'true', {type: t('edit')} ) );
        }
        return toast( t( 'false', {type: t('edit')} ) );
    }
    // 渲染核心框架
	return (
		<div id="App" style={{ ...theme.color }}>
            {/* 页面共享变量 */}
            <info.Provider value={{ URL, theme, saveTheme }}>
                {children}
                {/* 页面代码开始 */}
                <Frame>
                    {/* 页面路由组件 */}
                    <Routes>
                        <Route path={`${PATH}/`} element={<Login></Login>}></Route>
                        <Route path={`${PATH}/login`} element={<Login></Login>}></Route>
                        <Route path={`${PATH}/register`} element={<Register></Register>}></Route>
                    </Routes>
                </Frame>
                {/* 页面代码结束 */}
            </info.Provider>
		</div>
	);
}