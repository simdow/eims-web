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
        border="true"
        height="800"
        style="width:100%"
        :cell-style="rowClass"
        :header-cell-style="headClass"
      >
        <el-table-column
          prop="apartmentId"
          label="ID"
          width="200"
          align="center"
        />
        </el-table-column>
        <el-table-column
          prop="apartmentName"
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
