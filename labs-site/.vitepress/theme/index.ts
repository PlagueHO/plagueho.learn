import mediumZoom, { type Zoom } from 'medium-zoom';
import DefaultTheme from 'vitepress/theme';
import { defineComponent, h, nextTick, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vitepress';
import './features.css';
import './brand.css';

const taskStoragePrefix = 'plagueho-labs-task:';
const taskSelector = '.vp-doc .task-list-item-checkbox[data-task-id]';
const screenshotSelector = '.vp-doc .screenshot-expander img';

function taskStorageKey(path: string, input: HTMLInputElement): string {
  return `${taskStoragePrefix}${path}:${input.dataset.taskId}`;
}

function readStoredTask(key: string): boolean | undefined {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored === null) return undefined;
    return stored === '1';
  } catch (error) {
    console.warn(`Lab task progress could not be read for "${key}".`, error);
    return undefined;
  }
}

function writeStoredTask(key: string, checked: boolean): void {
  try {
    window.localStorage.setItem(key, checked ? '1' : '0');
  } catch (error) {
    console.warn(`Lab task progress could not be saved for "${key}".`, error);
  }
}

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: 'LabsLayout',
    setup() {
      const route = useRoute();
      let zoom: Zoom | undefined;

      function hydrateTasks(): void {
        document.querySelectorAll<HTMLInputElement>(taskSelector).forEach((input) => {
          const stored = readStoredTask(taskStorageKey(route.path, input));
          if (stored !== undefined) input.checked = stored;
        });
      }

      function disposeZoom(): void {
        if (!zoom) return;
        zoom.detach();
        zoom = undefined;
        document.querySelectorAll<HTMLElement>('[data-labs-zoom]').forEach((image) => {
          image.removeAttribute('data-labs-zoom');
          image.removeAttribute('tabindex');
          image.removeAttribute('role');
        });
      }

      function bindZoom(): void {
        disposeZoom();
        const screenshots = Array.from(
          document.querySelectorAll<HTMLImageElement>(screenshotSelector),
        );
        if (screenshots.length === 0) return;

        screenshots.forEach((image) => {
          image.dataset.labsZoom = '';
          image.tabIndex = 0;
          image.setAttribute('role', 'button');
        });
        zoom = mediumZoom(screenshots, {
          background: 'var(--labs-zoom-backdrop)',
          margin: 24,
        });
      }

      function handleChange(event: Event): void {
        const input = event.target;
        if (!(input instanceof HTMLInputElement) || !input.matches(taskSelector)) return;
        writeStoredTask(taskStorageKey(route.path, input), input.checked);
      }

      function handleKeydown(event: KeyboardEvent): void {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const target = event.target;
        if (!(target instanceof HTMLImageElement) || !target.matches(screenshotSelector)) return;
        event.preventDefault();
        void zoom?.open({ target });
      }

      async function bindPageFeatures(): Promise<void> {
        await nextTick();
        hydrateTasks();
        bindZoom();
      }

      onMounted(() => {
        document.addEventListener('change', handleChange);
        document.addEventListener('keydown', handleKeydown);
        void bindPageFeatures();
      });

      watch(() => route.path, () => {
        disposeZoom();
        void bindPageFeatures();
      });

      onUnmounted(() => {
        document.removeEventListener('change', handleChange);
        document.removeEventListener('keydown', handleKeydown);
        disposeZoom();
      });

      return () => h(DefaultTheme.Layout);
    },
  }),
};
