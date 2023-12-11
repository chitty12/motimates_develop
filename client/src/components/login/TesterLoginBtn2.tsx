import { ReactComponent as logoSvg } from './logo.svg';

import { createButton } from 'react-social-login-buttons';
import { createSvgIcon } from 'react-social-login-buttons';

const config_tester = {
    text: 'Guest 2',
    style: {
        background: '#rgb(214, 214, 214)',
        borderRadius: '12px',
        color: '#fcfcfc',
        boxShadow: '-11px 11px 22px #bebebe, 11px -11px 22px #ffffff',
        fontSize: '1rem',
        fontWeight: 'bold',
        alignItems: 'center',
        display: 'flex',
        width: '90%',
        margin: '1rem',
        textAlign: 'center',
        paddingRight: '2rem',
    },
    icon: '',
    className: 'testerLogin-btn',
};

const TesterLoginBtn = createButton(config_tester);
export default TesterLoginBtn;
