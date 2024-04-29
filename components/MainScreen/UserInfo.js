import {View, Text, Image, Dimensions} from 'react-native';
import { COLOR } from '../../util/color';
import avatarImage from '../../assets/IMG_20230624_235907_413.jpg';
import { useContext } from 'react';
import { StatContext } from '../../store/stat-context';
const UserInfo = ()=>{
    const statCtx = useContext(StatContext);
    const totalWeek = statCtx.week;
    const age = Math.floor(totalWeek/48);
    const energy = statCtx.energy;
    const health = statCtx.health;
    const money = statCtx.money;
    const charm = statCtx.charm;
    return (
        <View style = {styles.container}>
            <Text style={styles.nameGender}>William Burner - Male</Text>
            <View style={styles.infoContainer}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.avatar}
                        source={avatarImage} alt='User Avatar'
                    />
                </View>
                <View style={styles.statContainer}>
                    <Text style={[styles.age, styles.statText]}>Age: {5+age}</Text>
                    <Text style={[styles.energy, styles.statText]}>Energy: {energy}</Text>
                    <Text style={[styles.health, styles.statText]}>Health: {health}</Text>
                    <Text style={[styles.money, styles.statText]}>Money: {money}</Text>
                    <Text style={[styles.charm, styles.statText]}>Charm: {charm}</Text>
                </View>
            </View>
        </View>

    )
}
const styles = {
    container:{
        height: '22%',
        alignItems:'center',
        marginBottom:15,
    },
    nameGender:{
        fontSize:24,
        margin:10,
    },
    infoContainer:{
        flexDirection:'row',
        alignItems:'center',
        width:'80%',
    },
    avatar:{
        width: 90,
        height: 90,
        borderRadius: 100,

    }, 
    statContainer:{
        marginLeft:20,
        width:'70%'
    },
    statText:{
        fontWeight:500,
        backgroundColor:COLOR.white,
        borderRadius:10,
        marginTop:3,
        paddingLeft:15,
    }
}
export default UserInfo;