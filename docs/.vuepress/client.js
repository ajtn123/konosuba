import { defineClientConfig } from 'vuepress/client';
import ImageView from './components/ImageView.vue';

export default defineClientConfig({
    enhance({ app }) {
        app.component('ImageView', ImageView);
    },
});
