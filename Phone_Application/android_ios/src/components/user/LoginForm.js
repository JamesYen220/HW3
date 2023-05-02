import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import Checkbox from 'expo-checkbox';
import * as userService from '../../services/userService';
import {message} from "antd";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: true,
        };
    }

    onFinish = () => {
        console.log("Received values of form: ", this.state);
        userService.login(this.state, this.props.navigation); // Pass navigation prop here
        message.success("修改成功");
    };

    render() {
        const {navigation} = this.props;

        return (
            <View style={styles.loginForm}>
                <View style={styles.formItem}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        placeholder="Username"
                    />
                </View>
                <View style={styles.formItem}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        placeholder="Password"
                        secureTextEntry
                    />
                </View>
                <View style={styles.formItem}>
                    <Checkbox
                        value={this.state.remember}
                        onValueChange={(remember) => this.setState({remember})}
                    />
                    <Text>Remember me</Text>
                    <TouchableOpacity
                        onPress={() => {
                            // Replace this URL with the appropriate password reset link
                            alert('Navigate to Forgot Password URL');
                        }}>
                        <Text style={styles.forgotPassword}>Forgot password</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formItem}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.onFinish}>
                        <Text style={styles.loginButtonText}>Log in</Text>
                    </TouchableOpacity>
                    <Text>Or</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Register');
                        }}>
                        <Text style={styles.registerLink}>register now!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LoginForm;

const styles = StyleSheet.create({
    loginForm: {
        maxWidth: 300,
    },
    formItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    forgotPassword: {
        marginLeft: 10,
        color: '#363636',
    },
    loginButton: {
        backgroundColor: '#363636',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    registerLink: {
        color: '#363636',
        marginLeft: 5,
        textDecorationLine: 'underline',
    },
});

