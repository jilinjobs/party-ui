<template>
  	<div>
	  	<transition name="form-fade" mode="in-out">
	  		<div class="container" v-show="showLogin">
          <div class="top">
            <div class="header">
              <img alt="" class="logo" src="../assets/logo.svg" />
              <span class="title">党员信息填报</span>
            </div>
            <p class="desc">如遇问题请联系：0431-8465771、84689772</p>
          </div>
		    	<el-form class="main" :model="loginForm" :rules="rules" ref="loginForm">
						<el-form-item prop="sfzh" label="公民身份证号">
							<el-input v-model="loginForm.sfzh" placeholder="请输入身份证号" prefix-icon="gaf-icons gaf-icon-idcard"></el-input>
						</el-form-item>
						<el-form-item>
								<el-button type="primary" @click="submitForm('loginForm')" :style="{width: '100%'}">提交</el-button>
							</el-form-item>
					</el-form>
          <p class="desc">请先下载《确认函》模板，打印出来后按要求签字并拍照：<br/>
          <a href="/static/doc/确认函模板(关系在中心).docx">确认函模板(关系在中心).docx</a><br/>
          <a href="/static/doc/确认函模板(关系已迁走).docx">确认函模板(关系已迁走).docx</a></p>
	  		</div>
	  	</transition>
  	</div>
</template>

<script>
import api from '@/api'
// import {mapActions, mapState} from 'vuex'
export default {
  data() {
    return {
      loginForm: {
        sfzh: "",
      },
      rules: {
        sfzh: [
          { required: true, length: 18, message: "请输入身份证号", trigger: "blur" },
        ],
        mobile: [
          { required: true, pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: "请输入有效的手机号", trigger: "blur" },
        ],
        verifycode: [
          { required: true, length: 6, message: "请输入有效的验证码", trigger: "blur" },
        ]
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
    // if (!this.adminInfo.id) {
    // 		this.getAdminData()
    // 	}
  },
  // computed: {
  // 	...mapState(['adminInfo']),
  // },
  methods: {
    async submitForm(formName) {
      // this.login({username:'admin',verifycode:'pass'})
      // this.$message({
      //   type: "success",
      //   message: "登录成功"
      // });
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await api.query(this.loginForm);
          console.log(res);
          if (res.errcode === 0) {
            this.$message({
              type: "success",
              message: "登录成功",
              duration: 1000
            });
          this.$root.currentData = res.data;
            this.$router.push(this.$route.query.redirect || "/");
          } else {
            this.$notify.error({
              title: "错误",
              message: res.errmsg,
              offset: 140
            });
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的身份证号",
            offset: 140
          });
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 100%;
  padding: 110px 40px 144px 40px;
  position: relative;

}
.main {
  max-width: 368px;
  margin: 0 auto;
}
.top {
  text-align: center;
}

.header {
  height: 44px;
  line-height: 44px;
}

.logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
}

.title {
  font-size: 33px;
  color: fade(#000, 85%);
  font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.desc {
  font-size: 14px;
  color: fade(#000, 45%);
  margin-top: 12px;
  margin-bottom: 40px;
}


</style>
