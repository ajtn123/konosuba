import { defineClientConfig } from 'vuepress/client';
import Layout from './components/Layout.vue';
import ImageView from './components/ImageView.vue';
import './styles/index.css';

export default defineClientConfig({
    layouts: { Layout },
    enhance({ app }) {
        app.component('ImageView', ImageView);
    }
});
