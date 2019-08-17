const calcTip= (total,tipPercent=25)=>{
const tip = (total*tipPercent)/100
return total+tip
}

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        if(a<0 || b<0){
            reject('Numbers should be positive');
        }
      resolve(a+b)
    })
}
module.exports={
    calcTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}