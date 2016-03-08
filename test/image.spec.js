import React from 'react'
import { shallow, mount } from 'enzyme'
import Image from '../src/image'
import Spinner from '../src/spinner'

describe('<Image />', () => {

  it('should render a spinner', () => {
    const wrapper = shallow(<Image src="http://www.baidu.com/img/bd_logo1.png" />)
    expect(wrapper).to.contain(<Spinner />)
  })

  it('calls componentDidMount', () => {
    spy(Image.prototype, 'componentDidMount');
    const wrapper = mount(<Image src="http://www.baidu.com/img/bd_logo1.png" />);
    expect(Image.prototype.componentDidMount.calledOnce).to.equal(true);
  });
})