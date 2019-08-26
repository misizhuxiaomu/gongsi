<template>
  <div style="position:relative">
        
      <div style="width:100%;height:40px;text-align:left;padding:10px 0" v-if="this.$store.state.isCollapse">
        <el-date-picker
            v-model="value1"
            type="date"
            :editable="false"
            placeholder="截止日期">
        </el-date-picker>
        <el-button type="primary" @click="querySun">查询</el-button>

      </div>
       <!-- <div>
            <span v-for="item in textValue" :key="item" style="color:red;padding-left:12px">{{item}}&nbsp;&nbsp;&nbsp;</span>
        </div>
       -->
      <div>
          <el-table
        :data="tableData"
        :border="false"
        align="center"
        :row-style="tableRowStyle"
        :header-cell-style="getRowClass"
        > 
         <!--<el-table
        :data="tableData"
        align="center"
        >-->
       <!-- <el-table-column
          align="left"
          label="高优先级"
          width="90"
          >
        </el-table-column>-->
        <el-table-column
          prop="pri"
          align="center"
          label="优先级"
          width="80"
          >
          <template slot-scope="scope">
            <span style="color:red">{{scope.row.pri}}</span>
            <!--<span style="color:#666" v-show="scope.row.expect >= 0">{{scope.row.assignedTo}}</span>-->
        </template> 
        </el-table-column>
        <el-table-column
          prop="name"
          align="left"
          label="任务"
          width="760"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="状态"
          >
        </el-table-column>
        <el-table-column
          prop="assignedTo"
          align="center"
          label="指派给"
          >
           <template slot-scope="scope">
            <span style="color:red">{{scope.row.assignedTo}}</span>
            <!--<span style="color:#666" v-show="scope.row.expect >= 0">{{scope.row.assignedTo}}</span>-->
        </template> 
        </el-table-column>
        <el-table-column
          prop="deadline"
          align="center"
          label="截止日期"
          >
        </el-table-column>
        <!--<el-table-column
          prop="finishedDate"
          align="center"
          label="完成日期"
          >
        </el-table-column>-->
        <el-table-column
          prop="expect"
          align="center"
          label="逾期天数"
          >
         <template slot-scope="scope">
            <span style="color:red">{{scope.row.expect}}</span>
            <!--<span style="color:#666" v-show="scope.row.expect >= 0">{{scope.row.expect}}</span>-->
        </template>     
        </el-table-column>
      </el-table>
      <!--工具条
            <el-col :span="24" class="toolbar">
                <el-pagination layout="sizes,prev, pager, next" :page-sizes="[10, 20, 50,100, 200]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-count="total" style="float:right;">
                </el-pagination>
            </el-col>
            -->
    </div>
        <!-- <span style="color:#909399;padding-left:12px;font-weight: bold;font-size:17px">急需处理</span>-->
    <div>
          <el-table
        :data="tablequ"
        :border="false"
        :show-header="false"
        align="center"
        :row-style="tableRowStyle"
        :header-cell-style="getRowClass"
        >
       <!-- <el-table-column
          align="left"
          label="急需处理"
          width="90"
          >
         
        </el-table-column>-->
        <el-table-column
          prop="pri"
          align="center"
          label="优先级"
          width="80"
          >
           <template slot-scope="scope">
            <span style="color:#3398DB">{{scope.row.pri}}</span>
            <!--<span style="color:#666" v-show="scope.row.expect >= 0">{{scope.row.assignedTo}}</span>-->
        </template> 
        </el-table-column>
        <el-table-column
          prop="name"
          align="left"
          label="任务"
          width="760"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="状态"
          >
        </el-table-column>
        <el-table-column
          prop="assignedTo"
          align="center"
          label="指派给"
          >
          <template slot-scope="scope">
            <span style="color:red" v-show="scope.row.expect < 0">{{scope.row.assignedTo}}</span>
            <span style="color:#666" v-show="scope.row.expect >= 0">{{scope.row.assignedTo}}</span>
        </template>  
        </el-table-column>
        <el-table-column
          prop="deadline"
          align="center"
          label="截止日期"
          >
        </el-table-column>
        <!--<el-table-column
          prop="finishedDate"
          align="center"
          label="完成日期"
          >
        </el-table-column>-->
        <el-table-column
          prop="expect"
          align="center"
          label="逾期天数"
          >
          <template slot-scope="scope">
            <span style="color:red" v-show="scope.row.expect < 0">{{scope.row.expect}}</span>
            <span style="color:#666" v-show="scope.row.expect >= 0">{{scope.row.expect}}</span>
        </template>  
        </el-table-column>
      </el-table>
      <!--工具条
            <el-col :span="24" class="toolbar">
                <el-pagination layout="sizes,prev, pager, next" :page-sizes="[10, 20, 50,100, 200]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-count="total" style="float:right;">
                </el-pagination>
            </el-col>
            -->
    </div>
        <!--项目数据-->
        <div>
            <el-table
            :data="tableBox"
            :show-header="true"
            :border="false"
            align="center"
            style="width:50%;display:inline-block;border-color:#000;margin-top:26px;"
            :row-style="tableRowStyless"
            :header-cell-style="getRowClass"
            >
        
            <!--<el-table-column
            prop="id"
            align="center"
            label="项目编号"
            width="90"
            >
            </el-table-column>-->   
            <el-table-column
            prop="name"
            align="center"
            label="项目名称"
            >
            </el-table-column>
            <!--<el-table-column
            prop="code"
            align="center"
            label="项目代号"
            >
            </el-table-column>-->
            <el-table-column
            prop="status"
            align="center"
            label="项目状态"
            >
            </el-table-column>
            <el-table-column
            prop="node"
            align="center"
            label="项目节点"
            width="500"
            >
            <template slot-scope="scope">
                <el-steps :active="scope.row.node+1" process-status="finish" finish-status="wait"  style="font-size:14px;" :simple="false">
                    <el-step title="预研" ></el-step>
                    <el-step title="在研" ></el-step>
                    <el-step title="试产" ></el-step>
                    <el-step title="量产" ></el-step>
                   
                </el-steps>
                </template> 
            </el-table-column>
            
           </el-table> 
        </div>
        
        <div id="myChart" :style="{width: '48%', height: '426px',position:'absolute',right:'0',bottom:'0',background:' #1E2027'}"></div>
  </div>
