//useIntersecting custom-hook
import { useEffect, useRef, useState } from 'react';

function useIntersection(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elemRef = useRef(null);

    const action = ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(action, options);

        if (elemRef.current) {
            observer.observe(elemRef.current);
        }

        return () => {
            if (elemRef.current) {
                observer.unobserve(elemRef.current);
            }
        };
    }, [elemRef, options]);

    return [elemRef, isIntersecting];
};

export {useIntersection}; 