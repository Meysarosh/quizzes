export function tokenStringify(p, t) {
  const string = p
    .split('')
    .map((ch) => (ch.charCodeAt(0) < 100 ? `0${ch.charCodeAt(0)}` : `${ch.charCodeAt(0)}`))
    .join('');

  return [
    t,
    String.fromCharCode(
      ...(string.slice(5) + string.slice(0, 5)).match(/.{1,3}/g).map((el) => Number(el))
    ),
  ].join('.');
}

export function tokenParse(rt) {
  if (rt) {
    const joined = rt
      .split('.')
      .at(-1)
      .split('')
      .map((ch) =>
        ch.charCodeAt(0) < 100
          ? ch.charCodeAt(0) < 10
            ? `00${ch.charCodeAt(0)}`
            : `0${ch.charCodeAt(0)}`
          : `${ch.charCodeAt(0)}`
      )
      .join('');

    return String.fromCharCode(
      ...(joined.slice(-5) + joined.slice(0, -5)).match(/.{1,3}/g).map((n) => Number(n))
    );
  }
}
