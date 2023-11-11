import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';

interface LinkProps {
  org: 'ccmd' | 'slack';
  componentToBePassed: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({org, componentToBePassed}) => {
  const handleLinkPress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  if (org === 'ccmd') {
    return (
      <TouchableOpacity
        onPress={() => handleLinkPress('https://christchapelmd.org')}>
        {componentToBePassed}
      </TouchableOpacity>
    );
  }

  if (org === 'slack') {
    return (
      <TouchableOpacity onPress={() => handleLinkPress('https://slack.com')}>
        {componentToBePassed}
      </TouchableOpacity>
    );
  }

  // Return null for unsupported org (optional)
  return null;
};

export default Link;
