import React from 'react';
import loadingSvg from "../../../assets/images/loader.png";

 export const Preloader = () => {
    return (
        <div>
             <img src={ loadingSvg } style={{height: '100px',width:'100px'}}  alt={''}/>
        </div>
    );
};

