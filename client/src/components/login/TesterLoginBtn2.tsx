import { ReactComponent as logoSvg } from './logo.svg';

import { createButton } from 'react-social-login-buttons';
import { createSvgIcon } from 'react-social-login-buttons';

const config_tester = {
    text: 'Guest 2',
    style: {
        background: '#fcfcfc',
        borderRadius: '12px',
        color: '#5d5d5d',
        boxShadow: '-11px 11px 22px #bebebe, 11px -11px 22px #ffffff',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    icon: '',
    className: 'testerLogin-btn',
};

const TesterLoginBtn = createButton(config_tester);
export default TesterLoginBtn;
