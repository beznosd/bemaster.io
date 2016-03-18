if( Meteor.isClient ) {
	$(document).ready(function(){
	
		var t = {
			s : 0,
			m : 0,
			h : 0,
			secmetr : function() {
				if( this.s < 59 ) {
					this.s++;
				} else if( this.m < 59 ) {
					this.s = 0;
					this.m++;
				} else if ( this.m == 59 ) {
					this.s = 0;
					this.m = 0;
					this.h++;
				}
			}
		};

		var el = $('#timer');
		var flag = true;
		var i;


		$('#start_stop').click(function() {
			//alert('test');
			if (flag == true) {
				i = setInterval(echo, 1000);
				flag = false;
			} else {
				clearInterval(i);
				flag = true;
			}
		});

		function echo() {
			t.secmetr();
			el.text(t.h + ' : ' + t.m + ' : ' + t.s);
		}

	});
}