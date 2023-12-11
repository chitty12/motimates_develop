import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';

export default function ProfilePic(props: any) {
    const [userImg, setUserImg] = useState<any>();
    console.log('userImg', userImg);

    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUserImg(e.target.files[0]);
        }

        const formData = new FormData();

        if (e.target.files && e.target.files[0]) {
            formData.append('image', e.target.files[0]);
            formData.append('gSeq', props.gSeq);
            sendImg(formData);
            console.log(111111, formData.values());
        }
    };

    const sendImg = (formData: any): void => {
        const cookie = new Cookies();
        const uToken = cookie.get('isUser'); // 토큰 값
        try {
            axios
                .patch(
                    `${process.env.REACT_APP_DB_HOST}/group/groupCoverImg`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${uToken}`,
                        },
                    }
                )
                .then((res) => {
                    console.log('patch', res.data);
                });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <label id="profilePic-label">
                <input
                    type="file"
                    id="profilePic-input"
                    name="image"
                    onChange={handlerChange}
                />
                <button className="btn-sm" style={{ width: '3rem' }}>
                    추가하기
                    <img
                        src="/asset/icons/edit.svg"
                        alt="profilePicEdit"
                        id="profilePic-edit"
                    />
                </button>
            </label>
        </div>
    );
}
