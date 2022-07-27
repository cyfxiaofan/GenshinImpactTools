import AMapLoader from '@amap/amap-jsapi-loader';
import store from "@/store";
import config from '../../config'
import $api from '@/api'

let map: any

async function LoadMap(center: Array<number>, locationCallBack: any, editShow: boolean) {
    store.commit('setMapCenter', center)
    map = await AMapLoader.load({
        "key": config.gdTk,   // 申请好的Web端开发者Key，首次调用 load 时必填
        "version": "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": ['AMap.Geolocation', 'AMap.MarkerClusterer', 'AMap.ToolBar']  //插件列表
    }).then((AMap) => {
        map = new AMap.Map('container', {
            center: store.state.mapCenter,
            resizeEnable: true,
            zoom: 14,
            // zoomEnable: false,
            // zooms: [11, 11]
        });
        const startIcon = new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(25, 35),
            // 图标的取图地址
            image: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
            // 图标所用图片大小
            imageSize: new AMap.Size(25, 35),
        });
        // 将 icon 传入 marker
        let startMarker = new AMap.Marker({
            position: new AMap.LngLat(...center),
            icon: startIcon,
            offset: new AMap.Pixel(-13, -30)
        });
        map.add(startMarker)

        editShow && map.on('click', function (e: { lnglat: { getLng: () => string; getLat: () => string; }; }) {
            const _center = [e.lnglat.getLng(), e.lnglat.getLat()]
            store.commit('setMapCenter', _center)
            map.remove(startMarker)
            startMarker = new AMap.Marker({
                position: new AMap.LngLat(..._center),
                icon: startIcon,
                offset: new AMap.Pixel(-13, -30)
            });
            map.add(startMarker)
            map.setCenter([e.lnglat.getLng(), e.lnglat.getLat()])
            $api.GetReAmapLnglatList({ location: _center.join(','), batch: false, radius: 100 }).then((res) => {
                if (res.data.regeocode.formatted_address.length !== 0) {
                    locationCallBack(res.data.regeocode.formatted_address, _center)
                }
            })
        });
        return map

    }).catch(e => {
        console.log(e);
    })
    return map
}

export {
    LoadMap,
}