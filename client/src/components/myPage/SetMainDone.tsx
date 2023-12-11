import React from 'react';

export default function SetMainDone(props: any) {
    return (
        <>
            <label
                className="setDone-label"
                onClick={() => props.handleCheckDone(props.groupId)}
            >
                <input
                    type="radio"
                    name="setDone"
                    className="setDday-radio"
                    readOnly
                ></input>
                <img
                    src={
                        props.groupId === props.donePin
                            ? '/asset/icons/pin_fill.svg'
                            : '/asset/icons/pin_unfill.svg'
                    }
                    alt="pinImg"
                    className="pin-img"
                />
            </label>
        </>
    );
}
