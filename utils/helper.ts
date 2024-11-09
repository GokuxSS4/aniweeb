export function getUniqueAnimes(arr: any) {
  const seen = new Set();
  return arr.filter((item: any) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
}

export const proxy_url = "http://127.0.0.1:8080";
export const file_extension = ".m3u8";
