interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface exerciseValues {
  target: number,
  record: Array<number>
}

const parseArgument = (args:Array<string>):exerciseValues =>{
  if(args.length<4) throw new Error('Not enough arguments')

  let record=[];
  if(!isNaN(Number(process.argv[2]))){
    for(let n=3; n<args.length; n++){
      if(isNaN(Number(process.argv[n]))){
        throw new Error('Provided values are not numbers!')
      }
      record.push(Number(process.argv[n]))
    }
  }else{
    throw new Error('Provided values are not numbers!')
  }

  return {
    record:record,
    target:Number(process.argv[2])
  }
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

try{
  const {target, record} = parseArgument(process.argv)
  console.log(calculateExercises(record, target))
}catch(e){
  console.log('Error, something bad happend, message: ', e.message);
}
