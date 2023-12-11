import { ReactComponent as naverSvg } from './naver.svg';

import { createButton } from 'react-social-login-buttons';
import { createSvgIcon } from 'react-social-login-buttons';

const config_naver = {
    text: 'NAVER',
    style: {
        background: '#fcfcfc',
        color: '#000000',
        fontSize: '1rem',
        fontWeight: 'bold',
        margin: '1rem auto',
        width: '90%',
        alignItems: 'center',
        display: 'flex',
        borderRadius: '12px',
        boxShadow: '-11px 11px 22px #bebebe, 11px -11px 22px #ffffff',
    },
    icon: createSvgIcon(naverSvg),
};

const NaverLoginBtn = createButton(config_naver);
export default NaverLoginBtn;
