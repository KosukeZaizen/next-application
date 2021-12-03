export function sleepAsync(millisecond: number) {
    return new Promise(r => setTimeout(() => r(undefined), millisecond));
}
