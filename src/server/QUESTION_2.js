const fs=require("fs")
const csv=require("csvtojson")

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
    
    let data=JSON.stringify(ans,null,2)
    fs.writeFileSync('../public/output/Question2.json',data)
}

QUESTION_2()