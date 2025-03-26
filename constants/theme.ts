import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const COLORS = {
  primary: '#31435E',
  secondary: '#FFFFFF',
  background: '#F5F9FC',
  white: '#ffffff',
  text: '#0E1725',
  textSecondary: '#757575',
  success: '#166907',
  error: '#E62B2B',
  card: '#ffffff',
  border: '#BDC5D1',
  buttonPrimary: '#31435E'
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 32
};

export const CARD_STYLE = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical:SPACING.lg,
    paddingHorizontal:SPACING.md,
    marginVertical: SPACING.sm,
    marginHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'solid',
  },
  containerList: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical:SPACING.md,
    paddingHorizontal:SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'solid',
  }
  

});

export const BUTTON_STYLE = StyleSheet.create({
  // Large Button Styles
  largeButton: {
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: 20, // 20px padding top/bottom as per style guide
    paddingHorizontal: 30, // 30px padding left/right as per style guide
    borderRadius: 12, // 12px border radius as per style guide
    height: 60, // 60px height as per style guide
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  largeButtonWithIcon: {
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: 20,
    paddingLeft: 20, // 20px padding left
    paddingRight: 25, // 25px padding right
    borderRadius: 12,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  largeButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18, // 18px font size as per style guide
    lineHeight: 20,
    textAlign: 'center',
    color: COLORS.text,
  },
  largeButtonIcon: {
    marginRight: 8, // 8px spacing between icon and text
  },
  
  // Medium Button Styles
  mediumButton: {
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: 18, // 18px padding top/bottom as per style guide
    paddingHorizontal: 25, // 25px padding left/right as per style guide
    borderRadius: 12, // 12px border radius as per style guide
    height: 49, // 49px height as per style guide
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    
  },
  mediumButtonWithIconLeft: {
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: 18,
    paddingLeft: 24, // 24px padding left
    paddingRight: 30, // 30px padding right
    borderRadius: 12,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mediumButtonWithIconRight: {
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: 18,
    paddingLeft: 25, // 25px padding left
    paddingRight: 25, // 25px padding right
    borderRadius: 12,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mediumButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16, // 16px font size as per style guide
    lineHeight: 18,
    textAlign: 'center',
    color: COLORS.secondary,
  },
  mediumButtonIconLeft: {
    marginRight: 6, // 6px spacing between icon and text
  },
  mediumButtonIconRight: {
    marginLeft: 6, // 6px spacing between text and icon
  },
  
  // Small Button Styles
  smallButton: {
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: 14, // 14px padding top/bottom as per style guide
    paddingHorizontal: 16, // 16px padding left/right as per style guide
    borderRadius: 8, // 12px border radius as per style guide
    height: 40, // Calculated from the padding and content
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.white,
   
  },
  smallButtonDark: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  smallButtonWithIcon: {
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  smallButtonDarkWithIcon: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  smallButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16, // 16px font size as per style guide
    lineHeight: 18,
    textAlign: 'center',
    color: COLORS.white,
  },
  smallButtonDarkText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    color: COLORS.white,
  },
  smallButtonIcon: {
    marginRight: 6, // 6px spacing between icon and text
  }
});

export const TYPOGRAPHY = StyleSheet.create({
  DispalyLarge: {
    fontFamily: 'Poppins-Bold',
    fontSize: 57,
    lineHeight: 91,
    
  },
  DispalyMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 45,
    lineHeight: 72,
  },
  headLineLarge: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    lineHeight: 51, 
    textAlign: 'left', 
  },
  headLineMedium: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    lineHeight: 42,
    textAlign: 'left',
  },
  headLineSmall: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    lineHeight: 35,
    textAlign: 'left',
  },
  TitleLarge: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    lineHeight: 29,
    textAlign: 'left',
  },
  TitleMedium: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'left',
  },
  bodyTextLarge: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'left',
  },
  bodyTextMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  smallText:{
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.25,
    textAlign: 'center',
    lineHeight: 22,
  }
});