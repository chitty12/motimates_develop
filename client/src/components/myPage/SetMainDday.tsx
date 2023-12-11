import React from 'react';

export default function SetMainDday(props: any) {
    return (
        <>
            <label
                className="setDday-label"
                onClick={() => props.handleCheckDday(props.groupId)}
            >
                <input
                    type="radio"
                    name="setDday"
                    className="setDday-radio"
                    readOnly
                ></input>
                <img
                    src={
                        props.groupId === props.dDayPin
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
