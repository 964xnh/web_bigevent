$(function () {
    var form = layui.form
    var layer = layui.layer
    // 设置验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })


    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            URL: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                // 调用form.val()快速给表单赋值
                form.val('formUserInfo', res.data)
            }

        })
    }

    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            URL: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')

                // 调用父页面中的方法，重新渲染用户头像和用户信息
                window.parent.getUserInfo()
            }
        })
    })
})