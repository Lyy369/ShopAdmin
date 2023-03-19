import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

//消息提示
export function toast(message: string, type: any = "success", dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}

//登出提示
export function showModel(content = "提示内容", type: any = 'warning', title = '') {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type
        }
    )
}

//显示全屏loading
export function showFullLoading() {
    nprogress.start()
}

//隐藏全屏loading
export function hideFullLoading() {
    nprogress.done()
}

// 弹出输入框
export function showPrompt(tip: any, value = "") {
    return ElMessageBox.prompt(tip, '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value
    })
}

// 将query对象转成url参数
export function queryParams(query: any) {
    let q = []
    for (const key in query) {
        if (query[key]) {
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join("&")
    r = r ? ("?" + r) : ""
    return r
}

// 上移
export function useArrayMoveUp(arr: any, index: any) {
    swapArray(arr, index, index - 1)
}

// 下移
export function useArrayMoveDown(arr: any, index: any) {
    swapArray(arr, index, index + 1)
}

function swapArray(arr: any, index1: any, index2: any) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
}

// sku排列算法
export function cartesianProductOf(...rest:any[]) {
    return Array.prototype.reduce.call(rest, function (a: any, b: any) {
        var ret: any[] = [];
        a.forEach(function (a: any) {
            b.forEach(function (b: any) {
                ret.push(a.concat([b]));
            });
        });
        return ret;
    }, [
        []
    ]);
}