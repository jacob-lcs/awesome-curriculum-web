import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from './LoginForm';

function alertLoginForm(message: string, title: string, props: object) {
  if (typeof title === 'object') {
    props = title;
  }

  props = {
    title, message,
    modal: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false, ...props,
  };

  return next(props);
}

function next(props: object) {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');
    const body = document.getElementsByTagName('body')[0];
    div.style.position = 'absolute';
    div.style.backgroundColor = '#f5f5f599';
    div.style.left = '0px';
    div.style.top = '0px';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    body.style.overflow = 'hidden';
    document.body.appendChild(div);

    const component = React.createElement(LoginForm, {
      ...props,
    });

    ReactDOM.render(component, div);
  });
}

export default alertLoginForm;
