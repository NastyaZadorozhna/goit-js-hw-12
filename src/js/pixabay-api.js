import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchPhotos = async (searchedQuery, page) => {
  try {
    const axiosOptions = {
      params: {
        key: '45695124-2521d690be74d3f32382c65dc',
        q: searchedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    };

    const response = await axios.get('/', axiosOptions);

    return response;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};
