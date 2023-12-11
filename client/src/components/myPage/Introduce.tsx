import React, { useRef, useState } from 'react';

export default function Introduce(props: any): JSX.Element {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // edit btn 눌렀을 때 focus + 수정 가능 상태로 바뀜
    const changeReadOnly = (): void => {
        inputRef.current?.focus();
    };
    // 펜 버튼 hover event
    const missionEdit = document.querySelector('.mission-edit');
    const missionEditText = document.querySelector(
        '.mission-edit-text'
    ) as HTMLElement | null;

    missionEdit?.addEventListener('mouseover', () => {
        if (missionEditText !== null) {
            missionEditText.style.visibility = 'visible';
        }
    });
    missionEdit?.addEventListener('mouseout', () => {
        if (missionEditText !== null) {
            missionEditText.style.visibility = 'hidden';
        }
    });

    return (
        <div className="introduce-div">
            <label className="input-label">
                <textarea
                    onChange={(e) => props.setContent(e.target.value)}
                    value={props.content}
                    ref={inputRef}
                    className="input-obj"
                    id="text-area"
                />
                <div className="mission-edit">
                    <img
                        src="/asset/icons/edit.svg"
                        className="edit-img"
                        alt="editImg"
                    ></img>
                    <div className="title8 mission-edit-text">수정</div>
                </div>
            </label>
        </div>
    );
}
