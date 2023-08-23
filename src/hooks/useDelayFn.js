import { useEffect, useRef } from "react";

const useDelayFn = (fn = () => { }, deps = [], delayTime = 500) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
        } else {
            const delayDebounceFn = setTimeout(fn, delayTime)
            return () => clearTimeout(delayDebounceFn)
        };
    }, deps)
}

export default useDelayFn