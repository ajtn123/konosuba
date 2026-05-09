import { defineClientConfig } from 'vuepress/client';
import ImageView from './components/ImageView.vue';
import './styles/index.css';

export default defineClientConfig({
    enhance({ app }) {
        app.component('ImageView', ImageView);
    },
});
