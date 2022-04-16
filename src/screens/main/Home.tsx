import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInfiniteQuery } from 'react-query';
import { SharedElement } from 'react-navigation-shared-element';
import Container from 'components/containers/Container';
import Text from 'components/atoms/Text';
import Col from 'components/containers/Col';
import ProgressiveImage from 'components/molecules/ProgressiveImage';
import Row from 'components/containers/Row';
import HomeSkeletonLoader from 'components/organisms/HomeSkeletonLoader';
import InputField from 'components/molecules/InputField';
import { responsiveScale } from 'utils/dataFormat';
import pixabayService from 'services/pixabayService';
import routes from 'navigation/routes';
import { SearchImageResultType } from 'services/types/pixabayType';

const SPACER = 2;
const IMAGE_HEIGHT = responsiveScale(140);

const HomeScreen = ({ navigation }: StackScreenProps<any, any>) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [searchValue, setSearchValue] = React.useState<string>('');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const flatListRef = React.useRef<FlatList>(null);

  /** fetch images from pixabay api */
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['searchImages', searchQuery],
      ({ pageParam = 1 }) =>
        pixabayService.searchImages(searchQuery, pageParam),
      {
        getNextPageParam: page => {
          /** handles next page return */
          if (page.hasNextPage) {
            return page.nextPage;
          }
          return undefined;
        },
      }
    );

  const imageWidth = React.useMemo(() => {
    return width / 2 - SPACER;
  }, [width]);

  /** map paginated results data */
  const results: Array<SearchImageResultType> = React.useMemo(() => {
    if (data && data.pages) {
      /** merge paginated data */
      let _results: Array<SearchImageResultType> = [];
      for (let i = 0; i < data.pages.length; i++) {
        _results = [..._results, ...data.pages[i].hits];
      }
      return _results;
    }
    return [];
  }, [data]);

  /** render items in flatlist */
  const renderItem = React.useCallback(
    ({ item, index }) => {
      return (
        <SharedElement id={`item.${item.id}.photo`}>
          <ProgressiveImage
            source={{ uri: item.largeImageURL }}
            height={IMAGE_HEIGHT}
            width={imageWidth}
            disabled={false}
            style={{
              marginLeft: index % 2 === 1 ? SPACER : 0,
            }}
            onPress={() => navigation.navigate(routes.main.details, { item })}
          />
        </SharedElement>
      );
    },
    [imageWidth]
  );

  /** item separator in flatlist */
  const itemSeparatorComponent = React.useCallback(() => {
    return <Row style={{ width: '100%', height: 4 }} />;
  }, []);

  /** show skeleton loader if query is still loading */
  const listEmptyComponent = React.useCallback(() => {
    if (isLoading) {
      return <HomeSkeletonLoader height={IMAGE_HEIGHT} width={imageWidth} />;
    }

    if (results.length < 1 && !isLoading) {
      return (
        <Text
          fontSize={16}
          lineHeight={16}
          fontWeight="bold"
          style={{ marginLeft: 16, marginTop: 16 }}
        >
          No results found
        </Text>
      );
    }
    return null;
  }, [imageWidth, results, isLoading]);

  /** show skeleton loader in footer if fetching next page */
  const listFooterComponent = React.useCallback(() => {
    if (hasNextPage && isFetchingNextPage) {
      return (
        <HomeSkeletonLoader
          count={2}
          height={IMAGE_HEIGHT}
          width={imageWidth}
        />
      );
    }
    return null;
  }, [hasNextPage, isFetchingNextPage]);

  /** handles searching of image name */
  const onSubmitEditing = React.useCallback(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    }
    setSearchQuery(searchValue);
  }, [searchValue, searchQuery]);

  /** handles pagination */
  const onEndReached = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

  /** clear search value */
  const onPressClear = React.useCallback(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    }
    setSearchQuery('');
    setSearchValue('');
  }, []);

  return (
    <Container>
      <Col
        style={[
          styles.header,
          {
            paddingTop: insets.top + 16,
          },
        ]}
      >
        <Text
          fontSize={32}
          lineHeight={32}
          fontWeight="bold"
          style={{ marginBottom: 8 }}
        >
          Aktiv Challenge
        </Text>

        <InputField
          value={searchValue}
          placeholder="Search image"
          returnKeyType="search"
          clearButton={!!searchValue}
          onChangeText={setSearchValue}
          onSubmitEditing={onSubmitEditing}
          onPressClear={onPressClear}
        />
      </Col>

      <FlatList
        ref={flatListRef}
        data={results}
        scrollEventThrottle={16}
        numColumns={2}
        keyExtractor={(item, index) => `key-${item}${index}`}
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 4 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        onEndReachedThreshold={0.7}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparatorComponent}
        ListEmptyComponent={listEmptyComponent}
        ListFooterComponent={listFooterComponent}
        onEndReached={onEndReached}
      />
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: 'white',
  },
});
