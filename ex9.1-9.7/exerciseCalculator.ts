interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (record:Array<number>, target:number):Result => {
  const numberOfDays = record.length;
  const numberOfTraining = (record.filter(n=>n>0)).length
  const totalHours = record.reduce((sum, item)=>{return sum+item},0)
  const averageTime = totalHours/numberOfDays
  const targetReached = averageTime>=target?true:false
  const rating = (averageTime/target)<0.3 ? 1: (((averageTime/target)<0.7)?2:3)
  let text:string
  switch (rating) {
    case 1:
      text =  "Too bad, exercise more"
      break;
    case 2:
      text = "Not too bad, but could be better"
      break;
    default:
      text =  "Very good, keep it"
      break;
  }

  return {
    periodLength: numberOfDays,
    trainingDays: numberOfTraining,
    success: targetReached,
    rating: rating,
    ratingDescription: text,
    target: target,
    average: averageTime
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))