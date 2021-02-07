import React, { Component } from 'react'
import { storeProducts,detailProduct } from "./data";

const ProductContext=React.createContext()

 class ProductProvider extends Component {
     state={
         products:[],
         detailProduct:detailProduct,
         cart:[],
         modalOpen:true,
         modalProduct:detailProduct,
         cartSubTotal:0,
        cartTax:0,
        cartTotal:0
        

     }

     componentDidMount(){
         this.setProduct()
     }

   setProduct=()=>{
  let tempProduct=[];
  storeProducts.forEach(item => {
   const singleitems= {...item};
   tempProduct=[...tempProduct,singleitems]

  });
  this.setState(()=>{
      return{products:tempProduct}
  })
   }
getItem=(id)=>{
    const product=this.state.products.find(item =>item.id===id)
    return product
}
     handelDetails=(id)=>{
      const product=this.getItem(id);
      this.setState(()=>{return{detailProduct:product}})
     }
     addtocart=(id)=>{
        const tempProducts=[...this.state.products];
        const index=tempProducts.indexOf(this.getItem(id))
        console.log("index"+index)
        const product=tempProducts[index]
        console.log("product"+product)
        product.inCart=true;
        product.count=1;
        const price=product.price;
        product.total=price;
        this.setState(()=>{
            return{products:tempProducts,cart:[...this.state.cart,product]}
        },
        ()=>{
            this.addTotals()
        }
        )
     }
     openModal=(id)=>{
         const product=this.getItem(id);
         this.setState(()=>{
             return{ modalProduct:product,modalOpen:true}
         })
     }
     closeModal=()=>{
         this.setState(()=>{
             return {modalOpen:false}
         })
     }
     increment=(id)=>{
         let tempCart=[...this.state.cart]
         const selectedProduct=tempCart.find(item=>
             item.id === id
         )
         const index=tempCart.indexOf(selectedProduct);
         const product=tempCart[index];

         product.count=product.count+1;
         product.total=product.count * product.price;

         this.setState(()=>{
             return{ cart:[...tempCart]};
            },()=>{
                this.addTotals();
         })
     }
     decrement=(id)=>{
        let tempCart=[...this.state.cart]
        const selectedProduct=tempCart.find(item=>
            item.id === id
        )
        const index=tempCart.indexOf(selectedProduct);
        const product=tempCart[index];
        product.count=product.count -1;
        if(product.count ===0){
            this.removeItem(id)
        }
        else{
            product.total=product.count * product.price;
            this.setState(
                ()=>{
                    return  {cart:[...tempCart]}
                },
                ()=>{
                    this.addTotals()
                }
                
            )
        }
    }
    removeItem=(id)=>{
      let tempProducts=[...this.state.products];
      let tempCart =[...this.state.cart]
      tempCart=tempCart.filter(item=>item.id !=id);
      const index= tempProducts.indexOf(this.getItem(id));
      let removeProduct =tempProducts[index];
      removeProduct.inCart=false;
      removeProduct.count=0;
      removeProduct.total=0
      this.setState( ()=>{
          return{
              cart:[...tempCart],
              products:[...tempProducts]
          }
      },
      ()=>{
          this.addTotals()
      }

      )
    }
    clearCart=()=>{
      this.setState(()=>{
          return {
              cart:[]
          }
      },()=>{
          this.setProduct();
          this.addTotals();
      })
    }

    addTotals=()=>{
        let subTotals=0;
        this.state.cart.map(item =>(subTotals += item.total))
        const tempTax= subTotals * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total =subTotals + tax;
        this.setState(()=>{
            return{
                cartSubTotal:subTotals,
                cartTax:tax,
                cartTotal:total
            }
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{...this.state,
           handelDetails: this.handelDetails,
           addtocart:this.addtocart,
             openModal:this.openModal,
           closeModal:this.closeModal,
           increment:this.increment,
           decrement:this.decrement,
           removeItem:this.removeItem,
           clearCart:this.clearCart
            }}>
            {this.props.children}
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer=ProductContext.Consumer;

export{ProductProvider,ProductConsumer}
