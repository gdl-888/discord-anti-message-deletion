// ==UserScript==
// @name                Anti Message Deletion
// @namespace     dsf
// @version         1
// @grant             none
// ==/UserScript==

(function() {
    Element.prototype._removeChild = Element.prototype.removeChild;
    Element.prototype.removeChild = function(el) {
        if (
            el &&
            el.getAttribute &&
			el.querySelector &&

            el.getAttribute('id') &&
            el.getAttribute('class') &&

            el.getAttribute('id').startsWith('chat-messages') && 
            el.getAttribute('class').match(/cozy/) && 
            el.getAttribute('class').match(/message/) &&

            !el.querySelector('div[class*="isSending"]')
        ) {
            var username = el.querySelector('div[class^="contents"] > h2[class^="header"] > span[class^="headerText"]');
            if(username) username.innerHTML += ' <font color="yellow">(Deleted)</font>';    /* Indicates as a deleted message but not removing content 삭제된 메시지임을 표시하지만 내용을 지웆 않는다. */
			else el.querySelector('div[class^="contents"] div[class^="markup"]').style.color = 'rgb(231, 76, 60)';
			
            return '*^^*';
        }
        
        return Element.prototype._removeChild.apply(this, arguments);
    }
})();
