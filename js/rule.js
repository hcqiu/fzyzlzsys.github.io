// import {modScale , mod6} from "./utils.js"
var modScale = Utils.modScale
// import { scale as scaleConfig , insectTypes , insects as insectConfig} from "./config.json"
var scaleConfig = Config.scale
var insectTypes = Config.insectTypes
var insectConfig = Config.insects
// import {board} from "./board.js"

// import {insect} from "./insect"
var insect = Insect.insect()
var Rules =(function(){
    let board = Board.board
    let insect = Insect.insect
    
    function updateInsect( insectPosition , boards , insectID){
        //boards =    new board("main", scale )
        if (insectPosition[0] != 0){
            boards[insectPosition[0]].grids[insectPosition[1]].insects[insectPosition[2]]= insectID
        }
        else{
            boards[insectPosition[0]].grids[insectPosition[1][0]][insectPosition[1][1]].insects[insectPosition[2]] = insectID
        }
        return boards
    }

    function accessibleGrid(insectID, insects , boards, round){
        let insect = insects[insectID[0]][insectID[1]]
        if (insect.pos[0] != 0){
            return BirthRules.accessibleGrid(insect, insects , boards ,round)
        }
        else{
            let pos = insect.pos
            boards[0].grids[pos[1][0]][pos[1][1]].insects.length = boards[0].grids[pos[1][0]][pos[1][1]].insects.length-1
            let access =  MoveRules.accessibleGrid(insect,   insects , boards, round)
            boards[0].grids[pos[1][0]][pos[1][1]].insects.push(insectID)
            return access
        }
    }
    return {
        createBoards: function(playerNumber, scale){
            boards = new Array()
            boards[0] = new board("main", scale || scaleConfig)
            for( let i = 1; i < playerNumber +1 ; i ++){
                boards[i] = new board("player" , insectTypes)
            }
            return boards
        },
        createInsects : function (playerNumber){
            playersInsects = new Array(playerNumber)
            for (let i = 0; i < playerNumber ; i ++){
                playerInsects = []
                insectConfig.forEach(function(item,index){
                    for (let j = 0 ; j < item.number ; j ++){
                        playerInsects.push(new insect(i, item.id , [i+1 , index , j]))
                    }
                    
                })
                playersInsects[i] = playerInsects
            }
            return playersInsects
        },

        selectGrid: function(pos){
            if (insectPosition[1].length = 1){
                return boards[pos[0]].grids[pos[1]].insects
            }
            else{
                return boards[pos[0]].grids[pos[1][0]][pos[1][1]].insects
            }
        },

        selectInsect : function (insectID, insects , boards, round){
            return accessibleGrid(insectID, insects , boards, round)
        },

        moveInsect : function(insectID, destination, insects , boards , round){
            let legitimate =  accessibleGrid(insectID, insects , boards, round).find(legitimate => legitimate[0] === destination[0]  && legitimate[1] === destination[1])
            if (!legitimate){
                return insects
            }
            
            MoveRules.move(insectID, destination, insects , boards)
            round = round + 1
            //let insect = insects[insectID[0]][insectID[1]]

        },

        updateInsect : function( insectPosition , boards , insectID){
            if (insectPosition[1].length = 1){
                boards[insectPosition[0]].grids[insectPosition[1]].insects[insectPosition[2]] = insectID
            }
            else{
                boards[insectPosition[0]].grids[insectPosition[1][0]][insectPosition[1][1]].insects[insectPosition[2]] = insectID
            }
            return boards
        },

        

        updateInsects: function ( insects , boards, playerNumber = 2){
            for (let i = 0 ; i < playerNumber ; i++){
                insects[i].forEach(function(item , index){
                    //boards = updateInsect( item.pos , boards , [i , index])
                    updateInsect( item.pos , boards , [i , index])
                })
                
            }
            //return boards
        },

    }
})()




//export {createBoards , createInsects}