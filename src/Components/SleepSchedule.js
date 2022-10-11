import {React, useState} from "react";

//functional component
const SleepSchedule = (props) => {
  const  [foodIntake, setFoodIntake] = useState("2000 calories");
  //var foodIntake = "2000 calories"
  setFoodIntake("3000 calories");
  var i = 250;
  var s = "hi";
  var arr = [2, 3, 4];

  var obj = {
    wakeUpTime: "6h30",
    bedTime: "11:30",
    sleepQuality: 49,
  };

  console.log(props);

  var conditionalGood = <p>Hey, good job!</p>;
  var conditionalBad = <p> Boo, bad job :(( </p>;
  var result = null;
  //   if (obj.sleepQuality > 50) {
  //     result = conditionalGood;
  //   } else {
  //     result = conditionalBad;
  //   }

  obj.sleepQuality > 50
    ? (result = conditionalGood)
    : (result = conditionalBad);

  //print statement in Javascript is
  // console.log()
  console.log(obj.wakeUpTime);
  console.log(obj.bedTime);
  console.log(obj.sleepQuality);

  //conditional rendering

  // && and ||
  return (
    <div>
      <h1> Mary's sleep schedule </h1>
      <input type="text" placeholder="Enter how much you've slept" />
      <p>{obj.wakeUpTime}</p>
      {obj.sleepQuality > 50 && <p>{conditionalGood}</p>}
      {obj.sleepQuality <= 50 && <p>{conditionalBad}</p>}
      {props.children}
    </div>
  );
};

export default SleepSchedule;
