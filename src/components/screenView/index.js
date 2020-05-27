import React from 'react';
import { StyleSheet, KeyboardAvoidingView, StatusBar, Platform } from 'react-native';
import SafeAreaView from '../../components/safeAreaView';
import DismissKeybord from '../../components/dismissKeybord';

function screenView(props) {
    return (
        <SafeAreaView
            style={[ styles.safeArea, { backgroundColor: props.safeAreaColor } ]}>
            <StatusBar barStyle={props.barStyle}/>
            <DismissKeybord>
                <KeyboardAvoidingView style={[ styles.container, props.style ]} 
                behavior={Platform.OS === 'ios' ? 'padding':''}>
                    {props.children}
                </KeyboardAvoidingView>
            </DismissKeybord>
        </SafeAreaView>
    );
}

export default screenView;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
});
