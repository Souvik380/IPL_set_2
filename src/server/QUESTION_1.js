const csv=require("csvtojson")
const fs=require("fs")

async function QUESTION_1(){
    const files1=await csv().fromFile("../data/matches.csv")
    const files2=await csv().fromFile("../data/deliveries.csv")

    let obj={}

    for(let i=0;i<files1.length;i++){
        let toss_winner=files1[i].toss_winner
        let winner=files1[i].winner

        function func(team){
            if(toss_winner===team && winner===team){
                if(obj[team]===undefined){
                    obj[team]=1
                }else{
                    obj[team]+=1
                }
            }
        }
        
        func(files1[i].team1)
        func(files1[i].team2)
    }

    // console.log(obj)

    let data=JSON.stringify(obj,null,2)
    fs.writeFileSync('../public/output/Question1.json',data)
}

QUESTION_1()