</template>
<script>
import {
queryApplicationList,
queryAccountList,
ChartList
} from '../../api/api';
import util from "../../common/js/util.js"; 
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
  export default {
    data() {
      return {
        user:{
           name:'',
           username:'',
           phone:'',
           password:'',
           confirmPassword:'',
           role:''
        },
        value1:null,
        reexamine:null,
        trialFormRules: {
                
            },
        centerDialogVisible:false,
        timerS:null,
        timerR:null,
        arrayOne:[],
        arrayTo:[],
        tableData: [],
        tablequ:[],
        tableBox:[],
        article:[],
        textValue:[],
            page: 1,
            size: 10,
            total: 1,

            closed:"",
            doing:"",
            MP:"",
            suspended:"",
            wait:"",
            all:""

    };
},

        methods:{
            drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({color: ['#3398DB'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type : 'category',
                                splitLine: {show:false},
                                data : ['总览','预研','在研','生产','已挂起','已关闭'],
                                axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                                },
                                        
                                }
                            },
                            yAxis : [
                                {
                                    type : 'value',
                                    name : '项目总览',
                                    axisLabel : {
                                        formatter: '{value}',
                                        textStyle: {
                                            color: '#fff'
                                        }
                                    },
                                    axisLine:{
                                        lineStyle:{
                                            color:'#fff',
                                        }
                                    },
                                
                                    axisTick:{
                                        show:false
                                    },
                                    splitLine:{
                                        show:false
                                    }

                                }
                            ],
                            series: [
                               
                                {
                                    name: '数量',
                                    type: 'bar',
                                    barWidth: '50%',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'inside'
                                        }
                                    },
                                    data:[this.all, this.wait, this.doing, this.MP,this.suspended,this.closed]
                                }
                            ]
                        });
                var sefl = this;
             setInterval(function(){

                     ChartList().then(res=>{
                if(res.code == 0){
                    res.data.forEach(item=>{
                        if(item.status == 'closed'){
                            sefl.closed = item.count
                        }else if(item.status == 'doing'){
                            sefl.doing = item.count
                        }else if(item.status == 'MP'){
                            sefl.MP = item.count
                        }else if(item.status == 'suspended'){
                            sefl.suspended = item.count
                        }else if(item.status == 'wait'){
                            sefl.wait = item.count
                        }else if(item.status == 'all'){
                            sefl.all = item.count
                        }
                    })
                }
            });

               let myChart = sefl.$echarts.init(document.getElementById('myChart'))
               myChart.setOption({color: ['#3398DB'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type : 'category',
                                splitLine: {show:false},
                                data : ['总览','预研','在研','生产','已挂起','已关闭'],
                                axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                                },
                                        
                                }
                            },
                            yAxis : [
                                {
                                    type : 'value',
                                    name : '项目总览',
                                    axisLabel : {
                                        formatter: '{value}',
                                        textStyle: {
                                            color: '#fff'
                                        }
                                    },
                                    axisLine:{
                                        lineStyle:{
                                            color:'#fff',
                                        }
                                    },
                                
                                    axisTick:{
                                        show:false
                                    },
                                    splitLine:{
                                        show:false
                                    }
                                }
                            ],
                            series: [
                               
                                {
                                    name: '数量',
                                    type: 'bar',
                                    barWidth: '50%',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'inside'
                                        }
                                    },
                                    data:[sefl.all, sefl.wait, sefl.doing, sefl.MP,sefl.suspended,sefl.closed]
                                }
                            ]
                        });
             },5000)


    },
    tableRowStyle({ row, rowIndex }) {
      return 'background-color:  #1E2027;color:#588990;'
    },
     tableRowStyless({ row, rowIndex }) {
      return 'background-color: #1E2027;color:#676F1B;'
    },
        getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background:#1E2027;color:#E8EBF2;'
                } else {
                    return ''
                }
            },
            handleClick(e){
            //   let par = {
            //     id:e.id
            //   };
            //   removeAccount(par).then(res=>{
            //     if (res.status == 1) {
            //       this.getUsers();
            //     };
            //   })
            },
            //每页多少条
            //handleSizeChange(val) {
                // this.size = val;
                // this.getUsers();
            //},
            //点击页数
            //handleCurrentChange(val) {
                // this.page = val;
                // this.getUsers();
            //},
            //查询接口
            querySun(){
                   if(this.value1==null){
                    this.reexamine = util.formatDate.format(new Date(), 'yyyy-MM-dd');
                    console.log(this.reexamine)
               }else{
                   this.reexamine = util.formatDate.format(new Date(this.value1), 'yyyy-MM-dd');
                   console.log(this.reexamine)
               };
              
            },
            
            DialogVisible(){
              
            },
            connetPO(){
                   

                     var _this = this;
                  this.timerS = setInterval(function(){
                     
                    if(_this.arrayOne.length <= 5){
                       
                if(_this.value1==null){
                   var dataNSS = util.formatDate.format(new Date(), 'yyyy-MM-dd');
                }else{
                   var dataNSS = util.formatDate.format(new Date(_this.value1), 'yyyy-MM-dd');
                }
                
                 queryApplicationList({endDate:dataNSS}).then(res=>{
                     if(res.code == 0){
                         _this.textValue = res.data.thirdData;
                         _this.$store.commit('textV', _this.textValue);
                         if(res.data.firstData.length <= 5){
                             _this.tableData = res.data.firstData;
                         }else{
                              
                         res.data.firstData.forEach(item=>{
                             _this.arrayOne.push(item);
                         })
                         };
                        
                           
                     }else{
                         _this.$message({
                            type: 'error',
                            message: res.msg
                        });
                     }
                 })
 
                    }else{
                        _this.tableData.splice(0,1);
                     let arr = _this.arrayOne.splice(0,1);
                     _this.tableData.push(arr[0]);
                    }
                    
                  },5000)
            },
            contenSe(){
                    
                    var _this = this;
                  this.timerR = setInterval(function(){
                     
                    if(_this.arrayTo.length <= 5){
                if(_this.value1==null){
                   var dataNS = util.formatDate.format(new Date(), 'yyyy-MM-dd');
                }else{
                   var dataNS = util.formatDate.format(new Date(_this.value1), 'yyyy-MM-dd');
                }
                //let dataNS = util.formatDate.format(new Date(), 'yyyy-MM-dd');
                 queryApplicationList({endDate:dataNS}).then(res=>{
                     if(res.code == 0){
                          _this.textValue = res.data.thirdData;
                          _this.$store.commit('textV', _this.textValue);
                          if(res.data.secondData.length <= 5){
                              _this.tablequ = res.data.secondData;
                          }else{
                              res.data.secondData.forEach(item=>{
                             _this.arrayTo.push(item);
                            })
                          };
                                                  
                     }else{
                         _this.$message({
                            type: 'error',
                            message: res.msg
                        });
                     }
                 })
 
                    }else{
                        _this.tablequ.splice(0,1);
                     let arr = _this.arrayTo.splice(0,1);
                     _this.tablequ.push(arr[0]);
                    }
                    
                  },5000)
            },
            connetBox(){
                //开启定时器获取项目数据
                   var _this = this;
                  this.timerBox = setInterval(function(){
                     
                    if(_this.article.length <= 5){
                var dataBox = util.formatDate.format(new Date(), 'yyyy-MM-dd');
                 queryAccountList({endDate:dataBox}).then(res=>{
                     if(res.code == 0){
                         
                          if(res.data.length <= 5){
                              _this.tableBox = res.data;
                               
                          }else{
                              res.data.forEach(item=>{
                             _this.article.push(item);
                            })
                            
                          };
                                                  
                     }else{
                         _this.$message({
                            type: 'error',
                            message: res.msg
                        });
                     }
                 })
 
                    }else{
                        _this.tableBox.splice(0,1);
                     let arr = _this.article.splice(0,1);
                     _this.tableBox.push(arr[0]);
                    };
                  },5000)


            }
    },
    created(){
         this.$store.commit('textV', this.textValue);
        let dataN = util.formatDate.format(new Date(), 'yyyy-MM-dd');
        queryApplicationList({endDate:dataN}).then(res=>{
            if(res.code==0){
                //console.log( res.data.firstData)
                this.arrayOne = res.data.firstData;
                this.arrayTo = res.data.secondData;
                this.textValue = res.data.thirdData;
                 this.$store.commit('textV', this.textValue);
                if(res.data.firstData.length <= 5){
                    this.tableData = res.data.firstData;
                    this.connetPO();
                    
                }else{
                     for(let i =0;i<5;i++){
                     this.tableData.push(this.arrayOne[i])
                     
                   };
                   this.arrayOne.splice(0,5);
                  this.connetPO();
                };

                if(res.data.secondData.length <= 5){
                    this.tablequ = res.data.secondData;
                    this.contenSe();
                }else{
                     for(let i =0;i<5;i++){
                     this.tablequ.push(this.arrayTo[i])
                     
                   };
                   this.arrayTo.splice(0,5);
                  this.contenSe();
                };
           
            }else{
                 this.$message({
                        type: 'error',
                        message: res.msg
                    });
            }
        });
        //新增项目表单的请求数据
        queryAccountList({endDate:dataN}).then(res=>{
            if(res.code == 0){
                // console.log(res.data)
                 //成功后的数据逻辑
                this.article = res.data;
                if(res.data.length <= 5){
                    this.tableBox = res.data;
                    
                    this.connetBox();
                    
                }else{
                    
                     for(let i =0;i<5;i++){
                     this.tableBox.push(this.article[i])
                     
                   };
                   this.article.splice(0,5);
                  this.connetBox();
                };
                

            }else{
                 this.$message({
                        type: 'error',
                        message: res.msg
                    });
            }
        })
       
         
    },
    mounted(){
            ChartList().then(res=>{
                if(res.code == 0){
                    res.data.forEach(item=>{
                        if(item.status == 'closed'){
                            this.closed = item.count
                        }else if(item.status == 'doing'){
                            this.doing = item.count
                        }else if(item.status == 'MP'){
                            this.MP = item.count
                        }else if(item.status == 'suspended'){
                            this.suspended = item.count
                        }else if(item.status == 'wait'){
                            this.wait = item.count
                        }else if(item.status == 'all'){
                            this.all = item.count
                        }
                    })
                }
                this.drawLine();
            });
            
        }
    

}
</script>
<style lang="scss" scoped>
a {
    text-decoration: none;
}

.nav {
    text-indent: 30px;
}

.warning {
    color: red;
    margin-left: 80px;
}

.operate {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
}

.my-autocomplete {
    li {
        line-height: normal !important;
        padding: 7px !important;

        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .addr {
            font-size: 12px;
            color: #b4b4b4;
            margin-left: 10px;
        }

        .highlighted .addr {
            color: #ddd;
        }
    }
    .ems {
        font-size: 12px;
        color: #b4b4b4;
    }
}

.my-span::before {
    display: block;
    width: 100%;
    height: 1px;
    margin-top: 10px;
}

.my-span {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #475669;
    display: inline-block;
    clear: both;
    padding-right: 20px;
    width: 300px;
}

.hr {
    height: 1px;
    width: 100%;
    margin: 15px 0px;
    border-bottom: 1px solid #eeeeee;
    color: #999999;
}

.floating {
    z-index: 9999;
    position: fixed;
    top: 60px;
    right: 340px;
    display: block;
    h3 {
        padding-top: 10px;
        a {
            text-decoration: none;
            color: #66b1ff;
        }
    }
}
</style>