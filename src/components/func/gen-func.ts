export const isOdd = (num: number) => num % 2 === 1;

export const getSecCol = (i: number) => {
    if (isOdd(i)) {
        return `#c9c9c9`;
    } else {
        return `#757575`;
    }
};