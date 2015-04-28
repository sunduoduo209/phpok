<?php
/*****************************************************************************************
	文件： plugins/yuntongxun/uninstall.php
	备注： 卸载云通迅短信插件
	版本： 4.x
	网站： www.phpok.com
	作者： qinggan <qinggan@188.com>
	时间： 2015年04月22日 13时02分
*****************************************************************************************/
if(!defined("PHPOK_SET")){exit("<h1>Access Denied</h1>");}
class uninstall_yuntongxun extends phpok_plugin
{
	public $me;
	public function __construct()
	{
		parent::plugin();
		$this->me = $this->plugin_info();
		$this->tpl->assign('plugin',$this->me);
	}

	public function index()
	{
		$sql = "DROP TABLE ".$this->db->prefix."plugin_yuntongxun";
		$this->db->query($sql);
	}
}

?>