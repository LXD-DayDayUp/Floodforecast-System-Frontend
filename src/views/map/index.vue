<template>
    <div>
        <el-main>
            <el-card>
                <div class="amap-page-container">
                    <!-- 搜索框 -->
                    <el-amap-search-box class="search-box" :search-option="searchOption"
                        :on-search-result="onSearchResult"></el-amap-search-box>
                    <!-- 地图 -->
                    <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom"
                        :plugin="plugin" :events="events" class="amap-demo">
                        <!-- 标记 -->
                        <el-amap-marker v-for="(marker, index) in markers" :key="'marker' + index"
                            :position="marker.position" />
                        <!-- 位置名称显示 -->
                        <el-amap-text v-for="(marker, index) in markers" :key="'text' + index" :text="marker.text"
                            :offset="marker.offset" :position="marker.position" />
                    </el-amap>
                </div>
            </el-card>
        </el-main>
    </div>
</template>

<script>
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();
export default {
    data() {
        const self = this;
        return {
            address: null,
            searchKey: "西藏自治区",
            amapManager,
            markers: [],
            marker: "",
            searchOption: {
                city: "西藏自治区", //搜索范围
                citylimit: true, //限制搜索范围
                // city: "",
                // citylimit: false, // 不限制搜索范围搜索，比如想全国搜索
            },
            zoom: 15,
            lng: "",
            lat: "",
            center: [94.361436, 29.64875],
            // locate:false,
            loaded: false,
            events: {
                init: (o) => {
                    o.getCity((result) => {
                        console.log(result);
                        let par = document.getElementsByClassName("search-box-wrapper")[0];
                        console.log(par.firstChild);
                        par.firstChild.setAttribute(
                            "placeholder",
                            "您可以在这里输入要搜索的地址"
                        );
                        console.log(result);
                        //todo 定位到搜索位置
                        this.searchOption.city = result.city;
                    });
                },
                moveend: () => { },
                zoomchange: () => { },
                click: (e) => {
                    let { lng, lat } = e.lnglat
                    self.lng = lng
                    self.lat = lat

                    // 这里通过高德 SDK 完成。
                    var geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: 'all'
                    })
                    geocoder.getAddress([lng, lat], function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            if (result && result.regeocode) {
                                console.log(result);
                                self.address = result.regeocode.formattedAddress
                                self.markers = [];
                                const obj = {
                                    position: [lng, lat],
                                    text: result.regeocode.formattedAddress,
                                    offset: [0, 30],
                                };
                                self.markers.push(obj);
                                // self.sure();
                                self.$nextTick()
                            }
                        }
                    })
                },
            },
            // 一些工具插件
            plugin: [
                {
                    // 定位
                    pName: "Geolocation",
                    events: {
                        init(o) {
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                // console.log(JSON.stringify(result));
                                if (result && result.position) {
                                    self.lng = result.position.lng;
                                    self.lat = result.position.lat;
                                    self.address = result.formattedAddress;
                                    self.center = [self.lng, self.lat];
                                    let o = amapManager.getMap();
                                    if (!self.marker) {
                                        self.marker = new AMap.Marker({
                                            position: self.center,
                                        });
                                        self.marker.setMap(o);
                                    }
                                    self.marker.setPosition(self.center);
                                } else {
                                    self.$message.error("位置信息，获取失败！")
                                }
                            });
                        },
                    },
                },
                {
                    // 工具栏
                    pName: "ToolBar",
                    // locate:true, // 定位
                    // direction:true, // 方向键盘是否可见
                    liteStyle: true, // 精简模式

                    // position:"RB", // 位置，默认为LT 代表 左上方
                },
                // "Scale", // 比例尺
                {
                    // 地图类型
                    pName: "MapType",
                    defaultType: 0,
                    events: {
                        init(o) {
                            console.log(o);
                        },
                    },
                },
            ],
        };
    },
    created() {
        // this.searchByHand()
    },
    methods: {
        onSearchResult(pois) {
            if (pois.length > 0) {
                console.log(pois);
                let { lng, lat, name, location, address } = pois[0];
                //?显示
                this.markers = [];
                const obj = {
                    position: [lng, lat],
                    text: address + name,
                    offset: [0, 30],
                };
                this.markers.push(obj);
                this.address = address + name;

                let center = [lng, lat];
                this.lng = lng;
                this.lat = lat;
                this.center = [lng, lat];
                let o = amapManager.getMap();
                if (!this.marker) {
                    this.marker = new AMap.Marker({
                        position: center,
                    });
                    this.marker.setMap(o);
                }
                this.marker.setPosition(center);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.amap-demo {
  height: calc(100vh - 165px);
}
 
.search-box {
  position: absolute;
  top: 25px;
  right: 120px;
}
.amap-page-container {
  position: relative;
}
</style>>