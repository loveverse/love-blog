<template>
  <el-dialog
    title="课件预览"
    class="preview_dialog"
    :close-on-click-modal="false"
    v-model="openPreviewDialog"
    width="1000px"
    :fullscreen="state.isFullScreen"
    @close="exit"
  >
    <div
      v-show="visible"
      class="perview_content"
      :class="state.isFullScreen && 'dialog_full'"
      element-loading-text="正在解码中"
      v-loading="loading"
    >
      <iframe
        ref="refIframe"
        width="100%"
        height="100%"
        :src="createPreviewUrl(fileInfo.url)"
        frameborder="0"
      >
      </iframe>
    </div>
    <template #footer>
      <div class="footer_btn">
        <div></div>
        <div>
          <span
            class="full_screen"
            @click="state.isFullScreen = !state.isFullScreen"
            >全屏</span
          >
          <a class="down_color">下载</a>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="ComPreview">
import { createPreviewUrl } from "@/utils/common";
const props = defineProps({
  fileInfo: {
    type: Object,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["update:visible", "handlePerviewClose"]);
const openPreviewDialog = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emits("update:visible", val);
  },
});
const loading = ref<boolean>(false);
const refIframe = ref<any>(null);
const state = reactive({
  isFullScreen: false,
});

const exit = () => {
  state.isFullScreen = false;
  emits("handlePerviewClose");
};
const iframeLoad = () => {
  loading.value = true;
  if (refIframe.value.attachEvent) {
    refIframe.value.attachEvent("onload", () => (loading.value = false));
  } else {
    refIframe.value.onload = () => {
      loading.value = false;
    };
  }
};
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        iframeLoad();
      });
    }
  }
);
</script>

<style lang="scss">
.preview_dialog {
  .el-dialog__body {
    padding: 0;
    height: calc(100% - 114px);
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .perview_content {
      height: 414px;
      padding: 20px;
      box-sizing: border-box;
    }
    .dialog_full {
      height: 100%;
    }
  }
  .el-dialog__footer {
    padding: 16px 20px;
    .footer_btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .full_screen {
        display: inline-block;
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #333;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
      }
      .down_color {
        display: inline-block;
        width: 100px;
        height: 38px;
        line-height: 38px;
        margin-left: 30px;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        background-color: #ffa31f;
      }
    }
  }
}
</style>
