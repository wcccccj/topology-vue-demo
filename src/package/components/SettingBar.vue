<template>
  <div style="height: 100%;">
    <div class="props">
      <!-- 选中节点 -->
      <el-collapse class="toolbar" v-model="activeNames" v-if="props.node && !TopologyData.locked">
        <el-collapse-item title="位置和大小" name="1" v-if="props.node && !TopologyData.locked">
          <el-row :gutter="16" class="row-layout">
            <el-col :span="12">
              <div class="bable">X(px)</div>
              <div class="bable-content">
                <el-input-number v-model="props.node.rect.x" :size="inputSize" @change="host.onUpdateProps(props.node)" :controls="false"></el-input-number>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">Y(px)</div>
              <div class="bable-content">
                <el-input v-model="props.node.rect.y" :size="inputSize" @change="host.onUpdateProps(props.node)"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">宽(px)</div>
              <div class="bable-content">
                <el-input v-model="props.node.rect.width" :size="inputSize" @change="host.onUpdateProps(props.node)"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">高(px)</div>
              <div class="bable-content">
                <el-input v-model="props.node.rect.height" :size="inputSize" @change="host.onUpdateProps(props.node)"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">
                圆角
                <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                  <i class="el-icon-bell"></i>
                </el-tooltip>
              </div>
              <div class="bable-content">
                <el-input v-model="props.node.borderRadius" :size="inputSize" @change="host.onUpdateProps(props.node)"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">旋转 （°）</div>
              <div class="bable-content">
                <el-input v-model="props.node.rotate" :size="inputSize" @change="host.onUpdateProps(props.node)"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">内边距 - 左</div>
              <div class="bable-content">
                <el-input v-model="props.node.paddingLeft" :size="inputSize" @change="host.onUpdateProps(props.node)"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">内边距 - 右</div>
              <div class="bable-content">
                <el-input v-model="props.node.paddingRight" :size="inputSize" @change="host.onUpdateProps(props.node)"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">内边距 - 上</div>
              <div class="bable-content">
                <el-input v-model="props.node.paddingTop" :size="inputSize" @change="host.onUpdateProps(props.node)"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">内边距 - 下</div>
              <div class="bable-content">
                <el-input v-model="props.node.paddingBottom" :size="inputSize" @change="host.onUpdateProps(props.node)"></el-input>
              </div>
            </el-col>

            <div class="tips">
              内边距：输入数字表示像素；输入%表示百分比
            </div>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="样式" name="2" v-if="props.node && !TopologyData.locked">
          <el-row :gutter="16" class="row-layout">
            <el-col :span="24">
              <div class="bable">线条样式</div>
              <div class="bable-content">
                <el-select v-model="props.node.dash" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.node)">
                  <el-option v-for="item in lineDash" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">线条颜色</div>
              <div class="bable-content">
                <el-color-picker v-model="props.node.strokeStyle" :size="inputSize" defaultColor="#222" class="color-picker" @change="host.onUpdateProps(props.node)" />
                <el-input v-model="props.node.strokeStyle" :size="inputSize" placeholder="线条颜色" @change="host.onUpdateProps(props.node)"> </el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">线条宽度(px)</div>
              <div class="bable-content">
                <el-input-number v-model="props.node.lineWidth" :size="inputSize" :min="1" style="width:100%;" @change="host.onUpdateProps(props.node)" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">背景颜色</div>
              <div class="bable-content">
                <el-color-picker v-model="props.node.fillStyle" :size="inputSize" class="color-picker" @change="host.onUpdateProps(props.node)" />
                <el-input :value="props.node.fillStyle || '#fff'" placeholder="背景颜色" :size="inputSize" @change="host.onUpdateProps(props.node)"> </el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">透明度(0-1)</div>
              <div class="bable-content">
                <el-input-number v-model="props.node.globalAlpha" :size="inputSize" :min="0" :max="1" :step="0.01" default-value="1" style="width:100%;" @change="host.onUpdateProps(props.node)" />
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="文字" name="3" v-if="props.node && !TopologyData.locked">
          <el-row :gutter="16" class="row-layout">
            <el-col :span="12">
              <div class="bable">大小</div>
              <div class="bable-content">
                <el-input-number v-model="props.node.font.fontSize" :size="inputSize" :min="12" :precision="0" style="width:100%;" @change="host.onUpdateProps(props.node)" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">加粗</div>
              <div class="bable-content">
                <el-select v-model="props.node.font.fontWeight" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.node)">
                  <el-option v-for="item in lineFontFontWeight" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">颜色</div>
              <div class="bable-content">
                <el-color-picker v-model="props.node.font.color" :size="inputSize" defaultColor="#222" class="color-picker" @change="host.onUpdateProps(props.node)" />
                <el-input v-model="props.node.font.color" :size="inputSize" placeholder="颜色" @change="host.onUpdateProps(props.node)"> </el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">倾斜</div>
              <div class="bable-content">
                <el-select v-model="props.node.font.fontStyle" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.node)">
                  <el-option v-for="item in lineFontFontStyle" :size="inputSize" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">水平对齐</div>
              <div class="bable-content">
                <el-select v-model="props.node.font.textAlign" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.node)">
                  <el-option v-for="item in lineFontTextAlign" :size="inputSize" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">垂直对齐</div>
              <div class="bable-content">
                <el-select v-model="props.node.font.textBaseline" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.node)">
                  <el-option v-for="item in lineFontTextBaseline" :size="inputSize" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="bable">内容</div>
              <div class="bable-content">
                <el-input type="textarea" v-model="props.node.text" :size="inputSize" placeholder="文字内容" :auto-size="{ minRows: 4, maxRows: 10 }" @change="host.onUpdateProps(props.node)" />
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="图片" name="4" v-if="props.node && !TopologyData.locked">
          <div class="tips">
            图片、字体图标同时存在时，图片优先
          </div>
          <el-row :gutter="16" class="row-layout">
            <el-col :span="24">
              <div class="bable-horizontal">图片选择</div>
              <div class="bable-horizontal-content">
                <el-image v-if="props.node.image" style="width: 100px; height: 100px" :src="props.node.image" fit="cover"></el-image>
                <i v-else class="el-icon-upload bable-upload" @click="handlePicChange"></i>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">宽（px）</div>
              <div class="bable-content">
                <el-input v-model="props.node.imageWidth" :size="inputSize" placeholder=""></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">高（px）</div>
              <div class="bable-content">
                <el-input v-model="props.node.imageHeight" :size="inputSize" placeholder=""></el-input>
              </div>
            </el-col>
            <el-col :span="24">
              <el-checkbox v-model="props.node.imageRatio">保存图片比例</el-checkbox>
            </el-col>
            <div class="line"></div>
            <el-col :span="24">
              <div class="bable-horizontal">字体图标</div>
              <div class="bable-horizontal-content">
                <span v-if="props.node.icon" class="bable-upload" @click="handleIconChange">{{ props.node.icon }}</span>
                <i v-else class="el-icon-upload bable-upload" :class="props.node.icon" @click="handleIconChange"></i>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="bable-horizontal">字体大小</div>
              <div class="bable-horizontal-content">
                <el-input-number v-model="props.node.iconSize" :size="inputSize" :controls="false"></el-input-number>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="bable-horizontal">字体颜色</div>
              <div class="bable-horizontal-content">
                <el-color-picker v-model="props.node.iconColor" defaultColor="#222" :size="inputSize" class="color-picker" @change="host.onUpdateProps(props.node)" />
                <el-input v-model="props.node.iconColor" :size="inputSize" placeholder="颜色" @change="host.onUpdateProps(props.node)"> </el-input>
              </div>
            </el-col>
            <div class="line"></div>
            <el-col :span="24">
              <div class="bable-horizontal">对齐方式</div>
              <div class="bable-horizontal-content">
                <el-select v-model="props.node.imageAlign" :size="inputSize" placeholder="请选择">
                  <el-option v-for="item in iconAligns" :size="inputSize" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <!-- 选中线条 -->
      <el-collapse class="toolbar" v-model="activeNames" v-if="props.line && !TopologyData.locked">
        <el-collapse-item title="样式" name="2" v-if="props.line && !TopologyData.locked">
          <el-row :gutter="16" class="row-layout">
            <el-col :span="12">
              <div class="bable">线条样式</div>
              <div class="bable-content">
                <el-select v-model="props.line.dash" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.line)">
                  <el-option v-for="item in lineDash" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">连线类型</div>
              <div class="bable-content">
                <el-select v-model="props.line.name" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.line)">
                  <el-option v-for="item in lineName" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">线条颜色</div>
              <div class="bable-content">
                <el-color-picker v-model="props.line.strokeStyle" :size="inputSize" defaultColor="#222" @change="host.onUpdateProps(props.line)" />
                <el-input v-model="props.line.strokeStyle" :size="inputSize" placeholder="颜色" @change="host.onUpdateProps(props.line)"> </el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">线条宽度(px)</div>
              <div class="bable-content">
                <el-input-number v-model="props.line.lineWidth" :size="inputSize" :min="1" :precision="0" style="width:100%;" @change="host.onUpdateProps(props.line)" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">连线边框</div>
              <div class="bable-content">
                <el-color-picker v-model="props.line.borderColor" :size="inputSize" defaultColor="#000000" class="color-picker" @change="host.onUpdateProps(props.line)" />
                <el-input v-model="props.line.borderColor" :size="inputSize" placeholder="边框" @change="host.onUpdateProps(props.line)"> </el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">边框宽度(px)</div>
              <div class="bable-content">
                <el-input-number v-model="props.line.borderWidth" :size="inputSize" :min="0" :precision="0" style="width:100%;" @change="host.onUpdateProps(props.line)" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">透明度(0-1)</div>
              <div class="bable-content">
                <el-input-number v-model="props.line.globalAlpha" :size="inputSize" :min="0" :max="1" :step="0.1" default-value="1" style="width:100%;" @change="host.onUpdateProps(props.line)" />
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="文字" name="3" v-if="props.line && !TopologyData.locked">
          <el-row :gutter="16" class="row-layout">
            <el-col :span="12">
              <div class="bable">大小</div>
              <div class="bable-content">
                <el-input-number v-model="props.line.font.fontSize" :size="inputSize" :min="12" :precision="0" style="width:100%;" @change="host.onUpdateProps(props.line)" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">加粗</div>
              <div class="bable-content">
                <el-select v-model="props.line.font.fontWeight" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.line)">
                  <el-option v-for="item in lineFontFontWeight" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">颜色</div>
              <div class="bable-content">
                <el-color-picker v-model="props.line.font.color" :size="inputSize" defaultColor="#222" class="color-picker" @change="host.onUpdateProps(props.line)" />
                <el-input :value="props.line.font.color || '#222'" :size="inputSize" placeholder="颜色" @change="host.onUpdateProps(props.line)"> </el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">倾斜</div>
              <div class="bable-content">
                <el-select v-model="props.line.font.fontStyle" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.line)">
                  <el-option v-for="item in lineFontFontStyle" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">水平对齐</div>
              <div class="bable-content">
                <el-select v-model="props.line.font.textAlign" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.line)">
                  <el-option v-for="item in lineFontTextAlign" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">垂直对齐</div>
              <div class="bable-content">
                <el-select v-model="props.line.font.textBaseline" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.line)">
                  <el-option v-for="item in lineFontTextBaseline" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="bable">内容</div>
              <div class="bable-content">
                <el-input type="textarea" v-model="props.line.text" :size="inputSize" placeholder="文字内容" :auto-size="{ minRows: 4, maxRows: 10 }" @change="host.onUpdateProps(props.line)" />
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="箭头" name="4" v-if="props.line && !TopologyData.locked">
          <el-row :gutter="16" class="row-layout">
            <el-col :span="12">
              <div class="bable">起点箭头</div>
              <div class="bable-content">
                <el-select v-model="props.line.fromArrow" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.line)">
                  <el-option v-for="(item, index) in arrowTypes" :key="index" :value="item">
                    <i :class="`iconfont icon-from-${item}`" style="font-size:30px;color:#000;"></i>
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">终点箭头</div>
              <div class="bable-content">
                <el-select v-model="props.line.toArrow" :size="inputSize" style="width:100%;" @change="host.onUpdateProps(props.line)">
                  <el-option v-for="(item, index) in arrowTypes" :size="inputSize" :key="index" :value="item" :label="item">
                    <i :class="`iconfont icon-to-${item}`" style="font-size:30px;color:#000;"></i>
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">起点箭头颜色</div>
              <div class="bable-content">
                <el-color-picker v-model="props.line.fromArrowColor" :size="inputSize" defaultColor="#222" class="color-picker" @change="host.onUpdateProps(props.line)" />
                <el-input :value="props.line.fromArrowColor || '#222'" :size="inputSize" placeholder="颜色" @change="host.onUpdateProps(props.line)"> </el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">起点箭头大小(px)</div>
              <div class="bable-content">
                <el-input-number v-model="props.line.fromArrowSize" :size="inputSize" :min="5" :precision="0" style="width:100%;" @change="host.onUpdateProps(props.line)" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">终点箭头颜色</div>
              <div class="bable-content">
                <el-color-picker v-model="props.line.toArrowColor" :size="inputSize" defaultColor="#222" class="color-picker" @change="host.onUpdateProps(props.line)" />
                <el-input :value="props.line.toArrowColor || '#222'" :size="inputSize" placeholder="颜色" @change="host.onUpdateProps(props.line)"> </el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bable">终点箭头大小(px)</div>
              <div class="bable-content">
                <el-input-number v-model="props.line.toArrowSize" :size="inputSize" :min="5" :precision="0" style="width:100%;" @change="host.onUpdateProps(props.line)" />
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <!-- 选中画布 -->
      <div v-if="!props.node && !props.line && !props.multi">
        <el-tabs v-model="activeTab" style="margin: 0 10px;">
          <el-tab-pane label="组件" name="component">
            <div style="height: calc(100vh - 118px)">
              <div class="settings">
                <div class="item">
                  <span class="label">背景图片：</span>
                  <el-switch v-model="TopologyData.bkImage" :size="inputSize" @change="onImageChange" />
                </div>
                <div class="item">
                  <span class="label">背景网格：</span>
                  <el-switch v-model="TopologyData.grid" :size="inputSize" @change="onSwitchChange" />
                </div>
                <div class="item">
                  <span class="label">网格大小：</span>
                  <el-input-number v-model="TopologyData.gridSize" :size="inputSize" :min="5" :max="1000" @change="onGridSizeChange" :controls="false"></el-input-number>
                </div>
                <div class="item">
                  <span class="label">网格颜色：</span>
                  <div class="bable-content">
                    <el-color-picker v-model="TopologyData.gridColor" :size="inputSize" class="color-picker" @change="onGridColor" />
                    <el-input :value="TopologyData.gridColor" :size="inputSize" placeholder="颜色" @change="onGridColor"> </el-input>
                  </div>
                </div>
                <div class="item">
                  <span class="label">标尺：</span>
                  <el-switch v-model="TopologyData.rule" :size="inputSize" @change="onRuleChange" />
                </div>
                <div class="item">
                  <span class="label">标尺颜色：</span>
                  <div class="bable-content">
                    <el-color-picker v-model="TopologyData.ruleColor" :size="inputSize" class="color-picker" @change="onRuleColor" />
                    <el-input :value="TopologyData.ruleColor" :size="inputSize" placeholder="颜色" @change="onRuleColor"> </el-input>
                  </div>
                </div>
                <div class="item">
                  <span class="label">背景颜色：</span>
                  <div class="bable-content">
                    <el-color-picker v-model="TopologyData.bkColor" :size="inputSize" class="color-picker" @change="onBkColorChange" />
                    <el-input :value="TopologyData.bkColor" :size="inputSize" placeholder="颜色" @change="onBkColorChange"> </el-input>
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="title">小提示</div>
                <ul class="group">
                  <li>方向键：控制节点移动5个像素</li>
                  <li>Ctrl + 方向键：控制节点移动1个像素</li>
                  <li>Ctrl + 鼠标移动：移动整个画布</li>
                  <li>Ctrl + 鼠标滚轮：缩放</li>
                  <li>添加或选中节点，右侧属性支持上传各种图片哦</li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="通信" name="communication">通信</el-tab-pane>
          <el-tab-pane label="布局" name="layout">布局</el-tab-pane>
          <el-tab-pane label="结构" name="structure">结构</el-tab-pane>
        </el-tabs>
      </div>
      <!-- 选中组合 -->
      <div v-if="!props.node && !props.line && !props.multi">
        <el-tabs v-model="activeTab" style="margin: 0 10px;">
          <el-tab-pane label="组件" name="component">
            <div style="height: calc(100vh - 118px)">
              <div class="settings">
                <div class="item">
                  <span class="label">背景网格：</span>
                  <el-switch v-model="grid" size="small" @change="onSwitchChange" />
                </div>
              </div>
              <div class="bottom">
                <div class="title">小提示</div>
                <ul class="group">
                  <li>方向键：控制节点移动5个像素</li>
                  <li>Ctrl + 方向键：控制节点移动1个像素</li>
                  <li>Ctrl + 鼠标移动：移动整个画布</li>
                  <li>Ctrl + 鼠标滚轮：缩放</li>
                  <li>添加或选中节点，右侧属性支持上传各种图片哦</li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="通信" name="communication">通信</el-tab-pane>
          <el-tab-pane label="布局" name="layout">布局</el-tab-pane>
          <el-tab-pane label="结构" name="structure">结构</el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 图片窗口 -->
    <div class="over-toolbar" v-if="show.imgDialog">
      <ImgDialog></ImgDialog>
    </div>
    <!-- icon弹窗  -->
    <div class="over-toolbar" v-if="show.iconDialog">
      <IconDialog></IconDialog>
    </div>
  </div>
