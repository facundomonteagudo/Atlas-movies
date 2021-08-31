import axiosInstance from './axios-instance';

export const loginUserService = async (user) => {
  try {
    const { data } = await axiosInstance.post('/auth', {
      ...user
    });
    const { token, role } = data;

    return { token, role };
  } catch (error) {
    throw new Error(error);
  }
};

export const registerUserService = async (user) => {
  try {
    await axiosInstance.post('/signup', {
      ...user
    });
  } catch (error) {
    throw new Error(error);
  }
};
