import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../components/UI/Button";
import { COLOR } from "../../../util/color";
import IconButton from "../../../components/UI/IconButton";
import Job from "../../../components/JobScreen/Job";
import { JOB_INFO } from "../../../data/job-data";
import { StatContext } from "../../../store/stat-context";
import { color } from "react-native-elements/dist/helpers";
import { LogContext } from "../../../store/log-context";
import AvailableEnergy from "../../../components/UI/AvailableEnergy";

const JobOpportunity = ({ route }) => {
  const navigation = useNavigation();
  const { jobType } = route.params;
  const statCtx = useContext(StatContext);
  const logCtx = useContext(LogContext);
  const applyJob = (jobId) => {
    
    const currentJob = statCtx.getJobByJobType(jobType);
    const newJob = statCtx.getJobById(jobId);
    
    if (currentJob === '') {
      statCtx.adjustEnergy(statCtx.energy - newJob.cost);
    } else {
      statCtx.adjustEnergy(statCtx.energy + currentJob.cost - newJob.cost);
    }
    statCtx.changeJob(jobId, jobType);
    logCtx.detectAction('You apply for the '+jobType+' job: ', newJob.jobName);

    navigation.goBack();
  };
  const goBack = () => {
    navigation.goBack();
  };
  let content;
  if (jobType === 'Full-time' && statCtx.stage < 3) {
    content = (
      <Text style={styles.warningText}>You need to finish your education first</Text>
    );
  } else if (jobType === 'Part-time' && statCtx.stage === 1) {
    content = (
      <Text style={styles.warningText}>You need to finish your Primary Education first</Text>
    );
  } else {
    content = JOB_INFO.filter((job) => job.jobType === jobType).map((job) => (
      <React.Fragment key={job.jid}>        
        <Job
          icon={job.jobIcon}
          name={job.jobName}
          payrate={job.salary}
          energy={job.cost}
          onPress={() => applyJob(job.jid)}
          isUnavailable={
            jobType=='Freelancer' && 
              !statCtx.skills.includes(job.jobName) ||
            jobType === 'Full-time' && 
              !(statCtx.careerPath === job.jobName || statCtx.canWorkAbroad && statCtx.careerPath+ ' (globally)' === job.jobName )
              
          }
        />
        <View style={styles.space} />
      </React.Fragment>
    ));
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{jobType} Job</Text>
        {statCtx.stage >=3 && jobType=='Full-time' && 
        <View style={styles.careerContainer}>
          <Text style={styles.careerText}>Your career path: </Text>
          <Text style={styles.career}>{statCtx.careerPath}</Text>
        </View>
        }
        <AvailableEnergy/>        
        {jobType === 'Freelancer' && (
            <View style={styles.outerSkillsContainer}>
              <Text style={styles.skillTitle}>A freelancer job only last for 4 weeks</Text>
              <View style={styles.innerSkillsContainer}>
              <Text style={styles.skillTitle}>Learned skills: {statCtx.skills.length == 0?'No skill':''}</Text>

              <View style = {styles.skillContainer}>
                {statCtx.skills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    {skill}
                  </Text>
                ))}
              </View>
              </View>
            </View>
        )}
      </View>
        <View style={styles.body}>
        <ScrollView>
          {content}
        </ScrollView>
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
  container: {
    flex:1,

  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    flex:1,
  },
  outerSkillsContainer:{
    alignItems: "center",
    width:400,
  },
  innerSkillsContainer:{
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'row',
  },
  skillTitle:{
    fontSize:18,
  },
  skill:{
    fontSize:18,
    color:COLOR.gold,
  },
  space: {
    height: 20,
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
  warningText:{
    fontSize:18,
    color:COLOR.red,
    // backgroundColor:COLOR.white,
    marginBottom:20,
  }
};

export default JobOpportunity;
