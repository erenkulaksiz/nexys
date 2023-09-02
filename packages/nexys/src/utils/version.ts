export default function isNewerVersion(oldVer: string, newVer: string) {
  const oldParts = oldVer.split(".");
  const newParts = newVer.split(".");
  for (var i = 0; i < newParts.length; i++) {
    const a = ~~newParts[i];
    const b = ~~oldParts[i];
    if (a > b) return true;
    if (a < b) return false;
  }
  return false;
}
