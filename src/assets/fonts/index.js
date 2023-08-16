import { Platform } from 'react-native'

const DEFAULT = {
  black: 'Urbanist-Black',
  bold: 'Urbanist-Bold',
  extraBold: 'Urbanist-ExtraBold',
  extraLight: 'Urbanist-ExtraLight',
  light: 'Urbanist-Light',
  medium: 'Urbanist-Medium',
  regular: 'Urbanist-Regular',
  semiBold: 'Urbanist-SemiBold',
  thin: 'Urbanist-Thin',
}

const Fonts = Platform.select({
  ios: DEFAULT,
  android: DEFAULT,
})

export default Fonts

// const Fonts = {
//    black: 'Urbanist-Black',
//   bold: 'Urbanist-Bold',
//   extraBold: 'Urbanist-ExtraBold',
//   extraLight: 'Urbanist-ExtraLight',
//   light: 'Urbanist-Light',
//   medium: 'Urbanist-Medium',
//   regular: 'Urbanist-Regular',
//   semiBold: 'Urbanist-SemiBold',
//   thin: 'Urbanist-Thin',
// };

// export default Fonts 