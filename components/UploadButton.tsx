import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import RNFS from 'react-native-fs';
import {WebClient} from '@slack/web-api';
import {AsyncStorage, LogBox} from 'react-native';

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

  LogBox.ignoreLogs(['Setting a timer']);

  const originalConsoleLog = console.log;

  console.log = (...args) => {
    const containsAsyncStorage = args.some(
      arg =>
        arg &&
        typeof arg === 'object' &&
        arg.constructor === Object &&
        arg.AsyncStorage,
    );

    if (containsAsyncStorage) {
      console.trace();
    }

    // Call the original console.log
    originalConsoleLog(...args);
  };

  useEffect(() => {
    setButtonColor(disabled ? '#2d2d2d' : '#007AFF');
  }, [disabled]);

  const handlePress = async (): Promise<void> => {
    try {
      if (dirName && channel) {
        const files = await RNFS.readDir(dirName);
        const sortedFiles = filterAndSortFiles(files.map(file => file.name));
        console.log(`${dirName}/${sortedFiles[0]}`);

        const fileUploads: {filename: string; file: string}[] = [];

        for (let i = 0; i < sortedFiles.length; i++) {
          const filename = sortedFiles[i];
          const file = `${dirName}/${filename}`;
          fileUploads.push({file, filename});

          if ((i + 1) % 14 === 0 || i === sortedFiles.length - 1) {
            await uploadFileToSlackChannel(
              'xoxb-1667223032755-4207981755234-d0WeP8JX8TOT3IwSG8Z63RKG', // DO NOT COMMIT THIS TOKEN!!!
              fileUploads,
            );
            fileUploads.length = 0;
          }
        }
      } else {
        console.log('Please select both a folder and a valid user token.');
      }
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  const filterAndSortFiles = (files: string[]): string[] => {
    const pattern: RegExp = /^IMG_.+\.JPG$/;
    const filteredFiles: string[] = files.filter((file: string) =>
      pattern.test(file),
    );
    return filteredFiles.sort();
  };

  const uploadFileToSlackChannel = async (
    token: string,
    fileUploads: object[],
  ): Promise<void> => {
    try {
      const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const client = new WebClient(token);

      await client.files.uploadV2({
        channel_id: channel,
        initial_comment: currentDate,
        file_uploads: fileUploads,
      });

      console.log('Uploaded files to Slack');
    } catch (error: any) {
      if (error.code === 'slack_error_code') {
        console.error(`Error uploading files to Slack: ${error.message}`);
      } else {
        console.error(`Unexpected error: ${error}`);
      }
      throw error;
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
