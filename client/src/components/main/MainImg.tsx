import React, { useState, useRef, ChangeEvent } from 'react';
import '../../styles/scss/pages/main.scss';

export default function MainImg() {
    const [Image, setImage] = useState<string>(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    );
    const [File, setFile] = useState<File | null>(null);
    const fileInput = useRef<HTMLInputElement | null>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files);
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    setImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className="main1-div">
            <div className="main-img-div">
                <img src={Image} className="upload-img" alt="upload-img" />
                <label htmlFor="main-img-upload">
                    <img
                        src="/asset/icons/edit.svg"
                        alt="사진 수정 아이콘"
                        className="upload-img-icon"
                    />
                </label>
                <input
                    type="file"
                    accept="image/jpg, image/png, image/jpeg"
                    id="main-img-upload"
                    onChange={onChange}
                    ref={fileInput}
                />
            </div>
        </div>
    );
}
