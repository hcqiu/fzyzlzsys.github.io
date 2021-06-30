var BirthRules = (function(){

    //检测当前回合是不是一定要放上蜂后，若是返回真
    function checkQueen(player , insects , round){
        if (round == Config.queenOnBoardLimit){
            let queenPos = insects[player][0].pos[0]
            if (queenPos){
                return true
            }
        }
        return false
    }

    function ifAccessible(grid){

    }

    return{
        accessibleGrid: function(insect, insects ,boards ,  round){
            let player = insect.player
            let type = insect.type
            
            //若当前回合需要放上蜂后且所选昆虫不是蜂后（！=0），则可移动区域为空
            if (checkQueen(player , insects , round) && type){
                return []
            }

            let accessibleGrids = []
            let allGrids = []
            let empty = true
            boards[0].grids.forEach(function(row , i){
                row.forEach(function(item , j){
                    let nearFriends = false
                    let nearAmy = false
                    item.neighbors.forEach(function(neighbor){
                        neighborInsectID = boards[0].grids[neighbor[0]][neighbor[1]].insects[boards[0].grids[neighbor[0]][neighbor[1]].insects.length-1]
                        if (neighborInsectID){
                            empty = false
                            if (insects[neighborInsectID[0]][neighborInsectID[1]].player == player){
                                nearFriends = true
                            }
                            if (insects[neighborInsectID[0]][neighborInsectID[1]].player  != player){
                                nearAmy = true
                            }
                        }
                        
                    })
                    if (round == 0){
                        allGrids.push([i,j])
                        if (!empty){
                            if (nearAmy){
                                accessibleGrids.push([i,j])
                            }
                            
                        }
                    }

                    if (nearFriends && (!nearAmy) && (item.insects.length == 0)){
                        accessibleGrids.push([i,j])
                    }
                })
            })

            if( (round == 0)&&(accessibleGrids.length == 0)){
                accessibleGrids = allGrids
            }

            return accessibleGrids

            
        }
    }
})()