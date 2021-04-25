# Restaurant-Native
React Native ⚛  Restaurant 🍔🌭🍟🍕  App


# Instalaciones stack
## Instalar react-navigation/native
`npm install @react-navigation/native`

# instalaciones de native base
### `npm install native-base`

# instalaciones de Iconos
### `npm install react-native-vector-icons`
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

# En la carpeta de IOS (si estas trabajando en IOS)
## iOS Podfile 
### pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
## info.plist
### <key>UIAppFonts</key>
### <array>
###  <string>AntDesign.ttf</string>
###  <string>Entypo.ttf</string>
###  <string>EvilIcons.ttf</string>
###  <string>Feather.ttf</string>
###  <string>FontAwesome.ttf</string>
###  <string>FontAwesome5_Brands.ttf</string>
###  <string>FontAwesome5_Regular.ttf</string>
### <string>FontAwesome5_Solid.ttf</string>
###  <string>Foundation.ttf</string>
###  <string>Ionicons.ttf</string>
###  <string>MaterialIcons.ttf</string>
###  <string>MaterialCommunityIcons.ttf</string>
###  <string>SimpleLineIcons.ttf</string>
###  <string>Octicons.ttf</string>
###  <string>Zocial.ttf</string>
### </array>



## Instalar las dependencias
`npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

## Instalar navegación en Stack

`npm i @react-navigation/stack`

# Para agrupar productos
### `npm install lodash`


## Si desarrollas una app para iOS 

cd ios/
pod install

## En Android android/app/build.gradle
implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'

## en el App.js 
import 'react-native-gesture-handler';
