
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    const formattedDate = formatter.format(new Date(date));

    return formattedDate
}

export const formatTime = (date) => {
    if (!date) return '';
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(date).toLocaleTimeString('en-US', options);
}