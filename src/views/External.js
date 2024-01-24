import { useTranslation } from "react-i18next";

import { External_Google, External_Github } from "../config/api.config";
import { A, I } from '../modules/Unit';

import '../style/views/External.css';

export default function External({ stop }) {
    const { t } = useTranslation();
    return (
        <ul className="External">
            <A className={stop ? 'stop' : ''} to={External_Google}>
                <li className={stop ? 'stop' : ''}>
                    <span><I s='i-capslock'></I> {t( 'Login.External.authorize' )}</span>
                    <I s='i-google' size="60px" font='22px'></I>
                    {t( 'Login.External.Google' )}
                </li>
            </A>
            <A className={stop ? 'stop' : ''} to={External_Github}>
                <li className={stop ? 'stop' : ''}>
                    <span><I s='i-capslock'></I> {t( 'Login.External.authorize' )}</span>
                    <I s='i-github' size="60px" font='22px'></I>
                    {t( 'Login.External.Github' )}
                </li>
            </A>
        </ul>
    );
}