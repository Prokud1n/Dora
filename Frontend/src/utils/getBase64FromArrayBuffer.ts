export default function getBase64FromArrayBuffer(buffer) {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return btoa(binary);
}
