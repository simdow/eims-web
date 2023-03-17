<template>
  <div class="department-container">
    <div>
      <el-input
        v-model="searchInput"
        placeholder="请输入内容"
        clearable
      />
    </div>

    <div>
      <el-table
        :data="departmentData"
        border="true"
        height="800"
        style="width:100%"
        :cell-style="rowClass"
        :header-cell-style="headClass"
      >
        <el-table-column
          prop="departmentId"
          label="ID"
          width="200"
          align="center"
        />
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="部门名称"
          width="200"
          align="center"
        />
        </el-table-column>
      </el-table>
      <div />
    </div>
  </div></template>

<script>
export default {
  data() {
    return {
      departmentData: [
        {
          departmentId: '1',
          departmentName: '技术部'
        },
        {
          departmentId: '2',
          departmentName: '审核部'
        }
      ],
      searchInput: ''
    }
  },
  methods: {
    // 表头样式
    headClass() {
      return 'text-align: center;background:rgb(242,242,242);color:rgb(140,138,140)'
    },
    // 表格样式
    rowClass() {
      return 'text-align: center;'
    }
  }
}
</script>

<style lang="scss" scoped>
.department {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
