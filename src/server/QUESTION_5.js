const fs=require('fs')
const csv=require("csvtojson")

async function QUESTION_5(){
    const deliveries=await csv().fromFile("../data/deliveries.csv")
    let min_runs=10
    let ultimate_bowler=""

    for(let i=0;i<deliveries.length;i++){
        if(deliveries[i].is_super_over!==0){
            let bowler=deliveries[i].bowler
            let runs=deliveries[i].total_runs
            if(min_runs>runs){
                min_runs=runs
                ultimate_bowler=bowler
            }
        }
    }
    // console.log(ultimate_bowler)
    let data=JSON.stringify(ultimate_bowler,null,2)
    fs.writeFileSync('../public/output/Question5.json',data)
}

QUESTION_5()