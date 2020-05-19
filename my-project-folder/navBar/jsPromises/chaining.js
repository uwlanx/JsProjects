const store = {
    sunglasses: {
        inventory: 817,
        cost: 9.99
    },
    pants: {
        inventory: 236,
        cost:7.99
    },
    bags: {
        inventory: 17,
        cost: 12.99
    }
};

const checkInventory = (order) => {
    return new Promise ((resolve, reject) => {
        setTimeout(()=> {
            const itemsArr = itemsArr.every(item =>
                store[item[0]].inventory >= item[1]);

                if(inStock){
                    let total = 0;
                    itemsArr.forEach(item =>{
                        total += item[1] * store[item[0].cost]
                    });
                    console.log(`All of the items order is done. the 
                    total cost of the order is ${total}.`);
                    resolve([order, total]);
                }else{
                    reject(`The order could not be completed because 
                    some items are sold out.`);
                }
        }, generateRandomDelay())
    });
};


const processPayment = (responseArray) => {
    const order = responseArray[0];
    const total = responseArray[1];
    return new Promise ((resolve, reject) => {
        setTimeout(()=> {
            let hasEnoughMoney = order.giftcardBalance >= total;
            if(hasEnoughMoney){
                console.log(`Payment with gift card. Generating shipping label.`);
                let trackingNum = generateTrackingNumber();
                resolve([order, trackingNum]);
            }else {
                reject(`Can't process order: gift card balance was insufficient.`);
            }
        }, generateRandomDelay())
    });
};

const shipOrder = (responseArray) => {
    const order = responseArray[0];
    const trackingNum = responseArray[1];
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(`The order has been shipped. The tracking number is: ${trackingNum}.`);
        }, generateRandomDelay());
    });
};

function generateTrackingNumber(){
    return Math.floor(Math.random() * 2000);
}