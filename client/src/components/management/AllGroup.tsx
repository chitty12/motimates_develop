import React from 'react';
import SummaryCard from './SummaryCard';
import '../../styles/scss/pages/management/managementlist.scss';

import { Paper } from '@mui/material';

export default function AllGroup() {
    return (
        <div>
            AllGroup
            <SummaryCard />
            <Paper elevation={3} className="list-paper">
                <div className="title4 list-title">전체 그룹</div>
            </Paper>
        </div>
    );
}
