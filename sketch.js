var dog, happyDog;
var database;
var foodS, foodStock;

function preload()
{ 
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database;
  createCanvas(500, 500);
  
  var Dog = createSprite(250,250,40,40);
  Dog.addImage(dog); 
 
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    Dog.addImage(happyDog);
  }
  
  drawSprites();

  text("Press UP_ARROW key to feed the pet milk!");
  fill("white");
  stroke("gray");

  text(foodStock,200,250);
  fill("white");
  stroke("gray");

  //add styles here

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}





