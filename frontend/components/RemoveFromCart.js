import React from 'react'; 
import { Mutation } from 'react-apollo'; 
import styled from 'styled-components'; 
import Proptypes from 'prop-types';
import gql from 'graphql-tag'; 
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
    mutation removeFromCart($id: ID!) {
        removeFromCart(id: $id) {
            id
        }
    }
`

const BigButton = styled.button`
    font-size: 3rem; 
    background:none; 
    border: 0; 
    &:hover {
        color:${props => props.theme.red};
        cursor: pointer; 
    }
`;

class RemoveFromCart extends React.Component {
    static propTypes = {
        id: Proptypes.string.isRequired, 
    }
    // This gets called as soon as we get a response back from the
    // server after a mutation has been performed
    update = (cache, payload) => {
        console.log('Running remove from cart update function')
        // 1. first read the cache 
        const data = cache.readQuery({query:
            CURRENT_USER_QUERY })
            console.log(data)
        // 2. remoce that item from the cart
        const cartItemId = payload.data.removeFromCart.id;
        data.me.cart = data.me.cart.filer(cartItem =>
            cartItem.id !== cartItemId);
        // 3. write it back to the cache.  
        cache.writeQuery({query: CURRENT_USER_QUERY, data })
    }
    render () {
        return (
            <Mutation 
                mutation={REMOVE_FROM_CART_MUTATION }
                variables={{id: this.props.id}}
                update={this.update}
                optimisticResponse={{
                    __typeName: 'Mutation', 
                    removeFromCart: {
                        __typeName: 'CartItem',
                        id: this.props.id,
                    }
                }}
            >
                {(removeFromCart, {loading, error }) => 
                <BigButton 
                disabled={loading}
                onClick={() => {
                    removeFromCart().catch(err => alert
                        (err.message));
                }}title="Delete Item">&times;</BigButton>}
                </Mutation>
        )
      
       
    }
}

export default RemoveFromCart;
export {REMOVE_FROM_CART_MUTATION };