<template>
  <el-dialog
    :title="$t('filePreview')"
    class="preview_dialog"
    :close-on-click-modal="false"
    v-model="openPreviewDialog"
    :fullscreen="state.isFullScreen"
    :class="state.isFullScreen && 'dialog_full'"
    @close="exit"
  >
    <div
      v-if="fileInfo.url"
      class="perview_content"
      :element-loading-text="$t('decodeIng')"
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
        <div>
          <span
            class="full_screen"
            @click="state.isFullScreen = !state.isFullScreen"
            >{{ $t("fullScreen") }}</span
          >
          <a class="down_color">{{ $t("download") }}</a>
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
  refIframe.value = null;
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
  width: 1000px;
  .el-dialog__body {
    padding: 0;
    height: calc(100% - 126px);
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .perview_content {
      height: 414px;
      padding: 20px;
      box-sizing: border-box;
    }
  }
  .el-dialog__footer {
    padding: 16px 20px;
    .footer_btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
.dialog_full {
  width: 100%;
  height: 100%;
  .el-dialog__body {
    .perview_content {
      height: 100%;
    }
  }
}
@media only screen and (max-width: 768px) {
  .preview_dialog {
    width: 320px;
    .el-dialog__footer {
      .footer_btn {
        justify-content: center;
      }
    }
  }
  .dialog_full {
    width: 100%;
    height: 100%;
    .el-dialog__body {
      .perview_content {
        height: 100%;
      }
    }
  }
}
</style>
