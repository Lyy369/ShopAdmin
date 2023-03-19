<script setup lang="ts">
import { ref,computed } from "vue"
import {  useDateFormat } from '@vueuse/core'
import ShipInfoModal from "./ShipInfoModal.vue"
const props = defineProps({
    info:Object
})
const ship_time = computed(()=>{
    if((props.info as any).ship_data){
        const s = useDateFormat((props.info as any).ship_data.express_time * 1000,'YYYY-MM-DD HH:mm:ss')
        return s.value
    }
    return ""
})

const refund_status = computed(()=>{
    const opt:any = {
        pending:"未退款",
        applied:"已申请，等待审核",
        processing:"退款中",
        success:"退款成功",
        failed:"退款失败"
    }
    return (props.info as any).refund_status ? opt[(props.info as any).refund_status] : ""
})

const dialogVisible = ref(false)

const open = ()=>{
    dialogVisible.value = true
}

const ShipInfoModalRef = ref()
const loading = ref(false)
const openShipInfoModal = (id:any)=>{
    loading.value = true
    ShipInfoModalRef.value.open(id).finally(()=>loading.value = false)
}

defineExpose({
    open
})
</script>

<template>
    <el-drawer title="订单详情" v-model="dialogVisible" size="50%">
        <el-card shadow="never" class="mb-3">
            <template #header>
                <b class="text-sm">订单详情</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="订单号">
                   {{ (info as any).no }}
                </el-form-item>
                <el-form-item label="付款方式">
                    {{ (info as any).payment_method }}
                </el-form-item>
                <el-form-item label="付款时间">
                     {{ (info as any).paid_time }}
                </el-form-item>
                <el-form-item label="创建时间">
                     {{ (info as any).create_time }}
                </el-form-item>
            </el-form>
        </el-card>

        <el-card v-if="(info as any).ship_data" shadow="never" class="mb-3">
            <template #header>
                <b class="text-sm">发货信息</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="物流公司">
                   {{ (info as any).ship_data.express_company }}
                </el-form-item>
                <el-form-item label="运单号">
                    {{ (info as any).ship_data.express_no }}
                    <el-button type="primary" text size="small" @click="openShipInfoModal((info as any).id)" class="ml-3" :loading="loading">查看物流</el-button>
                    
                </el-form-item>
                <el-form-item label="发货时间">
                    {{ ship_time }}
                </el-form-item>
            </el-form>
        </el-card>

        <el-card shadow="never" class="mb-3">
            <template #header>
                <b class="text-sm">商品信息</b>
            </template>
            <div class="flex mb-2" v-for="(item,index) in (info as any).order_items" :key="index">
                <el-image :src="item.goods_item?.cover ?? ''" fit="fill" :lazy="true" style="width:60px;height:60px;"></el-image>
                <div class="ml-2 text-sm">
                    <p>{{ item.goods_item?.title ?? '商品已被删除' }}</p>
                    <p v-if="item.sku" class="mt-1">
                       <el-tag type="info" size="small">
                        {{ item.sku }}
                       </el-tag>
                    </p>
                    <p>
                        <b class="text-rose-500 mr-2">￥{{ item.price }}</b>
                        <span class="text-xs text-gray-500">x{{ item.num }}</span>
                    </p>
                </div>
            </div>
            <el-form label-width="80px">
                <el-form-item label="成交价">
                   <span class="text-rose-500 font-bold">￥{{ (info as any).total_price }}</span>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card shadow="never" v-if="(info as any).address" class="mb-3">
            <template #header>
                <b class="text-sm">收货信息</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="收货人">
                   {{ (info as any).address.name }}
                </el-form-item>
                <el-form-item label="联系方式">
                    {{ (info as any).address.phone }}
                </el-form-item>
                <el-form-item label="收货地址">
                     {{ (info as any).address.province + (info as any).address.city + (info as any).address.district + (info as any).address.address }}
                </el-form-item>
            </el-form>
        </el-card>

        <el-card shadow="never" v-if="(info as any).refund_status != 'pending'">
            <template #header>
                <b class="text-sm">退款信息</b>
                <el-button text disabled style="float: right;">{{ refund_status }}</el-button>
            </template>
            <el-form label-width="80px">
                <el-form-item label="退款理由">
                   {{ (info as any).extra.refund_reason }}
                </el-form-item>
            </el-form>
        </el-card>
    </el-drawer>

    <ShipInfoModal ref="ShipInfoModalRef" />
</template>
