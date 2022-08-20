import moment from "moment"

export function validateEmail(email) {
    const domainExt = ["com", "edu", "net", "org"]
    let error = false

    if (!(email.includes('@'))) {
        // Error: No '@'
        error = true
    } else if (email.split('@')[1].split('.') === '') {
        // Error: @.com
        error = true
    } else if (!(domainExt.includes(email.split('@')[1].split('.')[1]))) {
        // Error: .something
        error = true
    }

    return error
}

export function replaceSpaces(string) {
    let stringWith = false
    let replacedStringWith;
    if (string.includes('w/')) {
        stringWith = true
        replacedStringWith = string.replace('w/', 'with')
    }

    if (!stringWith) {
        return string.replace(/\s+/g, '-');
    } else {
        const newString = replacedStringWith.replace(/\s+/g, '-');
        return newString
    }
}

export function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export function getMonthDateRange(year, month) {
    // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
    // array is 'year', 'month', 'day', etc
    const startDate = moment([year, month])._d;

    // Clone the value before .endOf()
    const endDate = moment(startDate).endOf('month')._d;

    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate, end: endDate };
}

export function sendEmail(params) {
    // console.log('sending params')
    emailjs.send('JolinaLashes', 'lashes_contact_template', params, process.env.EMAILJS_KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
};