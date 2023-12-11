import React from 'react';
import InterestedItem from './InterestedItem';

export default function InterestedList(props: any) {
    interface Interested {
        id: string;
        category: string;
        val: string;
    }
    const interestedArr: Interested[] = [
        { id: 'ex', category: '운동', val: 'ex' },
        { id: 're', category: '독서', val: 're' },
        { id: 'lan', category: '언어', val: 'lan' },
        { id: 'cert', category: '자격증', val: 'cert' },
        { id: 'st', category: '스터디', val: 'st' },
        { id: 'eco', category: '경제', val: 'eco' },
        { id: 'it', category: 'IT', val: 'it' },
        { id: 'etc', category: '기타', val: 'etc' },
    ];

    return (
        <div>
            <InterestedItem
                interestedArr={interestedArr}
                selectedArr={props.selectedArr}
                setSelectedArr={props.setSelectedArr}
                num={props.num}
            />
        </div>
    );
}
