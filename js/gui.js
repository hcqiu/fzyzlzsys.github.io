var canvas = document.getElementById('test-canvas');
var ctx = canvas.getContext('2d')
var status = "null"
var adaptScale = 0.7
var hexSide = 40*adaptScale
var gou = hexSide * Math.sin(Math.PI / 6)
var gu = hexSide * Math.cos(Math.PI / 6)
var imgs = []
var imageHeight = 70*adaptScale
var imageWidth = 70*adaptScale
var mainBoardInitial = [400,300]
var playerBoardInitial = [[50 , 50] , [1300 , 50]]

var round = 0
var playerToMove = 0
var accessibleGrids = []
var selectedInsect 
//ctx.clearRect(0, 0, 200, 200); // 擦除(0,0)位置大小为200x200的矩形，擦除的意思是把该区域变为透明
//$(window).resize(resizeCanvas);  
   
//  function resizeCanvas() {  
   
//         canvas.attr("width", window.screen.width);  
   
//         canvas.attr("height",window.screen.height);  
   
//         //context.fillRect(0, 0, canvas.width(), canvas.height());  
   
//  };  
   
//  resizeCanvas();  


function polygon(ctx,n,x,y,r){

    ctx.beginPath()
    //y = y +r
    let angle =  0 //Math.PI / 6;
    
    ctx.moveTo(x+r*Math.sin(angle),       //从第一个顶点开始一条新的子路径
                y-r*Math.cos(angle));   //使用三角法计算位置
    var delta = 2*Math.PI/n;            //两个顶点之间的夹角
    for(var i=1 ; i < n ; i++){          //循环剩余的每个顶点
        angle += delta;   //调整角度
        ctx.lineTo(x+r*Math.sin(angle),   //以下个顶点为端点添加线段
            y-r*Math.cos(angle));
    }
    ctx.closePath();      //将最后一个顶点和起点连接起来
    
    
}
// for (type  = 0 ; type < Config.insectTypes ; type ++){
//     var img = new Image
//     let name = Config.insects[type].name
    
//     img.onload = function () {
//         imgs.push(img)
//     };
//     img.src = '../img/'+ name + '.png';
// }

function drawShadowGrid(center , player , type=-1, isSelected = false, mousePos){
    if (type != -1){
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //console.log( canvas.width, canvas.height)
        if (player == 0){
            ctx.fillStyle = "#FFFFFF"
        }
        if (player == 1){
            ctx.fillStyle = "#000000"
        }

        if (isSelected){
            ctx.strokeStyle = "#FF0000"
            ctx.lineWidth = 6; //指定选定后描边线的宽度
        }
        else{
            
            ctx.strokeStyle = '#000000'; // 设置颜色
            ctx.lineWidth = 1;
        }

        
        
        let scale = Config.scale
        let verticalDis = hexSide + 3*hexSide*(scale/2 -1) + 2*hexSide
        let horizentalDis = scale*2*gu
        ctx.beginPath()
        polygon(ctx,6,center[0]+ horizentalDis,center[1],hexSide)
        ctx.stroke()
        ctx.fill()
        ctx.beginPath()
        polygon(ctx,6,center[0],center[1]- verticalDis,hexSide)
        ctx.stroke()
        ctx.fill()
        ctx.beginPath()
        polygon(ctx,6,center[0]- horizentalDis,center[1],hexSide)
        ctx.stroke()
        ctx.fill()
        ctx.beginPath()
        polygon(ctx,6,center[0],center[1]+ verticalDis,hexSide)
        ctx.stroke()
        ctx.fill()

        ctx.beginPath()
        polygon(ctx,6,center[0]+ horizentalDis,center[1]- verticalDis,hexSide)
        ctx.stroke()
        ctx.fill()
        ctx.beginPath()
        polygon(ctx,6,center[0]- horizentalDis,center[1]- verticalDis,hexSide)
        ctx.stroke()
        ctx.fill()
        ctx.beginPath()
        polygon(ctx,6,center[0]- horizentalDis,center[1]+ verticalDis,hexSide)
        ctx.stroke()
        ctx.fill()
        ctx.beginPath()
        polygon(ctx,6,center[0]+ horizentalDis,center[1]+ verticalDis,hexSide)
        ctx.stroke()
        ctx.fill()
        
        
        
        
        //let who = []
        if(mousePos && ctx.isPointInPath(mousePos[0], mousePos[1])){
            //如果传入了事件坐标，就用isPointInPath判断一下
            //如果当前环境覆盖了该坐标，就将图形的index放到数组里
            isSelected = true
        }
        //console.log(isSelected)

        
        var img = new Image
        let name
        if (Config.insects[type].name == "spider"){
            if (player == 0){
                name = Config.insects[type].name + "_black"
            }
            else{
                name = Config.insects[type].name + "_white"
            }
            
        }
        else{
            name = Config.insects[type].name
        }
        
        img.onload = function () {
            ctx.drawImage(img, center[0]-(imageWidth / 2)+horizentalDis, center[1]-(imageHeight / 2), imageWidth, imageHeight); //此时，起始坐标为(10, 10)，且，画布上的图像尺寸大小为200*200
            ctx.drawImage(img, center[0]-(imageWidth / 2), center[1]-(imageHeight / 2)-verticalDis, imageWidth, imageHeight); //此时，起始坐标为(10, 10)，且，画布上的图像尺寸大小为200*200
            ctx.drawImage(img, center[0]-(imageWidth / 2)-horizentalDis, center[1]-(imageHeight / 2), imageWidth, imageHeight); //此时，起始坐标为(10, 10)，且，画布上的图像尺寸大小为200*200
            ctx.drawImage(img, center[0]-(imageWidth / 2), center[1]-(imageHeight / 2)+verticalDis, imageWidth, imageHeight); //此时，起始坐标为(10, 10)，且，画布上的图像尺寸大小为200*200
        
            ctx.drawImage(img, center[0]-(imageWidth / 2)+horizentalDis, center[1]-(imageHeight / 2)-verticalDis, imageWidth, imageHeight); //此时，起始坐标为(10, 10)，且，画布上的图像尺寸大小为200*200
            ctx.drawImage(img, center[0]-(imageWidth / 2)-horizentalDis, center[1]-(imageHeight / 2)-verticalDis, imageWidth, imageHeight); //此时，起始坐标为(10, 10)，且，画布上的图像尺寸大小为200*200
            ctx.drawImage(img, center[0]-(imageWidth / 2)-horizentalDis, center[1]-(imageHeight / 2)+verticalDis, imageWidth, imageHeight); //此时，起始坐标为(10, 10)，且，画布上的图像尺寸大小为200*200
            ctx.drawImage(img, center[0]-(imageWidth / 2)+horizentalDis, center[1]-(imageHeight / 2)+verticalDis, imageWidth, imageHeight); //此时，起始坐标为(10, 10)，且，画布上的图像尺寸大小为200*200
        
        };
        img.src = '../img/'+ name + '.png';
        
    }
    return isSelected
    
}

