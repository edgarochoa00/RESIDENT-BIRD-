let imagenFondo
let imagenInicio
let imagenPersonaje
let imagenPared
let wallX = [600, 900]
let wallY = [390, 600]
let x = 0
let posY = 100
let velY = 3
let estado = 0
let puntaje = 0
let record = 0
let recordAnterior = 0
let musicaRecord
let mainmenu


function preload() {
  // escenarios sacados desde resident evil 8 con costo de creditos ficticios cada imagen 

  imagenFondo = loadImage('./images/esenarios completos.jpg')
  imagenInicio = loadImage('./images/fondoRE4.jpg')
  imagenPersonaje = loadImage('./images/gif.gif')
  imagenPared = loadImage('./images/ada wong 2.png')
  mainmenu = loadSound('./sonidos/mainmenu.mp3')
  musicaRecord = loadSound('./sonidos/hehehe.mp3')
}

function setup() {
  // Deje el canvas asi porque se traba mucho si lo subo demacidado 
  createCanvas(1200,800)
  textSize(34)
}

function draw() {
  
  if (estado === 1) {
    // put drawing code here
    background(255)
    //rect(100,100,200,200)
    imageMode(CORNER)
    image(imagenFondo,x,0)
    image(imagenFondo,x+imagenFondo.width,0)
    x = x - 5

    //Moviendo al personaje
    velY = velY + 1
    posY = posY + velY

    for (let i=0; i < wallX.length; i++) {
      imageMode(CENTER)
      image(imagenPared, wallX[i], wallY[i]-400)
      image(imagenPared, wallX[i], wallY[i]+400)

      if (wallX[i] < 0) {
        wallX[i] = width
        wallY[i] = random(200, 600)
      }
      
      if (wallX[i] ===300) {
        puntaje = puntaje + 1
        record = max(puntaje, record)
      }
    
      wallX[i] = wallX[i] - 5

     
      if (posY > height || posY < 0 || (abs(wallX[i]-300) < 60 
          && abs(posY - wallY[i]) > 100) ) {
        estado = 0
        mainmenu.stop()
        cursor()
      }
    }

    
    if (x < -imagenFondo.width) {
      x = 0
    }

    
    image(imagenPersonaje,300,posY, 100,80)
    text("Puntaje: " + puntaje, width/2-60, 50)


  } else { 
    background(0)
    imageMode(CORNER)
    image(imagenInicio,0,0)
    fill(230); 
    text(" RESIDENT ", 300, 60);
    text("Record: " + record, 60, 450);
  
    fill(230); 
    text(" INICIAR JUEGO ", 400, 700);
  
    fill(255, 0, 0); 
    text(" BIRD 4 ", 490, 60);
  
    
    if (recordAnterior != record) {
      if (!musicaRecord.isPlaying()) {
        musicaRecord.play()
      }
     
    }

  }
}

function mousePressed() {
  if (estado === 0) {
    estado = 1
    x = 0
    velY = 3
    posY = 50
    wallX = [600, 900]
    wallY = [390, 600]
    puntaje = 0
    recordAnterior = record
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    //Loop hace que cuando acabe la musica, se vuelva a reproducir
    mainmenu.loop()
        noCursor()
  } else {
    velY = -15
  }
}

function touchStarted() {
  if (estado === 0) {
    estado = 1
    x = 0
    velY = 3
    posY = 50
    wallX = [600, 900]
    wallY = [390, 600]
    puntaje = 0
    recordAnterior = record
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
        //Loop hace que cuando acabe la musica, se vuelva a reproducir
        mainmenu.loop()
        noCursor()
  } else {
    velY = -15
  }
}