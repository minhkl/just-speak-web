import {renderHook, cleanup} from '@testing-library/react-hooks';
import {useInterval} from './useInterval';

describe('useRenewToken', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  it('should work properly', (done) => {
    const testCallback = jest.fn();

    const {rerender, unmount} = renderHook(({condition, shouldCallImmediately = false}) => useInterval({
      condition,
      callback: testCallback,
      interval: 1000,
      shouldCallImmediately,
    }), {
      initialProps: {condition: false},
    });

    rerender({condition: true});
    jest.advanceTimersByTime(4000);
    expect(testCallback).toHaveBeenCalledTimes(4);

    rerender({condition: false});
    jest.advanceTimersByTime(10000);
    expect(testCallback).toHaveBeenCalledTimes(4);
    done();

    rerender({condition: true, shouldCallImmediately: true});
    jest.advanceTimersByTime(2000);
    expect(testCallback).toHaveBeenCalledTimes(7);

    unmount();
    jest.advanceTimersByTime(10000);
    expect(testCallback).toHaveBeenCalledTimes(7);
    done();
  });
});