function drawGrid(center , player , type=-1, isSelected = false, mousePos){
    if (type != -1){
        

        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //console.log( canvas.width, canvas.height)
        ctx.beginPath()
        polygon(ctx,6,center[0],center[1],hexSide)
        if (player == 0){
            ctx.fillStyle = "#FFFFFF"
        }
        if (player == 1){
            ctx.fillStyle = "#000000"
        }

        if (isSelected){
            ctx.strokeStyle = "#FF0000"
            ctx.lineWidth = 6; //指定选定后描边线的宽度
        }
        else{
            
            ctx.strokeStyle = '#000000'; // 设置颜色
            ctx.lineWidth = 1;
        }
        
        ctx.stroke()
        
        //let who = []
        if(mousePos && ctx.isPointInPath(mousePos[0], mousePos[1])){
            //如果传入了事件坐标，就用isPointInPath判断一下
            //如果当前环境覆盖了该坐标，就将图形的index放到数组里
            isSelected = true
        }
        //console.log(isSelected)

        ctx.fill()
        var img = new Image
        let name
        if (Config.insects[type].name == "spider"){
            if (player == 0){
                name = Config.insects[type].name + "_black"
            }
            else{
                name = Config.insects[type].name + "_white"
            }
            
        }
        else{
            name = Config.insects[type].name
        }
        
        
        img.onload = function () {
        ctx.drawImage(img, center[0]-(imageWidth / 2), center[1]-(imageHeight / 2), imageWidth, imageHeight); //此时，起始坐标为(10, 10)，且，画布上的图像尺寸大小为200*200
        };
        img.src = '../img/'+ name + '.png';
        
    }
    return isSelected
    
}

function drawAccessibleGrid(center , mousePos){
    ctx.beginPath()
    polygon(ctx,6,center[0],center[1],hexSide)
    ctx.fillStyle = "#FF7575"
    ctx.strokeStyle = '#9A0000'; // 设置颜色
    ctx.lineWidth = 1;
    
    let isSelected = false
    ctx.stroke()
    
    //let who = []
    if(mousePos && ctx.isPointInPath(mousePos[0], mousePos[1])){
        //如果传入了事件坐标，就用isPointInPath判断一下
        //如果当前环境覆盖了该坐标，就将图形的index放到数组里
        isSelected = true
    }
    //console.log(isSelected)

    ctx.fill()
    
    return isSelected
}

