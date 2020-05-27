import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function DismissKeybord ({children}) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}
