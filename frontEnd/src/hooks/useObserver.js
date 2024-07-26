import React from 'react'

export default function UseObserver(keepOnOut) {
    const observer = new IntersectionObserver(enteries => {
        enteries.forEach(entery => {
            if (entery.isIntersecting) {
                entery.target.classList.add('in-view')
                return
            }
            console.log(keepOnOut);
           if (!keepOnOut) {
               entery.target.classList.remove('in-view')
           } 
        });
    });

    const allAnimatedElements = document.querySelectorAll('.animate');
    allAnimatedElements.forEach((element) => observer.observe(element))

}
