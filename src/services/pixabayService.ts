import { get } from 'network';
import logger from 'utils/logger';
import { PixabaySearchImagesType } from './types/pixabayType';

const KEY = '26698752-a8cb41d633375220af2c83bcc';
const PER_PAGE = 16;

class PixabayService {
  async searchImages(searchQuery: string, page: number) {
    let url = `https://pixabay.com/api/?key=${KEY}&image_type=photo&pretty=true&page=${page}&per_page=${PER_PAGE}`;

    if (searchQuery) {
      url += `&q=${searchQuery}`;
    }

    logger.debug('API Endpoint', url);
    const response = await get(url);
    const results: PixabaySearchImagesType = response.data;
    const lastPage = Math.round(results.totalHits / PER_PAGE);
    const hasNextPage = page < lastPage;

    return { ...results, hasNextPage, nextPage: page + 1 };
  }
}

const pixabayService = new PixabayService();
export default pixabayService;
