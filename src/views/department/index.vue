<template>
  <div class="employee-container">
    <div>
      <div style="display: flex; justify-content: space-between" />
      <div>
        <el-row>
          <el-col :span="4">
            <el-form>
              <el-form-item label="部门编号">
                <el-input
                  v-model="query.department_id"
                  clearable
                  style="width: 120px; margin-right: 10px"
                  type="number"
                />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <el-form>
              <el-form-item label="部门名称">
                <el-input
                  v-model="query.department_name"
                  clearable
                  style="width: 120px; margin-right: 10px"
                />
              </el-form-item>
            </el-form>
          </el-col>

          <el-col :span="16">
            <el-button-group :span="12" style="margin-left: 50px">
              <el-button type="primary" icon="el-icon-plus" @click="add">
                添加
              </el-button>
              <el-button type="danger" icon="el-icon-delete" @click="multiDeleteCheckBox = true">
                批量删除
              </el-button>
              <el-button type="primary" icon="el-icon-download" @click="exportToExcel">
                导出
              </el-button>
              <el-button type="primary" icon="el-icon-refresh" @click="getTableData">
                刷新
              </el-button>
            </el-button-group>
          </el-col>

        </el-row>

      </div>
    </div>
    <el-divider />

    <div>
      <el-table
        id="table"
        :data="inputTableData"
        style="width: 100%"
        height="500"
        border
        fit
        highlight-current-row
        @selection-change="selectionLineChangeHandle"
      >
        <el-table-column type="selection" width="45" />
        <el-table-column
          prop="department_id"
          align="center"
          label="部门编号"
          width="400"
          sortable
        />
        <el-table-column
          prop="department_name"
          align="center"
          label="部门名称"
          sortable
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="300"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="set(scope)"
            >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="preDelScope = scope; deleteCheckBox = true"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-dialog
        :visible.sync="dialogVisible"
        :title="dialogType === 'edit' ? '编辑部门' : '创建部门'"
        :show-close="false"
      >
        <el-form>
          <el-form-item v-if="dialogType === 'edit'" label="部门编号">
            <el-input
              v-model="dialogData.department_id"
              :disabled="dialogType === 'edit'"
              clearable
              style="width: 150px; margin-right: 10px"
              type="number"
            />
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input
              v-model="dialogData.department_name"
              clearable
              style="width: 150px; margin-right: 10px"
            />
          </el-form-item></el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirmHandle">确定</el-button>
        </span>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        :visible.sync="deleteCheckBox"
        title="删除警告"
        width="30%"
        align-center="true"
        :show-close="false"
      >
        <span>确认要删除么?</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button
              @click="preDelScope = null; deleteCheckBox = false"
            >放弃</el-button>
            <el-button type="primary" @click="deleteCheckBox = false; del(preDelScope); preDelScope = null">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        :visible.sync="multiDeleteCheckBox"
        title="批量删除警告"
        width="30%"
        align-center="true"
        :show-close="false"
      >
        <span>确认要删除这些数据么?</span>
        <div>
          <ul>
            <li v-for="item in chooseData" :key="item.department_id">
              {{ item.department_id }} - {{ item.department_name }}
            </li>
          </ul>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button
              @click="multiDeleteCheckBox = false"
            >放弃</el-button>
            <el-button type="primary" @click="multiDeleteCheckBox = false; multiDel()">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { APIUrl } from '@/const/const'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import XLSXS from 'xlsx-style'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
    inputTableData() {
      var queryMap = this.query
      if (queryMap.department_id || queryMap.department_name) {
        return this.tableData.filter(data => {
          var match = true
          if (queryMap.department_id !== null) {
            match = match & (String(data.department_id).indexOf(queryMap.department_id) === 0)
          }
          if (queryMap.department_name !== '') {
            match = match & (data.department_name.indexOf(queryMap.department_name) > -1)
          }
          return match
        })
      }
      return this.tableData
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      axios.post(APIUrl + '/api/department', {
        data: {}
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data.code !== 0) {
          console.log('fail to get table data', response.data)
        } else {
          this.tableData = response.data.data.list
        }
      }).catch((err) => {
        console.log('fail to get table data', err)
      })
    },
    selectionLineChangeHandle(val) {
      this.chooseData = val
    },
    add() {
      this.dialogType = 'add'
      this.dialogData = {}
      this.dialogVisible = true
    },
    close() {
      this.dialogType = ''
      this.dialogOldData = {}
      this.dialogData = {}
      this.dialogVisible = false
    },
    confirmHandleAdd() {
      var addData = this.dialogData
      //
      this.close()
      //
      axios.put(APIUrl + '/api/department', addData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data.code !== 0) {
          this.$notify({
            title: '添加失败',
            message: '添加失败',
            type: 'error',
            duration: 2000
          })
          console.log('fail to add department data', response.data)
          return
        }
        this.$notify({
          title: '添加成功',
          message: '添加成功',
          type: 'success',
          duration: 2000
        })
        this.getTableData()
      }).catch((err) => {
        this.$notify({
          title: '添加失败',
          message: '添加失败',
          type: 'error',
          duration: 2000
        })
        console.log('fail to add department data', err)
      })
    },
    confirmHandleEdit() {
      var editData = {}
      for (var key in this.dialogData) {
        if (key === 'department_id') {
          editData[key] = this.dialogOldData[key]
          continue
        }
        if (this.dialogOldData[key] === this.dialogData[key]) {
          continue
        }
        switch (key) {
          case 'department_name':
            editData['new_' + key] = this.dialogData[key]
            continue
        }
      }
      //
      this.close()
      //
      axios
        .patch(APIUrl + '/api/department', editData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (response.data.code !== 0) {
            this.$notify({
              title: '修改失败',
              message: '修改失败',
              type: 'error',
              duration: 2000
            })
            console.log('fail to delete', response.data)
            return
          }
          this.$notify({
            title: '修改成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch((err) => {
          this.$notify({
            title: '修改失败',
            message: '修改失败',
            type: 'error',
            duration: 2000
          })
          console.log('fail to get table data', err)
        })
    },
    confirmHandle() {
      if (this.dialogType === 'edit') {
        this.confirmHandleEdit()
      } else if (this.dialogType === 'add') {
        this.confirmHandleAdd()
      }
    },
    del: function(scope) {
      axios
        .delete(
          APIUrl + '/api/department',
          {
            data: {
              department_id: scope.row.department_id
            }
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          if (response.data.code !== 0) {
            this.$notify({
              title: '删除失败',
              message: '删除失败',
              type: 'error',
              duration: 2000
            })
            console.log('fail to delete', response.data)
            return
          }
          this.$notify({
            title: '删除成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.tableData.splice(scope.$index, 1)
          this.getTableData()
        })
        .catch((err) => {
          this.$notify({
            title: '删除失败',
            message: '删除失败',
            type: 'error',
            duration: 2000
          })
          console.log('fail to get table data', err)
        })
    },
    multiDel() {
      var deleteDepartmentID = []
      for (var index in this.chooseData) {
        deleteDepartmentID[deleteDepartmentID.length] = this.chooseData[index].department_id
      }
      this.chooseData = []
      //
      var t = this
      //
      t.$notify({
        title: '批量删除中',
        message: '批量删除中，请勿进行任何操作',
        type: 'info',
        duration: 2000
      })

      var taskList = []

      for (const index in deleteDepartmentID) {
        var department_id = deleteDepartmentID[index]
        taskList.push(new Promise((resolve, reject) => {
          axios.delete(
            APIUrl + '/api/department',
            {
              data: {
                department_id: department_id
              }
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          ).then((response) => {
            if (response.data.code !== 0) {
              t.$notify({
                title: '删除失败',
                message: '删除失败' + '-' + department_id,
                type: 'error',
                duration: 2000
              })
              console.log('fail to delete', response.data)
              reject(department_id)
              return
            }
            t.$notify({
              title: '删除成功',
              message: '删除成功' + '-' + department_id,
              type: 'success',
              duration: 2000
            })
            resolve(department_id)
          }).catch((err) => {
            t.$notify({
              title: '删除失败',
              message: '删除失败' + '-' + department_id,
              type: 'error',
              duration: 2000
            })
            console.log('fail to get table data', err)
            reject(department_id)
          })
        }))
      }

      Promise.all(taskList).then(successList => {
        t.$notify({
          title: '批量删除成功',
          message: '批量删除成功',
          type: 'success',
          duration: 2000
        })
        t.getTableData()
      }).catch(errorList => {
        t.$notify({
          title: '批量删除失败',
          message: '批量删除失败',
          type: 'error',
          duration: 2000
        })
        t.getTableData()
      })
    },
    exportToExcel() {
      const excelData = [
        [
          '部门编号',
          '部门名称'
        ]
      ]
      for (var index in this.tableData) {
        var data = new Array(2)
        for (var key in this.tableData[index]) {
          var dataIndex = -1
          switch (key) {
            case 'department_id':
              dataIndex = 0
              break
            case 'department_name':
              dataIndex = 1
              break
          }
          if (dataIndex !== -1) {
            data[dataIndex] = this.tableData[index][key]
          }
        }
        excelData[excelData.length] = data
      }

      const filename = '部门信息.xlsx'

      const ws_name = '部门信息'
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.aoa_to_sheet(excelData)
      XLSX.utils.book_append_sheet(wb, ws, ws_name) // 数据添加到工作

      const wbout = XLSXS.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      })

      var s2ab = function(s) {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
        return buf
      }

      FileSaver.saveAs(
        new Blob([s2ab(wbout)], {
          type: 'application/octset-stream'
        }),
        filename
      )
    }
  },
  data() {
    return {
      query: {
        department_id: null,
        department_name: ''
      },
      dialogVisible: false, // 是否显示弹窗
      dialogType: '',
      dialogOldData: {},
      dialogData: {},
      tableData: [],
      departmentTableData: [],
      preDelScope: null,
      deleteCheckBox: false,
      multiDeleteCheckBox: false,
      chooseData: [],
      set: function(scope) {
        this.dialogType = 'edit'
        this.dialogOldData = {}
        this.dialogData = scope.row
        for (const index in scope.row) {
          this.dialogOldData[index] = scope.row[index]
        }
        this.dialogVisible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.employee {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
