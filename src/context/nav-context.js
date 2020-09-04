import React from 'react';

const navContext = React.createContext({
    navLinks: [
       
        {name: 'Shop', subCategories: [{title: 'Home group one', links: ['link one', 'link two', 'link three']}, {title: 'Home group two', links: ['link one', 'link two', 'link three']},{title: 'Home group three', links: ['link one', 'link two', 'link three']}]},
        {name: 'Collection'},
        {name: 'Blog', blogTypes:['Blog Standard', 'Blog No Side Bar', 'Blog Right Side Bar', 'Blog Details Standard']},
        {name: 'Contact Us'}            
    ],
    navigation: ()=>{}
    
});

export default navContext;