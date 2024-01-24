export const PATH = process.env.PUBLIC_URL;

const con = {
    name: 'account',
    version: '1.0.0',
    designed: 'Designed by <a href="https://github.com/linnbenson" target="_blank" rel="noreferrer">Linn Benson</a>',
    copyright: `Copyright ${new Date().getFullYear()} <a href="https://bemiun.com" target="_blank" rel="noreferrer">Bemiun</a>. All rights reserved.`,
    help: '',
    theme: {
        logo: `http://t.cc/LIBRARY/icon/logo_b.png`,
        background: `${PATH}/lib/img/background.jpg`,
        color: {
            '--r0': '242,242,242',
            '--r1': '61,61,61',
            '--r2': '94,159,242',
            '--r3': '161,199,224',
            '--r4': '254,153,151',
            '--r5': '255,255,255'
        }
    }
};

export const V = `version=${con.version}`;

export default con;