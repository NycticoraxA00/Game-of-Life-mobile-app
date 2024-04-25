import {View, Text, } from 'react-native';
import { COLOR } from '../util/color';
import CurrentActivity from '../components/ActivityScreen/CurrentActivity';
import Button from '../components/UI/Button';
import {useNavigation} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityChoices from './sub-screens/Activity/ActivityChoices';

const Stack = createNativeStackNavigator();
const ActivityOverview=()=>{
    const navigation = useNavigation();
    const toActivityChoices =(header)=>{
        navigation.navigate('Activity Choices',{header})
    }
    return (
        <>
            <CurrentActivity name={"Socialize"}/>
            <CurrentActivity name={"Exercise"}/>
            <CurrentActivity name={"Learning Skill"}/>
            <Text style={styles.label}>Activity Choices</Text>
            <Button 
                name={'Socialize'}
                onPress={()=>toActivityChoices('Socialize')}/>
            <Button 
                name={'Excercise'}
                onPress={()=>toActivityChoices('Excercise')}/>
            <Button 
                name={'Learn new skill'}
                onPress={()=>toActivityChoices('Learn new skill')}/>
        </>
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
        marginVertical:20,
        fontSize:24,
        borderTopWidth:1,
        borderTopColor:COLOR.darkGrey,
        paddingTop:10,
    }
}
export default ActivityScreen;