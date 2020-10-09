import { useRef, useEffect } from 'react';

/**
 * Custom hook to wrapper setInterval
 * @param {Object} config - the configuration
 * @param {boolean} config.condition - the condition to start the timer
 * @param {boolean} config.interval - interval of the timer, in milliseconds
 * @param {boolean} config.shouldCallImmediately - if true, the callback will be called immdiately
 * @param {Function} config.callback - the callback to be called
 */
const useInterval = (config) => {
  const {
    condition, callback, interval, shouldCallImmediately,
  } = config;

  const timer = useRef(null);

  useEffect(() => {
    if (condition) {
      if (shouldCallImmediately) {
        callback();
      }
      timer.current = setInterval(callback, interval);
    } else if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
    return () => {
      if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [condition, shouldCallImmediately, interval, callback]);
};

export { useInterval };
export default useInterval;
