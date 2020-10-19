/**
 * Parallax Scrolling Tutorial
 * For NetTuts+
 *  
 * Author: Mohiuddin Parekh
 *	http://www.mohi.me
 * 	@mohiuddinparekh   
 */


$(document).ready(function(){
	// Кешируем объект окна
	$window = $(window);
                
   $('section[data-type="background"]').each(function(){
     var $bgobj = $(this); // Назначаем объект
                    
      $(window).scroll(function() {
                    
		// Прокручиваем фон со скоростью var.
		// Значение yPos отрицательное, так как прокручивание осуществляется вверх!
		var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
		
		// Размещаем все вместе в конечной точке
		var coords = '50% '+ yPos + 'px';

		// Смещаем фон
		$bgobj.css({ backgroundPosition: coords });
		
	}); 

 });	

}); 
/* 
 * Создаем элементы HTML5 для IE
 */

document.createElement("article");
document.createElement("section");