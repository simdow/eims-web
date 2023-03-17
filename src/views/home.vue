<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!-- 首页user信息 -->
          <el-card shadow="hover">
            <div class="userCard">
              <el-avatar :size="150" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <div class="userInfo">
                <p class="important-font">Admin</p>
                <p class="secondary-font">身份 : 管理员</p>
                <p class="secondary-font">上次登录时间: {{ loginTime }}</p>
              </div>
            </div>

          </el-card>
          <div>
            <el-calendar ref="calendar">
              <template #header="{ date }">
                <span>工作日历</span>
                <el-button-group>
                  <el-button size="small" @click="selectDate('prev-year')">
                    Previous Year
                  </el-button>
                  <el-button size="small" @click="selectDate('prev-month')">
                    Previous Month
                  </el-button>
                  <el-button size="small" @click="selectDate('today')">Today</el-button>
                  <el-button size="small" @click="selectDate('next-month')">
                    Next Month
                  </el-button>
                  <el-button size="small" @click="selectDate('next-year')">
                    Next Year
                  </el-button>
                </el-button-group>
              </template>
            </el-calendar>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            shadow="hover"
            :body-style="{ display: 'flex',padding: 0 }"
            class="OrderCard"
          >
            <i
              class="icon"
              :class="'el-icon-'+item.icon"
              :style="{ background: item.color}"
            />
            <div>
              <p class="important-font">￥{{ item.value }}</p>
              <p class="secondary-font">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div>
        <div style="margin-top: 5%; margin-left: 40%; width: 49%">
          <el-table :data="messageData" stripe style="width: 100%">
            <el-table-column prop="msg" label="通知" width="580">
              <template slot-scope="scope">
                <a
                  href="scope.row.msg"
                  target="_blank"
                  class="buttonText"
                >{{ scope.row.msg }}</a>
              </template>
            </el-table-column>

            <el-table-column prop="date" width="150">
              <template slot="header" slot-scope="scope">
                <a class="color: #3c494b" href="" target="_blank">More</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div></el-row>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Home',
  data() {
    return {
      loginTime: '未知',
      tableData: [{
        date: '2023-03-14',
        name: 'ken',
        position: 'C++管理员'
      },
      {
        date: '2023-03-12',
        name: 'anny',
        position: 'Java管理员'
      },
      {
        date: '2023-03-10',
        name: 'bta',
        position: '前端设计师'
      }
      ],
      messageData: [{
        msg: '员工通告',
        date: '2022-05-13'
      },
      {
        msg: '晋升通知',
        date: '2022-07-15'
      }
      ],
      calendar: null
    }
  },
  mounted() {
    this.loginTime = (function() {
      var date = new Date()
      var op1 = '-'
      var op2 = ':'
      var month = date.getMonth() + 1
      var now = date.getDate()
      if (month >= 1 && now <= 9) {
        month = '0' + month
      }
      if (now >= 0 && now <= 9) {
        now = '0' + now
      }
      var current = date.getFullYear() + op1 + month + op1 + now + ' ' + date.getHours() + op2 + date.getMinutes()

      return current
    }())
    this.calendar = ref('calendar')
  },
  method: {
    selectDate: (val) => {
      this.calendar.value.selectDate(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.view-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.cal .el-calendar-table .el-calendar-day{
  height: 10%;
  width: 10%;
}

.el-carousel__item h3 {
  color: #91e61a;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #6d88ae;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #da4994;
}

.cal .el-calendar-table .el-calendar-day {
  height: 30px;
}
</style>
