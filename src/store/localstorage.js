
function getItemFromLocalStorage(itemName) {
    const item = localStorage.getItem(itemName);
    if(!item) {
        return null;
    }
    return item;
}
export const tokens = {
    tmdbToken : getItemFromLocalStorage('tmdbToken'),
    entertainmentAppToken: getItemFromLocalStorage('entertainmentAppToken')
}