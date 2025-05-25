import home from './home';
import about from './about';
import common from './common';
import nutritionNote from './nutritionNote';

export default {
    ...common,
    page_content: {
        home,
        about,
        nutritionNote,
    },
};