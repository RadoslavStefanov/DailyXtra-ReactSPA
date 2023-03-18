export default function calcTimeAgo(utcDate)
{
    const timestampDate = new Date(utcDate);

    const now = Date.now();
    const difference = now - timestampDate;

    if (difference < 1000) {
    return 'just now';
    } else if (difference < 60 * 1000) {
    const seconds = Math.floor(difference / 1000);
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (difference < 60 * 60 * 1000) {
    const minutes = Math.floor(difference / (60 * 1000));
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (difference < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(difference / (60 * 60 * 1000));
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
    const days = Math.floor(difference / (24 * 60 * 60 * 1000));
    return `${days} day${days !== 1 ? 's' : ''} ago`;
}
}