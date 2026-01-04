# App Icon Update Guide

To update the app icon for PSX, you need to replace the icon files in both iOS and Android directories.

## Required Icon Sizes

### iOS App Icons
Place these files in `ios/psx/Images.xcassets/AppIcon.appiconset/`:

- **20x20@2x** (40x40px) - `icon-20@2x.png`
- **20x20@3x** (60x60px) - `icon-20@3x.png`
- **29x29@2x** (58x58px) - `icon-29@2x.png`
- **29x29@3x** (87x87px) - `icon-29@3x.png`
- **40x40@2x** (80x80px) - `icon-40@2x.png`
- **40x40@3x** (120x120px) - `icon-40@3x.png`
- **60x60@2x** (120x120px) - `icon-60@2x.png`
- **60x60@3x** (180x180px) - `icon-60@3x.png`
- **1024x1024** (1024x1024px) - `icon-1024.png` (App Store)

### Android App Icons
Place these files in the respective `android/app/src/main/res/mipmap-*/` folders:

- **mipmap-mdpi**: 48x48px - `ic_launcher.png` and `ic_launcher_round.png`
- **mipmap-hdpi**: 72x72px - `ic_launcher.png` and `ic_launcher_round.png`
- **mipmap-xhdpi**: 96x96px - `ic_launcher.png` and `ic_launcher_round.png`
- **mipmap-xxhdpi**: 144x144px - `ic_launcher.png` and `ic_launcher_round.png`
- **mipmap-xxxhdpi**: 192x192px - `ic_launcher.png` and `ic_launcher_round.png`

## Steps to Update

1. **Create your icon image** (1024x1024px recommended)
   - Use a square image with your PSX logo/design
   - Recommended: Stock chart, PSX text, or market-related design
   - Background: Dark theme (#121212 or #1E1E1E) with green accent (#81C784)

2. **Generate all sizes** using one of these methods:
   - Online tool: https://www.appicon.co/ or https://icon.kitchen/
   - Image editing software (Photoshop, GIMP, etc.)
   - React Native tool: `react-native-asset` or `app-icon`

3. **Replace the files**:
   - iOS: Replace files in `ios/psx/Images.xcassets/AppIcon.appiconset/`
   - Android: Replace files in `android/app/src/main/res/mipmap-*/`

4. **Rebuild the app**:
   ```bash
   # For iOS
   cd ios && pod install && cd ..
   npx react-native run-ios
   
   # For Android
   npx react-native run-android
   ```

## Quick Method (Using Online Tools)

1. Go to https://www.appicon.co/
2. Upload your 1024x1024px icon
3. Select "iOS" and "Android"
4. Download the generated icons
5. Extract and replace the files in the directories mentioned above

## Note
After updating icons, you may need to:
- Clean build folders
- Uninstall the app from your device/simulator
- Rebuild and reinstall

