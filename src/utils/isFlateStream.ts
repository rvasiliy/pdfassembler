import { TypedArray } from '../types/TypedArray';

export function isFlateStream(stream: TypedArray | string) {
    if (!stream || stream.length < 2) {
        return false;
    }

    const cmf = stream[0];
    const flg = stream[1];

    if ('string' === typeof cmf || 'string' === typeof flg) {
        return false;
    }

    if ((cmf & 0x0f) !== 8) {
        return false;
    }

    if (((cmf << 8) + flg) % 31 !== 0) {
        return false;
    }

    return (flg & 0x20) === 0;
}
