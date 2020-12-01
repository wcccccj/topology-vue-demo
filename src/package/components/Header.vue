<template>
  <div>
    <!-- 顶部导航栏 -->
    <div class="headers">
      <el-menu mode="horizontal" @select="onMenu">
        <el-submenu index="file" :show-timeout="0" :hide-timeout="0">
          <template slot="title">文件</template>
          <el-menu-item index="new">新建文件</el-menu-item>
          <el-menu-item index="open">打开本地文件（新建）</el-menu-item>
          <el-menu-item index="replace">导入本地文件...</el-menu-item>
          <el-menu-item class="separator"></el-menu-item>
          <el-menu-item index="save">保存到本地</el-menu-item>
          <el-menu-item index="savePng">下载为PNG</el-menu-item>
          <el-menu-item index="saveSvg">下载为SVG</el-menu-item>
        </el-submenu>
        <el-submenu index="edit" :show-timeout="0" :hide-timeout="0">
          <template slot="title">编辑</template>
          <el-menu-item index="undo" :disabled="TopologyData.locked">撤消</el-menu-item>
          <el-menu-item index="redo" :disabled="TopologyData.locked">重做</el-menu-item>
          <el-menu-item class="separator"></el-menu-item>
          <el-menu-item index="copy" :disabled="TopologyData.locked">复制</el-menu-item>
          <el-menu-item index="cut" :disabled="TopologyData.locked">剪切</el-menu-item>
          <el-menu-item index="paste" :disabled="TopologyData.locked">粘贴</el-menu-item>
        </el-submenu>
      </el-menu>
      <el-menu mode="horizontal" class="full"></el-menu>
      <el-menu mode="horizontal">
        <el-submenu
          class="border-right"
          index="view"
          title="视图"
          :show-timeout="0"
          :hide-timeout="0"
        >
          <template slot="title"> 视图：{{ scale }}% </template>
          <el-menu-item class="item-view">
            {{ scale }}%
            <el-button
              type="text"
              icon="el-icon-minus"
              @click.stop="handleChange('minus')"
            ></el-button>
            <el-button
              type="text"
              icon="el-icon-plus"
              @click.stop="handleChange('add')"
            ></el-button>
            <el-button size="small" @click.stop="handleChange('fit')"
              >窗口大小</el-button
            >
            <el-button size="small" @click.stop="handleChange('reset')"
              >重置</el-button
            >
          </el-menu-item>
        </el-submenu>
        <el-menu-item class="border-right" @click="$emit('lock')">
          <i
            :class="TopologyData.locked ? 'el-icon-lock' : 'el-icon-unlock'"
            :style="{ color: TopologyData.locked ? 'orange' : '' }"
          ></i>
        </el-menu-item>
        <el-submenu
          class="border-right"
          index="state"
          title="默认连线类型"
          :show-timeout="0"
          :hide-timeout="0"
        >
          <template slot="title">
            <i :class="`iconfont icon-${lineName}`"></i>
          </template>
          <el-menu-item
            v-for="(item, index) in lineNames"
            :key="index"
            :index="`line-${item}`"
            @click="handleLinenameChange(item)"
          >
            <i :class="`iconfont icon-${item}`"></i>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <el-menu mode="horizontal">
        <el-submenu
          class="border-right"
          index="state"
          title="默认起点箭头"
          :show-timeout="0"
          :hide-timeout="0"
        >
          <template slot="title">
            <i :class="`iconfont icon-from-${fromArrowType}`"></i>
          </template>
          <el-menu-item
            v-for="(item, index) in arrowTypes"
            :key="index"
            :index="`fromArrow-${item}`"
            @click="handlefromArrowChange(item)"
          >
            <i :class="`iconfont icon-from-${item}`"></i>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <el-menu mode="horizontal">
        <el-submenu
          class="border-right"
          index="state"
          title="默认终点箭头"
          :show-timeout="0"
          :hide-timeout="0"
        >
          <template slot="title">
            <i :class="`iconfont icon-to-${toArrowType}`"></i>
          </template>
          <el-menu-item
            v-for="(item, index) in arrowTypes"
            :key="index"
            :index="`toArrow-${item}`"
            @click="handletoArrowChange(item)"
          >
            <i :class="`iconfont icon-to-${item}`"></i>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <!-- <el-menu mode="horizontal">
        <el-menu-item class="logo border-right" @click.native="e => host.handleConsoleClick(e)">
          下载json
        </el-menu-item>
      </el-menu>
      <el-menu mode="horizontal">
        <el-menu-item @click.native="e => host.handleMenuClick(e)">
          下载为PNG
        </el-menu-item>
      </el-menu> -->
    </div>
  </div>
</template>

