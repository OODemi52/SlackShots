import React from 'react';
import {View} from 'react-native';

interface Props {
  size: number;
}

const Spacer = ({size}: Props): JSX.Element => {
  const spacerStyle = {
    padding: size,
  };

  return <View style={spacerStyle} />;
};

export default Spacer;
