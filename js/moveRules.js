var mod6 = Utils.mod6
var gridEmpty =  Utils.gridEmpty
var MoveRules = (function(){
    function checkQueen(player , insects , run){
        if (run == Config.queenOnBoardLimit){
            let queenPos = insects[player][0].pos[0]
            if (queenPos){
                return true
            }
        }
        return false
    }

    

    function findOpenGrids(gridID , boards){
        let accessibleGrids = []
        grid = boards[0].grids[gridID[0]][gridID[1]]
        grid.neighbors.forEach(function(candidate, index){
            if(gridEmpty(candidate,boards)){
                if ( (gridEmpty( grid.neighbors[mod6(index - 1)],boards ) && (!gridEmpty ( grid.neighbors[mod6(index + 1)] ,boards) )) || 
                     (!gridEmpty( grid.neighbors[mod6(index - 1)],boards ) && (gridEmpty ( grid.neighbors[mod6(index + 1)] ,boards) )) ){
                    accessibleGrids.push(candidate)
                }
            }
            
        })
        return accessibleGrids
    }

    function findNeighbors(gridID , boards){
        let accessibleGrids = []
        grid = boards[0].grids[gridID[0]][gridID[1]]
        grid.neighbors.forEach(function(candidate, index){
            if(!gridEmpty(candidate,boards)){
                accessibleGrids.push(candidate)
            }
            
        })
        return accessibleGrids
    }

    function recursion(newCandidates , fn , boards, depthLimit = Config.scale*Config.scale ){
        let accessibleGrids = []
        let depth = 0
        while ((newCandidates.length != 0)&& (depth < depthLimit)){
            accessibleGrids = accessibleGrids.concat(newCandidates)
            let cache = []
            newCandidates.forEach(function(item){
                let set = new Set(cache.concat(fn(item , boards))); // 
                cache = Array.from(set); // 再把set转变成array
            })
            newCandidates = Utils.arrayMinus(cache,  accessibleGrids) 
            depth = depth + 1
        }
        return accessibleGrids
    }

    function recursionNew(newCandidates , fn , boards, depthLimit =3 ){
        let accessibleGrids = []
        let depth = 0
        while ((newCandidates.length != 0)&& (depth < depthLimit)){
            accessibleGrids = accessibleGrids.concat(newCandidates)
            let cache = []
            newCandidates.forEach(function(item){
                let set = new Set(cache.concat(fn(item , boards))); // 
                cache = Array.from(set); // 再把set转变成array
            })
            newCandidates = Utils.arrayMinus(cache,  accessibleGrids) 
            depth = depth + 1
        }
        return newCandidates
    }

    function isConnected(gridID, boards){
        let connected = true
        let components = []
        grid = boards[0].grids[gridID[0]][gridID[1]]
        grid.neighbors.forEach(function(neighbor, index){
            if(!gridEmpty(neighbor,boards)){
                components.push(recursion([neighbor] , findNeighbors , boards))
            }
            
        })
        components.forEach(function(i){
            components.forEach(function(j){
                if (Utils.arrayMinus(i,j).length>0){
                    connected = false
                }
            })
        })
        return connected
    }

    function findFirstBlankOnALine( index , gridID, initialGridID){
        grid = boards[0].grids[gridID[0]][gridID[1]]
        if (gridEmpty(grid.neighbors[index],boards)){
            return grid.neighbors[index]
        }
        else if ((grid.neighbors[index][0] == initialGridID[0])&& (grid.neighbors[index][1] == initialGridID[1])){
            return 
            
        }
        else{
            return findFirstBlankOnALine(index , grid.neighbors[index] , initialGridID)
        }
    }
    // function findAllGrids(grids , boards){
    //     let accessibleGrids = []
    //     grids.forEach(function(item){
    //         let set = new Set(accessibleGrids.concat(findOpenGrids(item , boards))); // 
    //         accessibleGrids = Array.from(set); // 再把set转变成array
    //     })
    //     return accessibleGrids

    // }

    return{
        accessibleGrid: function(insect, insects ,boards ,  run){
            let player = insect.player
            let type = insect.type
            let pos = insect.pos
            
            //若当前回合还没放上蜂后且所选昆虫不是蜂后（type ！=0），则可移动区域为空
            if (checkQueen(player , insects ,  Config.queenOnBoardLimit) && type){
                return []
            }
            if (! isConnected(pos[1] , boards)){
                return []
            }

            var accessibleGrids = []
            let allGrids = []
            let empty = true

            let grid = boards[0].grids[pos[1][0]][pos[1][1]]
            var newCandidates = [pos[1]]
                    
            // accessibleGrids = Utils.arrayMinus(recursionNew(newCandidates , findOpenGrids, boards) , [pos[1]])
                
            switch(type){
                case 0:
                    accessibleGrids = findOpenGrids(pos[1] , boards)
                    // grid.neighbors.forEach(function(candidate, index){
                    //     if(gridEmpty(candidate,boards)){
                    //         if ( gridEmpty( mod6(index - 1),boards ) || gridEmpty ( mod6(index + 1) ,boards) ){
                    //             accessibleGrids.push(candidate)
                    //         }
                    //     }
                        
                    // })
                    break

                case 1:
                    //let newCandidates = [pos[1]]
                    // while (newCandidates.length != 0){
                    //     accessibleGrids = accessibleGrids.concat(newCandidates)
                    //     newCandidates = Utils.arrayMinus(findAllGrids(newCandidates , boards),  accessibleGrids) 
                    // }
                    accessibleGrids = Utils.arrayMinus(recursion(newCandidates , findOpenGrids, boards) , [pos[1]])
                    break

                case 2:
                    grid.neighbors.forEach(function(neighbor , index){
                        if (!gridEmpty(neighbor,boards)){
                            let cache = findFirstBlankOnALine(index , neighbor , pos[0])
                            if (cache){
                                accessibleGrids.push(cache)
                            }
                        }
                    })
                    accessibleGrids = Utils.arrayMinus(accessibleGrids , [pos[1]])
                    break

                case 3:
                    //let newCandidates = [pos[1]]
                    
                    accessibleGrids = Utils.arrayMinus(recursionNew(newCandidates , findOpenGrids, boards) , [pos[1]])
                    break



            }


                                // boards[0].grids.forEach(function(row , i){
                                //     row.forEach(function(item , j){
                                //         let nearFriends = false
                                //         let nearAmy = false
                                //         item.neighbors.forEach(function(candidate, index){
                                //             neighborInsectID = boards[0].grids[candidate[0]][candidate[1]].insects[-1]
                                //             if (neighborInsectID){
                                                
                                //             }
                                            
                                //         })
                                //         if (run == 0){
                                //             allGrids.push([i,j])
                                //             if (!empty){
                                //                 if (nearAmy){
                                //                     accessibleGrids.push([i,j])
                                //                 }
                                                
                                //             }
                                //         }

                                //         if (nearFriends && (!nearAmy)){
                                //             accessibleGrids.push([i,j])
                                //         }
                                //     })
                                // })

                                // if( (run == 0)&&(accessibleGrids.length == 0)){
                                //     accessibleGrids = allGrids
                                // }

            return accessibleGrids

            
        },

        move( insectID, destination, insects , boards ){
            let insect  = insects[insectID[0]][insectID[1]]
            let player = insect.player
            let type = insect.type
            let pos = insect.pos
            
            // //若当前回合还没放上蜂后且所选昆虫不是蜂后（type ！=0），则可移动区域为空
            // if (checkQueen(player , insects ,  Config.queenOnBoardLimit) && type){
            //     return 
            // }

            var accessibleGrids = []
            let allGrids = []
            let empty = true
            if (pos[0] != 0){
                boards[pos[0]].grids[pos[1]].insects.length= boards[pos[0]].grids[pos[1]].insects.length -1
            }
            else{
                boards[pos[0]].grids[pos[1][0]][pos[1][1]].insects.length = boards[pos[0]].grids[pos[1][0]][pos[1][1]].insects.length -1
            }
            
            insect.pos= [0 , [destination[0] , destination[1]] , boards[0].grids[destination[0]][destination[1]].insects.length]
            
            
             
        }
    }
})()