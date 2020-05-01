<template>
    <div class="city_info" v-loading="loading"
         element-loading-text="正在载入数据"
         element-loading-spinner="el-icon-loading"
         >
        <div class="city">
            <div class="cityname">
                <div class="font-style city_name">{{city_name}}</div>
                <div class="select-city">
                    <span @click="drawer = true" class="change">[切换]</span>
                </div>

            </div>


            <div class="level">
                <div class="quality">
                    <el-tag v-if="aqi_index==='优'" style="background: #43CE17">优</el-tag>
                    <el-tag v-else-if="aqi_index==='良'" style="background: #EFDC31">良</el-tag>
                    <el-tag v-else-if="aqi_index==='轻度污染'"  style="background: #FFAA00">轻度污染</el-tag>
                    <el-tag v-else-if="aqi_index==='中度污染'" style="background: #FF401A">中度污染</el-tag>
                    <el-tag v-else-if="aqi_index==='重度污染'" style="background: #800080">重度污染</el-tag>
                    <el-tag v-else style="background:#9C0A4E">严重污染</el-tag>
                    <span class="date">数据更新时间：{{datetime}}</span>

                </div>

            </div>

        </div>

        <div class="text_info font-style">
            <ul class="text-ul">
                <li>
                    <span style="font-size: 76px">{{aqi}}</span>
                    <span class="aqi">AQI</span>
                </li>
                <li class="li-2">排行<span class="rand">{{rand}}</span>位，
                    击败了<span class="rand">{{getPercent}}%</span>的城市！
                </li>

            </ul>
        </div>
        <el-divider class="hr"></el-divider>

        <div class="data-info">
            <Pm25Item class="float" :pm25="pm25"></Pm25Item>
            <Pm10Item class="float" :pm10="pm10"></Pm10Item>
            <Itemcon class="float">
                <div slot="data-name" class="data-name">SO2</div>
                <div slot="data-value" class="data-value">{{so2}}</div>
            </Itemcon>
            <Itemcon class="float">
                <div slot="data-name" class="data-name">NO2</div>
                <div slot="data-name" class="data-value">{{no2}}</div>
            </Itemcon>
            <Itemcon class="float">
                <div slot="data-name" class="data-name">CO</div>
                <div slot="data-name" class="data-value">{{co}}</div>
            </Itemcon>
            <Itemcon class="float">
                <div slot="data-name" class="data-name">O3</div>
                <div slot="data-name" class="data-value">{{o3}}</div>
            </Itemcon>
        </div>


        <div class="weather" >
            <div class="wea-top">
                <div class="icon">
                    <img v-if="now.text=='多云'&&(hour>=6&&hour<19)" src="../../assets/img/weather/天气-多云.png" alt="">
                    <img v-else-if="now.text=='晴'&&(hour>=6&&hour<19)" src="../../assets/img/weather/天气-晴.png" alt="">
                    <img v-else-if="now.text=='晴'&&(hour<6||hour>=19)" src="../../assets/img/weather/天气-夜.png" alt="">
                    <img v-else-if="now.text=='多云'&&(hour<6||hour>=19)" src="../../assets/img/weather/天气-夜多云.png" alt="">
                    <img v-else-if="now.text=='阴'" src="../../assets/img/weather/天气-阴天.png" alt="">
                    <img v-else-if="now.text=='小雨'" src="../../assets/img/weather/天气-小雨.png" alt="">
                    <img v-else-if="now.text=='中雨'" src="../../assets/img/weather/天气-中雨.png" alt="">
                    <img v-else-if="now.text=='大雨'" src="../../assets/img/weather/天气-大雨.png" alt="">
                    <img v-else-if="now.text=='雷阵雨'" src="../../assets/img/weather/天气-雷雨.png" alt="">
                    <img v-else-if="now.text=='雾'" src="../../assets/img/weather/雾.png" alt="">
                    <img v-else-if="now.text=='小雪'" src="../../assets/img/weather/天气-小雪.png" alt="">
                    <img v-else-if="now.text=='中雪'" src="../../assets/img/weather/天气-中雪.png" alt="">
                    <img v-else-if="now.text=='大雪'" src="../../assets/img/weather/天气-大雪.png" alt="">
                    <img v-else-if="now.text=='雨夹雪'" src="../../assets/img/weather/天气-雨加雪.png" alt="">
                    <img v-else-if="now.text=='暴雪'" src="../../assets/img/weather/天气-暴雨.png" alt="">
                    <img v-else-if="now.text=='雾霾'" src="../../assets/img/weather/天气-雾霾.png" alt="">
                    <img v-else-if="now.text=='沙尘'" src="../../assets/img/weather/天气-沙尘.png" alt="">
                    <img v-else-if="now.text=='冰雹'" src="../../assets/img/weather/天气-冰雹.png" alt="">
                    <img v-else-if="now.text=='霜'" src="../../assets/img/weather/天气-霜.png" alt="">
                    <img v-else-if="now.text=='小雨转晴'" src="../../assets/img/weather/天气-小雨转晴.png" alt="">
                </div>
                <div class="des">
                    <span>{{now.text}}</span>
                </div>
            </div>
            <div class="temperature">
                <span>实时温度：{{now.temp}}℃</span>
            </div>
            <div class="feel_like">
                <span>体感温度：{{now.feels_like}}℃</span>
            </div>
            <div class="rh">
                <span>相对湿度：{{now.rh}}%</span>
            </div>
            <div class="wind">
                <span>{{now.wind_dir}}   {{now.wind_class}}</span>
            </div>
        </div>

        <el-drawer
                title="城市选择"
                :visible.sync="drawer"
                :with-header="false"
                :direction="direction"
        >
            <div class="title">
                <span>选择城市</span>
            </div>
            <div class="hot-city">
                    <dt>热门城市：</dt>
                    <dd>
                        <a href="?cityname=北京">北京</a>
                        <a href="?cityname=上海">上海</a>
                        <a href="?cityname=广州">广州</a>
                        <a href="?cityname=深圳">深圳</a>
                        <a href="?cityname=杭州">杭州</a>
                        <a href="?cityname=南京">南京</a>
                        <a href="?cityname=天津">天津</a>
                        <a href="?cityname=成都">成都</a>
                        <a href="?cityname=西安">西安</a>
                        <a href="?cityname=武汉">武汉</a>
                    </dd>
            </div>
            <div class="special">
                <dt>直辖市：</dt>
                <dd>
                    <a href="?cityname=北京">北京</a>
                    <a href="?cityname=上海">上海</a>
                    <a href="?cityname=天津">天津</a>
                    <a href="?cityname=重庆">重庆</a>
                </dd>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>A</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=阿坝州">阿坝州</a>
                    <a href="?cityname=阿克苏地区">阿克苏地区</a>
                    <a href="?cityname=阿拉善盟">阿拉善盟</a>
                    <a href="?cityname=阿勒泰地区">阿勒泰地区</a>
                    <a href="?cityname=阿里地区">阿里地区</a>
                    <a href="?cityname=安康">安康</a>
                    <a href="?cityname=安庆">安庆</a>
                    <a href="?cityname=安顺">安顺</a>
                    <a href="?cityname=安阳">安阳</a>
                    <a href="?cityname=鞍山">鞍山</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>B</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=巴彦淖尔">巴彦淖尔</a>
                    <a href="?cityname=巴中">巴中</a>
                    <a href="?cityname=白城">白城</a>
                    <a href="?cityname=白山">白山</a>
                    <a href="?cityname=白银">白银</a>
                    <a href="?cityname=百色">百色</a>
                    <a href="?cityname=蚌埠">蚌埠</a>
                    <a href="?cityname=包头">包头</a>
                    <a href="?cityname=宝鸡">宝鸡</a>
                    <a href="?cityname=保定">保定</a>
                    <a href="?cityname=保山">保山</a>
                    <a href="?cityname=北海">北海</a>
                    <a href="?cityname=北京">北京</a>
                    <a href="?cityname=本溪">本溪</a>
                    <a href="?cityname=毕节">毕节</a>
                    <a href="?cityname=滨州">滨州</a>
                    <a href="?cityname=博州">博州</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>C</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=沧州">沧州</a>
                    <a href="?cityname=昌都">昌都</a>
                    <a href="?cityname=昌吉州">昌吉州</a>
                    <a href="?cityname=长春">长春</a>
                    <a href="?cityname=长沙">长沙</a>
                    <a href="?cityname=长治">长治</a>
                    <a href="?cityname=常德">常德</a>
                    <a href="?cityname=常州">常州</a>
                    <a href="?cityname=朝阳">朝阳</a>
                    <a href="?cityname=潮州">潮州</a>
                    <a href="?cityname=郴州">郴州</a>
                    <a href="?cityname=成都">成都</a>
                    <a href="?cityname=承德">承德</a>
                    <a href="?cityname=本溪">本溪</a>
                    <a href="?cityname=池州">池州</a>
                    <a href="?cityname=赤峰">赤峰</a>
                    <a href="?cityname=崇左">崇左</a>
                    <a href="?cityname=滁州">滁州</a>
                    <a href="?cityname=楚雄州">楚雄州</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>D</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=达州">达州</a>
                    <a href="?cityname=大兴安岭地区">大兴安岭地区</a>
                    <a href="?cityname=大理州">大理州</a>
                    <a href="?cityname=大连">大连</a>
                    <a href="?cityname=大庆">大庆</a>
                    <a href="?cityname=大同">大同</a>
                    <a href="?cityname=丹东">丹东</a>
                    <a href="?cityname=德宏州">德宏州</a>
                    <a href="?cityname=德阳">德阳</a>
                    <a href="?cityname=德州">德州</a>
                    <a href="?cityname=定西">定西</a>
                    <a href="?cityname=东莞">东莞</a>
                    <a href="?cityname=东营">东营</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>E</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=鄂尔多斯">鄂尔多斯</a>
                    <a href="?cityname=鄂州">鄂州</a>
                    <a href="?cityname=恩施州">恩施州</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>F</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=防城港">防城港</a>
                    <a href="?cityname=佛山">佛山</a>
                    <a href="?cityname=抚顺">抚顺</a>
                    <a href="?cityname=抚州">抚州</a>
                    <a href="?cityname=阜新">阜新</a>
                    <a href="?cityname=阜阳">阜阳</a>
                    <a href="?cityname=福州">福州</a>
                    <a href="?cityname=富阳">富阳</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>G</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=甘南州">甘南州</a>
                    <a href="?cityname=甘孜州">甘孜州</a>
                    <a href="?cityname=赣州">赣州</a>
                    <a href="?cityname=固原">固原</a>
                    <a href="?cityname=广安">广安</a>
                    <a href="?cityname=广元">广元</a>
                    <a href="?cityname=广州">广州</a>
                    <a href="?cityname=贵港">贵港</a>
                    <a href="?cityname=贵阳">贵阳</a>
                    <a href="?cityname=桂林">桂林</a>
                    <a href="?cityname=果洛州">果洛州</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>H</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=哈尔滨">哈尔滨</a>
                    <a href="?cityname=哈密地区">哈密地区</a>
                    <a href="?cityname=海北州">海北州</a>
                    <a href="?cityname=海东地区">海东地区</a>
                    <a href="?cityname=海口">海口</a>
                    <a href="?cityname=海门">海门</a>
                    <a href="?cityname=海南州">海南州</a>
                    <a href="?cityname=海西州">海西州</a>
                    <a href="?cityname=邯郸">邯郸</a>
                    <a href="?cityname=汉中">汉中</a>
                    <a href="?cityname=杭州">杭州</a>
                    <a href="?cityname=合肥">合肥</a>
                    <a href="?cityname=和田地区">和田地区</a>
                    <a href="?cityname=河池">河池</a>
                    <a href="?cityname=河源">河源</a>
                    <a href="?cityname=菏泽">菏泽</a>
                    <a href="?cityname=贺州">贺州</a>
                    <a href="?cityname=菏泽">菏泽</a>
                    <a href="?cityname=鹤壁">鹤壁</a>
                    <a href="?cityname=鹤岗">鹤岗</a>
                    <a href="?cityname=黑河">黑河</a>
                    <a href="?cityname=衡水">衡水</a>
                    <a href="?cityname=衡阳">衡阳</a>
                    <a href="?cityname=红河州">红河州</a>
                    <a href="?cityname=呼和浩特">呼和浩特</a>
                    <a href="?cityname=呼伦贝尔">呼伦贝尔</a>
                    <a href="?cityname=湖州">湖州</a>
                    <a href="?cityname=葫芦岛">葫芦岛</a>
                    <a href="?cityname=怀化">怀化</a>
                    <a href="?cityname=淮安">淮安</a>
                    <a href="?cityname=淮北">淮北</a>
                    <a href="?cityname=淮南">淮南</a>
                    <a href="?cityname=淮南">淮南</a>
                    <a href="?cityname=黄冈">黄冈</a>
                    <a href="?cityname=黄南州">黄南州</a>
                    <a href="?cityname=黄山">黄山</a>
                    <a href="?cityname=黄石">黄石</a>
                    <a href="?cityname=惠州">惠州</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>J</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=鸡西">鸡西</a>
                    <a href="?cityname=吉安">吉安</a>
                    <a href="?cityname=吉林">吉林</a>
                    <a href="?cityname=即墨">即墨</a>
                    <a href="?cityname=济南">济南</a>
                    <a href="?cityname=济宁">济宁</a>
                    <a href="?cityname=佳木斯">佳木斯</a>
                    <a href="?cityname=嘉兴">嘉兴</a>
                    <a href="?cityname=嘉峪关">嘉峪关</a>
                    <a href="?cityname=江门">江门</a>
                    <a href="?cityname=江阴">江阴</a>
                    <a href="?cityname=胶南">胶南</a>
                    <a href="?cityname=胶州">胶州</a>
                    <a href="?cityname=焦作">焦作</a>
                    <a href="?cityname=揭阳">揭阳</a>
                    <a href="?cityname=金昌">金昌</a>
                    <a href="?cityname=金华">金华</a>
                    <a href="?cityname=金坛">金坛</a>
                    <a href="?cityname=锦州">锦州</a>
                    <a href="?cityname=晋城">晋城</a>
                    <a href="?cityname=晋中">晋中</a>
                    <a href="?cityname=荆门">荆门</a>
                    <a href="?cityname=荆州">荆州</a>
                    <a href="?cityname=景德镇">景德镇</a>
                    <a href="?cityname=九江">九江</a>
                    <a href="?cityname=酒泉">酒泉</a>
                    <a href="?cityname=句容">句容</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>K</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=喀什地区">喀什地区</a>
                    <a href="?cityname=开封">开封</a>
                    <a href="?cityname=克拉玛依 ">克拉玛依 </a>
                    <a href="?cityname=库尔勒">库尔勒</a>
                    <a href="?cityname=昆明">昆明</a>
                    <a href="?cityname=昆山">昆山</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>L</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=拉萨">拉萨</a>
                    <a href="?cityname=来宾">来宾</a>
                    <a href="?cityname=莱芜 ">莱芜 </a>
                    <a href="?cityname=莱西">莱西</a>
                    <a href="?cityname=兰州">兰州</a>
                    <a href="?cityname=廊坊">廊坊</a>
                    <a href="?cityname=乐山">乐山</a>
                    <a href="?cityname=丽江">丽江</a>
                    <a href="?cityname=丽水">丽水</a>
                    <a href="?cityname=溧阳">溧阳</a>
                    <a href="?cityname=连云港">连云港</a>
                    <a href="?cityname=凉山州">凉山州</a>
                    <a href="?cityname=辽阳">辽阳</a>
                    <a href="?cityname=辽源">辽源</a>
                    <a href="?cityname=聊城">聊城</a>
                    <a href="?cityname=林芝">林芝</a>
                    <a href="?cityname=临安">临安</a>
                    <a href="?cityname=临沧">临沧</a>
                    <a href="?cityname=临汾">临汾</a>
                    <a href="?cityname=临夏州">临夏州</a>
                    <a href="?cityname=临沂">临沂</a>
                    <a href="?cityname=柳州">柳州</a>
                    <a href="?cityname=六安">六安</a>
                    <a href="?cityname=六盘水">六盘水</a>
                    <a href="?cityname=龙岩">龙岩</a>
                    <a href="?cityname=陇南">陇南</a>
                    <a href="?cityname=娄底">娄底</a>
                    <a href="?cityname=泸州">泸州</a>
                    <a href="?cityname=吕梁">吕梁</a>
                    <a href="?cityname=洛阳">洛阳</a>
                    <a href="?cityname=漯河">漯河</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>M</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=马鞍山">马鞍山</a>
                    <a href="?cityname=茂名">茂名</a>
                    <a href="?cityname=眉山">眉山</a>
                    <a href="?cityname=梅州">梅州</a>
                    <a href="?cityname=绵阳">绵阳</a>
                    <a href="?cityname=牡丹江">牡丹江</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>N</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=内江">内江</a>
                    <a href="?cityname=那曲地区">那曲地区</a>
                    <a href="?cityname=南昌">南昌</a>
                    <a href="?cityname=南充">南充</a>
                    <a href="?cityname=南京">南京</a>
                    <a href="?cityname=南宁">南宁</a>
                    <a href="?cityname=南平">南平</a>
                    <a href="?cityname=南通">南通</a>
                    <a href="?cityname=南阳">南阳</a>
                    <a href="?cityname=宁波">宁波</a>
                    <a href="?cityname=宁德">宁德</a>
                    <a href="?cityname=怒江州">怒江州</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>P</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=攀枝花">攀枝花</a>
                    <a href="?cityname=盘锦">盘锦</a>
                    <a href="?cityname=蓬莱">蓬莱</a>
                    <a href="?cityname=平顶山">平顶山</a>
                    <a href="?cityname=平度">平度</a>
                    <a href="?cityname=平凉">平凉</a>
                    <a href="?cityname=萍乡">萍乡</a>
                    <a href="?cityname=莆田">莆田</a>
                    <a href="?cityname=濮阳">濮阳</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>Q</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=七台河">七台河</a>
                    <a href="?cityname=齐齐哈尔">齐齐哈尔</a>
                    <a href="?cityname=黔西南州">黔西南州</a>
                    <a href="?cityname=钦州">钦州</a>
                    <a href="?cityname=秦皇岛">秦皇岛</a>
                    <a href="?cityname=青岛">青岛</a>
                    <a href="?cityname=清远">清远</a>
                    <a href="?cityname=庆阳">庆阳</a>
                    <a href="?cityname=曲靖">曲靖</a>
                    <a href="?cityname=衢州">衢州</a>
                    <a href="?cityname=泉州">泉州</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>R</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=日喀则">日喀则</a>
                    <a href="?cityname=日照">日照</a>
                    <a href="?cityname=荣成">荣成</a>
                    <a href="?cityname=乳山">乳山</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>S</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=三门峡">三门峡</a>
                    <a href="?cityname=三明">三明</a>
                    <a href="?cityname=三亚">三亚</a>
                    <a href="?cityname=山南">山南</a>
                    <a href="?cityname=汕头">汕头</a>
                    <a href="?cityname=汕尾">汕尾</a>
                    <a href="?cityname=商洛">商洛</a>
                    <a href="?cityname=商丘">商丘</a>
                    <a href="?cityname=上海">上海</a>
                    <a href="?cityname=上饶">上饶</a>
                    <a href="?cityname=韶关">韶关</a>
                    <a href="?cityname=邵阳">邵阳</a>
                    <a href="?cityname=绍兴">绍兴</a>
                    <a href="?cityname=深圳">深圳</a>
                    <a href="?cityname=沈阳">沈阳</a>
                    <a href="?cityname=十堰">十堰</a>
                    <a href="?cityname=石河子">石河子</a>
                    <a href="?cityname=石家庄">石家庄</a>
                    <a href="?cityname=石嘴山">石嘴山</a>
                    <a href="?cityname=寿光">寿光</a>
                    <a href="?cityname=双鸭山">双鸭山</a>
                    <a href="?cityname=朔州">朔州</a>
                    <a href="?cityname=四平">四平</a>
                    <a href="?cityname=松原">松原</a>
                    <a href="?cityname=宿迁">宿迁</a>
                    <a href="?cityname=宿州">宿州</a>
                    <a href="?cityname=绥化">绥化</a>
                    <a href="?cityname=随州">随州</a>
                    <a href="?cityname=遂宁">遂宁</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>T</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=塔城地区">塔城地区</a>
                    <a href="?cityname=台州">台州</a>
                    <a href="?cityname=太仓">太仓</a>
                    <a href="?cityname=太原">太原</a>
                    <a href="?cityname=泰安">泰安</a>
                    <a href="?cityname=泰州">泰州</a>
                    <a href="?cityname=唐山">唐山</a>
                    <a href="?cityname=天津">天津</a>
                    <a href="?cityname=天水">天水</a>
                    <a href="?cityname=铁岭">铁岭</a>
                    <a href="?cityname=通化">通化</a>
                    <a href="?cityname=通辽">通辽</a>
                    <a href="?cityname=铜川">铜川</a>
                    <a href="?cityname=铜陵">铜陵</a>
                    <a href="?cityname=铜仁地区">铜仁地区</a>
                    <a href="?cityname=吐鲁番地区">吐鲁番地区</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>W</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=瓦房店">瓦房店</a>
                    <a href="?cityname=威海">威海</a>
                    <a href="?cityname=潍坊">潍坊</a>
                    <a href="?cityname=渭南">渭南</a>
                    <a href="?cityname=温州">温州</a>
                    <a href="?cityname=文登">文登</a>
                    <a href="?cityname=文山州">文山州</a>
                    <a href="?cityname=乌海">乌海</a>
                    <a href="?cityname=乌兰察布">乌兰察布</a>
                    <a href="?cityname=乌鲁木齐">乌鲁木齐</a>
                    <a href="?cityname=无锡">无锡</a>
                    <a href="?cityname=吴江">吴江</a>
                    <a href="?cityname=吴忠">吴忠</a>
                    <a href="?cityname=芜湖">芜湖</a>
                    <a href="?cityname=梧州">梧州</a>
                    <a href="?cityname=武汉">武汉</a>
                    <a href="?cityname=武威">武威</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>X</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=西安">西安</a>
                    <a href="?cityname=西宁">西宁</a>
                    <a href="?cityname=锡林郭勒盟">锡林郭勒盟</a>
                    <a href="?cityname=厦门">厦门</a>
                    <a href="?cityname=咸宁">咸宁</a>
                    <a href="?cityname=咸阳">咸阳</a>
                    <a href="?cityname=湘潭">湘潭</a>
                    <a href="?cityname=襄阳">襄阳</a>
                    <a href="?cityname=孝感">孝感</a>
                    <a href="?cityname=忻州">忻州</a>
                    <a href="?cityname=新乡">新乡</a>
                    <a href="?cityname=新余">新余</a>
                    <a href="?cityname=信阳">信阳</a>
                    <a href="?cityname=兴安盟">兴安盟</a>
                    <a href="?cityname=邢台">邢台</a>
                    <a href="?cityname=徐州">徐州</a>
                    <a href="?cityname=许昌">许昌</a>
                    <a href="?cityname=宣城">宣城</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>Y</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=雅安">雅安</a>
                    <a href="?cityname=烟台">烟台</a>
                    <a href="?cityname=延安">延安</a>
                    <a href="?cityname=延边州">延边州</a>
                    <a href="?cityname=盐城">盐城</a>
                    <a href="?cityname=扬州">扬州</a>
                    <a href="?cityname=阳江">阳江</a>
                    <a href="?cityname=阳泉">阳泉</a>
                    <a href="?cityname=伊犁">伊犁</a>
                    <a href="?cityname=哈萨克州">哈萨克州</a>
                    <a href="?cityname=宜宾">宜宾</a>
                    <a href="?cityname=宜昌">宜昌</a>
                    <a href="?cityname=宜春">宜春</a>
                    <a href="?cityname=宜兴">宜兴</a>
                    <a href="?cityname=义乌">义乌</a>
                    <a href="?cityname=益阳">益阳</a>
                    <a href="?cityname=银川">银川</a>
                    <a href="?cityname=鹰潭">鹰潭</a>
                    <a href="?cityname=营口">营口</a>
                    <a href="?cityname=永州">永州</a>
                    <a href="?cityname=榆林">榆林</a>
                    <a href="?cityname=玉树州">玉树州</a>
                    <a href="?cityname=玉溪">玉溪</a>
                    <a href="?cityname=岳阳">岳阳</a>
                    <a href="?cityname=云浮">云浮</a>
                    <a href="?cityname=运城">运城</a>
                    <a href="?cityname=伊春">伊春</a>
                    <a href="?cityname=玉林">玉林</a>
                </div>
            </div>
            <div class="city-item">
                <div class="letter">
                    <span>Z</span>
                </div>
                <div class="city-list">
                    <a href="?cityname=枣庄">枣庄</a>
                    <a href="?cityname=湛江">湛江</a>
                    <a href="?cityname=张家港">张家港</a>
                    <a href="?cityname=张家界">张家界</a>
                    <a href="?cityname=张家口">张家口</a>
                    <a href="?cityname=张掖">张掖</a>
                    <a href="?cityname=章丘">章丘</a>
                    <a href="?cityname=漳州">漳州</a>
                    <a href="?cityname=招远">招远</a>
                    <a href="?cityname=昭通">昭通</a>
                    <a href="?cityname=肇庆">肇庆</a>
                    <a href="?cityname=镇江">镇江</a>
                    <a href="?cityname=郑州">郑州</a>
                    <a href="?cityname=中山">中山</a>
                    <a href="?cityname=中卫">中卫</a>
                    <a href="?cityname=舟山">舟山</a>
                    <a href="?cityname=周口">周口</a>
                    <a href="?cityname=株洲">株洲</a>
                    <a href="?cityname=珠海">珠海</a>
                    <a href="?cityname=诸暨">诸暨</a>
                    <a href="?cityname=驻马店">驻马店</a>
                    <a href="?cityname=资阳">资阳</a>
                    <a href="?cityname=淄博">淄博</a>
                    <a href="?cityname=自贡">自贡</a>
                    <a href="?cityname=遵义">遵义</a>
                </div>
            </div>
        </el-drawer>
    </div>

