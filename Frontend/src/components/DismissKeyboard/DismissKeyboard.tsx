import React, { ReactNode } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type Props = {
    children: ReactNode;
};

const DismissKeyboard = ({ children }: Props) => (
    <TouchableWithoutFeedback
        onPress={() => {
            Keyboard.dismiss();
        }}>
        {children}
    </TouchableWithoutFeedback>
);

export default DismissKeyboard;
