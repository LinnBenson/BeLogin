import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Tool from "befunc";

import { PATH } from "../config/site.config";

import '../style/Unit.css';

// 路由链接组件
export const A = ( props ) => {
    const { to, children, ...otherProps } = props;
    const isLink = /^https?:\/\//.test( to );
    return (
        <>
            {isLink ?
            <a href={`${PATH}${to}`} {...otherProps}>
                {children}
            </a>
            :
            <Link to={`${PATH}${to}`} {...otherProps}>
                {children}
            </Link>
            }
        </>
    );
}
// 按钮组件
export const Button = ({ className, stop, height, error, onClick, style, children, ...other }) => {
    const addStyle = {
        '--height': height ? height : '34px',
        '--background': error ? 'rgb( var( --r4 ) )' : 'rgb( var( --r3 ) )'
    };
    const stopButton = stop || Tool.empty( onClick ) ? 'stop' : '';
    const element = <span>{children}</span>;
    return (
        <>
            {typeof onClick === 'string' ?
                <A
                    className={`unitButton ${stopButton} ${className}`}
                    to={onClick}
                    style={{ ...style, ...addStyle }}
                    { ...other }
                >{element}</A>
            :
                <button
                    className={`unitButton ${stopButton} ${className}`}
                    onClick={onClick}
                    style={{ ...style, ...addStyle }}
                    { ...other }
                >{element}</button>
            }
        </>
    );
}
// 图标组件
export const I = ( props ) => {
    const { s, className, size, font, style, ...otherProps } = props;
    const allStyle = { '--size': size, fontSize: font, ...style };
    const allClassName = `${s} ${className ? className : ''} ${size ? 'block' : ''}`;
    return <i className={allClassName} style={allStyle} {...otherProps}></i>;
}
// 核心状态组件
export default function Unit({ mask, load, toast }) {
    const { t } = useTranslation();
    return (
        <>
            <div id='mask' className={mask.state ? 'action' : ''}></div>
            <div id='load' className={`center ${load.state ? 'action' : ''}`}>
                <div>
                    <div>
                        <i className="anima"></i>
                    </div>
                    <p>{t( 'loading' )} ...</p>
                </div>
            </div>
            <div key={toast.key} id='toast' className={`${toast.state ? 'action' : ''} ${toast.error ? 'error' : ''}`}>
                <div className='content more'>
                    <I s={toast.icon ? toast.icon : 'i-exclamation-circle'} size='var( --height )'></I>
                    <span>{toast.text}</span>
                </div>
            </div>
        </>
    );
}