</template>

<script>
    import Pm25Item from "../DataItem/Pm25Item";
    import Pm10Item from "../DataItem/Pm10Item";
    import Itemcon from "../DataItem/Itemcon";
    import axios from "axios"
    axios.defaults.baseURL='/api'
    import {post, request} from "../../network/request"
    export default {
        name: "CityView",
        data(){
            return{
                city_name:'',
                aqi:0,
                rand:11,
                aqi_index:'',
                datetime:'0000-0-0 00:00:00',
                pm25:0,
                pm10:0,
                so2:0,
                no2:0,
                co:0,
                o3:0,
                data:{},
                loading:true,
                drawer:false,
                direction:'rtl',
                cityname:'',
                now:{text:"多云",temp:24,feels_like:23,rh:56,wind_class:"2级",wind_dir:"东风",uptime:"20200327180000"},
                forecasts:[],
                hour:12,
            }
        },
        computed:{
            getPercent(){
                let n = (370-this.rand)/370
                return parseInt(n*100)
            }
        },
        components:{
            Pm10Item,
            Pm25Item,
            Itemcon,
        },
        methods:{
            getTime(){
                let date  = new Date()
                this.hour = date.getHours()
                // console.log(this.hour)
            },
            getData(params){
                post('http://localhost:8000/aqi/select/',
                    params
                ).then( res =>{
                    this.$notify({
                        title: '成功获取'+params.cityname+'数据',
                        message:'',
                        type: 'success'
                    })
                    // console.log(res)
                    let data = {}
                    data = res.data
                    //去除datetime中的T ,Z
                    let temp = data.datetime.slice(0,-1)
                    let arr = temp.split("T")
                    //绑定数据
                    this.datetime = arr.join(" ")
                    this.city_name = data.cityname
                    this.aqi = data.aqi
                    this.$emit("getdata",data.aqi)//向父组件传递aqi
                    this.rand = data.rand
                    this.aqi_index = data.level_index
                    this.pm25 = data.pm25
                    this.pm10 = data.pm10
                    this.pm25 = data.pm25
                    this.so2 = data.SO2
                    this.no2 = data.NO2
                    this.co = data.CO
                    this.o3 = data.O3
                    this.loading = false
                    // console.log(data)

                }).catch(err =>{
                    console.log(err)
                    this.$notify.error({
                        title:'载入数据失败！',
                        message: ''
                    })
                    this.$message('正在载入默认城市数据')
                    this.getData({cityname:'上海'})
                    this.getWeather("上海")
                })
            },
            showLocation(res) {//jsonp回调的方法，拿到返回的城市名
                this.$message({
                    message: '定位成功！'+res.content.address_detail.city,
                    type: 'success'
                })
                let cityname = res.content.address_detail.city//保存cityname用于天气获取geocode
                let location = res.content.address_detail.city.slice(0,-1)
                this.getWeather(cityname)
                this.getData({cityname:location}) //根据定位城市获取空气质量信息
                // console.log(location)
            },
            getLocation(){ //获取IP进行定位
                this.$jsonp( //使用jsonp处理跨域问题
                    'https://api.map.baidu.com/location/ip',
                    {
                        ak:'v46u7PXIss9RSuoLy0e3LKoGwmLqaGnB',
                        coor:'bd09ll',
                        callback:'showLocation', //回调函数
                    }
                ).then(res =>{
                    //jsonp 返回的数据不能直接打印，必须通过回调函数
                    this.showLocation(res)
                }).catch(err =>{
                    this.$message.error('定位失败！');
                    this.getData({cityname:'上海'})
                    this.getWeather("上海")
                })
            },
            getWeather(cityname){
                request({
                    url:'/aqi/geo/',
                    params:{cityname:cityname}
                }).then(res =>{
                    // console.log(res.data.city_geocode.city_geocode)
                    let geo = res.data.city_geocode.city_geocode +'' //int 转字符串
                    axios(
                        '/weather/v1/',
                    {
                        headers: {
                            'Cache-Control': 'no-cache' //!!!清除缓存
                        },
                        params: {
                                district_id:geo,
                                data_type:'all',
                                output:'json',
                                ak:'v46u7PXIss9RSuoLy0e3LKoGwmLqaGnB',
                            }
                        },

                    ).then(res =>{
                        this.$emit("getWeather",res.data.result.forecasts)
                        this.ShowWeather(res)
                    }).catch(err =>{
                        console.log(err)
                        this.$message.error('获取天气信息失败！')
                    })

                })
            },
            ShowWeather(res){
                this.now = res.data.result.now
                this.forecasts  = res.data.result.forecasts
                // console.log(res)
                // console.log(this.now.uptime)
                // console.log(this.forecasts[1]['text_day'])

            }
        },
        created() {
            let type = undefined
            type = typeof(this.$route.query.cityname)
            if ( type == 'string'){   //判断query类型是否为string
                this.getData({cityname:this.$route.query.cityname})
                this.getWeather(this.$route.query.cityname)
            }
            else {
                this.getLocation()

            }
            this.getTime()

        },
        watch: { //监听路由变化，query变化时刷新数据
            '$route' (to, from) {
                if (this.city_name!==this.$route.query.cityname){
                    let type = typeof(this.$route.query.cityname)
                    this.loading = true;
                    if (type == 'string'){
                        this.getData({cityname:this.$route.query.cityname})
                        this.getWeather(this.$route.query.cityname)
                    }else{
                        this.getLocation()
                    }
                }


            }

        }
    }
