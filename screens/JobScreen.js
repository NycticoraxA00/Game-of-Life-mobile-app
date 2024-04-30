import {View, Text, } from 'react-native';
import { COLOR } from '../util/color';
import CurrentJob from '../components/JobScreen/CurrentJob';
import Job from '../components/JobScreen/Job';
import Button from '../components/UI/Button';
import {useNavigation} from '@react-navigation/native'
import CurrentJobOptions from './sub-screens/Job/CurrentJobOptions';
import JobOpportunity from './sub-screens/Job/JobOpportunity';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { StatContext } from '../store/stat-context';
import AvailableEnergy from '../components/UI/AvailableEnergy';
import { color } from 'react-native-elements/dist/helpers';


const Stack = createNativeStackNavigator();
const JobOverview=()=>{
    const statCtx = useContext(StatContext);
    const navigation = useNavigation();
    const toCurrentJobOptions =(jobType)=>{
        navigation.navigate('Current Job Options',{jobType})
    }
    const toJobOpportunity =(jobType)=>{
        navigation.navigate('Job Opportunity',{jobType})
    }
    return (
        <View style = {styles.container}>
            <CurrentJob 
                jobType={'Part-time'}
                onPress={()=>toCurrentJobOptions('Part-time')}/>
            <CurrentJob 
                jobType={'Full-time'}
                onPress={()=>toCurrentJobOptions('Full-time')}/>
            <CurrentJob 
                jobType={'Freelancer'}
                onPress={()=>toCurrentJobOptions('Freelancer')}/>
            <AvailableEnergy/>
            
            {statCtx.stage<4?(
                <>
                <Text style={styles.label}>Job Opportunity</Text>
                <View style={styles.jobOpportunity}>
                    <Button 
                        name={'Part-time Job'}
                        onPress={()=>toJobOpportunity('Part-time')}/>
                    <Button 
                        name={'Full-time Job'}
                        onPress={()=>toJobOpportunity('Full-time')}/>
                    <Button 
                        name={'Freelancer'}
                        onPress={()=>toJobOpportunity('Freelancer')}/>
                </View>
                </>
            ):(
                <View style={styles.retired}>
                <Text style={styles.retiredText}>You have retired, enjoy your life now</Text>
            </View>
            )}            
        </View>
    )
}
const JobScreen = ()=>{
    return (
        <View style = {styles.container}>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Job Overview"
                    component={JobOverview}
                    options={{
                        headerShown:false
                    }}/>
                <Stack.Screen
                    name="Current Job Options"
                    component={CurrentJobOptions}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name="Job Opportunity"
                    component={JobOpportunity}
                    options={{headerShown:false}}
                />
            </Stack.Navigator>
            
        </View>

    )
}
const styles = {
    container:{
        flex:1,
        backgroundColor:COLOR.grey,
    },
    label:{
        textAlign:'center',
        marginHorizontal:40,
        fontSize:24,
        borderTopWidth:1,
        borderTopColor:COLOR.darkGrey,
        paddingTop:10,
    },
    jobOpportunity:{
        marginHorizontal:'5%',
    },
    retired:{
        justifyContents:'center',
        alignItems:'center'
    },
    retiredText:{
        fontSize:20,
        color:COLOR.orange,
        margin:12,
    }
}
export default JobScreen;