<script>
import * as FileSaver from 'file-saver'
export default {
  props: ['TopologyData', 'canvas'],
  data() {
    return {
      about: false,
      license: false,
      joinin: false,
      lineNames: ['curve', 'polyline', 'line'],
      arrowTypes: [
        '',
        'triangleSolid',
        'triangle',
        'diamondSolid',
        'diamond',
        'circleSolid',
        'circle',
        'line',
        'lineUp',
        'lineDown'
      ]
    }
  },
  inject: ['host'],
  computed: {
    scale() {
      return Math.floor(this.host.canvasData.scale * 100)
    },
    lineName() {
      if (this.canvas && this.canvas.data) {
        console.log(this.canvas)
        return this.canvas.data.lineName
      }
      return 'curve'
    },
    fromArrowType() {
      if (this.canvas && this.canvas.data) {
        return this.canvas.data.fromArrow
      }
      return ''
    },
    toArrowType() {
      if (this.canvas && this.canvas.data) {
        return this.canvas.data.toArrow
      }
      return 'triangleSolid'
    }
  },
  methods: {
    onMenu(key, keyPath) {
      if (!key || key.indexOf('/') === 0) {
        return
      }

      switch (key) {
        case 'new':
          this.TopologyData.locked = false
          this.canvas.open()
          break
        case 'open':
          this.handle_open()
          break
        case 'replace':
          this.handle_replace()
          break
        case 'save':
          this.handle_save()
          break
        case 'saveSvg':
          this.handle_saveSvg()
          break
        case 'savePng':
          this.handle_savePng()
          break
        case 'undo':
          this.canvas.undo(false)
          break
        case 'redo':
          this.canvas.redo()
          break
        case 'copy':
          this.canvas.copy()
          break
        case 'cut':
          this.canvas.cut()
          break
        case 'paste':
          this.canvas.paste()
          break
        default:
          break
      }
    },
    // 默认连线类型
    handleLinenameChange(value) {
      this.canvas.data.lineName = value
      this.canvas.render()
    },
    // 默认起始箭头
    handlefromArrowChange(value) {
      this.canvas.data.fromArrow = value
      this.canvas.render()
    },
    // 默认终点箭头
    handletoArrowChange(value) {
      this.canvas.data.toArrow = value
      this.canvas.render()
    },
    handleChange(type) {
      switch (type) {
        case 'add':
          if (this.host.canvasData.scale < 5) this.canvas.scaleTo(this.host.canvasData.scale + 0.1)
          break
        case 'minus':
          if (this.host.canvasData.scale > 0.35) this.canvas.scaleTo(this.host.canvasData.scale - 0.1)
          break
        case 'reset':
          this.canvas.scaleTo(1)
          break
        case 'fit':
          this.canvas.fitView()
          break
        default:
          break
      }
    },
    handle_open() {
      this.handle_replace()
    },
    handle_replace() {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = event => {
        const elem = event.srcElement || event.target
        if (elem.files && elem.files[0]) {
          const name = elem.files[0].name.replace('.json', '')
          const reader = new FileReader()
          reader.onload = e => {
            const text = e.target.result + ''
            try {
              const data = JSON.parse(text)
              this.canvas.open(data)
              this.TopologyData.locked = false
            } catch (e) {
              return false
            }
          }
          reader.readAsText(elem.files[0])
        }
      }
      input.click()
    },
    handle_save() {
      FileSaver.saveAs(
        new Blob([JSON.stringify(this.canvas.data)], {
          type: 'text/plain;charset=utf-8'
        }),
        `topology.json`
      )
    },
    handle_savePng() {
      this.canvas.saveAsImage('le5le.topology.png')
    },

    handle_saveSvg() {
      console.log(this.canvas)
      const ctx = new C2S(this.canvas.canvas.width + 200, this.canvas.canvas.height + 200)
      for (const item of this.canvas.data.pens) {
        item.render(ctx)
      }

      // for (const item of this.canvas.data.lines) {
      //   item.render(ctx);
      // }

      let mySerializedSVG = ctx.getSerializedSvg()
      mySerializedSVG = mySerializedSVG.replace(
        '<defs/>',
        `<defs>
    <style type="text/css">
      @font-face {
        font-family: 'topology';
        src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797') format('truetype');
      }
    </style>
  </defs>`
      )

      mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x')

      const urlObject = window.URL || window
      const export_blob = new Blob([mySerializedSVG])
      const url = urlObject.createObjectURL(export_blob)

      const a = document.createElement('a')
      a.setAttribute('download', 'le5le.topology.svg')
      a.setAttribute('href', url)
      const evt = document.createEvent('MouseEvents')
      evt.initEvent('click', true, true)
      a.dispatchEvent(evt)
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>

.headers {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  // font-size: 0.13rem;
  // height: 0.4rem;
  font-size: 100px;
  height: 40px;

  .full {
    flex: 1;
  }
  // .logo {
  //   img {
  //     height: 0.22rem;
  //     position: relative;
  //     top: -0.04rem;
  //   }
  // }
}
.el-submenu{

  ::v-deep .el-submenu__title{
    height: 40px;
    line-height: 40px;

  }

}
.el-menu{

  ::v-deep .el-menu-item{
    height: 40px;
    line-height: 40px;

  }

}

.el-menu-item,
.el-submenu__title {
  color: #314659 !important;
//   font-size: 0.13rem;
//   padding: 0 8px !important;
//   height: 0.39rem !important;
//   line-height: 0.39rem !important;

  &.separator {
    border-top: 1px solid #e8e8e8;
    margin: 0 0.1rem;
    height: 0.01rem !important;
    line-height: 0.01rem !important;
  }

  a {
    text-decoration: none;
    color: #314659;
  }

  .iconfont {
    color: #314659;
    font-size: 30px;
  }
}
.border-right {
  border-right: 1px solid #f3f3f3;
}

.el-menu--popup{
    .el-menu-item{
        background-color: #fff;
        i{
            margin-right: 5px;
        }
        i,span{
            color:rgba(0,0,0,.8);
        }
        &:hover{
          background-color: #66b1ff;
            i,span{
                color:#20222a;
            }
        }
        &.is-active {
            background-color: #c6e2ff;
            &:before {
                content: '';
                top: 0;
                left: 0;
                bottom: 0;
                width: 4px;
                background: #c6e2ff;
                position: absolute;
            }
            i,span{
                color:rgba(0,0,0,.6);
            }
        }
    }
}

// 让视图大小的操作框不被其他样式影响
.item-view {
  .el-button.el-button--text {
    ::v-deep i {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  .el-button.el-button--default {
    ::v-deep span {
      color: rgba(0, 0, 0, 0.6);
    }

  }
  &:hover {
    background-color: #fff !important;
    i,
    span {
      color: #20222a;
    }
  }
}
</style>
