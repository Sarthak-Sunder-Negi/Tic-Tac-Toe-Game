let boxes=document.querySelectorAll(".game-box");
let resetBtn1=document.querySelector(".reset-btn");
let resetBtn2=document.querySelector(".reset-btn-msg");
let newGameBtn=document.querySelector(".new-game");
let winnerMsgBox=document.querySelector(".winner-msg-box");
let msg=document.querySelector("#msg");
let countX=document.querySelector("#scoreX");
let countO=document.querySelector("#scoreO");
let countDraw=document.querySelector("#no-draw");

let turnO=true;
let winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,3,6],
    [0,4,8],
    [2,4,6]
];
let winnerX=0;
let winnerO=0;
let draw=0;
let count=0;

const disableBoxes=()=>{
    for (let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for (let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const displayWinner=(winner)=>{
    msg.innerText=`Congratulations Winner is ${winner}`;
    winnerMsgBox.classList.remove("hide");
    disableBoxes();
};

const gameWinner=(char)=>{
    if(char==="X"){
        winnerX++;
        countX.innerText=winnerX;      
    }else{
        winnerO++;
        countO.innerText=winnerO;
    }
};

const gameDraw=()=>{
    msg.innerText="Game was draw";
    winnerMsgBox.classList.remove("hide");
    draw++;
    countDraw.innerText=draw;   
    disableBoxes();
};

const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    winnerMsgBox.classList.add("hide");
}

const newGame=()=>{
    turnO=true;
    count=0;
    winnerX=0;
    winnerO=0;
    draw=0;
    countX.innerText=winnerX;
    countO.innerText=winnerO;
    countDraw.innerText=draw;
    enableBoxes();
    winnerMsgBox.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerHTML="O";
            turnO=false;
        } else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        count++;

        let isWinner=checkWinner();

        if (count===9 && !isWinner){
            gameDraw();
        }
    });
})

const checkWinner=()=>{
    for(let pattern of winPattern){
        let posVal1=boxes[pattern[0]].innerText;
        let posVal2=boxes[pattern[1]].innerText;
        let posVal3=boxes[pattern[2]].innerText;
        
        if(posVal1 !="" && posVal2 !="" && posVal3 !=""){
            if(posVal1===posVal2 && posVal2===posVal3){
                displayWinner(posVal1);
                console.log(posVal1);
                gameWinner(posVal1);
                return true;
            } 
        }
    }
}

resetBtn1.addEventListener("click",resetGame);
resetBtn2.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",newGame);