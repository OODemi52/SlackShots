import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface ChannelSelectorProps {
  onChannelChange: (channel: string) => void;
}

interface Channel {
  id: string;
  name: string;
}

const ChannelSelector: React.FC<ChannelSelectorProps> = ({onChannelChange}) => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async (): Promise<void> => {
    try {
      const response = await fetch('http://192.168.4.75:3000/api/getChannels');
      const data = await response.json();

      // Map the array of arrays to an array of strings (channel names)
      const channelOptions = data.map(([id, name]: [string, string]) => ({
        id,
        name,
      }));

      setChannels(channelOptions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Choose Folder:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedChannel || ''}
        onValueChange={itemValue => {
          setSelectedChannel(itemValue);
          onChannelChange(itemValue);
        }}>
        <Picker.Item label="Select a channel" value={null} />
        {channels.map(channel => (
          <Picker.Item
            key={channel.id}
            label={channel.name}
            value={channel.id}
          />
        ))}
      </Picker>
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },

  picker: {
    height: 50,
    width: 150,
  },
});

export default ChannelSelector;
