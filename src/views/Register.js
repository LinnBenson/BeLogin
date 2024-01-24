import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { global } from '../config/content.config';
import { Title } from "../modules/Function";
import { Button, I } from '../modules/Unit';
import Form, { check } from '../modules/Form';
import { PATH } from "../config/site.config";
import { api_register } from "../config/api.config";

import '../style/views/Register.css';
import External from "./External";

export default function Register() {
    const { t } = useTranslation();
    const { toast, api } = useContext( global );
    const jump = useNavigate();
    useEffect(() => {
        document.title = Title( t( 'Register.title' ) );
    // eslint-disable-next-line
    }, [] );
    // 登录表单
    const [ formValue, setFormValue ] = useState({});
    const [ formError, setFormError ] = useState({});
    const fromData = [
        { type: 'text', name: 'username', icon: 'i-person-circle', hint: t( 'Register.username' ), must: true },
        { type: 'email', name: 'email', hint: t( 'Register.email' ), must: true },
        { type: 'password', name: 'password', hint: t( 'Register.password' ), must: true },
        { type: 'password', name: 'password2', hint: t( 'Register.password2' ), must: true },
        { type: 'text', name: 'invite', hint: t( 'Register.invite' ) },
    ];
    const register = () => {
        const data = check( fromData, formValue );
        if ( data.error ) {
            setFormError({ ...formError, [data.error]: true });
            setTimeout(() =>{ setFormError({ ...formError, [data.error]: false }); }, 600 );
            return toast( t( data.toast ), '', true );
        }
        api.send({
            link: api_register,
            post: data,
            check: true,
            run: function() {
                toast( t( 'true', {type:t('register')} ) );
                jump( `${PATH}/login` );
            }
        });
    }
    return (
        <main>
            <img className="titleImg" src={`${PATH}/lib/img/register.svg`} alt="register" />
            <h4>{t( 'Register.title' )}</h4>
            <Form
                value={formValue} setValue={setFormValue}
                error={formError} setError={setFormError}
                onSubmit={register}
            >{fromData}</Form>
            <Button onClick={register} style={{ marginLeft: '0px' }}><I s='i-check2-circle'></I>{t( 'Register.register' )}</Button>
            <Button onClick='/login' style={{ float: 'right', marginRight: '0px' }}><I s='i-people'></I>{t( 'Register.login' )}</Button>
            <External></External>
        </main>
    );
}