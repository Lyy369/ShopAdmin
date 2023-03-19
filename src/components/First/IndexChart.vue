<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';
import { getStatistics3 } from "@/api/index"
import { useResizeObserver } from '@vueuse/core'

const current = ref("week")
const options = [{
    text: "近1个月",
    value: "month"
}, {
    text: "近1周",
    value: "week"
}, {
    text: "近24小时",
    value: "hour"
}]

//进行图表切换，重新渲染图表
const handleChoose = (type: any) => {
    current.value = type
    getData()
}
const el = ref(null)
useResizeObserver(el, (entries) => myChart.resize())

//初次加载charts图表
var myChart: any = null
onMounted(() => {
    var chartDom = document.getElementById('chart');
    if (chartDom) {
        myChart = echarts.init(chartDom);
        getData()
    }
})

//获取数据，渲染图表单的方法
function getData() {
    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    myChart.showLoading()
    getStatistics3(current.value).then(res => {
        option.xAxis.data = (res as any).x
        option.series[0].data = (res as any).y
        myChart.setOption(option)
    }).finally(() => {
        myChart.hideLoading()
    })
}

//组件销毁，需要销毁图标
onBeforeUnmount(() => {
    if (myChart) echarts.dispose(myChart)
})
</script>

<template>
    <el-card shadow="never">

        <!-- 上半部分 -->
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单统计</span>
                <div>
                    <el-check-tag v-for="(item, index) in options" :key="index" :checked="current == item.value"
                        style="margin-right: 8px" @click="handleChoose(item.value)">{{ item.text }}</el-check-tag>
                </div>
            </div>
        </template>

        <!-- echarts图表 -->
        <div ref="el" id="chart" style="width: 100%;height: 300px;"></div>
    </el-card>
</template>

<style scoped></style>