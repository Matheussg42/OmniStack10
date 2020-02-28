import React , { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs, subscribeToUpdateDevs } from '../services/socket';

function Main({ navigation }){
    const [devs, setDevs] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();

            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                });
            }
        }

        loadInitialPosition();
    }, []);

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
        subscribeToUpdateDevs(dev => {
            var mapped = devs.map((elem) =>{
                if(elem._id === dev._id){
                    elem.name = dev.name;
                    elem.bio = dev.bio;
                    elem.techs = dev.techs;
                    elem.location.coordinates[0] = dev.location.coordinates[0];
                    elem.location.coordinates[1] = dev.location.coordinates[1];
                }
                return elem;
            })

            setDevs(mapped);
        });
    }, [devs]);

    function setupWebsocket(){
        disconnect();

        const { latitude, longitude } = currentRegion;
        connect(
            latitude, 
            longitude,
            techs,
        );
    }

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        setDevs(response.data.devs);
        setCompanies(response.data.companies);
        setupWebsocket();
    }

    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

    if(!currentRegion){
        return null;
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion}  style={styles.map}>
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0] }} >
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                        
                        <Callout onPress={() => {navigation.navigate('Profile', { github_username: dev.github_username });}}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
                {companies.map(company => (
                    <Marker key={company._id} coordinate={{ latitude: company.location.coordinates[1], longitude: company.location.coordinates[0] }} >
                        <Image style={styles.CompanyAvatar} source={{ uri: company.avatar_url }} />
                        <Callout onPress={() => {navigation.navigate('Company', { company: company });}}>
                            {Object.keys(company.jobs).length > 0 ? company.jobs.map(job => (
                                <View style={styles.calloutJob} key={job._id}>
                                    <Text style={styles.jobName}>{job.title}</Text>
                                    <Text style={styles.jobTechs}>{Object.keys(job.Techs).length > 0 ? job.Techs.join(', ') : ''}</Text>
                                </View>
                            )) : null}
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar por Techs"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton} >
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    map:{
        flex: 1
    },
    avatar:{
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    CompanyAvatar:{
        width: 54,
        height: 54,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#8E4DFF'
    },
    callout:{
        width:260
    },
    calloutJob:{
        width:200
    },
    devName:{
        fontWeight: 'bold',
        fontSize: 16
    },
    jobName:{
        fontWeight: 'bold',
        marginBottom: 0
    },
    devBio:{
        color: "#666",
        marginTop: 5
    },
    devTechs:{
        marginTop: 5
    },

    jobTechs:{
        marginBottom: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4DFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
});

export default Main;