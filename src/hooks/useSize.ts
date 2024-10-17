import * as React from 'react'
import useResizeObserver from '@react-hook/resize-observer'

interface Size {
    width: number;
    height: number;
}

export const useSize = (target: React.RefObject<HTMLElement>): Size | undefined => {
    const [ size, setSize ] = React.useState<Size>();

    React.useLayoutEffect(() => {
        if (target.current) {
            setSize(target.current.getBoundingClientRect());
        }
    }, [ target ]);

    // Where the magic happens
    useResizeObserver(target, (entry) => setSize(entry.contentRect));
    return size;
};