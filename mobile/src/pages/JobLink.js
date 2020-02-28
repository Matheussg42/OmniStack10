import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function JobLink({ navigation }){
    const link = navigation.getParam('link');

    return <WebView source={{ uri: `${link}` }} style={{ flex: 1 }} />;
}

export default JobLink;