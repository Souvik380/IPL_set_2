const csv=require("csvtojson")

// Find the number of times each team won the toss and also won the match
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

    console.log(obj)
}

// Find a player who has won the highest number of Player of the Match awards for each season
async function QUESTION_2(){
    let obj={}
    let ans={}

    function helper(year,player){
        if(obj[year]===undefined){
            obj[year]={}
            obj[year][player]=1
        }else{
            if(obj[year][player]===undefined){
                obj[year][player]=1
            }else{
                obj[year][player]+=1
            }
            
        }
    }
    

    function calc(obj){
        let max=-1
        let player

        for(e in obj){
            if(max<obj[e]){
                max=obj[e]
                player=e
            }
        }

        return player
    }

    function man_of_the_match(obj){
        for(year in obj){
            let player=calc(obj[year])
            ans[year]=player
        }
    }


    const matches=await csv().fromFile("../data/matches.csv")
    for(let i=0;i<matches.length;i++){
        helper(matches[i].season,matches[i].player_of_match)
    }

    man_of_the_match(obj)
    // console.log(ans)
    console.log(obj)
}

QUESTION_2()

//Find the strike rate of a batsman for each season
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
        
        ans[match_id][batsman]=obj[match_id][batsman].strike_rate

    }
    console.log(ans)
    
}

// Find the highest number of times one player has been dismissed by another player
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

    console.log(count)
}

//Find the bowler with the best economy in super overs
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
    console.log(ultimate_bowler)
}

module.exports={
    QUESTION_1,
    QUESTION_2,
    QUESTION_3,
    QUESTION_4,
    QUESTION_5
}



