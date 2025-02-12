import { mount } from 'enzyme';
import wait from 'waait'; 
import toJSON from 'enzyme-to-json'; 
import { MockedProvider} from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import AddToCart, { ADD_TO_CART_MUTATION } from '../components/AddToCart'; 
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const mocks = [
    {
        request: { query: CURRENT_USER_QUERY},
        result: { 
            data: {
            me: { 
                ...fakeUser(),
                cart: [], 
            }
        }
    }
    },
    {
        request: { query: CURRENT_USER_QUERY},
        result: { 
            data: {
            me: { 
                ...fakeUser(),
                cart: [fakeCartItem()], 
            }
        }
    }
    },
    {
        request: { query: ADD_TO_CART_MUTATION, variables: { id: 'abc123'}},
        result: {
            data: {
                addToCart: {
                    ...fakeCartItem(),
                    quantity: 1,
                }
            }
        }
    }

]

describe('<AddToCart />', () => {
    it('renders and matches the snap shot', async () => {
        const wrapper = mount(
        <MockedProvider> 
            <AddToCart id="abc123"/>
        </MockedProvider>
        )
    await wait ()
    wrapper.update()
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot()
})
it('adds an item to cart when clicked', async () => {
    let apolloclient;
    const wrapper = mount(
        <MockedProvider> 
            <ApolloConsumer>{(client) => {
                apolloclient = client;
                return  <AddToCart id="abc123"/>
            }}
            </ApolloConsumer>
        </MockedProvider>
        )
        await wait (); 
        wrapper.update()
        const {data: {me}} = await apolloclient.query({query: CURRENT_USER_QUERY})
        console.log(me)
        expect(me.cart).toMatchLength(0)
        // add an item to the cart 
        wrapper.findWhere('button').simulate('click');
        await wait()
        // // check if item is in the cart 
        const {data: {me: me2}} = await apolloclient.query({query:
            CURRENT_USER_QUERY})
            expect(me2.cart).toHaveLength(1)
            expect(me2.cart[0]).toBe('omg123')
            expect(me2.cart[0].quantity).toBe(3)
})
    it('changes from add to adding when clicked', async () => {
        const wrapper= mount(
            <MountProvider mocks={mocks}>
                <AddToCart  id="abc123" />
            </MountProvider>
        )
        await wait()
        wrapper.update()
        expect(wrapper.text()).toContain('Add To Cart')
        wrapper.find('button').simulate('click')
        expect(wrapper.text()).toContain('Adding To Cart')
    })
})