export const checkForNulls = (string) => {
    if (string == '' || string == null || string == undefined) {
        return false;
    }
    return true;
}