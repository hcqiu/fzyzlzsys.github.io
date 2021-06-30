// import {createBoards , createInsects} from "./rule"
// import {updateInsects} from "./utils.js"

var createBoards = Rules.createBoards
var createInsects = Rules.createInsects
var updateInsects = Rules.updateInsects
var moveInsect = Rules.moveInsect

var boards = createBoards(2)
var insects = createInsects(2)
updateInsects(insects , boards)
var selectGridEvent = new CustomEvent('selectGrid', { 
    detail: { title: 'This is title!'},
});
window.addEventListener('selectGrid', function(event){
    console.log('得到标题为：', event.detail.title);
});
// moveInsect([0,0], [2,2], insects , boards, 0)
// updateInsects(insects , boards)
//boards = updateInsects(insects , boards)
console.log(boards)
console.log(Rules.selectInsect([0,1] ,insects, boards, 0))
