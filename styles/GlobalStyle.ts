import { StyleSheet } from 'react-native';

export const GlobalStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  footer: {
    height: 80,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: '#dadada',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// "softwareKeyboardLayoutMode": "pan",
// "package": "dev.expo.keyboard.guide"
