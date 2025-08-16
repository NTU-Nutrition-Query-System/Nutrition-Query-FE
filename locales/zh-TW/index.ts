import home from './home';
import about from './about';
import common from './common';
import nutritionNote from './nutritionNote';
import calculator from './calculator';

export default {
    ...common,
    page_content: {
        home,
        about,
        nutritionNote,
        calculator,
    },
};