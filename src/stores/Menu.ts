import { defineStore } from 'pinia';

const useMenu = defineStore("menu", {
    state: () => ({
        asideWidth:"250px",
        menus:[],
        ruleNames:[]
    }),
    actions: {
        hanldeAsideWidth(){
            this.asideWidth = this.asideWidth == "250px" ? '64px' : "250px"
        },
        SET_MENUS(menus:any){
             this.menus = menus
        },
        SET_RULENAMES(ruleNames:any){
            this.ruleNames = ruleNames
       }
    }
})

export default useMenu