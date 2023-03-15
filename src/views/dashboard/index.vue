<template>
  <div class="dashboard-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="user_id" label="职员编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="position" label="职位" width="180"> </el-table-column>
      <el-table-column prop="marry" label="婚姻状况"> </el-table-column>
      <el-table-column prop="education" label="教育程度"> </el-table-column>
      <el-table-column prop="join_time" label="入职时间"> </el-table-column>
      <el-table-column prop="department_name" label="所属部门"> </el-table-column>
    </el-table>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      tableData: [
        {
          "user_id": 1,
          "name": "张三",
          "sex": "男",
          "age": 18,
          "phone": "12345678901",
          "email": "zhangsan@example.com",
          "position": "前端工程师",
          "marry": "未婚",
          "education": "本科",
          "join_time": "2019-01-01",
          "department_name": "技术部"
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
</style>
