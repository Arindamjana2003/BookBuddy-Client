import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ThemeText from '@/components/global/TheamText';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '@/types/books';
import { Fonts } from '@/constants/Fonts';

const BookCard = ({
  item,
  theme,
  onDelete,
}: {
  item: Book;
  theme: any;
  onDelete: (bookId: string, e: any) => void;
}) => {
  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <Image
        source={{ uri: item?.coverImage?.url || 'https://via.placeholder.com/150' }}
        style={styles.cover}
      />
      <View style={styles.cardContent}>
        <ThemeText font={Fonts.PoppinsMedium} size={15} numberOfLines={1}>
          {item.name}
        </ThemeText>
        <ThemeText size={13} color={theme.textSecondary} numberOfLines={1}>
          by {item.author}
        </ThemeText>
        <ThemeText size={12} color={theme.textSecondary} numberOfLines={2}>
          {item.description}
        </ThemeText>
      </View>

      <TouchableOpacity style={styles.deleteIcon} onPress={(e) => onDelete(item._id, e)}>
        <Ionicons name="trash-bin-outline" size={18} color={theme.error} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  cover: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
});

export default BookCard;
