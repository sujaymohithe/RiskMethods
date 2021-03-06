//this function takes text content and convert any url to link
export const linkify = (text) => {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '">' + url + '</a>';
    });
} 