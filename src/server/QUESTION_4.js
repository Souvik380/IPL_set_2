const fs=require('fs')
const csv=require("csvtojson")


async function QUESTION_4(){
    const deliveries=await csv().fromFile("../data/deliveries.csv")
    let count=0
    let obj={}

    for(let i=0;i<deliveries.length;i++){
        if(deliveries[i].dismissal_kind!==""){
            let bowler=deliveries[i].bowler
            let batsman=deliveries[i].batsman
            let str=batsman+"-"+bowler

            if(obj[str]===undefined){
                obj[str]=1
            }else{
                obj[str]+=1
                count=Math.max(count,obj[str])
            }
        }
    }

    // console.log(count)

    let data=JSON.stringify(count,null,2)
    fs.writeFileSync('../public/output/Question4.json',data)
}

QUESTION_4()