
let toInt = (int: number): number => {
    return parseInt(int.toString());
};

let clamp = (number: number, lower: number, upper: number): number =>{
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

export {toInt, clamp}