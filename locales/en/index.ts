import home from './home';
import about from './about';
import common from './common'; // 如果有通用翻譯

// import common from './common'; // 如果有通用翻譯

export default {
    ...common,
    page_content: { // 保持您原有的 page_content 結構
        home,
        about,
    },
};