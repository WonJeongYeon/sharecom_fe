const Days = (month, year) => {
    let arr = [];
    let endDay = 31;
    let isLeapYear = false;
    if (year % 4 === 0) {
        isLeapYear = !(year % 400 !== 0 && year % 100 === 0);
    }
    switch (month) {
        case '2': isLeapYear? endDay = 29 : endDay = 28; break;
        case '4': endDay = 30; break;
        case '6': endDay = 30; break;
        case '9': endDay = 30; break;
        case '11': endDay = 30; break;
        default: break;
    }
    for (let i = 1; i <= endDay; i++) {
        arr.push(i);
    }
    return arr;
}

export default Days;
