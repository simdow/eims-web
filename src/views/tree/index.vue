<template>
  <div class="management-container">
    <div>
      <el-input
        v-model="searchInput"
        placeholder="请输入内容"
        clearable
      />
    </div>

    <div>
      <el-table
        :data="apartmentData"
        border
        style="width = 50% ; margin-left: 30%; margin-top: 10%;"
      >
        <el-table-column
          prop="apartmentId"
          label="ID"
          width="200"
          align="center"
        />
        <el-table-column
          prop="apartmentName"
          label="部门名称"
          width="200"
          align="center"
        />
        </el-table-column>
      </el-table>
      <div />
    </div></el-input></div></div></template>

<script>
export default {
  data() {
    return {
      apartmentData: [
        {
          apartmentId: '1',
          apartmentName: '技术部'
        },
        {
          apartmentId: '2',
          apartmentName: '审核部'
        }
      ],
      searchInput: ''
    }
  }
}
</script>
