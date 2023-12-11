import { ReactComponent as kakaoSvg } from './kakao.svg';

import { createButton } from 'react-social-login-buttons';
import { createSvgIcon } from 'react-social-login-buttons';

const config_kakao = {
    text: 'KAKAO',
    style: {
        background: '#FEE500',
        color: '#000000',
        fontSize: '1rem',
        fontWeight: 'bold',
        margin: '0.5rem auto',
        width: '90%',
        alignItems: 'center',
        display: 'flex',
        borderRadius: '12px',
        boxShadow: '-11px 11px 22px #bebebe, 11px -11px 22px #ffffff',
    },
    icon: createSvgIcon(kakaoSvg),
    className: 'kakaoLogin-btn',
};

const KakaoLoginBtn = createButton(config_kakao);
export default KakaoLoginBtn;
