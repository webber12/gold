// проверка Email на валидность
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

$(document).ready(function(){

$("input,select").styler();

$("form.submitter").on("submit",function(e){
	e.preventDefault();
	var a=$(this);
	var error='';
	a.find(".required").each(function(){
		if($(this).val() == ''){
			$(this).addClass("invalid");
			error = 'Поле не заполнено';
			$(this).parent().append("<span class='field_err'><span class='pic'></span>" + error + "</span>");
		}
		if($(this).hasClass("email")){
			validEmail=isValidEmailAddress($(this).val());
			if (!validEmail) {
				$(this).addClass("invalid");
				error = 'Неверный формат E-mail';
				$(this).parent().append("<span class='field_err'><span class='pic'></span>" + error + "</span>");
			}
		}
	})
	a.find("select.required2").each(function(){
		if($(this).val()=='0'){$(this).parent().addClass("invalid");error='err';}
	})
	if(error==''){
		/*var data2=$(this).serialize();
		var qr='q=assets/snippets/ajax/sender.php&'+data2;
		$.ajax({
			url: "index-ajax.php",                                   
			data: qr,
			type: "POST",   
			beforeSend:function(){
				
			},                   
			success: function(msg){
				if (msg == 'ok') {
					$("#zapros_info").html("Ваш запрос успешно отправлен");
				} else {
					alert('Ошибка на сервере. Попробуйте позднее');
				}
			}
		})*/
	}
})


$("input").on("keyup change",function(e){
	if($(this).hasClass("invalid")){
		$(this).removeClass("invalid");
		$(this).parent().find(".field_err").remove();
	}
});
$("textarea").on("keyup change",function(e){
	if($(this).hasClass("invalid")){
		$(this).removeClass("invalid");
	}
});

$(".topcart_info").hover(
function(){
	$(this).addClass("active");
	$(this).find(".topcart_extended_container").show();
}, 
function(){
	$(this).removeClass("active");
	$(this).find(".topcart_extended_container").hide();
})


$(".top_menu_list").on("mouseenter", ".sm", function(){
	if (!$(this).hasClass("hover")) {
		$(".sm").removeClass("hover");
		$(this).addClass("hover");
		var submenuBlock = $(this).data("submenuBlock");
		if (!$(".top_submenu").hasClass("active")) {
			$(".top_submenu").addClass("active").show();
		}
		$(".top_menu_list  .top_submenu .top_submenu_block").hide();
		$("#" + submenuBlock).show();
		
	}
}).on("mouseleave", function(){
	$(".sm").removeClass("hover");
	$(".top_menu_list  .top_submenu .top_submenu_block").hide();
	$(".top_menu_list  .top_submenu").removeClass("active").hide();
})

$("#uk-offcanvas-bar").on("click", ".sm a", function(e){
	e.preventDefault();
	$("#uk-offcanvas-bar .sm").removeClass("hover");
	$(this).parent().addClass("hover");
	var block = $(this).parent().data("submenuBlock");
	if (!$("#uk-offcanvas-bar").hasClass("active")) {
		$("#uk-offcanvas-bar").addClass("active");
	}
	$("#canvas-menu .sub-block").hide();
	$("."+block).show();
	
})

$(".catalog_filter_zagol").on("click", function(){
	$(".catalog_filter").toggleClass("active");
	$("#catalog_filter_zagol_arrow").toggleClass("uk-icon-chevron-down");
})

$(".cart_zagol_tovar_toggle").on("click", function(){
	$(".cart_form2_right").toggleClass("active");
	$("#catalog_filter_zagol_arrow").toggleClass("uk-icon-chevron-down");
})

$("#get_sub_menu_for_catalog_filter").on("click", "a", function(e){
	e.preventDefault();
	var submenu = $(this).parent().data("getMenu");
	$(".catalog_filter .submenu").hide();
	$("#get_sub_menu_for_catalog_filter").hide();
	$(".catalog_filter .submenu_"+submenu).show();
})

$(".catalog_subfilter_go_back").on("click", function(){
	var parent = $(this).data("parentCatalogId");
	$(".catalog_filter .submenu").hide();
	$("#"+parent).show();
})

$(".left_menu .with_subs").on("click", "a", function(e){
	e.preventDefault();
	$(this).parent().toggleClass("clicked");
})

$(".tovar_tabs .tovar_tab").on("click", function(){
	if (!$(this).hasClass("active")) {
		var tab = $(this).data("tovarTabContent");
		$(".tovar_tabs .tovar_tab").removeClass("active");
		$(this).addClass("active");
		$(".tovar_tabs_content .content_tab").removeClass("active");
		$("#content_" + tab).addClass("active");
	}
})

$(".cart_count_btn").on("click", function(e){
	e.preventDefault();
	var f = $(this).data("countField");
	var v = parseInt($("#"+f).val(), 10);
	if ($(this).hasClass("cart_count_plus")) {
		v += 1;
		$("#"+f).val(v);
	} else {
		if (v > 1) {
			v -= 1;
			$("#"+f).val(v);
		}
	}
})

$(".pretty_selector_option").on("click", function(){
	var targetId = $(this).data("targetId");
	var targetName = $(this).data("targetName");
	var targetValue = $(this).data("targetValue");
	var v = $(this).html();
	$("#" + targetId).find("span.value").html(v);
	$("input[name='" + targetName + "']").val(targetValue);
	$(this).parent().hide();
	$(this).parent().parent().removeClass("active");
})

$(".pretty_selector span.value").on("click", function(){
	var p = $(this).parent();
	if (!p.hasClass("active")) {
		p.addClass("active");
		p.find(".pretty_selector_options").show();
	} else {
		p.removeClass("active");
		p.find(".pretty_selector_options").hide();
	}
})

$("a.ins_big_image").on("click", function(e){
	e.preventDefault();
	$("a.ins_big_image").removeClass("active");
	$(this).addClass("active");
	var targetImage = $(this).data("targetImage");
	var midImage = $(this).data("midImage");
	var bigImage = $(this).attr("href");
	$("#" + targetImage).attr("src", midImage);
	$("#" + targetImage).parent().attr("href", bigImage);
	var lightbox = UIkit.lightbox( $("#" + targetImage).parent() );
	lightbox.init();
})

$("input[name='phone_prefix']").on("keyup", function(){
	var v = $(this).val().replace(/\D/, '');
	if (v.length >= 3) {
		$(this).blur();
		$(this).parent().parent().find("input[name='phone_num']").focus();
	}
})


function showInfo(id, delay, show) {
	var inf = $("#" + id);
	setTimeout(function(){
		inf.fadeIn("fast", function(){
			setTimeout(function(){inf.fadeOut("slow")}, show)
		})
	}, delay);
}

$("#informers_block .informer").each(function(){
	var id = $(this).attr("id");
	var timeDelay = $(this).data('timeDelay') ? $(this).data('timeDelay') * 1000 : 0;
	var timeShow = $(this).data('timeShow') ? $(this).data('timeShow') * 1000 : 5000;
	showInfo(id, timeDelay, timeShow);
})

$("#totop").on("click", function(e){
    e.preventDefault();
    var curPos = $(document).scrollTop();
    /*var scrollTime = curPos/2;*/
    var scrollTime = 1000;
    $("body,html").animate({"scrollTop":0}, scrollTime);
})

$(window).scroll(function() {
    var sd = $(window).scrollTop();
    if (sd > 700) {
        $("#totop").fadeIn();
    } else {
        $("#totop").fadeOut();
    }
})

})
	
	