let keyboard = document.getElementById('keyboard');
let game = document.getElementById('game');
let lineas = document.getElementById('lineas');
let matacho = document.getElementById('matacho');

let key
let aciertos = 0
let fallos =0
let categoriaSeleccionada
let dificultadSeleccionada
let palabraAsignadaArray
lineasArray=[]
let letrasRepetidasEliminadas = 0




// Generar el teclado con las letras del abecedario

let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let keysPerRow2 = 13; // Número de teclas por fila


for (let i = 0; i < alphabet.length; i++) {
    key = document.createElement('button');
    key.textContent = alphabet[i];
    key.classList.add('key');
    keyboard.appendChild(key);

    // Agregar salto de línea después de cierto número de teclas
    if ((i + 1) % keysPerRow2 === 0) {
        keyboard.appendChild(document.createElement('br'));
    }
}

console.log(keyboard);

// Objeto que contiene las categorías y las palabras asociadas
let Palabras = {
    'Carros Deportivos': [['Ferrari', 'BMW', 'Ford'], ['Porsche', 'Bentley', 'McLaren'], ['Lamborghini', 'Maserati', 'ToyotaGR']],

    'Jugadores Futbol': [['neymar', 'messi', 'falcao'], ['valderrama', 'maradona', 'benzema'], ['ibrahimovic', 'van persie', 'griezmann']],

    'Animales salvajes': [['zorro', 'venado', 'buho'], ['aguila', 'pecure', 'serpiente'], ['hipopotamo', 'cocodrilo', 'luciernaga']]
};

//Imagenes matacho
let imagenesMatacho = ['./imagenesjuego/vida1.jpeg', './imagenesjuego/vida2.jpeg', './imagenesjuego/vida3.jpeg', './imagenesjuego/vida4.jpeg', './imagenesjuego/vida5.jpeg', './imagenesjuego/vida6.jpeg', './imagenesjuego/reset-button.jpg','./imagenesjuego/ganaste.webp']



let matach = document.createElement('img')
matach.src = './imagenesjuego/vida1.jpeg'
matacho.appendChild(matach)
matach.style.height = '250px'
matach.style.width = '250px'



// document.getElementById('categories').style.display = 'none';
//evento juega play
document.getElementById('playButton').addEventListener('click', function () {
    fallos=0
    aciertos=0
    matach.src = imagenesMatacho[0]
    document.getElementById('section2').style.display = 'block';
    document.getElementById('section1').style.display = 'none';

    document.querySelectorAll('.key').forEach(button => {
        button.style.display = 'inline-block'; // o 'block' si es necesario
    });

});

//evento categorias
document.querySelectorAll('.categoryButton').forEach(button => {
    button.addEventListener('click', function () {
        matach.src = imagenesMatacho[0]
        fallos=0
        aciertos=0
        categoriaSeleccionada = this.dataset.cate;

        // Mostrar las palabras correspondientes a la categoría seleccionada
        let categoria = Palabras[categoriaSeleccionada];
        console.log(categoria);

        document.getElementById('section2').style.display = 'none';
        document.getElementById('section3').style.display = 'block';

    });
});
//Mostrar las palabras correspondientes a la dificultad seleccionada
document.querySelectorAll('.difficultyButton').forEach(button => {
    button.addEventListener('click', function () {
        fallos=0
        aciertos=0
        matach.src = imagenesMatacho[0]

       /*  if (matach.hasAttribute('click')) {
            matach.removeAttribute('click');
        } */
        
        
        lineas.innerHTML = '';
        lineasArray = [];

        let categoria = Palabras[categoriaSeleccionada];
        dificultadSeleccionada = parseInt(this.dataset.diff);

        let palabrasPorDificultad = categoria[dificultadSeleccionada]
        console.log(palabrasPorDificultad);

        //elegir palabra al azar
        let indiceAleatorio = Math.floor(Math.random() * palabrasPorDificultad.length);
        let palabraAsignada = palabrasPorDificultad[indiceAleatorio];
        console.log(palabraAsignada)
        palabraAsignadaArray = palabraAsignada.toUpperCase().split('')
        console.log(palabraAsignadaArray)

        /*  lineas.innerHTML = '' */

        //crear lineas 
        for (let i = 0; i < palabraAsignadaArray.length; i++) {

                lin = document.createElement('p')
            lin.textContent = '_'
            lin.classList.add('lin')
            lineas.appendChild(lin)
            lineasArray.push(lin)
        }
        

    })
})

