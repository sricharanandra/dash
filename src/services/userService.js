import api from './api';

// Get user profile
export const getProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return { success: true, data: response.data.user };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch profile',
    };
  }
};

// Update user profile
export const updateProfile = async (updates) => {
  try {
    const response = await api.put('/user/profile', updates);
    // Update localStorage with new user data
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return { success: true, data: response.data.user };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to update profile',
    };
  }
};
