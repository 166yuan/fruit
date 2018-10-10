requirejs.config({
	baseUrl:'js',
	paths:{
		zepto:'lib/zepto.min',
		vue:'lib/vue.min',
		domready:'lib/domReady'
	}
})

require(['domready!','zepto','vue'], function(doc,$,Vue) {
	
	var HOST = '112.74.129.253'

	/*Vue 组件*/
	var indexCtrl = new Vue({
		el : '#indexCtrl',
		data:{
			areaData : [],
			areaName : '华农'
		},
		ready: function(){
			_this = this
			$.get("http://"+HOST+"/admin.php/Home/Area/readall",function(data){
				var data = JSON.parse(data)
				if(data.status == 1){
					_this.areaName = data.data[0].name
					_this.areaData = data.data
				}
			})

		},
		methods:{
			toggleList : function ( ) {
				$("#area-list").toggleClass("hidden")
			},
			switchArea : function ( item ) {
				this.areaName = item.name
				$("#area-list").toggleClass("hidden")
			}
		}
	})


})

