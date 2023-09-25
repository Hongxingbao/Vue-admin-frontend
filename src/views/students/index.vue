<template>
  <div>
  <el-table :data="students">
    <el-table-column prop="id" label="编号"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="sex" label="性别"></el-table-column>
    <el-table-column prop="age" label="年龄"></el-table-column>
    <el-table-column label="操作" fixed="right">
      <template v-slot="scope">
        <el-button
          size="mini"
          @click="handleUpdate(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      <el-button
        size="small"
        type="primary"
        fixed="right"
        @click="handleAdd()">新增</el-button>

    <el-dialog width="22%" title="个人信息" :visible.sync="dialogUpdateFormVisible">
      <el-form :model="updateForm">
        <el-form-item  label="编号">
          <el-input size="mini" :readonly="true" v-model="updateForm.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input size="mini" v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select size="mini" v-model="updateForm.sex" placeholder="请选择性别">
            <el-option value="男"></el-option>
            <el-option value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input size="mini" v-model="updateForm.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="22%" title="个人信息" :visible.sync="dialogInsertFormVisible">
      <el-form :model="insertForm">
        <el-form-item  label="编号">
          <el-input size="mini" :readonly="true" v-model="insertForm.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input size="mini" v-model="insertForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select size="mini" v-model="insertForm.sex" placeholder="请选择性别">
            <el-option value="男"></el-option>
            <el-option value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input size="mini" v-model="insertForm.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInsertFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmInsert()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {all,deleteById,update,insert} from '@/api/students'
const options={
  mounted() {
    this.query()
  },
  data() {
    return {
      students: [],
      dialogUpdateFormVisible:false,
      dialogInsertFormVisible:false,
      updateForm:{
        id:0,
        name:'',
        sex:'男',
        age:0
      },
      insertForm:{
        id:0,
        name:'',
        sex:'男',
        age:0
      }
    }
  },
  methods:{
    async query(){
      const {data} = await all()
      this.students = data
    },
    async handleDelete(row){
      try{
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',})
        await deleteById(row.id)
        await this.query()
      }catch (e){
        console.log('取消删除')
      }
    },
     handleUpdate(row){
      this.dialogUpdateFormVisible = true,
      this.updateForm = {...row}
    },
    async confirmUpdate(){
      await update(this.updateForm.id,this.updateForm)
      this.dialogUpdateFormVisible=false
      await this.query()
    },
    async handleAdd(){
      this.dialogInsertFormVisible = true
    },
    async confirmInsert(){
      await insert(this.insertForm)
      this.dialogInsertFormVisible=false
      await this.query()
    },
  }
}
export default options;
</script>
<style scoped>
.el-input,
.el-select {
  width: 180px;
}
</style>


