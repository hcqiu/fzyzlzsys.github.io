// import { board } from "./board"
// import { scale } from "./config.json"
var scale = Config.scale

var Utils = function (){
    
    return {
        

        modScale : function (value){
            if (value<0){
                return (value + scale)
            }
            else{
                return (value % scale)
            }
        
        },
        
        mod6 : function(value){
            if (value<0){
                return (value + 6)
            }
            else{
                return (value % 6)
            }
        },

        arrayMinus: function(minuend , subtrahend){
            diff = new Array()
            minuend.forEach(function(item1){
                let subtracted = false
                subtrahend.forEach(function(item2){
                    if ((item1[0] == item2[0])&&(item1[1] == item2[1])){
                        subtracted = true
                    }
                })
                if (!subtracted){
                    diff.push(item1)
                }             
            })

            return diff
        },
        
        

        

        gridEmpty: function(grid , boards){
            InsectID = boards[0].grids[grid[0]][grid[1]].insects.length
                if (InsectID){
                    return false
                }
                else{
                    return true
                }
        }
    }
}()




//export {modScale , mod6 , updateInsect }