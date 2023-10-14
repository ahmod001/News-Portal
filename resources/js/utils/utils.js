export const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = now - createdDate;

    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);

    // Calculate minutes, hours, days, etc.
    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hours ago`;
    } else if (seconds < 2592000) {
        const days = Math.floor(seconds / 86400);
        return `${days} days ago`;
    } else {
        // You can extend this logic for months, years, etc.
        const months = Math.floor(seconds / 2592000);
        return `${months} months ago`;
    }
};
