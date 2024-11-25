export const parseTimeString = (timeString) => {
    const unit = timeString.slice(-1); // the last letter, which define metrics
    const value = parseInt(timeString.slice(0, -1), 10); // numbers without letter

    if (isNaN(value)) {
        throw new Error(`Invalid time value: ${timeString}`);
    }

    switch (unit) {
        case "s": // seconds
            return value * 1000;
        case "m": // minutes
            return value * 60 * 1000;
        case "h": // hours
            return value * 60 * 60 * 1000;
        case "d": // days
            return value * 24 * 60 * 60 * 1000;
        default:
            throw new Error(`Invalid time unit: ${unit}`);
    }
};
