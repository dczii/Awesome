import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native';

const Input = ({ label, value, onChangeText, placeHolder, secureTextEntry }) => {
	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TextInput 
				autoCorrect={false}
				onChangeText={onChangeText}
				placeholder={placeHolder}
				secureTextEntry={secureTextEntry}
				value={value}
				style={styles.input}
			/>
		</View>
	);
}


const styles = StyleSheet.create({
  	input: {
		color: '#333',
		fontSize: 14,
		paddingBottom: 10,
	},
	label: {
		fontSize: 16,
		fontWeight: '700',
	}
});

export { Input }; 