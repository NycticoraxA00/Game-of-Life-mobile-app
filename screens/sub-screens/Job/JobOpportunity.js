import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../components/UI/Button";
import { COLOR } from "../../../util/color";
import IconButton from "../../../components/UI/IconButton";
import Job from "../../../components/JobScreen/Job";
import { JOB_INFO } from "../../../data/job-data";
import { StatContext } from "../../../store/stat-context";
import { color } from "react-native-elements/dist/helpers";

const JobOpportunity = ({ route }) => {
  const navigation = useNavigation();
  const { jobType } = route.params;
  const statCtx = useContext(StatContext);
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{jobType}</Text>
        {jobType=='Full-time Job' && 
        <View style={styles.careerContainer}>
          <Text style={styles.careerText}>Your career path: </Text>
          <Text style={styles.career}>{statCtx.careerPath}</Text>
        </View>

          
        }
        <View style={styles.availableEnergyContainer}>
          <Text style={styles.availableEnergy}>Available Weekly Energy:</Text>
          <Text style={styles.availableEnergyAmount}>100</Text>
        </View>
        
      </View>
      <View style={styles.body}>
        {JOB_INFO.filter((job) => job.jobType ===jobType).map((job) => (
          <React.Fragment key={job.jid}>
            <Job
              icon={job.jobIcon}
              name={job.jobName}
              payrate={job.salary}
              energy={job.cost}
            />
            <View style={styles.space} />
          </React.Fragment>
        ))}
      </View>
      <View style={styles.footer}>
        <IconButton
          icon="arrow-circle-left"
          size={50}
          color={COLOR.darkGrey}
          onPress={goBack}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {},
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  space: {
    height: 30,
  },
  name: {
    marginTop: 80,
    fontSize: 24,
    borderWidth: 2,
    borderColor: COLOR.darkGrey,
    borderRadius: 25,
    minWidth: "80%",
    textAlign: "center",
    minHeight: 50,
    padding: 10,
    marginBottom: 20,
  },
  careerContainer:{
    flexDirection:'row',
    
  },
  careerText:{
    fontSize:20,
  },
  career:{
    fontSize:20,
    marginBottom:10,
    color:COLOR.gold,
  },
  availableEnergyContainer: {
    // backgroundColor:COLOR.white,
    borderRadius: 20,
    minWidth: "60%",
    flexDirection: "row",
  },
  availableEnergy: {
    minWidth: "52%",
  },
  availableEnergyAmount: {
    textAlign: "center",
    color: COLOR.blue,
    fontWeight: "bold",
    fontSize: 15,
  },
  subText: {
    marginVertical: 20,
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 18,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
  },
};

export default JobOpportunity;
