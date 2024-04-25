import { View, Text, ScrollView } from "react-native";
import { COLOR } from "../util/color";
import EducationInfo from "../components/StudyScreen/EducationInfo";
import Subject from "../components/StudyScreen/SubjectStat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SubjectManager from "./sub-screens/Education/SubjectManager";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StatContext } from "../store/stat-context";
import { SubjectContext } from "../store/subject-context";

const Stack = createNativeStackNavigator();
const EducationOverview = () => {
  const navigation = useNavigation();
  const toSubjectManager = (subject, subjectEnergy) => {
    navigation.navigate("Subject Manager", { subject, subjectEnergy });
  };
  const statCtx = useContext(StatContext);
  const currentStage = statCtx.stage;
  const subjectCtx = useContext(SubjectContext);
  let isActive;
  if (currentStage >= 3){
    isActive = false;
  } else {
    isActive = true;
  }
  return (
    <>
      <EducationInfo />
      {currentStage >= 3 ? (
        <Text style={styles.text}>You have finished your education</Text>
      ) : (
        <>
          <View style={styles.availableEnergyContainer}>
            <Text style={styles.availableEnergy}>Available Weekly Energy:</Text>
            <Text style={styles.availableEnergyAmount}>{statCtx.energy}</Text>
          </View>
          <Text style={styles.text}>Current Life Stage Education stats</Text>
        </>
      )}
      <ScrollView style={styles.subjectContainer}>
        <Subject
          name={"Math"}
          energy={"math"}
          credits={statCtx.getSubjectCredits("math")}
          isActive={isActive}
          onPress={() => toSubjectManager("Math", "math")}
        />
        <Subject
          name={"Science"}
          energy={"science"}
          credits={statCtx.getSubjectCredits("science")}
          isActive={isActive}
          onPress={() => toSubjectManager("Science", "science")}
        />
        <Subject
          name={"Social"}
          energy={"social"}
          credits={statCtx.getSubjectCredits("social")}
          isActive={isActive}
          onPress={() => toSubjectManager("Social Study", "social")}
        />
        <Subject
          name={"Language"}
          energy={"language"}
          credits={statCtx.getSubjectCredits("language")}
          isActive={isActive}
          onPress={() => toSubjectManager("Language", "language")}
        />
        <Subject
          name={"Art"}
          energy={"art"}
          credits={statCtx.getSubjectCredits("art")}
          isActive={isActive}
          onPress={() => toSubjectManager("Art", "art")}
        />
      </ScrollView>
    </>
  );
};
const EducationScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Education"
          component={EducationOverview}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Subject Manager"
          component={SubjectManager}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: COLOR.grey,
  },
  availableEnergyContainer: {
    marginHorizontal: "20%",
    marginTop: 20,
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
  text: {
    textAlign: "center",
    marginHorizontal: 30,
    marginVertical: 20,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.darkGrey,
    paddingBottom: 20,
  },
  subjectContainer: {
    marginHorizontal: 30,
  },
};
export default EducationScreen;
