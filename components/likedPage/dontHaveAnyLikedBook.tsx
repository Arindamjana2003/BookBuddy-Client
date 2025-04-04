import { View, Image } from 'react-native';
import React from 'react';
import ThemeText from '../global/TheamText';
import { dvh, dvw } from '@/constants/Dimension';
import { Fonts } from '@/constants/Fonts';

export default function DontHaveAnyLikedBooks() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: dvh * 0.1,
      }}
    >
      <Image
        source={{
          uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8af292a3-55d6-4688-9e80-a1171eccd347/d8urfo1-13e11346-86c6-45af-872b-235ec85c9717.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhhZjI5MmEzLTU1ZDYtNDY4OC05ZTgwLWExMTcxZWNjZDM0N1wvZDh1cmZvMS0xM2UxMTM0Ni04NmM2LTQ1YWYtODcyYi0yMzVlYzg1Yzk3MTcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5XRanRDeqixWsCtaroKGZJhOQyxxPc1YZa3ve6xIRUM',
        }}
        style={{
          height: 200,
          width: 200,
          resizeMode: 'contain',
        }}
      />
      <ThemeText font={Fonts.Jua} size={dvw * 0.13}>
        Ohh ho!..
      </ThemeText>
      <ThemeText font={Fonts.PoppinsExtraLightItalic} align="center" style={{ width: dvw * 0.6 }}>
        Looks like you haven't liked any books yet!
      </ThemeText>
    </View>
  );
}
