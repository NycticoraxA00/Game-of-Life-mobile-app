class Job {
    constructor(
      jid,
      jobName,
      jobIcon,
      jobType,
      cost,
      salary,
      isWorkGlobally
    ) {
      this.jid = jid;
      this.jobName = jobName;
      this.jobIcon = jobIcon;
      this.jobType = jobType;
      this.cost = cost;
      this.salary = salary;
      this.isWorkGlobally = isWorkGlobally;
    }
  }
  
  export default Job;
  