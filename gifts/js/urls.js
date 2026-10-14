const CHUNK = 400;
const MAX_URL = 20000;

export function httpUrl(value) {
  const raw = String(value || "").trim();
  if (!raw || raw.length > MAX_URL) return "";
  const lower = raw.toLowerCase();
  if (!lower.startsWith("http://") && !lower.startsWith("https://")) return "";
  return raw;
}

export function packUrl(url) {
  const safe = httpUrl(url);
  if (!safe) return [];
  const parts = [];
  for (let i = 0; i < safe.length; i += CHUNK) {
    parts.push(safe.slice(i, i + CHUNK));
  }
  return parts;
}

export function unpackUrl(data, key) {
  const parts = data?.[`${key}Parts`];
  if (Array.isArray(parts) && parts.length) {
    return httpUrl(parts.join(""));
  }
  return httpUrl(data?.[key]);
}

export function urlFields(key, url) {
  const safe = httpUrl(url);
  const fields = {
    [key]: safe.length <= CHUNK ? safe : "",
    [`${key}Parts`]: packUrl(safe),
  };
  return fields;
}
