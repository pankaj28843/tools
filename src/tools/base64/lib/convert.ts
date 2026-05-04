export type Base64DecodeResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/;
const base64UrlPattern = /^[A-Za-z0-9_-]*={0,2}$/;

export function encodeBase64Text(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

export function decodeBase64Text(value: string): Base64DecodeResult {
  const normalized = normalizeBase64(value);

  if (!normalized) {
    return { ok: true, text: '' };
  }

  if (!isValidBase64(normalized)) {
    return { ok: false, error: 'Enter valid Base64 text. Only A-Z, a-z, 0-9, +, /, -, _, and padding = are supported.' };
  }

  try {
    const binary = atob(toPaddedStandardBase64(normalized));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return { ok: true, text: new TextDecoder('utf-8', { fatal: true }).decode(bytes) };
  } catch {
    return { ok: false, error: 'This Base64 value could not be decoded as UTF-8 text.' };
  }
}

export function normalizeBase64(value: string) {
  return value.replace(/[\t\n\f\r ]+/g, '');
}

function isValidBase64(value: string) {
  if (value.length % 4 === 1) return false;
  if (!base64Pattern.test(value) && !base64UrlPattern.test(value)) return false;

  const firstPadding = value.indexOf('=');
  return firstPadding === -1 || /^=+$/.test(value.slice(firstPadding));
}

function toPaddedStandardBase64(value: string) {
  const standard = value.replaceAll('-', '+').replaceAll('_', '/');
  const paddingLength = (4 - (standard.length % 4)) % 4;
  return standard + '='.repeat(paddingLength);
}
