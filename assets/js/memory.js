$(document).ready(function(){

    /**
    * Function qui 
    */
    let Memory = {
    	init: function(cartes){
    		//this.carte =  $('.carte');
    		//this.container = $(".container");
    		this.counter = 0;
    		this.match = false;
    		this.flip_activated = false;
    		this.deck = [];
    		this.first_card = "";
    		this.second_card = "";
    		this.setup();
    		this.shuffle(this.deck);
    		//this.shuffle(this.cards);
    		this.flip();
    		this.display();
    		//this.binding();
    		//this.paused = false;
    	},

    	setup: function(){
		  	//création du paquet de cartes
		  	let length = cartes.length;
		  	for (var i = 0; i < length; i++) {
          		//premiere carte
          		let card = cartes[0];
         	    // Pousse 2 copies dans le tableau deck
         	    this.deck.push(card,card);
       	  	    // Supprime le premier élément du tableau cartes
       	  	    cartes.shift();
       	  	}; 	
       	  },

       	  shuffle: function(array){
    	   /*
 		    * Randomize array element.
		    * Using Durstenfeld shuffle algorithm.
		    */
		    for (var i = array.length - 1; i > 0; i--) {
		    	var j = Math.floor(Math.random() * (i + 1));
		    	var temp = array[i];
		    	array[i] = array[j];
		    	array[j] = temp;
		    }
		    return array;
		},

		flip: function(){
			$(".container").on('click','.carte', function(){
				//this.counter = 0;
				let carte_click = $(this);
				//Memory.first_card = "";
			//Memory.second_card = "";
				//let match = false;
				
				if(Memory.counter <=2 && !carte_click.hasClass('flip')){
					//tourne la carte clickee
					carte_click.addClass('flip');
					Memory.counter++;
					console.log(Memory.counter);
					//Memory.flip_activated = true;
					if(Memory.counter==1){
						Memory.first_card = $('.carte.flip .back img').attr("src");
						console.log(Memory.first_card);

					}
					if(Memory.counter==2){
						//match=true;
					//if( Memory.counter == 2 && second_card === ""){
						Memory.second_card = carte_click.find(".back img").attr("src");
						console.log(Memory.second_card);
					}
					
				} 


				if(Memory.counter>2 && Memory.first_card === Memory.second_card){
					Memory.counter = 1;
					Memory.first_card ="";
					Memory.second_card ="";
					block=true
                    
				}
				//console.log($('.carte img').attr("src"));
				//console.log($('.carte.front.flip .back img').attr("src"));
				if(Memory.counter>2 && Memory.first_card !== Memory.second_card){
					console.log(carte_click.find(".back img").attr("src"));
					//Memory.flip_activated = false;
					Memory.counter = 1;
					//initialise toutes les cartes avec class flip
					$('.carte').removeClass('flip');
					//au troisieme click
					carte_click.addClass('flip');

					//Memory.counter++;
						//$('.carte.flip .front img').attr("src")=first_card;
						//console.log(first_card);



					}

				

			});
			
		},

		display: function(){
            //affichage des cartes
            for (var i = 0; i < 16; i++) {
            	$('<div>', {
            		'class':'carte',
            		'html':'<div class="front"><img src="assets/images/lock.png"></div><div class="back"><img src='+this.deck[i]+'></div>'
            	}).appendTo(".container");
            }
        },

};// end memory


let cartes = [
"assets/images/heart.png",
"assets/images/disquette.png",
"assets/images/malette.png",
"assets/images/temple.png",
"assets/images/help.png",
"assets/images/cup.png",
"assets/images/vinyl.png",
"assets/images/clock.png",
];

       //console.log( deck);
       //console.log( cartes);


    //let carte = $('.carte');
    //let container = $(".container");
    //let counter = 0;
    //let flip = false;


    Memory.init(cartes);





 //toggle "carte" to "cart flip"
   // $(".container").on('click','.carte', function(){
    //	$(this).toggleClass('flip', '');	
   // });
   
});