function drawAccessibleGrids(grids  , mousePos){
    let selected = []
    grids.forEach(function(grid){
        let i = grid[0]
        let j = grid[1]
        let isSelected = false
        isSelected = drawAccessibleGrid([mainBoardInitial[0] + gu*i + gu*(2*j) , mainBoardInitial[1] + (hexSide + gou)*i]  , mousePos )
        if (isSelected){
            selected =[i,j]
        }
    })
    return selected
}


function drawCoverGrid( grid , insects , insectIDs , selected = [] , mousePos){
    let i = grid[0]
    let j = grid[1]
    
    insectIDs.forEach(function(insectID , index){
        let isSelected = false
        if (index == selected[0]){
            drawGrid([i , j + 2*hexSide*index] ,insectID[0] , insects[insectID[0]][insectID[1]].type , true , mousePos)
        }
        else{
            isSelected = drawGrid([i , j + 2*hexSide*index] ,insectID[0] , insects[insectID[0]][insectID[1]].type , false , mousePos)
        }
        if (isSelected){
            selected =[index]
        }
    })
    return selected
}
function drawBoards(boards  , insects, selected = [] , mousePos ){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boards[0].grids.forEach(function(row , i){
        row.forEach(function(grid , j){
            let isSelected = false
            if (grid.insects.length > 0){
                let insectID = grid.insects[grid.insects.length-1]
                let insect = insects[insectID[0]][insectID[1]]
                
                if (selected.length == 3){
                    if ((selected[0] == 0)&(selected[1] == i)&(selected[2] == j)){
                        drawGrid([mainBoardInitial[0] + gu*i + gu*(2*j) , mainBoardInitial[1] + (hexSide + gou)*i] , insect.player , insect.type ,true)
                        drawShadowGrid([mainBoardInitial[0] + gu*i + gu*(2*j) , mainBoardInitial[1] + (hexSide + gou)*i] , insect.player , insect.type ,true)
                    }
                    else{
                        isSelected = drawGrid([mainBoardInitial[0] + gu*i + gu*(2*j) , mainBoardInitial[1] + (hexSide + gou)*i] , insect.player , insect.type, false , mousePos )
                        drawShadowGrid([mainBoardInitial[0] + gu*i + gu*(2*j) , mainBoardInitial[1] + (hexSide + gou)*i] , insect.player , insect.type, false , mousePos )
                    }
                }
                else{
                    isSelected = drawGrid([mainBoardInitial[0] + gu*i + gu*(2*j) , mainBoardInitial[1] + (hexSide + gou)*i] , insect.player , insect.type, false , mousePos )
                    drawShadowGrid([mainBoardInitial[0] + gu*i + gu*(2*j) , mainBoardInitial[1] + (hexSide + gou)*i] , insect.player , insect.type, false , mousePos )

                }
            }
            if (isSelected){
                selected = [0 , i , j]
            }
        })
    })

    for ( i = 1; i < 3 ; i++){
        boards[i].grids.forEach(function(grid , index){
            if (grid.insects.length > 0){
                let insectID = grid.insects[grid.insects.length-1]
                let insect = insects[insectID[0]][insectID[1]]
                if (selected.length == 2){
                    if ((selected[0] == i)&(selected[1] == index)){
                        drawGrid([playerBoardInitial[i-1][0]  , playerBoardInitial[i-1][1] + 2*hexSide*index] , insect.player , insect.type , true)
                    }
                    else{
                        isSelected = drawGrid([playerBoardInitial[i-1][0]  , playerBoardInitial[i-1][1] + 2*hexSide*index] , insect.player , insect.type , false , mousePos)
                    }
                }
                else{
                    isSelected = drawGrid([playerBoardInitial[i-1][0]  , playerBoardInitial[i-1][1] + 2*hexSide*index] , insect.player , insect.type , false , mousePos)
                }
                if (isSelected){
                    selected = [i , index]
                }
            }
        })
    }
    console.log(selected)
    return selected
}

//function 

