require.config({
    paths: {
        "mui": "libs/mui.min"
    }
});
require(["mui"], function(mui) {
    const afrim = document.querySelector(".afrim");
    const cancel = document.querySelector(".cancel");
    const ipts = document.querySelectorAll(".mui-input-clear");
    afrim.addEventListener("tap", function() {
        if (ipts[0].value != "" && ipts[1].value && ipts[2].value) {
            mui.ajax('/api/getAdd', {
                data: {
                    name: ipts[0].value,
                    age: ipts[1].value,
                    sex: ipts[2].value
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'get', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                success: function(res) {
                    mui.alert(res.msg, '提示', function() {
                        window.location.href = "../index.html"
                    })
                }
            });
        } else {
            mui.alert('不能为空', '警告')
        }
    });
    cancel.addEventListener("tap", function() {
        window.location.href = "../index.html"
    })
})