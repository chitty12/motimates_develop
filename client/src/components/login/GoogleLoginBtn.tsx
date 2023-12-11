import { ReactComponent as googleSvg } from './google.svg';

import { createButton } from 'react-social-login-buttons';
import { createSvgIcon } from 'react-social-login-buttons';

const config_google = {
    text: 'Google',
    style: {
        color: '#000000',
        fontSize: '1rem',
        fontWeight: 'bold',
        margin: '1rem auto',
        width: '90%',
        alignItems: 'center',
        display: 'flex',
        background: '#fcfcfc',
        borderRadius: '12px',
        boxShadow: '-11px 11px 22px #bebebe, 11px -11px 22px #ffffff',
    },
    icon: createSvgIcon(googleSvg),
};

const GoogleLoginBtn = createButton(config_google);
export default GoogleLoginBtn;
