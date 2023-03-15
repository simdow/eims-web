<template>
  <div class="dashboard-container">
    <div>
      <div style="display: flex;justify-content: space-between;" />
      <div>
        <el-form ref="emp" :model="emp" :rules="rules" @submit.native.prevent>
          <el-form-item label="name">
            <el-input
              v-model="search_name"
              placeholder="请输入员工姓名进行搜索，可以直接回车搜索..."
              clearable
              style="width :350px;margin-right:10px"
            />
            <el-button-group>
              <el-button icon="el-icon-search" type="primary">搜索</el-button>
              <el-button icon="el-icon-refresh" type="info">重置</el-button>
            </el-button-group>
            <el-button-group>
              <el-button style="margin-left: 50px;" type="primary">
                <i
                  :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
                  aria-hidden="true"
                />
                高级搜索
              </el-button>

              <el-button style="margin-left:50px;" type="primary">
                <i
                  :class="showDateSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
                  aria-hidden="true"
                />
                <!--??-->
                入职日期
              </el-button>

            </el-button-group>

            <el-button-group style="margin-left: 50px">
              <el-button type="danger" icon="el-icon-delete" :disabled="!multipleSelectionFlag" @click="popDelete">
                批量选择
              </el-button>
            </el-button-group>
            <el-button-group style="margin-left: 50px">
              <el-button type="primary" icon="el-icon-plus">
                添加用户
              </el-button>

            </el-button-group>

          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-divider />

    <div>
      <el-table :data="tableData" style="width: 100%" height="250" border @selection-change="">
        <el-table-column type="selection" width="55" label="选择" />
        <el-table-column prop="user_id" align="center" label="职员编号" width="180" sortable />
        <el-table-column prop="name" align="center" label="姓名" width="180" />
        <el-table-column prop="sex" align="center" label="性别" width="180" />
        <el-table-column prop="age" align="center" label="年龄" width="180" />
        <el-table-column prop="phone" align="center" label="手机号" width="180" />
        <el-table-column prop="email" align="center" label="邮箱" width="180" />
        <el-table-column prop="position" align="center" label="职位" width="180" />
        <el-table-column prop="marry" align="center" label="婚姻状况" />
        <el-table-column prop="education" align="center" label="教育程度" />
        <el-table-column prop="join_time" align="center" label="入职时间" />
        <el-table-column prop="department_name" align="center" label="所属部门" />
        <el-table-column fixed="right" label="操作" align="center" width="250" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="show">修改</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="show">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      search_name: '',
      tableData: [
        {
          'user_id': 1,
          'name': '张三',
          'sex': '男',
          'age': 18,
          'phone': '12345678901',
          'email': 'zhangsan@example.com',
          'position': '前端工程师',
          'marry': '未婚',
          'education': '本科',
          'join_time': '2019-01-01',
          'department_name': '技术部'
        },
        {
          'user_id': 2,
          'name': '张三',
          'sex': '男',
          'age': 18,
          'phone': '12345678901',
          'email': 'zhangsan@example.com',
          'position': '前端工程师',
          'marry': '未婚',
          'education': '本科',
          'join_time': '2019-01-01',
          'department_name': '技术部'
        }
      ],
      show: function() {
        alert('我是弹出的内容')
      }
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
