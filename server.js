const Discord = require('discord.js')
const client = new Discord.Client()

// EUR or GBP to 1 USD
var EURrate = 1.123254, GBPrate = 1.303797;

// CONST FEES
const EbayFee = 0.9, GrailedFee = 0.94;

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Url = "https://discordapp.com/api/webhooks/565243126055436318/CU2Bif7fzA4otKEU67v9NY4TiLc8qqnUY-c1W47iwhNflUtuDGBSeU14Qcfp1ZaWztTC"
const webhook = new XMLHttpRequest();

function round(value) {
    return Number(Math.round(value + 'e' + 2) + 'e-' + 2);
}


client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})


function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let argument = splitCommand.slice(1) // All other words are argument/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("argument: " + argument) // There may not be any argument
      
    if (primaryCommand == "help") {
        helpCommand(argument, receivedMessage) 
    }
  
    if(primaryCommand == "fees"){
      
      feesCommand(argument, receivedMessage)
      
    }
  
    if(primaryCommand == "list"){
     listCommand(argument,  receivedMessage)
    }
  
}

function helpCommand(argument, receivedMessage) {
        
    if(argument[0] == null){
      receivedMessage.channel.send("Hello welcome to the Fee calculator bot! `!help lists` will show you the supported locations. More functions coming soon! ")
    }
    if(argument[0] == "list"){
      receivedMessage.channel.send("The bot supports US, CA and UK! DM `@Lil Chuk #2368` for help/requests ")
    }
    
}

