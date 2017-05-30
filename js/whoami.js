/* mousetrap v1.3.2 craig.is/killing/mice */
(function(){function s(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)}function y(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return h[a.which]?h[a.which]:z[a.which]?z[a.which]:String.fromCharCode(a.which).toLowerCase()}function t(a,b){a=a||{};var c=!1,d;for(d in m)a[d]&&m[d]>b?c=!0:m[d]=0;c||(p=!1)}function A(a,b,c,d,g){var f,e,h=[],j=c.type;if(!l[a])return[];"keyup"==j&&u(a)&&(b=[a]);for(f=0;f<l[a].length;++f)if(e=
l[a][f],!(e.seq&&m[e.seq]!=e.level)&&j==e.action&&("keypress"==j&&!c.metaKey&&!c.ctrlKey||b.sort().join(",")===e.modifiers.sort().join(",")))d&&e.combo==g&&l[a].splice(f,1),h.push(e);return h}function v(a,b,c){if(!k.stopCallback(b,b.target||b.srcElement,c)&&!1===a(b,c))b.preventDefault&&b.preventDefault(),b.stopPropagation&&b.stopPropagation(),b.returnValue=!1,b.cancelBubble=!0}function w(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=y(a);if(b)if("keyup"==a.type&&x==b)x=!1;else{var c=[];
a.shiftKey&&c.push("shift");a.altKey&&c.push("alt");a.ctrlKey&&c.push("ctrl");a.metaKey&&c.push("meta");var c=A(b,c,a),d,g={},f=0,e=!1;for(d=0;d<c.length;++d)c[d].seq?(e=!0,f=Math.max(f,c[d].level),g[c[d].seq]=1,v(c[d].callback,a,c[d].combo)):!e&&!p&&v(c[d].callback,a,c[d].combo);a.type==p&&!u(b)&&t(g,f)}}function u(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}function B(a,b,c){if(!c){if(!q){q={};for(var d in h)95<d&&112>d||h.hasOwnProperty(d)&&(q[h[d]]=d)}c=q[a]?"keydown":"keypress"}"keypress"==
c&&b.length&&(c="keydown");return c}function C(a,b,c,d,g){r[a+":"+c]=b;a=a.replace(/\s+/g," ");var f=a.split(" "),e,h,j=[];if(1<f.length){var k=a,n=c;m[k]=0;n||(n=B(f[0],[]));a=function(){p=n;++m[k];clearTimeout(D);D=setTimeout(t,1E3)};c=function(a){v(b,a,k);"keyup"!==n&&(x=y(a));setTimeout(t,10)};for(d=0;d<f.length;++d)C(f[d],d<f.length-1?a:c,n,k,d)}else{h="+"===a?["+"]:a.split("+");for(f=0;f<h.length;++f)e=h[f],E[e]&&(e=E[e]),c&&("keypress"!=c&&F[e])&&(e=F[e],j.push("shift")),u(e)&&j.push(e);c=
B(e,j,c);l[e]||(l[e]=[]);A(e,j,{type:c},!d,a);l[e][d?"unshift":"push"]({callback:b,modifiers:j,action:c,seq:d,level:g,combo:a})}}for(var h={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},z={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},
F={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},E={option:"alt",command:"meta","return":"enter",escape:"esc"},q,l={},r={},m={},D,x=!1,p=!1,g=1;20>g;++g)h[111+g]="f"+g;for(g=0;9>=g;++g)h[g+96]=g;s(document,"keypress",w);s(document,"keydown",w);s(document,"keyup",w);var k={bind:function(a,b,c){a=a instanceof Array?a:[a];for(var d=0;d<a.length;++d)C(a[d],b,c);return this},unbind:function(a,b){return k.bind(a,
function(){},b)},trigger:function(a,b){if(r[a+":"+b])r[a+":"+b]({},a);return this},reset:function(){l={};r={};return this},stopCallback:function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.contentEditable&&"true"==b.contentEditable}};window.Mousetrap=k;"function"===typeof define&&define.amd&&define(k)})();

(function($){
	
	Mousetrap.bind('w h o a m i', function(e) {
	 	me(); 	    
	});
	
	Mousetrap.bind('up up down down left right left right b a enter', function(e) {
		me();
	});
	
	// HTML
	$('body').append(
		'<div class="whoami-wrapper" style="bottom: 0; left: 0; right: 0; top: 0; position: fixed; z-index: 999; background-color: rgba(0,0,0,.6); display: none;">' +
			'<div class="whoami-card" style="background-color: #fff; bottom: 0; height: 50%; left: 0; margin: auto; padding: 20px; position: absolute; right: 0; top: -200%; width: 50%; box-shadow: 0 0 12px #333; overflow-x: scroll;">' +
				'<span class="whoami-close" style="cursor :pointer; float: right; font-size: 3em; color: #CADDE1; position: relative; top: -20px; ">x</span>' +
				'<img src="https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-prn2/v/t1.0-9/946803_4956763404974_676364176_n.jpg?oh=2babfe0d751c5d299b4ea9c09f8fc4ad&oe=568A98E4&__gda__=1455956682_6423292827a36c5f91fc7002bd0423a3" style="max-width: 40%; height: auto; float: left; margin-right: 20px;" >' +
				'<h1 style="margin: 0; color: #3F3F3F; word-wrap: break-word; font-size: 3.5em; line-height: 50px; font-weight: 300;">Kenaz Nepomuceno</h1>' +
				'<p style="font-size: 1.5em; color: #7C7C7C; margin-top: 10px; margin-bottom: 66px">Web Developer / Designer</p>' +
				'<span style="font-size: 1.25em; display: block; color: #7C7C7C;"><a href="http://kenaz.co.nf" target="_blank" style="text-decoration: none; color: #009BE5;">Site</a> | <a href="http://behance.net/zanek" target="_blank" style="text-decoration: none; color: #009BE5;">Behance</a> | <a href="http://facebook.com/kenaz.nepomuceno" target="_blank" style="text-decoration: none; color: #009BE5;">Facebook</a></span>' +
				'<span style="font-size: 1em; display: block; color: #7C7C7C;"><a href="mailto:kenaznepomuceno@yahoo.com" style="text-decoration: none; color: #009BE5;">kenaznepomuceno@yahoo.com</a> | +63 9153077785<span>' +
				'<div style="clear: both"></div>' + 
			'</div><!-- whoami-card -->' + 
		'</div><!-- whoami-wrapper -->'
	);
 	

	// Close Card
	$('.whoami-close').on('click', function(e) {
		e.preventDefault();
		$('.whoami-card').animate({ top: '-200%' }, function() {
			$('.whoami-wrapper').fadeOut(500);
		});
	});

	function me() {
		
		$('.whoami-wrapper').fadeIn(500, function() {
			$('.whoami-card').animate({ top: 0 });
		});
	}
	
	// $.getScript('http://kenaz.co.nf/js/whoami.js');

})(jQuery);