drawBoards(boards , insects)
canvas.addEventListener('click', e => {
    const mousePos = [e.clientX , e.clientY-hexSide];
    let selected = drawBoards(boards , insects , [] , mousePos)
    switch (status){
        case "null":
            
            if(selected.length > 0){
                
                drawBoards(boards , insects , selected , mousePos)
                let grid 
                if (selected.length== 2){
                    grid = boards[selected[0]].grids[selected[1]]
                }
                else if (selected.length== 3){
                    grid = boards[selected[0]].grids[selected[1]][selected[2]]
                }

                if ((selected[0] == 0)& (grid.insects.length > 1)){
                    drawCoverGrid([selected[1],selected[2]] , insects , grid.insects , false , mousePos)
                    status = "gridSelected"
                }
                else {
                    
                    selectedInsect = grid.insects[grid.insects.length-1] 
                    if (insects[selectedInsect[0]][selectedInsect[1]].player == playerToMove){
                        accessibleGrids = Rules.selectInsect(grid.insects[grid.insects.length-1] ,insects, boards, round)
                        drawAccessibleGrids(accessibleGrids)

                        status = "insectSelected"
                    }
                }
                
            }
            else{
                drawBoards(boards , insects , [] , mousePos)
            }
            break
        case "gridSelected":
            if(selected.length > 0){
                status = "gridSelected"
                drawBoards(boards , insects , selected , mousePos)
                let grid 
                if (selected.length== 2){
                    grid = boards[selected[0]].grids[selected[1]]
                }
                else if (selected.length== 3){
                    grid = boards[selected[0]].grids[selected[1]][selected[2]]
                }
                
                drawAccessibleGrids(Rules.selectInsect(grid.insects[grid.insects.length-1] ,insects, boards, round))
            }
            else{
                drawBoards(boards , insects , [] , mousePos)
            }
            break
        case "insectSelected":
            
            let destination = drawAccessibleGrids(accessibleGrids , mousePos)

            if (destination.length > 0 ){
                Rules.moveInsect(selectedInsect , destination , insects , boards , round)
                Rules.updateInsects(insects , boards)
                drawBoards(boards , insects , [] )
                status = "null"
                if (playerToMove == 0){
                    playerToMove =1
                }
                else{
                    playerToMove =0
                    round ++
                }
                
            }
            else if(selected.length > 0){
                
                drawBoards(boards , insects , selected , mousePos)
                let grid 
                if (selected.length== 2){
                    grid = boards[selected[0]].grids[selected[1]]
                }
                else if (selected.length== 3){
                    grid = boards[selected[0]].grids[selected[1]][selected[2]]
                }

                if ((selected[0] == 0)& (grid.insects.length > 1)){
                    drawCoverGrid([selected[1],selected[2]] , insects , grid.insects , false , mousePos)
                    status = "gridSelected"
                }
                else {
                    
                    selectedInsect = grid.insects[grid.insects.length-1] 
                    if (insects[selectedInsect[0]][selectedInsect[1]].player == playerToMove){
                        accessibleGrids = Rules.selectInsect(grid.insects[grid.insects.length-1] ,insects, boards, round)
                        drawAccessibleGrids(accessibleGrids)

                        status = "insectSelected"
                    }
                }
                
            }
            else{
                drawBoards(boards , insects , [] , mousePos)
                status = "null"
            }
            break

    }
    
})


// hex([40,40])
// function hex(initialPos){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     console.log( canvas.width, canvas.height)
//     polygon(ctx,6,initialPos[0],initialPos[1],hexSide)
//     ctx.strokeStyle = "#000000"
//     ctx.fillStyle = '#000000'; // 设置颜色
//     ctx.stroke()
//     ctx.fill()
// }

// function draw(mousePos){
//     var who = [];//保存点击事件包含图形的index值
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     boards[0].grids.forEach(function(row , i){
//         row.forEach(function(grid , j){

//         })
//     })
//     if(mousePos && ctx.isPointInPath(mousePos[0], mousePos[1])){
//       //如果传入了事件坐标，就用isPointInPath判断一下
//       //如果当前环境覆盖了该坐标，就将图形的index放到数组里
//       who.push(0);
//     }
//   console.log(who)
//   //根据数组中的index值，可以到arr数组中找到相应的元素。
//   return who;

// }
// console.log(window.screen.height , window.screen.width)
// function selectPolygon(initialPos){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     polygon(ctx,6,initialPos[0],initialPos[1],hexSide)
//     ctx.strokeStyle = "#FF0000"
//     ctx.fillStyle = '#000000'; // 设置颜色
//     ctx.lineWidth = 6; //指定描边线的宽度
//     ctx.stroke()
//     ctx.fill()
//     ctx.beginPath()
    

// }







// // 利用Path绘制复杂路径:
// var path=new Path2D();
// path.arc(75, 75, 50, 0, Math.PI*2, true);
// path.moveTo(110,75);
// path.arc(75, 75, 35, 0, Math.PI, false);
// path.moveTo(65, 65);
// path.arc(60, 65, 5, 0, Math.PI*2, true);
// path.moveTo(95, 65);
// path.arc(90, 65, 5, 0, Math.PI*2, true);
// ctx.strokeStyle = '#0000ff';
// ctx.stroke(path);

