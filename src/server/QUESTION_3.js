const fs=require("fs")
const csv=require("csvtojson")

async function QUESTION_3(){
    const deliveries=await csv().fromFile("../data/deliveries.csv")
    const matches=await csv().fromFile("../data/matches.csv")

    let obj={}
    let maps={}
    let ans={}

    for(let i=0;i<matches.length;i++){
        maps[matches[i].id]=matches[i].season
    }

    for(let i=0;i<deliveries.length;i++){
        let match_id=maps[deliveries[i].match_id]
        let batsman=deliveries[i].batsman
        let runs=parseInt(deliveries[i].total_runs)
        let balls=parseInt(deliveries[i].ball)
        
        if(obj[match_id]===undefined){
            obj[match_id]={}
            obj[match_id][batsman]={}
            obj[match_id][batsman].runs=runs
            obj[match_id][batsman].balls=balls
            obj[match_id][batsman].strike_rate=parseFloat(runs/balls)

        }else if(obj[match_id][batsman]===undefined){
            obj[match_id][batsman]={}
            obj[match_id][batsman].runs=runs
            obj[match_id][batsman].balls=balls
            obj[match_id][batsman].strike_rate=parseFloat(runs/balls)
        }else{
            obj[match_id][batsman].runs+=runs
            obj[match_id][batsman].balls+=balls
            obj[match_id][batsman].strike_rate=parseFloat(runs/balls)
        }

        if(ans[match_id]===undefined){
            ans[match_id]={}
        }
        
        ans[match_id][batsman]=(obj[match_id][batsman].strike_rate*100).toFixed(1)

    }
    // console.log(ans)

    let data=JSON.stringify(ans,null,2)
    fs.writeFileSync('../public/output/Question3.json',data)
}

QUESTION_3()