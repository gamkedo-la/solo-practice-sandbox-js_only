import 'styles/main.css';

function component() {
  const element = document.createElement('div');

  element.innerHTML = 'hello world';

  return element;
}

document.body.appendChild(component());
