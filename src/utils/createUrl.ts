export const createUrl = (url: string): URL | undefined => {
  try {
    return new URL(url);
  } catch (error) {
    if (error instanceof TypeError) {
      return;
    }
    throw error;
  }
};
