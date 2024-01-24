import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { info, global } from '../config/content.config';
import { Title } from "../modules/Function";
import { Button, I } from '../modules/Unit';
import Form, { check } from '../modules/Form';
import { PATH } from "../config/site.config";
import { api_login } from "../config/api.config";

import '../style/views/Login.css';
import External from "./External";

export default function Login() {
    const { t } = useTranslation();
    const { setUser, toast, api } = useContext( global );
    const { URL } = useContext( info );
    useEffect(() => {
        document.title = Title( t( 'Login.title' ) );
    // eslint-disable-next-line
    }, [] );
    // 登录表单
    const [ formValue, setFormValue ] = useState({});
    const [ formError, setFormError ] = useState({});
    const fromData = [
        { type: 'text', name: 'user', icon: 'i-person-circle', hint: t( 'Login.user' ), must: true },
        { type: 'password', name: 'password', hint: t( 'Login.password' ), must: true },
    ];
    const login = () => {
        const data = check( fromData, formValue );
        if ( data.error ) {
            setFormError({ ...formError, [data.error]: true });
            setTimeout(() =>{ setFormError({ ...formError, [data.error]: false }); }, 600 );
            return toast( t( data.toast ), '', true );
        }
        api.send({
            link: api_login,
            post: data,
            check: true,
            run: function( d ) {
                toast( t( 'true', {type:t('login')} ) );
                Set( 'token', d.token );
                Set( 'info', d.info );
                setUser( d.info );
                let link = URL.back;
                if ( !link ) { link = '/'; }
                window.location.href = link;
            }
        });
    }
    return (
        <main>
            <img className="titleImg" src={`${PATH}/lib/img/login.svg`} alt="login" />
            <h4>{t( 'Login.title' )}</h4>
            <Form
                value={formValue} setValue={setFormValue}
                error={formError} setError={setFormError}
                onSubmit={login}
            >{fromData}</Form>
            <Button onClick={login} style={{ marginLeft: '0px' }}><I s='i-check2-circle'></I>{t( 'Login.login' )}</Button>
            <Button onClick='/register' style={{ float: 'right', marginRight: '0px' }}><I s='i-people'></I>{t( 'Login.register' )}</Button>
            <External></External>
        </main>
    );
}