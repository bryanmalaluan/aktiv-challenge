import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import ProgressiveImage from 'components/molecules/ProgressiveImage';
import Col from 'components/containers/Col';
import KeyboardAwareScrollView from 'components/containers/KeyboardAwareScrollView';
import AnimatedDetails from 'components/organisms/AnimatedDetails';
import Button from 'components/molecules/Button';
import Row from 'components/containers/Row';
import { responsiveScale } from 'utils/dataFormat';
import { colors } from 'utils/theme';
import { SearchImageResultType } from 'services/types/pixabayType';

const IMAGE_HEIGHT = responsiveScale(300);

const DetailsScreen = ({ navigation, route }: StackScreenProps<any, any>) => {
  const item: SearchImageResultType = route.params?.item;

  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
    >
      <SharedElement id={`item.${item.id}.photo`}>
        <ProgressiveImage
          source={{ uri: item.largeImageURL }}
          height={IMAGE_HEIGHT}
          width={width}
        />
      </SharedElement>

      <Col style={styles.details}>
        <AnimatedDetails title="Uploaded by:" value={item.user} />

        <AnimatedDetails title="Tags:" value={item.tags} delay={500} />

        <AnimatedDetails
          title="Image resolution:"
          value={`${item.imageHeight}h x ${item.imageWidth}w`}
          delay={600}
        />
      </Col>

      <Row style={styles.backButton}>
        <Button label="Go back" onPress={navigation.goBack} />
      </Row>
    </KeyboardAwareScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
  },
  details: {
    width: '100%',
    padding: 24,
  },
  backButton: {
    width: 100,
    marginLeft: 24,
    marginTop: 16,
  },
});
