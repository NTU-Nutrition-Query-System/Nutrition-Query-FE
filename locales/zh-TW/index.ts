import home from './home';
import about from './about';
import common from './common';

export default {
    ...common,
    page_content: {
        home,
        about,
    },
};