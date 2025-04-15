import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

const { height: screenHeight } = Dimensions.get('window');
const LINE_HEIGHT = 30;
const NUM_LINES = Math.floor(screenHeight / LINE_HEIGHT);

export default function DairyNote() {
  const theme = Colors[useColorScheme() ?? 'light'];

  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');

  return (
    <View style={[styles.container,{backgroundColor:theme.background}]}>
    
      <TextInput
        style={[styles.titleInput,{color:theme.textPrimary}]}
        placeholder="Write your title here..."
        placeholderTextColor={"theme.textprimary"}
        value={title}
        onChangeText={setTitle}
      />

  
      <View style={[styles.linedPaper,{backgroundColor:theme.background}]}>
        
        {Array.from({ length: NUM_LINES }).map((_, index) => (
          <View key={index} style={[styles.line, { top: index * LINE_HEIGHT,borderColor:theme.surface }]} />
        ))}

      
        <TextInput
          style={[styles.entryInput,{color:theme.textPrimary}]}
          placeholder="Start writing here..."
          placeholderTextColor={"theme.textPrimary"}
          value={entry}
          onChangeText={setEntry}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f7f7f7',
  },
  titleInput: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  linedPaper: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#ddd',

  },
  entryInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: LINE_HEIGHT,
    color: '#000',
    paddingTop: -30,  
    paddingHorizontal: 8,
    includeFontPadding: false,
    textAlignVertical: 'top',
  },
  
  
});
