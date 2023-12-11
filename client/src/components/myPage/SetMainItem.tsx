import React, { useState } from 'react';

import SetMainDday from './SetMainDday';
import SetMainDone from './SetMainDone';

export default function SetMainItem(props: any) {
    return (
        <>
            {/* {props.groupArr.map((group: any) => {
                return (
                    <tr key={group.gSeq}>
                        <td>{group.gName}</td>
                        <td>{group.gDday}</td>

                        <td>
                            <SetMainDday
                                groupId={group.gSeq}
                                handleCheckDday={props.handleCheckDday}
                                dDayPin={props.dDayPin}
                            />
                        </td>

                        <td>
                            <SetMainDone
                                groupId={group.gSeq}
                                handleCheckDone={props.handleCheckDone}
                                donePin={props.donePin}
                            />
                        </td>
                    </tr>
                );
            })} */}
        </>
    );
}
