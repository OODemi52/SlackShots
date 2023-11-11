import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Link from './Link';
import Logo from './Logo';
import Spacer from './Spacer';
import FolderSelector from './FolderSelector';
import ChannelSelector from './ChannelSelector';
import UploadButton from './UploadButton';

interface AppState {
  dirName: string;
  channel: string;
}

const MainView: React.FC = () => {
  const [state, setState] = useState<AppState>({
    dirName: '',
    channel: '',
  });

  const handleFolderChange = (folderPath: string): void => {
    setState(prevState => ({...prevState, dirName: folderPath}));
    console.log('Folder path:', folderPath);
  };

  const handleChannelChange = (channelId: string): void => {
    setState(prevState => ({...prevState, channel: channelId}));
    console.log('Channel ID:', channelId);
  };

  const isUploadDisabled = !state.dirName || !state.channel;

  return (
    <>
      <View style={styles.container}>
        <Link org="slack" componentToBePassed={<Logo org="slack" />} />
        <Spacer size={10} />
        <Text style={styles.titleText}>SlackShots📸</Text>
      </View>
      <View style={styles.container}>
        <FolderSelector onFolderChange={handleFolderChange} />
        <Spacer size={2} />
        <ChannelSelector onChannelChange={handleChannelChange} />
        <UploadButton
          disabled={isUploadDisabled}
          dirName={state.dirName}
          channel={state.channel}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },

  baseText: {
    fontSize: 18,
    fontFamily: 'System',
  },

  titleText: {
    fontSize: 20,
    fontFamily: 'System',
  },
});

export default MainView;
