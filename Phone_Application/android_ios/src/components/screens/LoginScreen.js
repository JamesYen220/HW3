import React from 'react';
import LoginForm from '../user/LoginForm';
import { View, Text, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';

class LoginView extends React.Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <ImageBackground
                source={require('../../assets/pictures/background.png')}
                style={{flex: 1}}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            padding: 40,
                            borderRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {width: -15, height: 15},
                            shadowOpacity: 0.4,
                            shadowRadius: 15,
                        }}>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Log in</Text>
                        <LoginForm navigation={navigation} />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <LoginView {...props} navigation={navigation} />;
}
