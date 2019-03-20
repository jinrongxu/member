require.config({
    paths: {
        "mui": "libs/mui.min"
    }
});
require(["mui"], function(mui) {
    function init() {
        getUser();
        addEvent()
    }
    const list = document.querySelector(".list");
    const addBox = document.querySelector(".addBox");
    const search = document.querySelector(".search");

    function getUser() {
        mui.ajax('/api/getUser', {
            dataType: 'json', //服务器返回json格式数据
            type: 'get', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(data) {
                render(data.data)
            }
        });
    }

    function render(data) {
        list.innerHTML = data.map(item => {
            return `<li class="mui-table-view-cell">
						<span>
							${item.name}
						</span>
						<button type="button" class="mui-btn mui-btn-blue look" data-src="${item._id}">查询</button>
						<button type="button" class="mui-btn mui-btn-red delete"data-src="${item._id}">删除</button>
					</li>`
        }).join("");
    };

    function addEvent() {
        //模糊搜索
        let timer;
        search.addEventListener("input", function() {
            mui.ajax('/api/search', {
                data: {
                    name: this.value
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'get', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                success: function(res) {
                    render(res.data)
                }
            });
        });
        //查询
        mui(".list").on("tap", ".look", function() {
            window.location.href = "../page/details.html?id=" + this.getAttribute("data-src");
        });
        //添加
        addBox.addEventListener("tap", function() {
            window.location.href = "../page/add.html"
        });
        //删除
        mui(".list").on("tap", ".delete", function() {
            var that = this;
            mui.confirm("确定删除吗", '警告', ['取消', '确认'], function(e) {
                if (e.index) {
                    mui.ajax('/api/delete', {
                        data: {
                            id: that.getAttribute("data-src")
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'get', //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        success: function(data) {
                            mui.alert(data.msg, '提示', function(e) {
                                that.parentNode.remove()
                            })
                        }
                    });
                }
            })

        });
    }
    init();
})