import { useContext } from 'react';
import { useTranslation } from "react-i18next";

import { A, I } from '../modules/Unit';
import con from '../config/site.config';
import { info } from '../config/content.config';

import '../style/views/Frame.css';

export default function Frame({ children }) {
    const { t } = useTranslation();
    const { theme } = useContext( info );
    return(
        <>
            <div id="body" style={{
                'background': `url( ${theme.background} )`,
                'backgroundSize': 'cover',
                'backgroundAttachment': 'fixed',
                'backgroundRepeat': 'no-repeat',
                'backgroundPosition': 'center'
            }}>
                <div id='content' className="scroll">
                    <div id='contentBox'>
                        <header>
                            <a className="logo" href="/"><img src={theme.logo} alt="logo" /></a>
                            <A className='help' to={con.help}><I s='i-question-circle'></I>{t( 'Frame.help' )}</A>
                        </header>
                        {children}
                        <footer>
                            <p className="designed" dangerouslySetInnerHTML={{ __html: con.designed }}></p>
                            <p className="copyright" dangerouslySetInnerHTML={{ __html: con.copyright }}></p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}