<template>
  <div>
    <el-container style="position: relative;">
      <el-header :height="'40px'">
        <Header :TopologyData="TopologyData" @lock="onRootChange" :canvas="canvas"></Header>
      </el-header>
      <el-container class="topology">
        <el-aside width="175px">
          <ToolBar></ToolBar>
        </el-aside>
        <el-main>
          <div id="topology-canvas" class="full" :class="TopologyData.grid ? 'canvas-container' : ''" @contextmenu="onContextMenu($event)"></div>
          <div class="context-menu" v-if="contextmenu.left" :style="contextmenu">
            <CanvasContextMenu :canvas="canvas" :pprops.sync="props"></CanvasContextMenu>
          </div>
        </el-main>
        <el-aside width="260px">
          <SettingBar :data.sync="TopologyData" :pprops.sync="props" :canvasData="canvasData" :canvas="canvas"></SettingBar>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from './components/Header'
import ToolBar from './components/ToolBar'
import SettingBar from './components/SettingBar'

// 1. 导入绘画引擎
import { Topology } from '@topology/core'
// 图形库
import { register as registerFlow } from '@topology/flow-diagram'
import { canvasRegister } from './services/canvas.js'
import CanvasContextMenu from './components/CanvasContextMenu'
import './static/font/arrow.scss'

// let canvas
const canvasOptions = {}

export default {
  name: 'Index',
  components: {
    Header,
    ToolBar,
    SettingBar,
    CanvasContextMenu
  },
  provide() {
    return {
      host: this
    }
  },
  data() {
    return {
      canvas: null,
      props: {
        node: null, // 节点
        line: null, // 连线
        nodes: null,
        multi: false, // 多个对象
        expand: false,
        locked: false
      },
      contextmenu: {
        left: null,
        top: null,
        bottom: null
      },
      canvasData: {}, // 画布数据
      TopologyData: {
        grid: true, // 背景网格
        locked: false // 画布锁定
      }
    }
  },
  created() {
    // 注册图形库
    // registerFlow()
    canvasRegister()
    document.onclick = event => {
      this.contextmenu = {
        left: null,
        top: null,
        bottom: null
      }
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    'props.node': {
      handler() {
        this.canvas.render()
      },
      deep: true
    }
  },
  methods: {
    init() {
      // 创建画布
      // 第一个参数'topo-canvas'表示canvas的dom元素id；第二个参数{}表示画布选项，这里表示全部使用默认值。
      canvasOptions.on = this.onMessage
      this.canvas = new Topology('topology-canvas', canvasOptions)
      this.canvas.showGrid(true)
      // 渲染图形
      // const json = {}
      // this.canvas.open(json)
      // 如果json发送变化，重绘
      this.canvas.render()
    },
    onContextMenu(event) {
      event.preventDefault()
      event.stopPropagation()
      console.log(event, '===onContextMenu')
      if (event.clientY + 360 < document.body.clientHeight) {
        this.contextmenu = {
          left: event.clientX + 'px',
          top: event.clientY + 'px'
        }
      } else {
        this.contextmenu = {
          left: event.clientX + 'px',
          bottom: document.body.clientHeight - event.clientY + 'px'
        }
      }
    },
    onMessage(event, data) {
      console.log('=====onMessage=====', event, data)
      // console.log(canvas, '******canvas')
      // 右侧输入框编辑状态时点击编辑区域其他元素，onMessage执行后才执行onUpdateProps方法，通过setTimeout让onUpdateProps先执行
      setTimeout(() => {
        switch (event) {
          case 'node':
          case 'addNode':
            this.props = {
              node: data,
              line: null,
              multi: false,
              expand: this.props.expand,
              nodes: null,
              locked: this.TopologyData.locked
            }
            break
          case 'line':
          case 'addLine':
            data.fromArrowColor = data.fromArrowColor ? data.fromArrowColor : '#222'
            data.toArrowColor = data.toArrowColor ? data.toArrowColor : '#222'
            this.props = {
              node: null,
              line: data,
              multi: false,
              nodes: null,
              locked: this.TopologyData.locked
            }
            break
          case 'multi':
            this.props = {
              node: null,
              line: null,
              multi: true,
              nodes: data.length > 1 ? data : null,
              locked: this.getLocked({ nodes: data })
            }
            break
          case 'space':
            this.props = {
              node: null,
              line: null,
              multi: false,
              nodes: null,
              locked: this.TopologyData.locked
            }
            break
          case 'moveOut':
            break
          case 'moveNodes':
          case 'resizeNodes':
            if (data.length > 1) {
              this.props = {
                node: null,
                line: null,
                multi: true,
                nodes: data,
                locked: this.getLocked({ nodes: data })
              }
            } else {
              this.props = {
                node: data[0],
                line: null,
                multi: false,
                nodes: null,
                locked: this.TopologyData.locked
              }
            }
            break
          case 'resize':
          case 'scale':
          case 'locked':
            if (this.canvas && this.canvas.data) {
              this.canvasData = {
                scale: this.canvas.data.scale || 1, // 当前图文缩放比例： 0 - 1
                lineName: this.canvas.data.lineName, // 当前图文默认连线类型
                fromArrowType: this.canvas.data.fromArrowType, // 默认连线起点箭头
                toArrowType: this.canvas.data.toArrowType, // 连线终点默认箭头
                fromArrowlockedType: this.canvas.data.locked // 0-未锁定，可任意编辑，1-只读模式，允许选中，2-禁止鼠标交互，无法做任何操作。纯静态画面模式
              }
            }
            break
        }
      }, 0)
    },
    // 批量操作时是否画布锁定
    getLocked(data) {
      let locked = true
      if (data.nodes && data.nodes.length) {
        for (const item of data.nodes) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }
      if (locked && data.lines) {
        for (const item of data.lines) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }
      return locked
    },
    // 画布锁定
    onRootChange(e) {
      this.TopologyData.locked = !this.TopologyData.locked
      this.canvas.lock(+this.TopologyData.locked)
      this.canvas.render()
    },
    onUpdateProps(node) {
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      this.canvas.updateProps(node)
    },

    // 下载为图片
    handleMenuClick(e) {
      e.preventDefault()
      this.canvas.saveAsImage(`${Date.parse(new Date())}.png`)
    },
    // 打印
    handleConsoleClick(e) {
      e.preventDefault()
      console.log(JSON.stringify(this.canvas.data), '打印this.canvas.data数据')
    }
  }
}
</script>
<style scoped>
.el-header {
  width: 100%;
  padding: 0;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0;
}

.topology {
  display: flex;
  width: 100%;
  height: 100%;
}
.full {
  flex: 1;
  width: initial;
  position: relative;
  overflow: auto;
  background: #fff;
  height: calc(100vh - 40px);
}

.context-menu {
  position: fixed;
  z-index: 10;
}
</style>
