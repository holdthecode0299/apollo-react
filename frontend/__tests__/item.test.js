import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
    id: 'ABC123',
    title: 'A Cool Item',
    price: 4000,
    description: 'This item is really cool', 
    image: 'dog.jpg', 
    largeItem: 'largedog.jpg', 
     
}

describe('<Item/>', () =>{
    it('renders and matches the snapahot', () => {
        const wrapper =shallow(<ItemComponent item=
            {fakeItem} />)
            expect (toJSON(wrapper)).toMatchSnapshot()
    })
    // it('renders the image properly', () => {
    //     const wrapper = shallow(<ItemComponent item=
    //         {fakeItem} />)
    //     const img = wrapper.find('img')
    //     expect (img.props().src).toBe(fakeItem.image)
    //     expect (img.props().alt).toBe(fakeItem.title)
    // })

    // it('renders and displays properly', () => {
    //      const wrapper = shallow(<ItemComponent item=
    //         {fakeItem}/>)
    //         const PriceTag = wrapper.find('PriceTag')
    //         console.log(PriceTag.children())
    //         expect(PriceTag.children().text()).toBe('$50')
    //         expect(wrapper.find('Title a').text()).toBe(fakeItem.title)
    // })

    // it('renders out the buttons properly', () => {
    //     const wrapper = shallow(<ItemComponent item=
    //         {fakeItem} />);
    //         const buttonList = wrapper.find('.buttonList');
    //         expect (buttonList.children()).toHaveLength(3)
    //         expect(buttonList.find('Link').exists()).toBe(true)
    //         expect(buttonList.find('AddToCart').exists()).toBe(true)
    //         expect(buttonList.find('DeleteItem').exists()).toBe(true)
    // })
})