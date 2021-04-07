export const once = (fn) => () => {
    if (!fn) {
        return;
    }
    fn();
    fn = null;
};

export const noop = () => undefined;
