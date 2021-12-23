/**
 * 后台自定义表单中涉及到的JS触发
 * @作者 qinggan <admin@phpok.com>
 * @版权 深圳市锟铻科技有限公司
 * @网站 http://www.phpok.com
 * @版本 4.x
 * @授权 http://www.phpok.com/lgpl.html PHPOK开源授权协议：GNU Lesser General Public License
 * @日期 2018年01月18日
**/
;(function($){
	$._configForm = {
		text:function(id,val,ext_field,ext_layout)
		{
			if(id == 'form_btn'){
				$("#ext_quick_words_html,#ext_color_html,#ext_title_html").hide();
				if(val == '' || val == 'undefined'){
					$("#ext_quick_words_html").show();
					layui.form.render();
					return true;
				}
				if(val == 'color'){
					$("#ext_color_html").show();
					layui.form.render();
					return true;
				}
				var tmp = val.split(":");
				if(tmp[0] == 'title' && tmp[1]){
					var url = get_url('form','fields','pid='+tmp[1]);
					$.phpok.json(url,function(rs){
						if(!rs.status){
							var opt = '<option value="">'+rs.info+'</option>';
							$("#ext_field").html(opt);
							$("#ext_layout").html('<li>'+rs.info+'</li>');
							layui.form.render();
							return true;
						}
						var html = '<option value="">请选择…</option>';
						var layout = '';
						for(var i in rs.info){
							html += '<option value="'+i+'"';
							if(i == ext_field){
								html += ' selected';
							}
							html += '>'+rs.info[i]+'</option>';
							layout += '<li><input type="checkbox" lay-skin="primary" name="ext_layout[]" value="'+i+'"';
							if(ext_layout && ext_layout.indexOf(i)>-1){
								layout += ' checked';
							}
							layout += ' title="'+rs.info[i]+'" /></li>';
						}
						$("#ext_field").html(html);
						$("#ext_layout").html(layout);
						layui.form.render();
						return true;
					});
					$("#ext_title_html").show();
				}
				layui.form.render();
				return true;
			}
			if(id == 'eqt'){
				$("#ext_quick_type").val(val);
			}
			layui.form.render();
		},

		extitle:function(id,val,eid,etype)
		{
			if(id == 'form_pid'){
				if(!val || val == 'undefined' || val == '0'){
					$("#fields_show_html,#fields_used_html,#true_delete_html").hide();
					return true;
				}
				var url = get_url('form','project_fields','pid='+val);
				if(eid && eid != "undefined"){
					url += "&eid="+eid;
				}
				if(etype && etype != "undefined"){
					url += "&etype="+etype;
				}
				$.phpok.json(url,function(data){
					if(data.status){
						if(!data.info){
							$("#fields_show_html,#fields_used_html,#true_delete_html").hide();
							return true;
						}
						var slist = data.info.show;
						var html = '';
						for(var i in slist){
							html += '<input type="checkbox" name="form_show_editing[]" value="'+i+'"';
							if(slist[i].status){
								html += ' checked';
							}
							html += ' title="'+slist[i].title+'" />'
						}
						$("#fields_show").html(html);
						$("#fields_show_html,#true_delete_html").show();
						//使用数据
						var elist = data.info.used;
						html = '';
						for(var i in elist){
							html += '<input type="checkbox" name="form_field_used[]" value="'+i+'"';
							if(elist[i].status){
								html += ' checked';
							}
							html += ' title="'+elist[i].title+'" />'
						}
						$("#fields_used").html(html);
						$("#fields_used_html,#true_delete_html").show();
						layui.form.render();
						return true;
					}
					$("#fields_show_html,#fields_used_html,#true_delete_html").hide();
					$.dialog.alert(data.info);
					layui.form.render();
					return false;
				});
				return true;
			}
			if(id == 'form_is_single'){
				if(val == 1){
					$("#form_maxcount_li").hide();
					$("#form_maxcount").val(1);
				}else{
					$("#form_maxcount_li").show();
					$("#form_maxcount").val(20);
				}
				return true;
			}
		},

		/**
		 * 表单选择器，对表单内容进行格式化操作
		 * @参数 val 选择的表单类型
		 * @参数 id 要写入的HTML字段
		 * @参数 eid 已存在值
		 * @参数 etype 值的来源
		**/
		option:function(val,id,eid,etype)
		{
			if(!val || val == "undefined"){
				$("#"+id).html("").hide();
				return false;
			}
			var url = get_url("form","config","id="+$.str.encode(val));
			if(eid && eid != "undefined"){
				url += "&eid="+eid;
			}
			if(etype && etype != "undefined"){
				url += "&etype="+etype;
			}
			$.phpok.ajax(url,function(rs){
				if(rs && rs != 'exit'){
					$("#"+id).html(rs).show();
					layui.form.render();
				}
			});
		}
	}
})(jQuery);