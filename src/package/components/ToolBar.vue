<template>
  <!-- 左边图形库 -->
  <div class="tools">
    <el-input
      v-model="search"
      placeholder="搜索"
      style="padding: 5px;box-sizing: border-box"
      @input="searchChange"
    ></el-input>
    <div v-for="(item, index) in Tools" :key="index">
      <div class="title">{{ item.group }}</div>
      <div class="buttons">
        <a
          v-for="(btn, i) in item.children"
          :key="i"
          :title="btn.name"
          :draggable="btn.data"
          @dragstart="onDrag($event, btn)"
        >
          <i :class="`iconfont ${btn.icon}`"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { debounce } from '../util/util.js'
import { Tools } from '../services/canvas.js'

export default {
  name: 'ToolBar',
  data() {
    return {
      Tools,
      search: ''
    }
  },
  methods: {
    onDrag(event, node) {
      console.log(JSON.stringify(node.data, null, 2))
      // 解决浏览器手势插件命名冲突
      event.dataTransfer.setData('Topology', JSON.stringify(node.data))
    },
    searchChange(val) {
      this.searchTool(val)
    },
    searchTool: debounce(function() {
      console.log(this.search)
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
// 左侧图形库
.tools {
  flex-shrink: 0;
  width: 200px;
  border-right: 1px solid #d9d9d9;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 40px;
  bottom: 0;
  z-index: 10;
  .title {
    color: #0d1a26;
    font-weight: 600;
    font-size: 12px;
    line-height: 1;
    padding: 5px 10px;
    margin-top: 8px;
    border-bottom: 1px solid #ddd;
    &:first-child {
      border-top: none;
    }
  }
  .buttons {
    padding: 10px 0;
    a {
      display: inline-block;
      color: #314659;
      line-height: 1;
      width: 40px;
      height: 40px;
      text-align: center;
      text-decoration: none !important;
      cursor: pointer;
      .iconfont {
        font-size: 24px;
      }
      &:hover {
        color: #1890ff;
      }
    }
  }
}

// 画布
.full {
  flex: 1;
  width: initial;
  position: relative;
  background: #fff;
}

// 右侧属性栏
.props {
  width: 260px;
  padding: 10px 0;
  border-left: 1px solid #d9d9d9;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  font-size: 14px;
  color: #000;
  // 公共样式
  .title {
    color: #0d1a26;
    font-weight: 600;
    font-size: 12px;
    padding: 5px 15px;
    border-bottom: 1px solid #ccc;
  }
  .settings {
    padding: 8px 15px;
    .item {
      width: 100%;
      margin: 8px 0;
      display: flex;
      align-items: center;
      .label {
        width: 100px;
      }
      &.select {
        .ant-select {
          flex: 1;
          display: flex;
        }
        .ant-select >>> .ant-select-selection {
          width: 100%;
        }
      }
    }
  }
  // 小提示
  .bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    .group {
      padding: 8px 15px;
      font-size: 12px;
      list-style-type: disc;
      list-style-position: inside;
      li {
        line-height: 24px;
      }
    }
  }
  .row-layout {
    color: #595959;
    padding: 3px 15px;
    .ant-col {
      margin-top: 5px;
    }
    .bable {
      font-size: 12px;
      height: 24px;
      line-height: 24px;
    }
  }
}

// 颜色选择器
.color-picker.m-colorPicker >>> .colorBtn {
  cursor: pointer;
}
.color-picker.m-colorPicker >>> .box {
  width: 215px !important;
}
</style>