</template>
<script>
import { lineDash, lineFontFontWeight, lineName, lineFontFontStyle, lineFontTextAlign, lineFontTextBaseline, iconAligns } from '../services/defaultsetting'
import ImgDialog from './ImgDialog'
import IconDialog from './IconDialog'

const lineNames = ['curve', 'polyline', 'line']
const arrowTypes = ['', 'triangleSolid', 'triangle', 'diamondSolid', 'diamond', 'circleSolid', 'circle', 'line', 'lineUp', 'lineDown']

export default {
  name: 'SettingBar',
  props: ['data', 'pprops', 'canvasData', 'canvas'],
  components: { ImgDialog, IconDialog },
  data() {
    return {
      lineDash,
      lineFontFontWeight,
      lineName,
      lineFontFontStyle,
      lineFontTextAlign,
      lineFontTextBaseline,
      lineNames,
      arrowTypes,
      iconAligns,
      activeTab: 'component',
      grid: false,
      activeNames: ['1', '2', '3', '4'],
      show: {
        imgDialog: false,
        iconDialog: false
      },
      bkImage: false,
      inputSize: 'mini'
    }
  },
  provide() {
    return {
      settingbar: this
    }
  },
  inject: ['host'],
  computed: {
    TopologyData: {
      get: function() {
        return this.data
      },
      set: function(params) {
        this.$emit('update:data', params)
      }
    },
    props: {
      get: function() {
        return this.pprops
      },
      set: function(params) {
        console.log(params)
        this.$emit('update:pprops', params)
      }
    }
  },
  watch: {
    TopologyData: {
      handler(val) {
        this.grid = val.grid
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onBkColorChange(val) {
      this.host.setBkColor(val)
      this.canvas.render()
    },
    onRuleChange(val) {
      this.host.onRule(val)
      this.canvas.render()
    },
    onRuleColor(val) {
      this.host.setRuleColor(val)
      this.canvas.render()
    },
    // 背景网格
    onSwitchChange(val) {
      this.host.onGrid(val)
      // this.$emit('on-grid', value)
      // this.canvas.showGrid(value)
      this.canvas.render()
    },
    onImageChange() {
      this.host.setImage()
    },
    onGridSizeChange(val) {
      this.host.setGridSize(val)
      this.canvas.render()
    },
    onGridColor(val) {
      this.host.setGridColor(val)
      this.canvas.render()
    },
    // 下载为图片
    handleMenuClick(e) {
      e.preventDefault()
      this.canvas.saveAsImage(`${Date.parse(new Date())}.png`)
    },
    // 打印
    handleConsoleClick(e) {
      e.preventDefault()
      console.log(JSON.stringify(this.canvas.data), '打印canvas.data数据')
    },
    handlePicChange() {
      this.show.imgDialog = true
    },
    handleIconChange() {
      this.show.iconDialog = true
    },
    onClickIcon(item) {
      if (item) {
        item.checked = true
        this.props.node.iconFamily = 'topology'
        this.props.node.icon = String.fromCharCode(+item.unicode)
      } else {
        this.props.node.icon = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.topology {
  display: flex;
  width: 100%;
  height: 100vh;
  // 左侧图形库
  .tools {
    font-size: 12px;
    line-height: 2;
    flex-shrink: 0;
    width: 100%;
    border-right: 1px solid #d9d9d9;
    overflow-y: auto;
    overflow-x: hidden;
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

  // 右侧属性栏
  .props {
    box-sizing: border-box;
    flex-shrink: 0;
    border-left: 1px solid #d9d9d9;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    bottom: 0;
    height: 100%;
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
      display: flex;
      flex-direction: column;
      height: 100%;
      .item {
        width: 100%;
        margin: 8px 0;
        display: flex;
        .label {
          width: 160px;
        }
        .bable-content{
          display: flex;
        }
        &.select {
          .ant-select {
            flex: 1;
            display: flex;

            ::v-deep.ant-select-selection {
              width: 100%;
            }
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
      .bable-content {
        display: flex;
      }
    }
  }

  // 颜色选择器
  .color-picker.m-colorPicker {
    ::v-deep.box {
      width: 215px !important;
    }
    ::v-deep.colorBtn {
      cursor: pointer;
    }
  }
}
.toolbar {
  // width: 260px;
  // height: 100%;
  // position: relative;
  // overflow: auto;
  // top: 0;
  .el-collapse-item {
    ::v-deep div.el-collapse-item__header {
      padding-left: 10px;
    }
  }
}
.tips {
  color: #bfbfbf;
  padding: 0 10px;
  line-height: 1.5;
}
.line {
  display: inline-block;
  height: 1px;
  width: 100%;
  background-color: #dcdfe6;
}
.bable-horizontal {
  display: inline-block;
  width: 60px;
}
.bable-horizontal-content {
  display: flex;
  width: 170px;
}
.bable-upload {
  font-size: 25px;
  cursor: pointer;
}
.over-toolbar {
  width: 260px;
  height: calc(100% - 40px);
  position: absolute;
  overflow: auto;
  top: 40px;
  z-index: 100;
  background: #fff;
  border-left: solid 1px #ddd;
}
</style>
