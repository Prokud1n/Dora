import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View } from 'react-native';

const currentYear = new Date().getFullYear();

const isLeap = (year) => new Date(year, 1, 29).getDate() === 29;

const getDays = (month, year) => {
    const arr = [];

    const thirtyOne = [0, 2, 4, 6, 7, 9, 11];
    const thirty = [3, 5, 8, 10];
    const isFebruary = month === 1;

    const getMaximumDaysOfMonth = () => {
        if (thirtyOne.includes(month)) {
            return 31;
        }

        if (thirty.includes(month)) {
            return 30;
        }

        if (isFebruary) {
            return isLeap(year) ? 29 : 28;
        }
    };

    const maximumDaysOfMonth = getMaximumDaysOfMonth();

    for (let i = 1; i <= maximumDaysOfMonth; i++) {
        arr[i] = i;
    }

    return arr;
};

const getMonths = () => [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
];

const getYears = () => {
    const arr = [];

    for (let i = 2000; i <= currentYear; i++) {
        arr[i] = i;
    }

    return arr;
};

type Props = {
    value: {
        day: number;
        month: number;
        year: number;
    };
    onChange: (value: number, id: string) => void;
};

const DatePicker = ({ value, onChange }: Props) => {
    const { day, year, month } = value;

    const days = getDays(month, year);
    const months = getMonths();
    const years = getYears();

    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Picker
                selectedValue={day}
                style={{ width: '30%' }}
                onValueChange={(value) => {
                    onChange(value, 'day');
                }}>
                {days.map((day) => (
                    <Picker.Item key={day} label={String(day)} value={day} />
                ))}
            </Picker>
            <Picker
                selectedValue={month}
                style={{ width: '30%' }}
                onValueChange={(value) => {
                    onChange(value, 'month');
                }}>
                {months.map((month, idx) => (
                    <Picker.Item key={month + idx} label={month} value={idx} />
                ))}
            </Picker>
            <Picker
                selectedValue={year}
                style={{ width: '30%' }}
                onValueChange={(value) => {
                    onChange(value, 'year');
                }}>
                {years.map((year) => (
                    <Picker.Item key={year} label={String(year)} value={year} />
                ))}
            </Picker>
        </View>
    );
};

export default DatePicker;
