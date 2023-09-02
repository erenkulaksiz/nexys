export default function isNewerVersion(oldVer, newVer) {
    var oldParts = oldVer.split(".");
    var newParts = newVer.split(".");
    for (var i = 0; i < newParts.length; i++) {
        var a = ~~newParts[i];
        var b = ~~oldParts[i];
        if (a > b)
            return true;
        if (a < b)
            return false;
    }
    return false;
}
