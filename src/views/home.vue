<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!-- 首页user信息 -->
          <el-card shadow="hover">
            <div class="userCard">
              <el-avatar :size="150" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <div class="userInfo">
                <p class="important-font">Admin</p>
                <p class="secondary-font">管理员</p>
              </div>
            </div>
            <div class="login-info">
              <p>上次登录时间: 2023/03/15 18:16</p>
            </div>
          </el-card>
          <!-- 首页表格 -->
          <el-card shadow="hover" class="tableInfo">
            <div slot="header">
              <span class="important-font">员工信息</span>
            </div>
            <div>
              <el-table
                :data="tableData"
                stripe
                border
                height="450px"
                style="width: 100%"
              >
                <el-table-column prop="name" label="姓名" width="80" />
                <el-table-column prop="position" label="职位" />
              </el-table>
            </div>
          </el-card>
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
      <div>
        <div style="margin-top: 2%; margin-left: 40%; width: 50%">
          <el-table :data="messageData" stripe style="width: 100%">
            <el-table-column prop="msg" label="通知" width="550">
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
export default {
  name: 'Index',
  data() {
    return {
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

