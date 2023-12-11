import React from 'react';

export default function useDateChange(str: any) {
    // 주어진 날짜 문자열
    var dateString = str;

    // Date 객체로 변환
    var date = new Date(dateString);

    // 날짜를 하루 뒤로 이동
    date.setDate(date.getDate() + 1);

    // 원하는 형식의 문자열로 변환 (yyyy-mm-dd)
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var newDateString = year + '-' + month + '-' + day;

    console.log(newDateString);

    return newDateString;
}
