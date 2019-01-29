export default function getDeviceType(width) {
    const widthNumber = parseInt(width, 10);
    if (widthNumber <= 424) {
        return 'Mobile';
    }
    if (widthNumber <= 768 && widthNumber >= 425) {
        return 'Tablet';
    }

    return 'Desktop';
}
