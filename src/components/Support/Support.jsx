import React from 'react';
import classes from './Support.module.css';
import support1 from '../../img/support1.png';
import support2 from '../../img/support2.png';
import support3 from '../../img/support3.png';
import support4 from '../../img/support4.png';


const support = () => {
    return(
        <div className={classes.Support}>
            <div className={classes.SupportInfo}>
             <img src={support1} className={classes.SupportInfoImage}/>
             <div>
             <h2 className={classes.SupportInfoTitle}>Free Shipping</h2>
             <p className={classes.SupportInfoText}>Free shipping on all order</p>
             </div>
             
            </div>
            <div className={classes.SupportInfo}>
             <img src={support2} className={classes.SupportInfoImage}/>
             <div>
             <h2 className={classes.SupportInfoTitle}>Support 24/7</h2>
             <p className={classes.SupportInfoText}>Free shipping on all order</p>
             </div>
             
            </div>
            <div className={classes.SupportInfo}>
             <img src={support3} className={classes.SupportInfoImage}/>
             <div>
             <h2 className={classes.SupportInfoTitle}>Money Return</h2>
             <p className={classes.SupportInfoText}>Free shipping on all order</p>
             </div>
             
            </div>
            <div className={classes.SupportInfo}>
             <img src={support4} className={classes.SupportInfoImage}/>
             <div>
             <h2 className={classes.SupportInfoTitle}>Order Discount</h2>
             <p className={classes.SupportInfoText}>Free shipping on all order</p>
             </div>
             
            </div>
           
            

        </div>
    );


}
export default support;