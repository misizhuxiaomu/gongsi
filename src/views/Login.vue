<template>
  <img src="../assets/bac1.jpg"/>
</template>
<template>
<div class='banner'>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">沃特沃德项目管理平台登录</h3>
    <el-form-item prop="number" style="width:400px;" >
      <input type="text"  placeholder="请输入员工编号" v-model="ruleForm2.number" auto-complete="off" id='number' @keyup.13="handleSubmit2"/>
      <img src='../assets/employee.png' class='icon'/>
    </el-form-item>
    <el-form-item prop="checkPass" style="width:400px">
      <input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入登录密码" id='password' @keyup.13="handleSubmit2" />
      <img src='../assets/lock.png' class='icon2 icon'/>
    </el-form-item>
<!--     <el-checkbox v-model="checked" class="remember">记住账号</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;height:66px;font-size:20px" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!-- <el-button @click.native.prevent="handleReset2">重置</el-button> -->
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import store from '../vuex/store.js'
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      var validateName = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请输入用户名'));
				}
				else {
					// this.tip=true
					callback();
				}
			};
       var validaeCheck = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请输入密码'));
				}
				else {
					// this.tip=true
					callback();
				}
			};
      return {
        logining: false,
        ruleForm2: {
          number: '',
          checkPass: ''
        },
        //登录验证正则
        rules2: {
          number: [
            { validator: validateName, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validaeCheck, trigger: 'blur' }
          ]
        },
        checked: false
      };
    },
    methods: {
      handleSubmit2(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = {account:this.ruleForm2.number,password:this.ruleForm2.checkPass};
            requestLogin(loginParams).then(res => {
              this.logining = false;
              if (res.code == 0) {
                sessionStorage.setItem('username',this.ruleForm2.number)
                let data = res.data;
                let para = res.msg;
                sessionStorage.setItem('menu', para);
                //根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
                // console.log(this.$store.state.token)
                this.$store.commit('set_token', data);
                if (store.state.token!=='') {
                this.$router.push('/accountManagement')
                // console.log(store.state.token)
                } else {
                this.$router.replace('/login');
                }
                //  this.$router.push({ path: '/app' });
              } else {
                 this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    mounted() {
     
		}
  }

</script>
<style lang="scss" scoped>
  .banner{
    width: 100%;
    height: 100%;
    background: url(../assets/bac1.jpg) no-repeat 100% 100%;
    background-size: 100% 100%;
  }
  .icon{
    position: absolute;
    top: 9px;
    left: 14px;
    width: 26px;
    height: 26px;
  }
  .icon2{
    width: 22px;
  }
  #number,#password{
    padding-left: 53px!important;
    width: 100%;
    height: 44px;
    border: none;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 5px;
  }
  #password{
    background: #f1f1f1;
    color: #8f8f8f;
    border: none;
  }
  .login-container {
   box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 500px;
    height: 450px;
    padding: 70px 50px 15px 50px;
    background: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #000;
      font-size: 22px;
      font-weight: 100;
      img{
        position: absolute;
        left: 49px;
        top: 58px;
      }
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>