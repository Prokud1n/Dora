const getWordShape = (num: number, form1: string, form2: string, form3: string): string => {
    const n = Math.abs(num) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) {
        return form3;
    }

    if (n1 > 1 && n1 < 5) {
        return form2;
    }

    if (n1 === 1) {
        return form1;
    }

    return form3;
};

export default getWordShape;
