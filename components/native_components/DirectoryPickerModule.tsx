import {NativeModules} from 'react-native';

const {DirectoryPickerModule} = NativeModules;

interface DirectoryPickerInterface {
  pickFile(): Promise<string>;
}

export default DirectoryPickerModule as DirectoryPickerInterface;
