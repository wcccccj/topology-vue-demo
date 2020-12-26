<template>
  <div>
    <div class="title">
      选择图片
      <el-button type="text" @click="settingbar.show.imgDialog=false">返回</el-button>
    </div>
    <div>
      <div class="content">
        <div class="btn-group">
          <el-button type="primary" size="small" class="btn-upload">上传图片</el-button>
          <el-button type="primary" size="small" class="btn-upload">在线图片</el-button>
        </div>
        <div class="img-group">
          <el-row>
            <el-col :span="8" class="pd-5 c-p">
              <div class="empty-img">空</div>
            </el-col>
            <el-col :span="8" v-for="(item, index) in 10" :key="index" class="pd-5 c-p">
              <el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'" :fit="'cover'"></el-image>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImgDialog',
  inject: ['settingbar'],
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.title {
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 13px;
  font-weight: bold;
}
.content {
  padding: 5px;
}
.btn-group {
  display: flex;
}
.btn-upload {
  width: 100%;
}
.empty-img {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #ccc;
}
.pd-5{
  padding: 5px;
}
.c-p {
  cursor: pointer;
}
</style>