//comprobacion de letra seleccionada
document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', function () {
        console.log(fallos)
        console.log(button.textContent)
        console.log(imagenesMatacho)
        //Aca obtenemos el indice de la letra en la palabra a adivinar, solo si esta en la palabra
        //de lo contrario devolvera -1
        const finder = palabraAsignadaArray.findIndex(element => element === button.textContent)
        console.log(finder)
        console.log(palabraAsignadaArray)
        console.log(fallos)
        //comprobamos si la letra esta en la palabra
        if (finder != -1 &&  dificultadSeleccionada==0) {

            aciertos++
            let repeat = 0

            //comprobamos si una letra esta mas de una vez en la palabra
            for (let i = 0; i < palabraAsignadaArray.length; i++) {
                
                if (palabraAsignadaArray[i] === button.textContent) {
                    repeat++

                    if (repeat > 1) {
                        palabraAsignadaArray.splice(finder, 1, '?')
                        lineasArray[i].textContent = button.textContent;
                        aciertos++
                    }
                }
            }
            console.log(repeat)
            
            lineasArray[finder].textContent = button.textContent;
            button.style.display='none'
            console.log(aciertos)

              if(aciertos==palabraAsignadaArray.length){
                matach.src = imagenesMatacho[7]

                matach.addEventListener('click', function () {

                    document.getElementById('game').style.display = 'none';
                    document.getElementById('section1').style.display = 'block';
                })
              }


        } else if(finder == -1 &&  dificultadSeleccionada==0) {
            if(fallos<6){
            console.log(palabraAsignadaArray)
            console.log(finder)
            fallos = fallos + 1
            matach.src = imagenesMatacho[fallos]

            if (fallos >= 6) {
                /* keyboard.innerHTML='' */
                matach.src = imagenesMatacho[6]
                matach.addEventListener('click', function () {



                    document.getElementById('game').style.display = 'none';
                    document.getElementById('section1').style.display = 'block';
                    
                })
                
            }
            }
           

        }if (finder != -1 &&  dificultadSeleccionada==1) {

            aciertos++
            let repeat = 0

            //comprobamos si una letra esta mas de una vez en la palabra
            for (let i = 0; i < palabraAsignadaArray.length; i++) {
                
                if (palabraAsignadaArray[i] === button.textContent) {
                    repeat++

                    if (repeat > 1) {
                        palabraAsignadaArray.splice(finder, 1, '?')
                        lineasArray[i].textContent = button.textContent;
                        aciertos++
                    }
                }
            }
            console.log(repeat)
            
            lineasArray[finder].textContent = button.textContent;
            button.style.display='none'
            console.log(aciertos)

              if(aciertos==palabraAsignadaArray.length){
                matach.src = imagenesMatacho[7]

                matach.addEventListener('click', function () {

                    document.getElementById('game').style.display = 'none';
                    document.getElementById('section1').style.display = 'block';
                })
              }


        } else if(finder == -1 &&  dificultadSeleccionada==1) {
            if(fallos<4){
            console.log(palabraAsignadaArray)
            console.log(finder)
            fallos = fallos + 1
            matach.src = imagenesMatacho[fallos]

             if (fallos >= 4) {
                /* keyboard.innerHTML='' */
                matach.src = imagenesMatacho[6]
                matach.addEventListener('click', function () {



                    document.getElementById('game').style.display = 'none';
                    document.getElementById('section1').style.display = 'block';
                    
                })
                
            }
            }
            

        }if (finder != -1 &&  dificultadSeleccionada==2) {

            aciertos++
            let repeat = 0

            //comprobamos si una letra esta mas de una vez en la palabra
            for (let i = 0; i < palabraAsignadaArray.length; i++) {
                
                if (palabraAsignadaArray[i] === button.textContent) {
                    repeat++

                    if (repeat > 1) {
                        palabraAsignadaArray.splice(finder, 1, '?')
                       /*  aciertos++ */
                        letrasRepetidasEliminadas++
                    }
                }
            }
            console.log(letrasRepetidasEliminadas);
            
            console.log(repeat)
            
            lineasArray[finder].textContent = button.textContent;
            /* button.style.display='none' */
            console.log(aciertos)

            

           

              if(aciertos==palabraAsignadaArray.length){
                matach.src = imagenesMatacho[7]

                matach.addEventListener('click', function () {

                    document.getElementById('game').style.display = 'none';
                    document.getElementById('section1').style.display = 'block';
                })
              }


        } else if(finder == -1 &&  dificultadSeleccionada==2) {
            if(fallos<4){
            console.log(palabraAsignadaArray)
            console.log(finder)
            fallos = fallos + 1
            matach.src = imagenesMatacho[fallos]

             if (fallos >= 4) {
                /* keyboard.innerHTML='' */
                matach.src = imagenesMatacho[6]
                
                matach.addEventListener('click', function () {



                    document.getElementById('game').style.display = 'none';
                    document.getElementById('section1').style.display = 'block';
                    
                })
                
            }
            }
            

        }
      
        
    })
})




//evento que cambia la imagen de fondo segun la dificultad
document.querySelectorAll('.difficultyButton').forEach(button => {
    button.addEventListener('click', function () {


        let fondo = this.dataset.fondo;

        document.getElementById('section3').style.display = 'none';
        document.getElementById('game').style.display = 'block';


        game.style.backgroundImage = "url('" + fondo + "')";
        game.style.height = "100vh"
        
    });
});




