import React from 'react';
import '../../styles/scss/pages/management/summarycard.scss';
import Paper from '@mui/material/Paper';

export default function SummaryCard() {
    return (
        <div className="summary-card-layout">
            <Paper elevation={3} className="summary-paper">
                <div className="summary-title-content">
                    <div className="title6">100</div>
                    <div className="summary-title">users</div>
                </div>
                <div>
                    <img src="/asset/icons/User_fill.svg" alt="사람 이모티콘" />
                </div>
            </Paper>
            <Paper elevation={3} className="summary-paper">
                <div className="summary-title-content">
                    <div className="title6">100</div>
                    <div className="summary-title">groups</div>
                </div>
                <div>
                    <img
                        src="/asset/icons/Group_fill.svg"
                        alt="사람 이모티콘"
                    />
                </div>
            </Paper>
            <Paper elevation={3} className="summary-paper">
                <div className="summary-title-content">
                    <div className="title6">100</div>
                    <div className="summary-title">reports</div>
                </div>
                <div>
                    <img
                        src="/asset/icons/Alarm_fill.svg"
                        alt="사람 이모티콘"
                    />
                </div>
            </Paper>
        </div>
    );
}
