
let myAjax = (obj) => {
    let defaults = {
        type: "get",
        url: "#",
        dataType: "json",
        data: {},
        async: true,
        success: function (result) {
            console.log(result);
        }
    };
    //obj属性覆盖
    //1、 如果有一些属性只存在obj中， 会给defaults中增加属性
    //2、 如果有一些属性在obj和defaults中都存在， 会将defaults中的默认值覆盖
    //3、 如果有一些属性只在defaults中存在， 在obj中不存在，这时候defaults中将保留预定义的属性
    for (let key in obj) {
        defaults[key] = obj[key];
    }

    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    let params = "";
    for (let attr in defaults.data) {
        params += attr + "=" + defaults.data[attr] + "&";
    }
    if (params) {
        params = params.substring(0, params.length - 1);
    }
    if (defaults.type === "get") {
        defaults.url += "?" + params;
    }
    xhr.open(defaults.type, defaults.url, defaults.async);
    if (defaults.type === "get") {
        xhr.send(null);
    }else if (defaults.type === "get") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }

    if (defaults.async) {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let result = null;
                    if (defaults.dataType === "json") {
                        result = this.responseText;
                        result = JSON.parse(result);
                    } else if (defaults.dataType === "XML") {
                        result = this.responseXML
                    } else {
                        result = this.responseText
                    }

                    defaults.success(result);
                }
            }
        }
    } else {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let result = null;
                if (defaults.dataType === "json") {
                    result = xhr.responseText;
                    result = JSON.parse(result);
                } else if (defaults.dataType === "XML") {
                    result = xhr.responseXML
                } else {
                    result = xhr.responseText
                }

                defaults.success(result);
            }
        }
    }
};


function myAjaxThan(obj) {  
    let defaults = {
        type: "get",
        url: "#",
        dataType: "json",
        data: {},
        async: true,
    };
    for (let key in obj) {
        defaults[key] = obj[key];
    }

    return new Promise((resolve, reject) => {
        let xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    
        let params = "";
        for (let attr in defaults.data) {
            params += attr + "=" + defaults.data[attr] + "&";
        }
        if (params) {
            params = params.substring(0, params.length - 1);
        }
        if (defaults.type === "get") {
            defaults.url += "?" + params;
        }
        xhr.open(defaults.type, defaults.url, defaults.async);
        if (defaults.type === "get") {
            xhr.send(null);
        }else if (defaults.type === "get") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    
        if (defaults.async) {
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        let result = null;
                        if (defaults.dataType === "json") {
                            result = this.responseText;
                            result = JSON.parse(result);
                        } else if (defaults.dataType === "XML") {
                            result = this.responseXML
                        } else {
                            result = this.responseText
                        }
    
                        resolve(result)
                    } else {
                        reject(xhr.status)
                    }
                }
            }
        } else {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let result = null;
                    if (defaults.dataType === "json") {
                        result = xhr.responseText;
                        result = JSON.parse(result);
                    } else if (defaults.dataType === "XML") {
                        result = xhr.responseXML
                    } else {
                        result = xhr.responseText
                    }
    
                    resolve(result)
                }else {
                    reject(xhr.status)
                }
            }
        }
    }) 
} 


myAjaxThan({
    type: "get",
    url: "https://tianqiapi.com/free/day",
    data: {
        appid: 86278892,
        appsecret: "xF5mLmVc",
        city: result
    },
}).then(function(value) {
    console.log(value);
})