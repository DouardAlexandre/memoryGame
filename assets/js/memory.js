$(document).ready(function(){

    /**
    * Memory Game
    */

    let Memory = {

    	init: function(cards){
    		//clone de cards
    		this.cartes = cards.slice(0);
    		console.log(cards);
    		this.counter = 0;
    		this.deck = [];
    		this.first_card = "";
    		this.second_card = "";
    		this.setup();
    		this.shuffle(this.deck);
    		this.flip();
    		this.display();
    	},

    	setup: function(){
		  	//création du paquet de cartes
		  	let length = this.cartes.length;
		  	for (var i = 0; i < length; i++) {
          		//premiere carte
          		let card = this.cartes[0];
         	    // Pousse 2 copies dans le tableau deck
         	    this.deck.push(card,card);
       	  	    // Supprime le premier élément du tableau cartes
       	  	    this.cartes.shift();
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
				let carte_click = $(this);
				if(Memory.counter <=2 && !carte_click.hasClass('flip')){
					//tourne la carte clickee
					carte_click.addClass('flip');
					Memory.counter++;
					//src premiere carte
					if(Memory.counter==1){
						Memory.first_card = $('.carte.flip .back img').attr("src");
					}
					//src deuxieme carte
					if(Memory.counter==2){
						Memory.second_card = carte_click.find(".back img").attr("src");
					//modal
					let all_cards = $('.carte.flip').length;
					if(Memory.deck.length == all_cards ){
						$('#modal').modal({backdrop: 'static', keyboard: false});
					}
				}	
			} 
                //si les cartes sont identiques
                if(Memory.counter>2 && Memory.first_card === Memory.second_card){
                	Memory.counter = 1;
                	//reset cartes
                	Memory.first_card ="";
                	Memory.second_card ="";
                	//ajout de la classe block à toutes les cartes tournées 
                	$('.carte.flip').addClass('block');
                	//sauf la derniere (premiere carte au compteur)
                	carte_click.removeClass('block');
                }
                //si les cartes sont differentes
                if(Memory.counter>2 && Memory.first_card !== Memory.second_card){
                	//premiere carte
                	Memory.first_card = carte_click.find(".back img").attr("src");
                	Memory.counter = 1;
					//tourne les cartes de classe flip sauf celles classe block 
					$('.carte.flip:not(".block")').removeClass('flip');
					//au troisieme click
					carte_click.addClass('flip');
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

let cards = [
"assets/images/heart.png",
"assets/images/disquette.png",
"assets/images/malette.png",
"assets/images/temple.png",
"assets/images/help.png",
"assets/images/cup.png",
"assets/images/vinyl.png",
"assets/images/clock.png",
];

$("button").click(function() {
	$(".carte").remove();
	$('#modal').modal('hide');
	Memory.init(cards);
	console.log(cards);
});
Memory.init(cards);
});

