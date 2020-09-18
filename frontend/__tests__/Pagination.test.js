import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import Pagination, { PAGINATION_QUERY} from '../components/Pagination';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
Router.router = {
    push() {},
    preFetch() {}
}

function makeMocksFor(length) {
    return [
        {
            request: { query: PAGINATION_QUERY},
            resule: {
                data: { 
                    itemsConnection: {
                        __typename: 'aggregate', 
                        aggregate: {
                            __typename: 'count',
                            count: length,
                        }
                    }
                }
            }
        }
    ]
}

describe('<Pagination />', () => {
    it('displays a loading message', () => {
        const wrapper = mount(
        <MockedProvider mocks={makeMocksFor(1)}>
            <Pagination page={1}/>
        </MockedProvider>
        )
        const Pagination = wrapper.find('[data-test="pagination"]')
        console.log(wrapper.debug())
        expect(wrapper.text()).toContain('Loading...')

    })

    it('renders pagination for 18 items', async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(18)}>
                <Pagination page={1}/>
            </MockedProvider>
            )
            await wait()
            wrapper.update()
            expect(wrapper.find('.totalPages').text()).toEqual('5')
            const nav = wrapper.find('div[data-test="pagination"]')
            expect(toJSON(nav)).toMatchSnapshot()
            console.log(nav.debug())
            
    })
    it('disables prev button on first page', async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(18)}>
                <Pagination page={1}/>
            </MockedProvider>
            )
            await wait()
            wrapper.update()
            expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(true)
            expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false)
    })

    it('disables next button on first page', async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(18)}>
                <Pagination page={5}/>
            </MockedProvider>
            )
            await wait()
            wrapper.update()
            expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false)
            expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(true)
    })
    it('enables all buttons on middle page', async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(18)}>
                <Pagination page={3}/>
            </MockedProvider>
            )
            await wait()
            wrapper.update()
            expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false)
            expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false)
    })
})