</script>

<style scoped>
    .after-day span{
        font-size: 22px;
        font-family: "Microsoft YaHei";
        color: #555555;
    }
    .tomorrow span{
        font-size: 22px;
        font-family: "Microsoft YaHei";
        color: #555555;
    }
    .city-list{
        width: 100%;
        float: left;
    }
    .letter span{
        font-size: 15px;
        font-family: "Microsoft YaHei";
        line-height: 25px;
    }
    .letter{
        float: left;
        width: 25px;
        height: 25px;
    }
    .city-item{
        width: 100%;
        font-weight: bold;
        margin-top: 5px;
    }
    .special dd{
        width: 400px;
        height: 25px;
        line-height: 25px;
    }
    .special dt{
        float: left;
        width: 60px;
        font-family: "Microsoft YaHei";
        font-size: 15px;
        height: 25px;
        line-height: 25px;
    }
    .special{
        width: 100%;
        margin-top: 40px;
        height: 25px;
        font-weight: bold;
        margin-bottom: 15px;
        /*border-bottom: 1px dotted #555555;*/
    }
    a{
        text-decoration: none;
        float: left;
        display: inline;
        color: #555;
        padding: 0px 9px;
        border-radius: 3px;
        font-size: 14px;
        line-height: 25px;
        font-family: "Microsoft YaHei";

    }
    a:hover{
        color: #E9EEF3;
        background: #509D01;
    }
    dt dd{
        float: left;

    }
    .hot-city  dd{
        width: 480px;
        height: 25px;
        float: left;
        /*display: inline;*/
        margin-left: 0;
    }
    .hot-city dt{
        float: left;
        width: 75px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        font-size: 15px;
        font-family: "Microsoft YaHei";
    }
    .hot-city{
        float: left;
        display: inline;
        font-weight: bold;
        padding-top: 4px;
    }
    .title{
        margin-top: 5px;
        background:#7ABF30;
        height: 50px;
    }
    .title span{
        margin-left: 16px!important;
        color: #E9EEF3;
        font-family: "Microsoft YaHei";
        line-height: 50px;
    }
    .data-name{
        color: #E9EEF3;
        text-align: center;
        line-height: 24px;
    }
    .data-value{
        color: #7f878c;
        text-align: center;
        line-height: 32px;
    }
    .data-info{
        height:60px;
        width: 510px;
        position: absolute;
        left: 20px;
        top: 285px;
        display: flex;
        justify-content: space-between;

    }
    /*.float{*/
    /*    float: left;*/
    /*    margin-left: 20px;*/
    /*}*/
    .font-style{
        font-family: "Microsoft YaHei";
        color: #E9EEF3;
    }
    .el-tag{
        border-style: none!important;
        color: #E9EEF3!important;
    }
    .city_info{
        display: flex;
        width: 100%;
        height: 420px;
        position: relative;
        top:-2px;
        background: url("../../assets/img/background/banner.jpg");
    }

    .text_info{
        width: 600px;
        height: 100px;
        position: absolute;
        top: 95px;
        left: 20px;
    }
    .text-ul{
        width: 100%;
        height: 100px;
        padding: 0!important;
        position: relative;
    }
    li{
        text-align: center;
        list-style: none;
        font-size: 18px;
        float: left;
    }
    .aqi{
        font-size: 28px;
        margin-left: 5px!important;

    }
    span{
        font-size: 26px;
        margin-left: 0px!important;
    }
    .li-2{
        position: absolute;
        margin-left: 20px;
        left:200px ;
        bottom: 14px;
    }
    .hr{
        margin-left: -580px!important;
        margin-top: 205px!important;
        width: 510px!important;

    }

    .date span{
        font-size: 13px!important;

    }
    .rand{
        font-size: 25px!important;
    }
   .weather{
       width: 160px;
       height: 190px;
       position: absolute;
       right: 180px;
       top: 40px;

   }
    .icon{
        width: 64px;
        height: 64px;
    }
    .wea-top{
        display:flex;
        justify-content:space-between
    }
    .des{
        width: 220px;
        height: 64px;
        color: #E9EEF3;
        position: relative;
        left: 15px;
    }
    .des span{
        font-size: 28px;
        font-family: "Microsoft YaHei";
        position: absolute;
        left: 0px;
        bottom: 10px;
    }
    .temperature{
        font-family: "Microsoft YaHei";
        color: #E9EEF3;
        padding-left: 5px;
        margin-top: 5px;
    }
    .temperature span{
        font-size: 18px;
    }
    .feel_like{
        font-family: "Microsoft YaHei";
        color: #E9EEF3;
        padding-left: 5px;
        margin-top: 5px;
    }
    .feel_like span{
        font-size: 18px;
    }
    .rh{
        font-family: "Microsoft YaHei";
        color: #E9EEF3;
        padding-left: 5px;
        margin-top: 5px;
    }
    .rh span{
        font-size: 18px;
    }
    .wind{
        font-family: "Microsoft YaHei";
        color: #E9EEF3;
        padding-left: 5px;
        margin-top: 5px;
    }
    .wind span{
        font-size: 18px;
    }
    .city{
        width: 600px;
        height: 150px;
        position: relative;
        left: 20px;
        top: 0px;
    }
    .cityname{

        height: 80px;
        float: left;
        margin-top: 20px;
    }
    .city_name{
        height: 80px;
        text-align: center;
        font-size: 52px;
        font-weight: bold;
        float: left;
    }
    .select-city{
        width: 60px;
        height: 40px;
        float: left;
        margin-left: 5px;
        padding-top: 39px;
    }
    .change{
        width: 60px;
        height: 30px;
        color: #E9EEF3;
        font-size: 17px;
        cursor: pointer;
    }
    .level{
        width: 220px;
        height: 100px;
        margin-top: 32px;
        margin-left: 300px;

    }
    .quality{
        width: 250px;
        height: 40px;
    }
    .date{
        height: 20px;
        width: 220px;
        margin-top: 2px;
        font-size: 12px;
        display: block;
        color: #E9EEF3;
    }

</style>