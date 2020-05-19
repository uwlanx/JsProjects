
        var content = document.getElementById('content');
        var button = document.getElementById('readMore');

        button.onclick = function () {
            if(content.className == 'open')
            content.className = '';
            button.innerHTML = 'read-more';
        }else{
            content.className = 'open';
            button.innerHTML = 'read-less';
        }    
   