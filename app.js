const blocks = document.querySelectorAll(".block");
const playerText = document.getElementById("player");
const errorText = document.getElementById("error");
let player = "X";
let gameOver = false;
let winner;

//Oyunu başlatan fonksiyon
function startGame(){
    playerText.textContent = `${player}'s Turn!`
    blocks.forEach(block => block.addEventListener("click", () => chooseArea(block)))
}

// Sayfanın yanilenmesi için kullanılan butona ait fonksiyon
function replay(){
    window.location.reload();
}

//Bloğa X ya da O yazılınca olacaklar için kullnılan fonksiyon
function chooseArea(block){
    if (block.textContent === "") {
        block.textContent = player;
        turnPlayer();
    } else {
        errorText.textContent = "It's not empty "
        block.style.border = "2px solid red"
        setTimeout(() => {
            errorText.textContent = ""
            block.style.border = "1px solid black"
        }, 2500)
    }

    checkWin();
    checkTie();

    if (gameOver) {
        playerText.textContent = `Game is over, ${winner} Won`;
        blocks.forEach(block => block.style.pointerEvents = 'none');
    }
}

//Oyuncu sırası değişimi için kullanılan fonksiyon
function turnPlayer(){
    if(player === "X"){
        player = "O";
        playerText.textContent = `${player}'s Turn!`
        return;
    }else if(player === "O"){
        player = "X";
        playerText.textContent = `${player}'s Turn!`
    }
}

//Kazanma durumunu kontrol eden fonksiyon
function checkWin(){
    checkRows();
    checkColums();
    checkDiagonals();
}

//Beraberlik durumunu kontrol eden fonksiyon
function checkTie() {
    const values = [];
    blocks.forEach(block => values.push(block.textContent))
    if (!values.includes("")) {
        playerText.textContent = "Tie !";
        blocks.forEach(block => block.style.pointerEvents = 'none');
    }
}

//Kazanma durumu için satırları kontrol eden fonksiyon
function checkRows(){
    let row1 = blocks[0].textContent == blocks[1].textContent && 
    blocks[0].textContent == blocks[2].textContent && blocks[0].textContent !== "";
    let row2 = blocks[3].textContent == blocks[4].textContent && 
    blocks[3].textContent == blocks[5].textContent && blocks[3].textContent !== "";
    let row3 = blocks[6].textContent == blocks[7].textContent && 
    blocks[6].textContent == blocks[8].textContent && blocks[6].textContent !== "";
    
    if(row1 || row2 || row3) {
        gameOver = true;
    }
    if(row1) return winner = blocks[0].textContent
    if(row2) return winner = blocks[3].textContent
    if(row3) return winner = blocks[6].textContent
}

//Kazanma durumu için sütunları kontrol eden fonksiyon
function checkColums(){
    let col1 = blocks[0].textContent == blocks[3].textContent && 
    blocks[0].textContent == blocks[6].textContent && blocks[0].textContent !== "";
    let col2 = blocks[1].textContent == blocks[4].textContent && 
    blocks[1].textContent == blocks[7].textContent && blocks[1].textContent !== "";
    let col3 = blocks[2].textContent == blocks[5].textContent && 
    blocks[2].textContent == blocks[8].textContent && blocks[2].textContent !== "";

    if(col1 || col2 || col3) {
        gameOver = true;
    }
    if(col1) return winner = blocks[0].textContent
    if(col2) return winner = blocks[1].textContent
    if(col3) return winner = blocks[2].textContent
}

//Kazanma durumu için çapraz kontrolleri yapan fonksiyon
function checkDiagonals(){
    let dial1 = blocks[0].textContent == blocks[4].textContent && 
    blocks[0].textContent == blocks[8].textContent && blocks[0].textContent !== "";
    let dial2 = blocks[2].textContent == blocks[4].textContent && 
    blocks[2].textContent == blocks[6].textContent && blocks[2].textContent !== "";

    if(dial1 || dial2) {
        gameOver = true;
    }
    if(dial1) return winner = blocks[0].textContent
    if(dial2) return winner = blocks[2].textContent
}

startGame();