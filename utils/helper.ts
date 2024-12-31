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

const hlsProxyHost = process.env.HLS_PROXY_HOST || "localhost";
const hlsProxyPort = process.env.HLS_PROXY_PORT || "8080";

export const proxy_url = `http://${hlsProxyHost}:${hlsProxyPort}`;
export const file_extension = ".m3u8";
