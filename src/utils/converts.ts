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