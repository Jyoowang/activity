window.onload = function(){

	
  	  	document.onscroll = function(){
  	  		debugger;
  	  		var star = document.documentElement.scrollTop||document.body.scrollTop;
  	  		var fixed_top = document.getElementById('fixed_top');
  	  		if (star>100) {
  	  			fixed_top.style.backgroundColor = 'red';
  	  			
  	  		}
  	  	}

  	  }