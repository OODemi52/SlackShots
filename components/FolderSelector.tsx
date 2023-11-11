import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DirectoryPicker from './DirectoryPicker';

interface FolderSelectorProps {
  onFolderChange: (folderPath: string) => void;
}

const FolderSelector: React.FC<FolderSelectorProps> = ({onFolderChange}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Choose Folder:</Text>
      <DirectoryPicker onFolderChange={onFolderChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontSize: 18,
    fontFamily: 'System',
    paddingBottom: 10,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});

export default FolderSelector;
