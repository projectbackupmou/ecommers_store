import React, { Component } from 'react'
import {ProductConsumer} from '../context'
import { Link} from "react-router-dom";
import { ButtonContainer } from "./Button";
export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value)=>{
                    const {id,price,title,img,company,info,inCart}=value.detailProduct;
                
                return(
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                               <h1>{title}</h1>
                            </div>
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={img} className="img-fluid" alt="product"></img>
                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>mode:{title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">made by:<span className="text-uppercase"></span>{company}</h4>
                                    <h4 className="text-blue"><strong>price:<span>$</span>{price}</strong></h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0"> some info about Product</p>
                                    <p className="text-muted lead">{info}</p>
                                </div>
                                {/* button */}
                                <div>
                                    <Link to="/">
                                        <ButtonContainer>
                                            back to product
                                        </ButtonContainer>
                                        <ButtonContainer 
                                        cart
                                        disabled={inCart?true:false} 
                                        onClick={()=>{
                                           value.addtocart(id);
                                           value.openModal(id)
                                            }}>
                                            {inCart?"incart":"add to card"}
                                        </ButtonContainer>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
                }
            </ProductConsumer>
        )
    }
}
