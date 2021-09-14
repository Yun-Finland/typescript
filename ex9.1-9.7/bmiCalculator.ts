const calculateBmi = (height:number, weight:number):string => {
 
  const index = weight*100*100 / (height*height)
  if(index<16.0){
    return "Underweight(Severe thinness)"
  }else if(index <17){
    return "Underweight(Moderate thinness"
  }else if(index<18.5){
    return "Underweight(Mild thinness)"
  }else if(index<25.0){
    return "Normal (healthy weight)"
  }else if(index<30.0){
    return "Overweight(Pre-obese)"
  }else if(index<35.0){
    return "Obese (Class I)"
  }else if(index<40){
    return "Obese (Class II)"
  }else{
    return "Obese (Class III)"
  }
}

console.log(calculateBmi(180,74))