import mitt from 'mitt';
import { createApp } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

import '~/material';

import App from '~/App.vue';
import Service from '~/modules/api-service';

const GOOGLE_MAPS_API_KEY = import.meta.env['VITE_GOOGLE_MAPS_API_KEY'] as string;

const events = mitt<Record<string, any>>();

const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: []
});

function load() {
    return loader.load().then(() =>
        window.dispatchEvent(new Event('app-ready'))
    );
}

if (window.flutter_inappwebview) {
    window.addEventListener('flutterInAppWebViewPlatformReady', load);
} else {
    load();
}

window.addEventListener('app-ready', () => {
    const app = createApp(App);

    app.config.globalProperties.$events = events;
    app.config.globalProperties.$service = new Service();

    app.mixin({
        methods: {
            $overlay(value: boolean) {
                events.emit('overlay', value);
            }
        }
    });

    app.mount('#app');
});
