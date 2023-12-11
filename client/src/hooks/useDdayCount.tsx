import React, { useState, useEffect } from 'react';

export default function useDdayCount(targetDate: string) {
    const [dday, setDday] = useState('');

    useEffect(() => {
        if (targetDate) {
            const countDownDate = new Date(targetDate).getTime();
            const now = new Date().getTime();
            const countDown = countDownDate - now;
            const days = Math.floor(countDown / (1000 * 60 * 60 * 24)) + 1;

            if (days > 0) {
                setDday('D-' + days);
            } else if (days == 0) {
                setDday('D-day');
            }

            // else if (days < 0) {
            //     setDday('D+' + String(days).slice(1, 2));
            // }
        }
    }, [targetDate]);

    return dday;
}
