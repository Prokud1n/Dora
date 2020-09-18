const getMonthName = (val) => {
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

    return monthName[val];
};

const getFormatDate = (date) => {
    return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
};

export default getFormatDate;
