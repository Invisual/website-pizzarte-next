'use client';

import { useState, useEffect } from 'react';

const queries = {
    xs: '(max-width: 576px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1400px)',
};

export function useBreakpoints() {
    const [breakpoints, setBreakpoints] = useState({
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        xxl: false,
    });

    useEffect(() => {
        const mediaQueries = Object.entries(queries).map(([key, query]) => ({
            key,
            mql: window.matchMedia(query),
        }));

        const updateBreakpoints = () => {
            setBreakpoints(
                Object.fromEntries(mediaQueries.map(({ key, mql }) => [key, mql.matches]))
            );
        };

        updateBreakpoints();

        mediaQueries.forEach(({ mql }) => mql.addEventListener('change', updateBreakpoints));

        return () => {
            mediaQueries.forEach(({ mql }) => mql.removeEventListener('change', updateBreakpoints));
        };
    }, []);

    return breakpoints;
}