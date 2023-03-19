<script setup lang="ts">
import { ref } from 'vue'
import { getstatistics1, getStatistics2 } from '@/api/index'
import CounterTo from '@/components/First/CounterTo.vue';
import IndexNav from '@/components/First/IndexNav.vue';
import IndexChart from '@/components/First/IndexChart.vue';
import IndexCard from '@/components/First/IndexCard.vue';

const panels = ref([])
getstatistics1().then(res => {
    panels.value = (res as any).panels
})

const goods = ref([])
const order = ref([])
getStatistics2().then(res => {
    goods.value = (res as any).goods
    order.value = (res as any).order
})
</script>

<template>
    <div>
        <div>
            <!-- part1 -->
            <!-- 骨架屏 -->
            <el-row :gutter="20">
                <template v-if="panels.length == 0">
                    <el-col :span="6" v-for="i in 4" :key="i">
                        <el-skeleton style="width: 100%" animated loding>
                            <template #template>
                                <el-card shadow="hover">
                                    <template #header>
                                        <div class="flex justify-between">
                                            <el-skeleton-item variant="text" style="width: 50%" />
                                            <el-skeleton-item variant="text" style="width: 10%" />
                                        </div>
                                    </template>
                                    <span class="text-3xl font-bold text-gray-500">
                                        <el-skeleton-item variant="h3" style="width: 80%" />
                                    </span>
                                    <el-divider />
                                    <div>
                                        <div class="flex justify-between text-sm text-gray-500">
                                            <el-skeleton-item variant="text" style="width: 50%" />
                                            <el-skeleton-item variant="text" style="width: 10%" />
                                        </div>
                                    </div>
                                </el-card>
                            </template>
                        </el-skeleton>
                    </el-col>
                </template>
                <!-- 真实渲染 -->
                <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
                    <el-card shadow="hover">
                        <template #header>
                            <div class="flex justify-between">
                                <span class="text-sm">{{ (item as any).title }}</span>
                                <el-tag :type="(item as any).unitColor" effect="plain">{{ (item as any).unit }}</el-tag>
                            </div>
                        </template>
                        <span class="text-3xl font-bold text-gray-500">
                            <CounterTo :value="(item as any).value"></CounterTo>
                        </span>
                        <el-divider />
                        <div>
                            <div class="flex justify-between text-sm text-gray-500">
                                <span>{{ (item as any).subTitle }}</span>
                                <span>{{ (item as any).subValue }}</span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <IndexNav />

        <el-row :gutter="20" class="mt-5">
            <el-col :span="12" :offset="0">
                <IndexChart v-permission="['getStatistics3,GET']" />
            </el-col>
            <el-col :span="12" :offset="0" v-permission="['getStatistics2,GET']">
                <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" class="mb-3" />
                <IndexCard title="交易提示" tip="需要立即处理的交易订单" :btns="order" />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped></style>