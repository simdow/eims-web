<template>
  <div class="employee-container">
    <div>
      <div style="display: flex; justify-content: space-between" />
      <div>
        <el-form ref="emp">
          <el-form-item label="职员编号">
            <el-input
              v-model="query.user_id"
              clearable
              style="width: 150px; margin-right: 10px"
              type="number"
            />
            <el-button
              :icon="expandMore ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
              type="text"
              @click="expandMore = !expandMore"
            >{{
              expandMore ? "高级搜索 - 收起" : "高级搜索 - 展开"
            }}</el-button>

            <el-button-group style="margin-left: 50px">
              <el-button type="primary" icon="el-icon-plus" @click="add">
                添加
              </el-button>
              <el-button type="danger" icon="el-icon-delete" @click="multiDeleteCheckBox = true">
                批量删除
              </el-button>
              <el-button type="primary" @click="exportToExcel">
                导出
              </el-button>
            </el-button-group>
          </el-form-item>

          <div>
            <template v-if="expandMore">
              <el-form :inline="true">
                <el-form-item label="姓名" prop="name">
                  <el-input
                    v-model="query.name"
                    clearable
                    style="width: 200px; margin-right: 10px"
                  />
                </el-form-item>
                <el-form-item label="职位">
                  <el-select v-model="query.position" placeholder="">
                    <el-option
                      key=""
                      label=""
                      value=""
                    />
                    <el-option
                      v-for="(_, item) in getPositions()"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="所属部门">
                  <el-select v-model="query.department_name" placeholder="">
                    <el-option
                      key=""
                      label=""
                      value=""
                    />
                    <el-option
                      v-for="(item, index) in departmentTableData"
                      :key="index"
                      :label="item.department_name"
                      :value="item.department_name"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </el-form>
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
          prop="user_id"
          align="center"
          label="职员编号"
          width="100"
          sortable
        />
        <el-table-column prop="name" align="center" label="姓名" width="120" sortable />
        <el-table-column prop="sex" align="center" label="性别" width="80" sortable />
        <el-table-column prop="age" align="center" label="年龄" width="80" sortable />
        <el-table-column
          prop="phone"
          align="center"
          label="手机号"
          width="130"
          sortable
        />
        <el-table-column prop="email" align="center" label="邮箱" width="180" sortable />
        <el-table-column
          prop="position"
          align="center"
          label="职位"
          width="110"
          sortable
        />
        <el-table-column prop="marry" align="center" label="婚姻状况" sortable />
        <el-table-column prop="education" align="center" label="教育程度" sortable />
        <el-table-column prop="join_time" align="center" label="入职时间" sortable />
        <el-table-column
          prop="department_name"
          align="center"
          label="所属部门"
          sortable
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="250"
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
        :title="dialogType === 'edit' ? '编辑职员' : '创建职员'"
        :show-close="false"
      >
        <el-form :model="dialogData" label-width="80px" label-position="left">
          <el-form-item v-if="dialogType === 'edit'" label="职员编号">
            <el-col :span="10">
              <el-input v-model="dialogData.user_id" disabled />
            </el-col>
          </el-form-item>
          <el-form-item label="姓名">
            <el-col :span="10">
              <el-input v-model="dialogData.name" />
            </el-col>
          </el-form-item>
          <el-form-item label="性别">
            <el-col :span="10">
              <el-select v-model="dialogData.sex" placeholder="">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="年龄">
            <el-col :span="10">
              <el-input v-model="dialogData.age" type="number" />
            </el-col>
          </el-form-item>
          <el-form-item label="手机号">
            <el-col :span="10">
              <el-input v-model="dialogData.phone" type="number" />
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-col :span="10">
              <el-input v-model="dialogData.email" />
            </el-col>
          </el-form-item>
          <el-form-item label="职位">
            <el-col :span="10">
              <el-input v-model="dialogData.position" />
            </el-col>
          </el-form-item>
          <el-form-item label="婚姻状况">
            <el-select v-model="dialogData.marry" placeholder="">
              <el-option
                v-for="item in marryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /></el-select>
          </el-form-item>
          <el-form-item label="教育程度">
            <el-col :span="10">
              <el-input v-model="dialogData.education" />
            </el-col>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-col :span="10">
              <el-date-picker
                v-model="dialogData.join_time"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-col :span="10">
              <el-select v-model="dialogData.department_id" placeholder="">
                <el-option
                  v-for="(item, index) in departmentTableData"
                  :key="index"
                  :label="item.department_name"
                  :value="item.department_id"
                />
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>

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
            <li v-for="item in chooseData" :key="item.user_id">
              {{ item.user_id }} - {{ item.name }}
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
  name: 'Employee',
  computed: {
    ...mapGetters(['name']),
    inputTableData() {
      var queryMap = this.query
      if (queryMap.user_id || queryMap.name || queryMap.position || queryMap.department_name) {
        return this.tableData.filter(data => {
          var match = true
          if (queryMap.user_id !== null) {
            match = match & (String(data.user_id).indexOf(queryMap.user_id) === 0)
          }
          if (queryMap.name !== '') {
            match = match & (data.name.indexOf(queryMap.name) > -1)
          }
          if (queryMap.position !== '') {
            match = match & (data.position.indexOf(queryMap.position) > -1)
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
    this.getDepartmentInfo()
  },
  methods: {
    formatTableData(data) {
      for (const index in data) {
        if (data[index].join_time === undefined) {
          continue
        }
        const timestamp = data[index].join_time
        const date = new Date(timestamp * 1000)
        const year = date.getFullYear()
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const day = ('0' + date.getDate()).slice(-2)
        data[index].join_time = `${year}-${month}-${day}`
      }
      this.tableData = data
    },
    getDepartmentInfo() {
      axios
        .post(
          APIUrl + '/api/department',
          {
            data: {}
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          if (response.data.code !== 0) {
            console.log('fail to get department table data', response.data)
          } else {
            this.departmentTableData = response.data.data.list
          }
        })
        .catch((err) => {
          console.log('fail to get department table data', err)
        })
    },
    getTableData() {
      axios
        .post(
          APIUrl + '/api/employee',
          {
            data: {}
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          if (response.data.code !== 0) {
            console.log('fail to get table data', response.data)
          } else {
            this.formatTableData(response.data.data.list)
          }
        })
        .catch((err) => {
          console.log('fail to get table data', err)
        })
    },
    close() {
      this.dialogType = ''
      this.dialogOldData = {}
      this.dialogData = {}
      this.dialogVisible = false
    },
    confirmEditHandle() {
      var editData = {}
      for (var key in this.dialogData) {
        if (key === 'user_id') {
          editData[key] = this.dialogOldData[key]
          continue
        }
        if (this.dialogOldData[key] === this.dialogData[key]) {
          continue
        }
        switch (key) {
          case 'name':
          case 'sex':
          case 'phone':
          case 'email':
          case 'position':
          case 'marry':
          case 'education':
          case 'department_id':
            editData['new_' + key] = this.dialogData[key]
            continue
          case 'age':
            var ageInt = parseInt(this.dialogData[key])
            if (isNaN(ageInt) || ageInt < 0) {
              ageInt = 0
            }
            editData['new_' + key] = ageInt
            continue
          case 'join_time':
            editData['new_' + key] =
              new Date(this.dialogData[key]).getTime() / 1000
            continue
        }
      }
      //
      this.close()
      //
      axios
        .patch(APIUrl + '/api/employee', editData, {
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
    confirmAddHandle() {
      var addData = this.dialogData
      if (addData['join_time']) {
        addData['join_time'] = new Date(addData['join_time']).getTime() / 1000
      }
      if (addData['age']) {
        var ageInt = parseInt(addData['age'])
        if (isNaN(ageInt) || ageInt < 0) {
          ageInt = 0
        }
        addData['age'] = ageInt
      }
      //
      this.close()
      //
      axios.put(APIUrl + '/api/employee', addData, {
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
          console.log('fail to add employee data', response.data)
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
        console.log('fail to add employee data', err)
      })
    },
    confirmHandle() {
      if (this.dialogType === 'edit') {
        this.confirmEditHandle()
      } else if (this.dialogType === 'add') {
        this.confirmAddHandle()
      }
    },
    exportToExcel() {
      const excelData = [
        [
          '职工编号',
          '姓名',
          '性别',
          '电话',
          '邮箱',
          '职位',
          '婚姻状况',
          '学历',
          '入职时间',
          '所属部门'
        ]
      ]
      for (var index in this.tableData) {
        var data = new Array(10)
        for (var key in this.tableData[index]) {
          var dataIndex = -1
          switch (key) {
            case 'user_id':
              dataIndex = 0
              break
            case 'name':
              dataIndex = 1
              break
            case 'sex':
              dataIndex = 2
              break
            case 'phone':
              dataIndex = 3
              break
            case 'email':
              dataIndex = 4
              break
            case 'position':
              dataIndex = 5
              break
            case 'marry':
              dataIndex = 6
              break
            case 'education':
              dataIndex = 7
              break
            case 'join_time':
              dataIndex = 8
              break
            case 'department_name':
              dataIndex = 9
              break
          }
          if (dataIndex !== -1) {
            data[dataIndex] = this.tableData[index][key]
          }
        }
        excelData[excelData.length] = data
      }

      const filename = '员工信息.xlsx'

      const ws_name = '员工信息'
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
    },
    del: function(scope) {
      axios
        .delete(
          APIUrl + '/api/employee',
          {
            data: {
              user_id: scope.row.user_id
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
              type: 'Error',
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
            type: 'Error',
            duration: 2000
          })
          console.log('fail to get table data', err)
        })
    },
    add() {
      this.dialogType = 'add'
      this.dialogData = {}
      this.dialogVisible = true
    },
    selectionLineChangeHandle(val) {
      this.chooseData = val
    },
    multiDel() {
      var deleteUserID = []
      for (var index in this.chooseData) {
        deleteUserID[deleteUserID.length] = this.chooseData[index].user_id
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

      for (const index in deleteUserID) {
        var user_id = deleteUserID[index]
        taskList.push(new Promise((resolve, reject) => {
          axios.delete(
            APIUrl + '/api/employee',
            {
              data: {
                user_id: user_id
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
                message: '删除失败' + '-' + user_id,
                type: 'Error',
                duration: 2000
              })
              console.log('fail to delete', response.data)
              reject(user_id)
              return
            }
            t.$notify({
              title: '删除成功',
              message: '删除成功' + '-' + user_id,
              type: 'success',
              duration: 2000
            })
            resolve(user_id)
          }).catch((err) => {
            t.$notify({
              title: '删除失败',
              message: '删除失败' + '-' + user_id,
              type: 'Error',
              duration: 2000
            })
            console.log('fail to get table data', err)
            reject(user_id)
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
          type: 'Error',
          duration: 2000
        })
        t.getTableData()
      })
    },
    getPositions() {
      var posotionMap = {}
      for (var index in this.tableData) {
        var position = this.tableData[index].position
        if (position !== null && position !== '') {
          posotionMap[position] = 1
        }
      }
      return posotionMap
    }
  },
  data() {
    return {
      sexOptions: [
        {
          value: '男'
        },
        {
          value: '女'
        }
      ],
      marryOptions: [
        {
          value: '已婚'
        },
        {
          value: '未婚'
        }
      ],
      dialogVisible: false, // 是否显示弹窗
      dialogType: '',
      dialogOldData: {},
      dialogData: {},
      expandMore: false, // 是否展开更多搜索条件
      query: {
        user_id: null,
        name: '',
        position: '',
        department_name: ''
      },
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
