let toInt = (int) => {
    return parseInt(int.toString());
};
let clamp = (number, lower, upper) => {
    if (number === number) {
        if (upper !== undefined) {
            number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
            number = number >= lower ? number : lower;
        }
    }
    return number;
};
export { toInt, clamp };
//# sourceMappingURL=helpers.js.map