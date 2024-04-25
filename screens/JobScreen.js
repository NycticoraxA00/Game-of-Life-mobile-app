import {View, Text, } from 'react-native';
import { COLOR } from '../util/color';
import CurrentJob from '../components/JobScreen/CurrentJob';
import Job from '../components/JobScreen/Job';
import Button from '../components/UI/Button';
import {useNavigation} from '@react-navigation/native'
import CurrentJobOptions from './sub-screens/Job/CurrentJobOptions';
import JobOpportunity from './sub-screens/Job/JobOpportunity';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const JobOverview=()=>{
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
                name={'Full-time'}
                onPress={()=>toCurrentJobOptions('Full-time')}/>
            <CurrentJob 
                name={'Part-time'}
                onPress={()=>toCurrentJobOptions('Part-time')}/>
            <Text style={styles.label}>Job Opportunity</Text>
            <Button 
                name={'Part-time Job'}
                onPress={()=>toJobOpportunity('Part-time Job')}/>
            <Button 
                name={'Freelancer'}
                onPress={()=>toJobOpportunity('Freelancer')}/>
            <Button 
                name={'Full-time Job'}
                onPress={()=>toJobOpportunity('Full-time Job')}/>
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
        marginVertical:20,
        fontSize:24,
        borderTopWidth:1,
        borderTopColor:COLOR.darkGrey,
        paddingTop:10,
    }
}
export default JobScreen;