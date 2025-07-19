const boxes= document.querySelectorAll(".box");
const reset= document.querySelector("#reset");
const newGame= document.querySelector("#new");
const msgBox= document.querySelector(".msgbox");
const pXscore= document.querySelector("#pXscore");
const pOscore= document.querySelector("#pOscore");

const Prompt= document.getElementById("promptBox");
const starts=Prompt.querySelectorAll("button");
const Confirm= document.getElementById("confirmBox");
const confirmation= Confirm.querySelectorAll("button");

let isX;
function toss(){
    Prompt.classList.remove("hide");
}
starts.forEach((but)=>{
    but.addEventListener(("click"),(e)=>{
        isX= e.target.innerText==='X';
        Prompt.classList.add("hide");
    })
})
toss();
let count=0;
let pX=0;
let pO=0;

const win=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];


//clicking the box
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(isX){
            box.textContent="X";
            isX=false;
        }
        else {
            box.textContent="O";
            isX=true;
        }
        box.disabled=true;
        count++;

        if(!checkWinner() && count==9){
            drawGame();
        }
    });
});

//draw game
function drawGame(){
    msgBox.innerText=`Game was a draw`;  
    msgBox.classList.remove("hide");
    boxes.forEach(box=>{
        box.disabled=true;
    })
}

//checking the winner
function checkWinner(){
    for(let pattern of win){
        let i=boxes[pattern[0]].innerText;
        let j=boxes[pattern[1]].innerText;
        let k=boxes[pattern[2]].innerText;
        
        if(i=="X" && i==j && i==k){
            showWinner(i);
            pX++;
            pXscore.innerText=pX;
            return true;
        }
        else if(i=="O" && i==j && i==k){
            showWinner(i);
            pO++;
            pOscore.innerText=pO;
            return true;
        }
    }
    return false;
}

//showing the winner
function showWinner(player){
    msgBox.innerText=`congratulations! player ${player} won the game`;  
    msgBox.classList.remove("hide");
    boxes.forEach(box=>{
        box.disabled=true;
    })
}


//reset button
reset.addEventListener("click",()=>{
    boxes.forEach(box=>{
        box.disabled=false;
        box.textContent="";
    })
    msgBox.classList.add("hide");
    count=0;
    setTimeout(()=>{
        toss();
    }),(1000);
});

//new game button
newGame.addEventListener("click",async()=>{
    if(await confirmnew()){
        pX=0, pO=0;
        pXscore.innerText="0";
        pOscore.innerText="0";
        reset.click();
    }
});

function confirmnew() {
  return new Promise((resolve) => {
    Confirm.classList.remove("hide");

    function handleClick(e) {
      const result = e.target.innerText === "Yes";
      Confirm.classList.add("hide");
      confirmation.forEach((btn) => btn.removeEventListener("click", handleClick));
      resolve(result);
    }

    confirmation.forEach((btn) => btn.addEventListener("click", handleClick));
  });
}