function feesCommand(argument,message){

  const valueString = argument.shift();
  
  
        
        if(argument[1].toLowerCase()=="eur"){
            var currency = "€";
            var fixedpp = 0.35;
            var stockXship = EURrate;
        } 
        else if (argument[1].toLowerCase()=="usd"){
            var currency = "$";
            var fixedpp = 0.3;
            var stockXship = 1;
        }
        else if (argument[1].toLowerCase()=="gbp"){
            var currency = "£";
            var fixedpp = 0.2;
            var stockXship = GBPrate;
        }
        else{
            message.channel.send("I currently support: `EUR/GBP/USD`!");
            return;
        }
        //get float value
        var value = parseFloat(valueString);

        webhook.open("POST", Url, true);
        webhook.setRequestHeader("Content-Type", "application/json");

        // STOCKX FEES
        const stockX1 = round(value-(value * 0.03)-(value * 0.095));
        const stockX2 = round(value-(value * 0.03)-(value * 0.09));
        const stockX3 = round(value-(value * 0.03)-(value * 0.085));
        const stockX4 = round(value-(value * 0.03)-(value * 0.08));
        
        
  
  
        var klekt = false; 

        switch (argument[0].toLowerCase()) {
                //USA
            case "usa":
            case "us": 
            case "usd":
                var stockXship = 0/stockXship;                 
              var  data = {
                    "username": "Fees Calculator",
                    "avatar_url": "https://www.ebuyer.com/blog/wp-content/uploads/2014/07/buttons-on-a-calculator-header1.jpg",
                    "embeds": [
                        {
                            "author": {
                                "name": "Fees for USA"
                            },
                            "description": ":flag_us: Seller fees for " + value + "" + currency +" on Ebay, Grailed, StockX, Paypal and Depop",
                            "color": 16737894,
                            "fields": [
                                {
                                    "name": "***Paypal***",
                                    "value": "_Domestic transaction_ \n`" + round(value * 0.971 - fixedpp) + ""+currency+"`\n_International transaction_\n`" + round((value * 0.956 - fixedpp) * 0.985) + ""+currency+"`",
                                    "inline": true
                                },
                                {
                                    "name": "***Ebay / Depop***",
                                    "value": "_Domestic sale_\n`" + round((value * 0.971 - fixedpp)* EbayFee) + ""+currency+"`\n_International sale_\n`" + round((value * 0.956 - fixedpp) * 0.985 * EbayFee) + ""+currency+"`\n",
                                    "inline": true
                                },
                                {
                                    "name": "***Grailed / Bump***",
                                    "value": "_Domestic sale_\n`" + round((value * 0.971 - fixedpp) * GrailedFee) + ""+currency+"`\n_International sale_\n`" + round((value * 0.956 - fixedpp) * 0.985 * GrailedFee) + ""+currency+"`",
                                    "inline": true
                                },
                                {
                                    "name": "***Flight Club***",
                                    "value": "_Return_: `" + round(value * 0.8) + ""+currency+"` - drop off",
                                    //"inline": true
                                },
                                {
                                    "name": "***GOAT***",
                                    "value": "_Return_: `" + round(value * 0.905 - 5) + ""+currency+"` - fees for good standing account (maybe larger for bad standing) \n_Return after payout (PayPal/Bank)_: `" + round(round(value * 0.905 - 5) *0.971) + ""+currency+"`",
                                    //"inline": true
                                }
                            ],
                            "footer": {
                                "text": "Created by: @Lil Chuk #2368",
                            }
                        }
                    ]
                };
                break; 
                
                //CANADA
            case "canada":
            case "ca":
            case "cad":
                var INTpaypal = round(value * 0.961 - fixedpp);
                var DOMpaypal = round(value * 0.971 - fixedpp);
                var USpaypal = round(value * 0.973 - fixedpp);
                var stockXship = 20/stockXship; 
                data =  
                    {
                    "username": "Seller Fees",
                    "avatar_url": "https://www.ebuyer.com/blog/wp-content/uploads/2014/07/buttons-on-a-calculator-header1.jpg",
                    "embeds": [
                        {
                            "author": {
                                "name": "Fees for Canada"
                            },
                            "description": ":flag_ca: Seller fees for " + value + "" + currency +" on Ebay, Grailed, StockX, Paypal and Depop",
                            "color": 16737894,
                            "fields": [
                                {
                                    "name": "***Paypal***",
                                    "value": "_Domestic transaction_ \n`" + DOMpaypal + ""+currency+"`\n_International transaction_\n`" + INTpaypal + ""+currency+"`\n_USA transaction_\n`" + USpaypal +""+currency+"`",
                                    "inline": true
                                },
                                {
                                    "name": "***Ebay/Depop***",
                                    "value": "_Domestic sale_\n`" + round(DOMpaypal * 0.90) + ""+currency+"`\n_International sale_\n`" + round(INTpaypal * 0.90) + ""+currency+"`\n_USA transaction_\n`" + round(USpaypal*0.9)+""+currency+"`",
                                    "inline": true
                                },
                                {
                                    "name": "***Grailed/Bump***",
                                    "value": "_Domestic sale_\n`" + round(DOMpaypal * 0.94) + ""+currency+"`\n_International sale_\n`" + round(INTpaypal * 0.94) + ""+currency+"`\n_USA transaction_\n`" + round(USpaypal*0.94)+""+currency+"`",
                                    "inline": true
                                },
                                {
                                    "name": "***GOAT***",
                                    "value": "_Return_: `" + round(value * 0.905 - 5) + ""+currency+"` - fees for good standing account (maybe larger for bad standing) \n_Return after payout (PayPal/Bank)_: `" + round(round(value * 0.905 - 5) *0.971) + ""+currency+"`",
                                    //"inline": true
                                }
                            ],
                            "footer": {
                                "text": "Created by: @Lil Chuk #2368",
                            }
                        }
                    ]
                };
                break;

                

                //UK
            case "uk":
            case "gb":
                klekt = true; 
                var stockXship = (8.5 * GBPrate)/stockXship; 
                var DOMpaypal = round(value * 0.966 - fixedpp);
                data =  
                    {
                    "username": "Seller Fees",
                    "avatar_url": "https://www.ebuyer.com/blog/wp-content/uploads/2014/07/buttons-on-a-calculator-header1.jpg",
                    "embeds": [
                        {
                            "author": {
                                "name": "Fees for UK"
                            },
                            "description": ":flag_gb: Seller fees for " + value + "" + currency +" on Ebay, Grailed, StockX, Paypal and Depop",
                            "color": 16737894,
                            "fields": [
                                {
                                    "name": "***Grailed / Bump***",
                                    "value": "_Domestic_\n`" + round(DOMpaypal * GrailedFee) + ""+currency+"`\n_Northen Europe*_\n`" + round(DOMpaypal * 0.996 * GrailedFee) + ""+currency+"`\n_EUR without €_\n`" + round(DOMpaypal * 0.995 * GrailedFee) + ""+currency+"`\n_EUR_\n`" + round(DOMpaypal * 0.987 * GrailedFee) + ""+currency+"`\n_US/Canada_ \n`" + round(DOMpaypal * 0.99 * GrailedFee) + ""+currency+"`\n_Rest of the world_ \n`" + round(DOMpaypal * 0.98 * GrailedFee) + ""+currency+"`\n",
                                    "inline": true
                                },
                                {
                                    "name": "***Ebay / Depop***",
                                    "value": "_Domestic_\n`" + round(DOMpaypal * EbayFee) + ""+currency+"`\n_Northen Europe*_\n`" + round(DOMpaypal * 0.996 * EbayFee) + ""+currency+"`\n_EUR without €_\n`" + round(DOMpaypal * 0.995 * EbayFee) + ""+currency+"`\n_EUR_\n`" + round(DOMpaypal * 0.987 * EbayFee) + ""+currency+"`\n_US/Canada_ \n`" + round(DOMpaypal * 0.99 * EbayFee) + ""+currency+"`\n_Rest of the world_ \n`" + round(DOMpaypal * 0.98 * EbayFee) + ""+currency+"`\n",
                                    "inline": true
                                },  
                                {
                                    "name": "***Paypal***",
                                    "value": "_Domestic_\n`" + round(DOMpaypal) + ""+currency+"`\n_Northen Europe*_\n`" + round(DOMpaypal * 0.996) + ""+currency+"`\n_EUR without €_\n`" + round(DOMpaypal * 0.995) + ""+currency+"`\n_EUR_\n`" + round(DOMpaypal * 0.987) + ""+currency+"`\n_US/Canada_ \n`" + round(DOMpaypal * 0.99) + ""+currency+"`\n_Rest of the world_ \n`" + round(DOMpaypal * 0.98) + ""+currency+"`\n",
                                    "inline": true
                                },
                                {
                                    "name": "***GOAT***",
                                    "value": "_Return_: `" + round(value * 0.905 - 5) + ""+currency+"` - fees for good standing account (maybe larger for bad standing) \n_Return after payout (PayPal/Bank)_: `" + round(round(value * 0.905 - 5) *0.971) + ""+currency+"`",
                                    //"inline": true
                                }

                            ], "footer": {
                                "text": "*Northen Europe: DK, FIN, IS, NOR, SE \n Created by: @Lil Chuk #2368",
                            }
                        }
                    ]
                };
                break;

                
            default:  message.channel.send("Please input a supported country, US, UK, CA or DM `@Lil Chuk #2368` for help/requests");           
        }
        data.embeds[0].fields
            .push({"name": "***StockX***", "value":"Level 1:\n `" + round(stockX1-stockXship) + ""+currency +"`\nLevel 2:\n`" + round(stockX2 -stockXship) + ""+currency+"`\nLevel 3:\n`" + round(stockX3-stockXship) + ""+currency+"`\nLevel 4:\n`" + round(stockX4-stockXship) + ""+currency+"`","inline":true});
        
        if(klekt==true)
            data.embeds[0].fields.push({"name": "***Klekt***", "value":"_Your are getting_:\n `" + round((value * 0.8) - 10) + ""+currency+"`","inline":false});
        
        webhook.send(JSON.stringify(data));
  
  
  
  
  
}

