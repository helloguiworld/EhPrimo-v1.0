import React from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

export default function safeAreaView (props) {
    const safeArea = useSafeArea();
    const safeAreaStyle = {
        paddingTop: safeArea.top,
        paddingRight: safeArea.right,
        paddingBottom: safeArea.bottom,
        paddingLeft: safeArea.left,
    };

    return (
        <View style={[props.style, safeAreaStyle]}>
            {props.children}
        </View>
    );
}
