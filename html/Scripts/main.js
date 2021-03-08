class purchasable{
    name;
    price;
    lastCheck;
    valueBack;
    getValue;
    amount;
    constructor({name, price, valueBack, getValue}) {
        this.name = name;
        this.valueBack = valueBack;
        this.getValue = getValue;
        this.lastCheck = 0;
        this.amount = 0;
        this.price = price;
    }
    getPrice(){
        if(this.amount > 0){
            return this.price * this.amount;
        }else{
            return this.price;
        }
    }
}

class Game{
    total;
    totalDisp;
    possiblePurchases = [];
    boughtPurchasables = [];
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
        this.updateTotal();
        this.enableAvailable();
    }

    updateTotal(){
        for (let i = 0; i < this.boughtPurchasables.length; i++){
            let p = this.boughtPurchasables[i];
            let val = p.getValue();
            if(val === 0){
                console.log("value was 0");
            }else{
                console.log("value was " + val.toString())
            }
            this.total += val;
        }
    }
    enableAvailable(){
        let buttons = document.getElementsByClassName("buy-btn");
        for (let i1 = 0; i1 < this.possiblePurchases.length; i1++){
            let pur = this.possiblePurchases[i1];
            for (let i = 0; i < buttons.length; i++){
                let button = buttons[i];
                let buttonId =  button.dataset.buyId;
                // console.log("pur.name: ", pur.name);
                // console.log("buttonId: ", buttonId);
                if(pur.name === buttonId){
                    let bbs = button.getElementsByTagName("button");
                    let btn;
                    if(bbs.length > 0){
                        btn = bbs[0];
                    }
                    if(this.getAvailableFunds().regular >= pur.getPrice()){
                        button.style.display = "inline";
                       if(btn){
                            btn.disabled = false;
                       }
                    }else{
                        if(btn){
                            btn.disabled = true;
                        }
                    }

                    let sbss = button.getElementsByTagName("span");
                    let sbs;
                    if(sbss.length > 0){
                        sbs = sbss[0];
                        sbs.innerText = pur.getPrice();
                    }

                }else{
                   //button.style.display = "none";
                }
            }
        }
    }

    buyPurchasable(name){
        for (let i = 0; i < this.possiblePurchases.length; i++){
            let p = this.possiblePurchases[i];
            if(p.name === name){
                console.log("found purchasable");
                console.log("this.getAvailableFunds(): ", this.getAvailableFunds().regular);
                console.log("p.price: ", p.price);

                if(this.getAvailableFunds().regular >= p.getPrice()){
                    this.subtractTotal(p.getPrice());
                    let found = false;
                    for (let i1 = 0; i1 < this.boughtPurchasables.length; i1++){
                        let bp = this.boughtPurchasables[i1];
                        if(bp.name === p.name){
                            found = true;
                            bp.amount++;
                        }
                    }
                    if(!found){
                        this.boughtPurchasables.push(p);
                        p.amount++;
                    }
                }
            }
        }
    }

    subtractTotal(amount){
        this.total -= amount;
    }

    getAvailableFunds(){
        return {regular: this.total};
    }
    addPurchasables(list){
        this.possiblePurchases.push(...list);
    }
}

let game = new Game({totalElement:null});

window.addEventListener('load', (event) => {
    let totalDisp = document.getElementById("totalDisplaySpan");
    game.setTotalElement({totalElement:totalDisp});
    // game.addPurchasables([{name:"server", price: 10},{name:"developer", price: 100}]);
    game.addPurchasables([
        new purchasable({name:"server",price: 10, valueBack:1, getValue: function(){
            let now = new Date();
            if(now - this.lastCheck > 1000){
                this.lastCheck = now;
                // console.log("this.valueBack: ", this.valueBack);
                // console.log("this.amount: ", this.amount);
                return this.valueBack * this.amount;
            }else{
                return 0;
            }
        }}),
        new purchasable({name:"developer",price: 100, valueBack: 1, getValue: function(){
            let now = new Date();
            if(now - this.lastCheck > 500){
                this.lastCheck = now;
                return this.valueBack * this.amount;
            }else{
                return 0;
            }
        }})
    ]);
});

function gameLoop(){
    window.requestAnimationFrame(gameLoop);
    if(game){
        game.update();
    }
}

gameLoop();