function listCommand(argument,message){
 
    const valueString = argument.shift();
  
  
        
        if(argument[1].toLowerCase()=="eur"){
            var currency = "€";
            var fixedpp = 0.35;
            var stockXship = EURrate;
        } 
        else if (argument[1].toLowerCase()=="usd"){
            var currency = "$";
            var fixedpp = 0.3;
            var stockXship = 1;
        }
        else if (argument[1].toLowerCase()=="gbp"){
            var currency = "£";
            var fixedpp = 0.2;
            var stockXship = GBPrate;
        }
        else{
            message.channel.send("I currently support: `EUR/GBP/USD`!");
            return;
        }
        //get float value
        var value = parseFloat(valueString);
  
        webhook.open("POST", Url, true);
        webhook.setRequestHeader("Content-Type", "application/json");
  
  // STOCKX FEES REVERSE
        const stockX1 = round((value*1000)/875);
        const stockX2 = round((value*100)/88);
        const stockX3 = round((value*1000)/885);
        const stockX4 = round((value*100)/89);
  
  var klekt = false;
  
  switch (argument[0].toLowerCase()) {
      //USA
            case "usa":
            case "us": 
            case "usd":
                var stockXship = 0/stockXship;                 
              var  data = {
                    "username": "Fees Calculator",
                    "avatar_url": "https://www.ebuyer.com/blog/wp-content/uploads/2014/07/buttons-on-a-calculator-header1.jpg",
                    "embeds": [
                        {
                            "author": {
                                "name": "Fees for USA"
                            },
                            "description": ":flag_us: Seller fees for " + value + "" + currency +" on Ebay, Grailed, StockX, Paypal and Depop",
                            "color": 16737894,
                            "fields": [
                                {
                                    "name": "***Paypal***",
                                    "value": "_Domestic transaction_ \n`" + round(value * 1.02992 + fixedpp) + ""+currency+"`\n_International transaction_\n`" + round((value * 1.03633 + fixedpp) * 1.01524) + ""+currency+"`",
                                    "inline": true
                                },
                                {
                                    "name": "***Ebay / Depop***",
                                    "value": "_Domestic sale_\n`" + round((value * 1.02992 + fixedpp)* 1.11090) + ""+currency+"`\n_International sale_\n`" + round((value * 1.03633 + fixedpp) * 1.01524 * 1.15519) + ""+currency+"`\n",
                                    "inline": true
                                },
                                {
                                    "name": "***Grailed / Bump***",
                                    "value": "_Domestic sale_\n`" + round((value * 1.02992 + fixedpp) * 1.06368) + ""+currency+"`\n_International sale_\n`" + round((value * 1.03633 + fixedpp) * 1.01524 * 1.10616) + ""+currency+"`",
                                    "inline": true
                                },
                                {
                                    "name": "***Flight Club***",
                                    "value": "_List at_: `" + round(value * 1.25)  + ""+currency+"` - drop off",
                                    //"inline": true
                                },
                                {
                                    "name": "***GOAT***",
                                    "value": "_List at_: `" + round(value * 1.10933 + 5) + ""+currency+"` - fees for good standing account (maybe larger for bad standing) \n_List including payout fees (PayPal/Bank)_: `" + round(round(value * 1.10933 + 5) *1.02987) + ""+currency+"`",
                                    //"inline": true
                                }
                            ],
                            "footer": {
                                "text": "Created by: @Lil Chuk #2368",
                            }
                        }
                    ]
                };
                break; 
                default:  message.channel.send("Please input a supported country, US, UK, CA or DM `@Lil Chuk #2368` for help/requests"); 
            }
      
            data.embeds[0].fields
            .push({"name": "***StockX***", "value":"Level 1:\n `" + round(stockX1-stockXship) + ""+currency +"`\nLevel 2:\n`" + round(stockX2 -stockXship) + ""+currency+"`\nLevel 3:\n`" + round(stockX3-stockXship) + ""+currency+"`\nLevel 4:\n`" + round(stockX4-stockXship) + ""+currency+"`","inline":true});
        
      if(klekt==true)
            data.embeds[0].fields.push({"name": "***Klekt***", "value":"_Your are getting_:\n `" + round((value * 1.25) + 10) + ""+currency+"`","inline":false});
        
        webhook.send(JSON.stringify(data));
  
    
}


client.login(process.env.BOT_TOKEN)