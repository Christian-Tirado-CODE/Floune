import React, { Component } from 'react';
import Aux from '../../hoc/Auxialiary';
import classes from './Homepage.module.css';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import ProductCard from '../Product/ProductCard';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Transition from "react-transition-group/Transition";
import person1 from '../../img/person1.png'; 
import person2 from '../../img/person2.png'; 
import Support from '../Support/Support';



class Homepage extends Component {
  
    state= {
        showImg1: false,
        showImg2: false
    }


componentDidMount(){
    this.props.onFetchProducts();
    this.setState({showImg1: true});
    alert('https://adoring-keller-b0b670.netlify.app');
}

componentWillUnmount(){
   
}









    render(){
      
 
        const ProductCards = this.props.products.map(product => {
            /* let style= {
                backgroundImage: `url(../../img/${product.imageLink})`,
                
                
            }; */
            
            

            return (
            <ProductCard
                key={product.id}
                imageLink={product.imageLink}
                name={product.name}
                id={product.id}
                
            />);
    });

    
   

       return (
        <Aux>
          
        
             <div className={classes.Hero}>
            <div className={classes.HeroContent}>
                <div className={classes.HeroText}>
                    
                    <Transition
          in={this.state.showImg1}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log()}
          onEntering={() => console.log()}
          onEntered={() => setTimeout(()=> (this.setState({showImg1: false})), 5000)}
          onExit={() => console.log()}
          onExiting={() => console.log()}
          onExited={() => (this.setState({showImg2: true}))}
          >
            {state => (
              <div className="img-slider" style={{
                transition: 'all 2s',
                gridRow: '2/3',
                opacity: state === 'entered' ? 1 : 0,
                transform: state === 'entered' ? 'translateY(0)' : 'translateY(50px)'
              }}>
                    <h2 className={classes.HeroTitle}>Summer Offer 2020 collection</h2>
              
              </div>
            )

            }
          
          </Transition>

          <Transition
          in={this.state.showImg2}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log()}
          onEntering={() => console.log()}
          onEntered={() => setTimeout(()=> (this.setState({showImg2: false})), 5000)}
          onExit={() => console.log()}
          onExiting={() => console.log()}
          onExited={() => this.setState({showImg1: true})}
          >
            {state => (
              <div className="img-slider" style={{
                gridRow: '2/3',
                transition: 'all 2s',
                opacity: state === 'entered' ? 1 : 0,
                transform: state === 'entered' ? 'translateY(0)' : 'translateY(20px)'
              }}>
                  
                  <h2 className={classes.HeroTitle}>Winter Offer 2020 collection</h2>
                            

              </div>
            )

            }
          
          </Transition>

                </div>
            <div className={classes.HeroImages}>
            <Transition
          in={this.state.showImg1}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log()}
          onEntering={() => console.log()}
          onEntered={() => setTimeout(()=> (this.setState({showImg1: false})), 5000)}
          onExit={() => console.log()}
          onExiting={() => console.log()}
          onExited={() => (this.setState({showImg2: true}))}
          >
            {state => (
              <div className="img-slider" style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 1,
                transition: 'all 2s',
                opacity: state === 'entered' ? 1 : 0,
                transform: state === 'entered' ? 'translateY(200px)' : 'translateY(850px)'
              }}>
              <img src={person1} className={classes.Person1}/>
              </div>
            )

            }
          
          </Transition>
          <Transition
          in={this.state.showImg2}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log()}
          onEntering={() => console.log()}
          onEntered={() => setTimeout(()=> (this.setState({showImg2: false})), 5000)}
          onExit={() => console.log()}
          onExiting={() => console.log()}
          onExited={() => this.setState({showImg1: true})}
          >
            {state => (
              <div className="img-slider" style={{
                position: 'absolute',
                bottom: 0,
                right: 50,
                transition: 'all 2s',
                opacity: state === 'entered' ? 1 : 0,
                transform: state === 'entered' ? 'translateY(100px)' : 'translateY(850px)'
              }}>
              <img src={person2} className={classes.Person2}/>
              </div>
            )

            }
          
          </Transition>
          </div>
            </div>
             

             </div>
             <Support/>
        </Aux>
       );
   }


}

const mapStateToProps = state => {
    return {
        products: state.products.products,
        loading: state.products.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => dispatch( actions.fetchProducts() )
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Homepage);