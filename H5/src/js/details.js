require.config({
    paths: {
        "mui": "libs/mui.min"
    }
});
require(["mui"], function(mui) {
    const add = window.location.search.split("=")[1]

    function init() {
        getOne();
    }
    init();

    function getOne() {

        mui.ajax('/api/getOne', {
            data: {
                id: add
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'get', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(res) {
                render(res.data)
            }
        });
    }

    function render(data) {
        document.querySelector(".list").innerHTML = data.map(item => {
            return ` <form class="mui-input-group">
						<div class="mui-input-row">
							<label>姓名</label>
							<input type="text" class="mui-input-clear" placeholder="${item.name}">
						</div>
						<div class="mui-input-row">
							<label>性别</label>
							<input type="text" class="mui-input-clear" placeholder="${item.sex}">
						</div>
						<div class="mui-input-row">
							<label>年龄</label>
							<input type="text" class="mui-input-clear" placeholder="${item.age}">
						</div>
						<div class="mui-button-row">
							<button type="button" class="mui-btn mui-btn-primary afrim">修改</button>
							<button type="button" class="mui-btn mui-btn-danger  cancel">取消</button>
						</div>
					</form>`
        });
        addEvent()
    }

    function addEvent() {
        const ipt = document.querySelectorAll(".mui-input-clear");
        document.querySelector(".afrim").addEventListener("tap", function() {
            mui.confirm('确定修改吗', '提示', ['取消', '确认'], function(e) {
                if (e.index) {
                    mui.ajax('/api/upDate', {
                        data: {
                            id: add,
                            name: ipt[0].value || ipt[0].placeholder,
                            sex: ipt[1].value || ipt[1].placeholder,
                            age: ipt[2].value || ipt[2].placeholder
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'get', //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        success: function(res) {
                            mui.alert(res.msg, '提示', function(e) {
                                window.location.href = "../index.html";
                            })
                        }
                    });
                }
            })
        });
        document.querySelector(".cancel").addEventListener("tap", function() {
            window.location.href = "../index.html"
        })
    }
})