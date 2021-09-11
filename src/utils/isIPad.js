import { NativeModules } from 'react-native'

const isIPad = NativeModules.PlatformConstants &&
NativeModules.PlatformConstants.interfaceIdiom === 'pad'

export default isIPad