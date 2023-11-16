import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text>SHEIPE</Text>
        <View style={styles.menu_view}>
            <TouchableOpacity>
                <MaterialCommunityIcons name="microsoft-xbox-controller-menu" size={46} color="black" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      backgroundColor: '#fff',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 2,
      width: '99%',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    menu_view:{
        
    }
});