export type SearchImageResultType = {
  id: number;
  pageURL: string;
  type: 'all' | 'photo' | 'illustration' | 'vector';
  tags: string;
  previewURL: string;
  previewWidth: string;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
};

export type PixabaySearchImagesType = {
  total: number;
  totalHits: number;
  hits: Array<SearchImageResultType>;
  hasNextPage: boolean;
  nextPage: number;
};
