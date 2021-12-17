import React from 'react';
import App from './App';
import {shallow} from "enzyme";


describe("测试全局APP", () => {
  const wrapper = shallow(
      <App />
  );

  it("1号测试，测试包含th标签", () => {
    expect(wrapper.contains(<th>Items</th>)).toBe(true);
  });

  it("2号测试，测试包含输入框", () => {
    expect(wrapper.containsMatchingElement(<input />)).toBe(true);
  });

  it("3号测试，测试按钮是否为禁用的", () => {
    expect(wrapper.containsMatchingElement(
        <button disabled={true}>Add item</button>
    )).toBe(true);
  });
});

