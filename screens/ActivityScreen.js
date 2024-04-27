import {View, Text, } from 'react-native';
import { COLOR } from '../util/color';
import CurrentActivity from '../components/ActivityScreen/CurrentActivity';
import Button from '../components/UI/Button';
import {useNavigation} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityChoices from './sub-screens/Activity/ActivityChoices';
import AvailableEnergy from '../components/UI/AvailableEnergy';
import CurrentActOptions from './sub-screens/Activity/CurrentActOptions';

const Stack = createNativeStackNavigator();
const ActivityOverview=()=>{
    const navigation = useNavigation();
    const toCurrentActOptions =(actType)=>{
        navigation.navigate('Current Act Options',{actType})
    }
    const toActivityChoices =(actType)=>{
        navigation.navigate('Activity Choices',{actType})
    }
    return (
        <View style = {styles.container}>
            <CurrentActivity 
                actType={'Socialize'}
                onPress={()=>toCurrentActOptions('Socialize')}/>
            <CurrentActivity 
                actType={'Exercise'}
                onPress={()=>toCurrentActOptions('Exercise')}/>
            <CurrentActivity 
                actType={'Skill'}
                onPress={()=>toCurrentActOptions('Skill')}/>
            <AvailableEnergy/>
            <Text style={styles.label}>Activity Choices</Text>
            <View style={styles.activityChoices}>
                <Button 
                    name={'Socialize'}
                    onPress={()=>toActivityChoices('Socialize')}/>
                <Button 
                    name={'Exercise'}
                    onPress={()=>toActivityChoices('Exercise')}/>
                <Button 
                    name={'Learn new skill'}
                    onPress={()=>toActivityChoices('Skill')}/>
            </View>
        </View>
    )
}
const ActivityScreen = ()=>{
    return (
        <View style = {styles.container}>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Activity Overview"
                    component={ActivityOverview}
                    options={{
                        headerShown:false
                    }}/>
                <Stack.Screen
                    name="Current Act Options"
                    component={CurrentActOptions}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name="Activity Choices"
                    component={ActivityChoices}
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
    activityChoices:{
        marginHorizontal:'5%',
    },
}
export default ActivityScreen;