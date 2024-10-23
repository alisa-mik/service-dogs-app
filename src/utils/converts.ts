export function getAgeFromSeconds(seconds: number) {
    const birthDate = new Date(seconds * 1000); // Convert seconds to milliseconds and create a Date object
    const currentDate = new Date(); // Get the current date

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();

    // If the current month is before the birth month in the current year, subtract one year
    if (months < 0) {
        years--;
        months += 12;
    }

    return `${years}.${months}`;
}

export const calculateAge = (birthDateString: string): string => {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    return `${years} years ${months} months`;
};

export function formatDateFromSeconds(seconds: number) {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so +1) and pad with leading zero
    const year = date.getFullYear(); // Get the year

    return `${day}/${month}/${year}`; // Return the formatted date
}

