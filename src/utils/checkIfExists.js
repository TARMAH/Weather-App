export function ifExists(name,array) {
    for (let arr of array) {
        if (arr.name.toLowerCase() === name.toLowerCase()) return true;
    }
    return false;
  }