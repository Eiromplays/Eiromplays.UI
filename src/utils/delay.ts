// Original source code: https://github.com/TanStack/react-location/blob/fd5cbfe45d5166f1c03aa0204af1f7ef0a46e05a/examples/kitchen-sink/src/index.tsx#L808

export const delay = async <T>(fn: (...args: any[]) => Promise<T> | T, delay?: number) => {
  const chosenDelay = Number(sessionStorage.getItem('delay') ?? delay ?? 0);
  const delayPromise = new Promise((r) => setTimeout(r, chosenDelay));

  const [res] = await Promise.all([fn(), delayPromise]);

  return res;
};
