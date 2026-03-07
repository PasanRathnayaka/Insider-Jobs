export const retryConnection = async (fn, retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Retry ${i + 1}/${retries} failed`);

      if (i === retries - 1) {
        throw error;
      }

      await new Promise((res) => setTimeout(res, delay));
    }
  }
};
