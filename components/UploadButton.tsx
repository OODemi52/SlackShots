import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import RNFS, {ReadDirItem} from 'react-native-fs';

interface UploadButtonProps {
  disabled: boolean;
  dirName: string;
  channel: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  disabled,
  dirName,
  channel,
}) => {
  const [buttonColor, setButtonColor] = useState<string>('#2d2d2d');

  useEffect(() => {
    setButtonColor(disabled ? '#2d2d2d' : '#007AFF');
  }, [disabled]);

  const handlePress = async (): Promise<void> => {
    try {
      if (dirName && channel) {
        const files = await RNFS.readDir(dirName);
        const imageFiles = files.filter(
          file =>
            file.isFile() &&
            (file.name.endsWith('.JPG') || file.name.endsWith('.jpg')),
        );

        const batchSize = 10;
        for (let i = 0; i < imageFiles.length; i += batchSize) {
          const batch = imageFiles.slice(i, i + batchSize);
          await uploadBatch(batch, channel);
        }
      } else {
        console.log('Please select both a folder and a channel.');
      }
    } catch (error) {
      console.log('Error uploading file to server:', error);
    }
  };

  const uploadBatch = async (batch: ReadDirItem[], channelId: string) => {
    const formData = new FormData();
    formData.append('channel', channelId);

    batch.forEach(file => {
      formData.append('files', {
        uri: 'file://' + file.path,
        type: 'image/jpeg',
        name: file.name,
      });
    });

    const response = await fetch('http://localhost:3000/api/uploadFiles', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Upload successful!');
    } else {
      console.log('Upload failed!');
    }
  };

  return (
    <Pressable
      style={[styles.button, {backgroundColor: buttonColor}]}
      onPress={handlePress}>
      <Text style={styles.baseText}>Upload</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 200,
    width: 300,
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
    textAlign: 'center',
  },
});

export default UploadButton;
