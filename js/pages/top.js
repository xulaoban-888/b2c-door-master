const b2cTop = {
    template: "\
    <div class='nav-top'> \
     <shortcut/>\
        <!--头部--> \
        <div class='header' id='headApp'> \
            <div class='py-container'> \
                <div class='yui3-g Logo'> \
                    <div class='yui3-u Left logoArea'> \
                        <a class='logo-bd' title='全品' href='index.html' target='_blank'></a> \
                    </div> \
                    <div class='yui3-u Center searchArea'> \
                        <div class='search'> \
                            <form action='' class='sui-form form-inline'> \
                                <!--searchAutoComplete--> \
                                <div class='input-append'> \
                                    <input type='text' id='autocomplete' v-model='key' \
                                           class='input-error input-xxlarge'/> \
                                    <button @click='search' class='sui-btn btn-xlarge btn-danger' type='button'>搜索</button> \
                                </div> \
                            </form> \
                        </div> \
                        <div class='hotwords'> \
                            <ul> \
                                <li class='f-item'>全品首发</li> \
                                <li class='f-item'>亿元优惠</li> \
                                <li class='f-item'>9.9元团购</li> \
                                <li class='f-item'>每满99减30</li> \
                                <li class='f-item'>亿元优惠</li> \
                                <li class='f-item'>9.9元团购</li> \
                                <li class='f-item'>办公用品</li> \
                            </ul> \
                        </div> \
                    </div> \
                    <div class='yui3-u Right shopArea'> \
                        <div class='fr shopcar'> \
                            <div class='show-shopcar' id='shopcar'> \
                                <span class='car'></span> \
                                <a class='sui-btn btn-default btn-xlarge' href='cart.html' target='_blank'> \
                                    <span>我的购物车</span> \
                                    <i class='shopnum'>{{num}}</i> \
                                </a> \
                                <div class='clearfix shopcarlist' id='shopcarlist' style='display:none'> \
                                    <p>'啊哦，你的购物车还没有商品哦！'</p> \
                                    <p>'啊哦，你的购物车还没有商品哦！'</p> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
                <div class='yui3-g NavList'> \
                    <div class='yui3-u Left all-sort'> \
                        <h4>全品精品</h4> \
                    </div> \
                    <div class='yui3-u Center navArea'> \
                        <ul class='nav'> \
                            <li class='f-item'>服装城</li> \
                            <li class='f-item'>美妆馆</li> \
                            <li class='f-item'>品优超市</li> \
                            <li class='f-item'>全球购</li> \
                            <li class='f-item'>闪购</li> \
                            <li class='f-item'>团购</li> \
                            <li class='f-item'>有趣</li> \
                            <li class='f-item'><a href='seckill-index.html' target='_blank'>秒杀</a></li> \
                        </ul> \
                    </div> \
                    <div class='yui3-u Right'></div> \
                </div> \
            </div> \
        </div>\
       </div> \
      ",
    name:'b2c-top',
    data() {
        return {
            key: "",
            query: location.search,//全局搜素
            cartList:[], //购物车的sku数据
            b2c,
            num:0,
        }
    },
    methods: {
        search() {
            window.location = 'search.html?key=' + this.key;
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        },
        //获取购物车数据,在我的购物车展示数量
        getCartList(){
            //调用common.js中公共方法 校验用户是否登录的
            b2c.verifyUser().then(() =>{
                //已登录
                b2c.http.get("/cart/queryCartList").then(resp=>{
                    this.cartList = resp.data;
                    //调用商品数量方法
                    this.allCartNum();
                })
            }).catch(() =>{
                // 未登录从本地获得
                //获得本地库购物车(浏览器购物车)localstorage的数据,完成赋值
                this.cartList = b2c.store.get("cartList") || [];
                this.allCartNum();
            })
        },
        //在全局组件,获取购物车商品数量
        allCartNum(){
            this.cartList.map(cart=>{
                this.num += cart.num;
            })
        }
    },
    created() {
        this.key = this.getUrlParam("key");
        this.getCartList();//调用获取购物车数据方法
    },
    components: {
        shortcut:() => import('./shortcut.js')
    }
}
export default b2cTop;