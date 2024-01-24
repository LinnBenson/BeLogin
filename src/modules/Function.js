import ClipboardJS from 'clipboard';
import Tool from 'befunc';

import con from "../config/site.config";

// 标题处理
export const Title = ( data ) => {
    return `${data} - ${con.name}`;
};
// 内容缺省
export const Text = ( data, length = [ 7, 18 ] ) => {
    if ( data ) { return data; }
    const lengthData = Math.floor( Math.random() * ( length[1] - length[0] + 1 ) ) + length[0];
    const characters = '■';
    const resultArray = new Array( lengthData );
    for ( let i = 0; i < lengthData; i++ ) {
        resultArray[i] = characters.charAt( Math.floor( Math.random() * characters.length ) );
    }
    return resultArray.join( '' );
}
// 本地数据存取
export const Get = ( key ) => {
    let data = localStorage.getItem( key );
    if ( Tool.isJson( data ) ) { data = JSON.parse( data ); }
    return data;
};
export const Set = ( key, value ) => {
    if ( Tool.isArray( value ) ) {
        value = JSON.stringify( value );
    }
    return localStorage.setItem( key, value );
};
export const Del = ( key ) => {
    return localStorage.removeItem( key );
};
// 资源有效性检查
export const Check = ( oldData, newData ) => {
    if ( Tool.empty( newData ) || !Tool.isArray( newData ) ) { return false; }
    for ( let key in oldData ) {
        if ( Tool.empty( newData[key] ) ) { return false; }
        if ( typeof oldData[key] !== typeof newData[key] ) {
            return false;
        }
        if ( Tool.isArray( oldData[key] ) && !Tool.empty( oldData[key] ) ) {
            for ( let keyin in oldData[key] ) {
                if ( Tool.empty( newData[key][keyin] ) ) { return false; }
                if ( typeof oldData[key][keyin] !== typeof newData[key][keyin] ) {
                    return false;
                }
            }
        }
    }
    return true;
}
// 获取 URL 参数
export const getData = () => {
    const url = new URLSearchParams( window.location.search );
    const data = {};
    for ( const [key, value] of url.entries() ) { data[key] = value; }
    return data;
}
// 点击复制
export const Clipboard = ( text, success = false, fail = false ) => {
    const clipboard = new ClipboardJS( '.copy', {
        text: () => text,
    });
    clipboard.on( 'success', (e) => {
        if ( Tool.isFunction( success ) ) {
            success();
        }
    });
    clipboard.on( 'error', (e) => {
        if ( Tool.isFunction( fail ) ) {
            fail();
        }
    });
    return clipboard;
};