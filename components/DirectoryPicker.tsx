import React, {useState} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import DirectoryPickerModule from './native_components/DirectoryPickerModule';

interface DirectoryPickerProps {
  onFolderChange: (folder: string) => void;
}

const DirectoryPicker: React.FC<DirectoryPickerProps> = ({onFolderChange}) => {
  const [folder, setFolder] = useState<string>('');

  const pickFile = async () => {
    try {
      const uri = await DirectoryPickerModule.pickFile();
      const folderName = uri.split('/').pop();
      setFolder(folderName || '');
      onFolderChange(uri);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable onPress={pickFile} style={styles.button}>
      <Text style={styles.baseText}>
        {folder === '' ? 'Select Folder...' : folder}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    color: 'white',
    backgroundColor: '#2d2d2d',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },

  baseText: {
    fontSize: 18,
    fontFamily: 'System',
  },
});

export default DirectoryPicker;
