class purchasable{
    htmlButton;
    name;
    price;
    constructor({htmlButton, name, price}) {
        this.htmlButton = htmlButton;
        this.name = name;
        this.price = price;
    }
}

class Game{
    total;
    totalDisp;
    possiblePurchases = [];
    constructor({totalElement:totalDisp}) {
        this.total = 0;
        this.totalDisp = totalDisp;
    }

    setTotalElement({totalElement:totalDisp}){
        this.totalDisp = totalDisp;
    }

    add(number){
        this.total += number;
    }

    update(){
        if(this.totalDisp){
            this.totalDisp.innerText = this.total.toString();
        }
        this.enableAvailable();
    }
    enableAvailable(){

    }
    addPurchasables(list){
        this.possiblePurchases.push(...list);
    }
}

let game = new Game({totalElement:null});

window.addEventListener('load', (event) => {
    let totalDisp = document.getElementById("totalDisplaySpan");
    game.setTotalElement({totalElement:totalDisp});
    game.addPurchasables([]);
});

function gameLoop(){
    window.requestAnimationFrame(gameLoop);
    if(game){
        game.update();
    }
}

gameLoop();
