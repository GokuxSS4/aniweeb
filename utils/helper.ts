export function getUniqueAnimes(arr: any) {
    const seen = new Set();
    return arr.filter((item:any) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }