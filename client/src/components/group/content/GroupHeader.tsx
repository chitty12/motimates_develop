import React from 'react';

interface GroupHeaderProps {
    title: string;
    groupName: string;
}

export default function GroupHeader({ title, groupName }: any) {
    return (
        <div className="group-header title2">
            <div>{title}</div>
            <div>{groupName}</div>
        </div>
    );
}
