
export const createUrl = (base: string, params: Record<string, string>): string => {
    const url = new URL(base);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[ key ]));
    return url.toString();
};