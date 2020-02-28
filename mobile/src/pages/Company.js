import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function JobLink({ navigation }){
    const company = navigation.getParam('company');


    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>

          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: company.avatar_url}}/>
          <View style={styles.body}>
              <View style={styles.bodyContent}>
                  <Text style={styles.name}>{company.name}</Text>
                  <Text style={styles.description}>{company.desc}</Text>

                  <View style={styles.containerJobs}>
                    {company.jobs.map(job => (
                      <View key={job._id} style={styles.buttonContainer}>
                        <Text style={styles.jobTitle} onPress={() => navigation.navigate('JobLink', { link: job.Link })}>{job.title}{'\n'}{'\n'}</Text>
                        <Text style={styles.jobDesc} onPress={() => navigation.navigate('JobLink', { link: job.Link })}>{job.Desc}{'\n'}{'\n'}</Text>  
                        <Text style={styles.jobTechs} onPress={() => navigation.navigate('JobLink', { link: job.Link })}>{Object.keys(job.Techs).length > 0 ? job.Techs.join(', ') : ''}{'\n'}{'\n'}</Text>
                        <Text style={styles.jobLink} onPress={() => navigation.navigate('JobLink', { link: job.Link })}>{job.Link}</Text>  
                      </View>
                    ))}
                  </View>
              </View>
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    header:{
      backgroundColor: "#7D40E7",
      height:100,
    },
    content:{
    },
    avatar: {
      width: 110,
      height: 110,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:40
    },
    name:{
      fontSize:15,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:20,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600",
      alignItems: 'center',
    },
    info:{
      fontSize:16,
      color: "#7D40E7",
      marginTop:10,
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    containerJobs:{
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'column'
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop:20,
      width:300,
      borderRadius:4,
      flex: 1,
    },
    jobTitle:{
      backgroundColor: "#7D40E7",
      alignSelf: 'stretch',
      color: "#FFF",
      textAlign: 'center',
      justifyContent: 'center', 
      marginBottom: 0,
      fontSize:18,
      height:35,
      fontWeight:'600',
      paddingTop:5,
      
    },
    jobDesc:{
      backgroundColor: "#e1e1e1",
      alignSelf: 'stretch',
      color: "#7D40E7",
      textAlign: 'center',
      justifyContent: 'center', 
      marginBottom: 0,
      height:50,
      paddingTop:5,
    },
    jobTechs:{
      backgroundColor: "#e1e1e1",
      alignSelf: 'stretch',
      color: "#7D40E7",
      textAlign: 'center',
      justifyContent: 'center', 
      marginBottom: 0,
      height:30,
      paddingTop:5,
    },
    jobLink:{
      backgroundColor: "#e1e1e1",
      alignSelf: 'stretch',
      color: "#7D40E7",
      textAlign: 'center',
      justifyContent: 'center', 
      marginBottom: 0,
      height:30,
      paddingTop:5,
    },
  });
   

export default JobLink;