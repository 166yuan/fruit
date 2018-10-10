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
		var reg = new Vue({
			el : '#registerArea',
			data : {
				nickName:'',
				phoneNumber:'',
				password:'',
				verifyCode:'',
				errorPhone:'',
				errorName:'',
				errorCode:'',
				errorPass:'',
				errorCss:'',
				unClick:true,
				count:60
			},
			methods : {
				enableRegister:function () {
					if (this.nickName&&this.phoneNumber&&this.password&&this.verifyCode){
						this.unClick = false
					}else{
						this.unClick = true
					}
				},
				register:function () {
					if (this.nickName&&this.phoneNumber&&this.password&&this.verifyCode){
						var registerUrl = 'http://'+HOST+'/show.php/Home/Auth/register'
						$.post(registerUrl,{
							name:this.nickName,
							phone:this.phoneNumber,
							password:this.password,
							validate:this.verifyCode
						},function (data) {
							var result = JSON.parse(data)
							if(result.status==0){
								switch(result.code) {
									case 308:
										alert("验证码不正确")
										break;
									case 309:
										alert("用户已注册")
										break;
									case 310:
										alert("注册失败")
										break;	
								}
							}
						})
					}else{
						alert('请完善以上信息')
					}
				},
				getCode:function ( e ) {
					function setTime(target) {
						
						if(_this.count==0){
							target.removeAttribute('disabled')
							_this.count = 60;
							$(target).text('获取验证码')
						}else{
							target.setAttribute("disabled", true)
							$(target).text("等待"+_this.count+"s")
							_this.count--;
							setTimeout(function () {
								setTime(target)
							},1000)  
						}

					} 

					if(this.phoneNumber==""){
						this.errorPhone='手机号码不能为空'
						this.errorCss='border:1px solid red'
						return
					}
					var _this = this
					setTime(e.target)
					
					var msgUrl = 'http://'+HOST+'/show.php/Home/Auth/validatecode'
					var _this = this
					$.post(msgUrl,{
						phone:_this.phoneNumber
					},function (data) {
						console.log(data)
					})
				},
				reset: function (target) {
					this['error'+target]=''
						this.errorCss=''
				}
			}
		})

	});