import _ from 'lodash';
import { useEffect, useState, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

export const useResizeObserver = () => {
    const ref = useRef();
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);

    useEffect(() => {
        const element = ref.current;
        const resizeObserver = new ResizeObserver(_.debounce(entries => {
            const entry = _.head(entries);

            if (!entry) {
                return;
            }

            setWidth(entry.contentRect.width);
            setHeight(entry.contentRect.height);
        }, 50));

        resizeObserver.observe(element);

        return () => resizeObserver.unobserve(element);
    }, []);

    return [ref, width, height];
};