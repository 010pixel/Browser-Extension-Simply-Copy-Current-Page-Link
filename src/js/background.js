(function(){

	'use strict';

	let myBrowser = chrome || browser;
	let timer;

	myBrowser.browserAction.onClicked.addListener(function(activeTab) {
		copyText(activeTab.url);
		setCopiedBrowserIcon(true);
	});

	function copyText( text ) {
		let textElement = document.createElement('textarea');
		textElement.value = text;
		document.body.appendChild(textElement);
		textElement.select();
		document.execCommand('copy');
		document.body.removeChild(textElement);
	}

	function setCopiedBrowserIcon( setCopyIcon ) {
		let text = setCopyIcon ? "✓" : "";
		if ( timer ) clearTimeout(timer);
		myBrowser.browserAction.setBadgeText({ text: text }, function () {
			myBrowser.browserAction.setBadgeBackgroundColor({color:'#4CAF50'}, function() {
				if ( setCopyIcon ) {
					timer = setTimeout(setCopiedBrowserIcon, 1500);
				}
			});
		});
	}

})();