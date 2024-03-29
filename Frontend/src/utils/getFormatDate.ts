const monthName = {
    0: 'января',
    1: 'февраля',
    2: 'марта',
    3: 'апреля',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'августа',
    8: 'сентября',
    9: 'октября',
    10: 'ноября',
    11: 'декабря'
};

const getMonthName = (val) => {
    return monthName[val];
};

export const getCurrentDate = () => ({
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    currentDay: new Date().getDate()
});
// (date) => 'DD MonthName YYYY'
export const getDateWithMonthName = (date) => {
    return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
};

// (date) => 'YYYY.MM.DD'
export const getDateWithDot = ({ year, month, day }) =>
    `${day < 10 ? `0${day}` : day}.${month < 9 ? `0${month + 1}` : month + 1}.${year}`;
// (date) => 'YYYY-MM-DD'
export const getDateWithSplit = ({ year, month, day }) =>
    `${year}-${month < 10 ? `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` : day}`;

export const getDateForPicker = (date: string) => {
    // (date) = 'YYYY-MM-DD'
    const arr = date.split('-').map((item) => Number(item));

    return {
        year: arr[0],
        month: arr[1] - 1,
        day: arr[2]
    };
};
