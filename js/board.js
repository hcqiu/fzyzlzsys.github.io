// import {modScale , mod6} from "./utils.js"

// import { scale as scaleConfig , insectTypes} from "./config.json"
var scaleConfig = Config.scale
var insectTypes = Config.insectTypes
// import { assert } from "node:console"

var Board = (function(){
    var modScale = Utils.modScale
    function grid(neighbors=[] , insects=[]){
        this.neighbors = neighbors
        this.insects = insects
    }
    return{
        board : function (type , scale=0){
            if (type == "main"){
                //assert(!(scale%2), "scale must be even")
                this.type = type
                this.scale = scale || scaleConfig
                var grids = new Array(this.scale)
                for (let i = 0 ; i < this.scale ; i++){
                    var row = new Array(this.scale)
                    for (let j = 0 ; j < scale ; j ++){
                        if (i == 0){
                            neighbors = [
                                [modScale(i- 1) , modScale(j- (this.scale/2) + 1)],
                                [modScale(i) , modScale(j+1)],
                                [modScale(i+1) , modScale(j)],
                                [modScale(i+1) , modScale(j-1)],
                                [modScale(i) , modScale(j-1)],
                                [modScale(i-1) , modScale(j- (this.scale/2) )]
                            ]
                            row[j] = new grid(neighbors)
                        }
                        else if(i == modScale(-1)){
                            neighbors = [
                                [modScale(i- 1) , modScale(j + 1)],
                                [modScale(i) , modScale(j+1)],
                                [modScale(i+1) , modScale(j + (this.scale/2))],
                                [modScale(i+1) , modScale(j + (this.scale/2)-1)],
                                [modScale(i) , modScale(j -1)],
                                [modScale(i-1) , modScale(j )]
                            ]
                            row[j] = new grid(neighbors)
                        }
                        else{
                            neighbors = [
                                [modScale(i-1) , modScale(j+1)],
                                [modScale(i) , modScale(j+1)],
                                [modScale(i+1) , modScale(j)],
                                [modScale(i+1) , modScale(j-1)],
                                [modScale(i) , modScale(j-1)],
                                [modScale(i-1) , modScale(j)]
                            ]
                            row[j] = new grid(neighbors)
                        }
                        
                    }
                    grids[i] = row
                }
                this.grids = grids
            }
            else{
                this.type = "player"
                this.scale = scale || insectTypes
                this.grids = new Array(this.scale)
                for (let i = 0 ; i < this.scale ; i++){
                    this.grids[i] = new grid()
                }
        
            }
        }
    }
})()




//export {board}