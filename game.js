(function(fileds) {
    function cl(id) { // Проверка бомбы по ID
        x = document.getElementById(id);
        if (x){
            if(x.className.indexOf('bomb')!=-1) return 1;
            else return 0;
        }
        else return 0;
    }

    var bombs = 0;
    var level = 10; // Уровень сложности: низкий (4), средний (10), сложный (15+).
    
    for (i = 0; i < fileds; i++) { 
        r = document.createElement('div');
        if (Math.random() * fileds < level) { // "Раскидывание" закрытых бомб по полю. 
            r.className = 'bomb close', document.getElementById('text').innerHTML = (++bombs) + ' bomb\'s';
        } else r.className = 'close'; // "Раскидывание" пустышек
        r.id = Math.floor(i / 10) + '_' + i % 10;
        document.body.appendChild(r);
    }
    
    for (o = 0; o < fileds; o++) { 
        i = Math.floor(o / 10), j = o % 10, num = 0, obj = document.getElementById(i + '_' + j); // Проходимся по каждой ячейке
        for (k = 0; k < 9; k++) num += cl((i - (Math.floor(k / 3) - 1)) + '_' + (j - (k % 3 - 1))); // Установка уровня опасности, в зависимости от наличия бомб(ы) вокруг ячейки
        if (num == 0) obj.innerHTML = '&nbsp;'; // Если вокруг всё чисто, то ячейка пустая
        else obj.innterHTML = num; // Если же нет, то ячейка хранит определённое число
        obj.onclick = function() { // Открыть ячейку или ячейки при нажатии ЛКМ
            mix = this.id.split('_'), open(mix[0], mix[1]);
        }
        obj.oncontextmenu = function() { // Поставить флаг при нажатии ПКМ
            if (this.className.indexOf('flag') != -1) this.className = this.className.replace(/ flag/, '');
            else this.className = this.className + ' flag'; 
            return false;
        }
    }

    function open(i, j) { // функция открытия ячейки
        dom = document.getElementById(i + '_' + j); // Вытаскиваем элемент со страницы
        if (!dom || dom.className.indexOf('close') == -1) return;
        if (dom.className.indexOf('bomb') != -1) { // Если ячейка - бомба
            divs = document.getElementsByTagName('div'); 
            for (i = 0; i < divs.length; i++) { // Раскрываем все ячейки
                if (divs[i].className.indexOf('bomb') != -1) divs[i].className = 'bomb';
                else divs[i].className = ''
            }
            alert('Подорвался!'); // Пишем сообщение о проигрыше
        } else { // Если это не бомба
            dom.className = ''; 
            var elems = document.getElementsByTagName('div'),
                len = 0; 
            for (ki in elems) // для каждой ячейки
                if (elems[ki].className && elems[ki].className.indexOf('close') != -1) len++; //Подсчет кол-во закрытых ячеек
            if (len <= bombs) alert('Победа!'); // Если это кол-во меньше или равно кол-во бомб, то Победа
        }
        if (dom.innerHTML == '&nbsp;')
            for (var ks = 0; ks < 9; ks++) open(i - ((Math.floor(ks / 3) - 1)), j - (((ks % 3) - 1))); // (рекурсия) Если ячейка пустая, то октрываем все ячейки вокруг неё
    }
}(10*10)); // Поле 10х10