import React from 'react';
import {Image, StyleSheet} from 'react-native';

// Assuming that you have the appropriate import statements for the image assets

interface LogoProps {
  org: 'ccmd' | 'slack';
}

const Logo: React.FC<LogoProps> = ({org}) => {
  return (
    <>
      {org === 'ccmd' && (
        <Image
          source={require('../assets/CCLOGO-Vector.png')}
          style={styles.img}
        />
      )}
      {org === 'slack' && (
        <Image
          source={require('../assets/Slack_Logo.webp')}
          style={styles.img}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 150,
    height: 150,
  },
});

export default Logo;
