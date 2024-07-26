import React, { useState } from 'react';
import { FlatList, StyleSheet, ViewToken } from 'react-native';
import CarouselItem from './CarouselItem';

interface CarouselProps {
  data: any[];
  onItemPress: (item: any) => void;
  championId: string;
}

const Carousel: React.FC<CarouselProps> = ({ data, onItemPress, championId }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 70,
  };

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <CarouselItem activeItem={activeIndex} item={item} index={index} onPress={() => onItemPress(item)} championId={championId} />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="start"
      snapToInterval={160} 
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 5,
  },
});

export default Carousel;
